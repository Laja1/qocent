/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState, useMemo, useCallback, memo } from "react";
import Xarrow from "react-xarrows";
import { Info, Server, Play } from "lucide-react";
import { useModal } from "@/components/shared/modal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/shared";
import { useDeploySiteResourcesMutation } from "@/service/kotlin/siteApi";
import { ErrorHandler } from "@/service/httpClient/errorHandler";
import { showCustomToast } from "@/components/shared/toast";
import { useDeleteResourceByCodeMutation } from "@/service/kotlin/resourceApi";
import type {
  Connection,
  HouseCell,
  resourceNode,
} from "@/models/response/siteResponse";
import { useResourceMap } from "@/utilities/constants/icons";

const cellSize = 40;
const gridWidthSize = 20;
const gridHeightSize = 25;

interface FlowGridProps {
  data?: resourceNode[];
  connections?: Connection[];
  cellBorderData?: HouseCell[];
  siteCode: string;
}

interface ResourceConfig {
  icon: React.ReactNode;
  // bgColor: string;
}

// Helper function to get border styles for a specific cell
const getCellBorderStyle = (
  row: number,
  col: number,
  cellBorderData?: HouseCell[]
) => {
  if (!cellBorderData || cellBorderData.length === 0) return {};

  const cellBorder = cellBorderData.find(
    (border) => border.row === row && border.col === col
  );

  if (!cellBorder) return {};

  const style: React.CSSProperties = {};

  if (cellBorder.top === "Yes") {
    style.borderTop = `${cellBorder.width}px solid ${cellBorder.color}`;
  }
  if (cellBorder.bottom === "Yes") {
    style.borderBottom = `${cellBorder.width}px solid ${cellBorder.color}`;
  }
  if (cellBorder.left === "Yes") {
    style.borderLeft = `${cellBorder.width}px solid ${cellBorder.color}`;
  }
  if (cellBorder.right === "Yes") {
    style.borderRight = `${cellBorder.width}px solid ${cellBorder.color}`;
  }

  // Add fill color if specified
  if (cellBorder.fillColor) {
    style.backgroundColor = cellBorder.fillColor;
  }

  return style;
};

const defaultConfig: ResourceConfig = {
  icon: <Server className="size-5" />,
  // bgColor: "bg-gray-100",
};

// Memoized ResourceNode component
const ResourceNodeComponent = memo<{
  resource: resourceNode;
  config: ResourceConfig;
  onInfoClick: (resource: resourceNode) => void;
}>(({ resource, config, onInfoClick }) => {
  const handleClick = useCallback(() => {
    onInfoClick(resource);
  }, [resource, onInfoClick]);

  return (
    <div
      id={`node-${resource.resourceCode}`}
      className={`absolute flex flex-col items-center justify-center text-[10px] rounded-sm p-1 bg-transparent`}
      style={{
        top: (resource.row - 1) * cellSize,
        left: (resource.col - 1) * cellSize,
        width: cellSize,
        height: cellSize,
      }}
    >
      <button
        className="absolute -top-1 -right-2 px-1 text-[9px] font-semibold rounded-full"
        onClick={handleClick}
      >
        {resource.errors > 0 ? (
          <Info className="size-4 text-red-500 dark:text-red-400" />
        ) : (
          <Info className="size-4 text-black dark:text-gray-500" />
        )}
      </button>
      {config.icon}
    </div>
  );
});

ResourceNodeComponent.displayName = "ResourceNodeComponent";

// Modified grid cells component with new border styling
const GridCells = memo<{ cellBorderData?: HouseCell[] }>(
  ({ cellBorderData }) => {
    const cells = useMemo(() => {
      const cellArray: React.ReactElement[] = [];

      for (let row = 1; row <= gridHeightSize; row++) {
        for (let col = 1; col <= gridWidthSize; col++) {
          const index = (row - 1) * gridWidthSize + (col - 1);

          // Get custom border styles for this cell
          const customBorderStyle = getCellBorderStyle(
            row,
            col,
            cellBorderData
          );

          cellArray.push(
            <div
              key={index}
              className="border border-gray-50 dark:border-gray-900"
              style={{
                width: cellSize,
                height: cellSize,
                ...customBorderStyle, // Apply custom border styles
              }}
            />
          );
        }
      }

      return cellArray;
    }, [cellBorderData]);

    return <>{cells}</>;
  }
);

GridCells.displayName = "GridCells";

// Memoized arrows component
const ArrowsComponent = memo<{ connections: Connection[] }>(
  ({ connections }) => {
    if (!connections || connections.length === 0) return null;

    return (
      <>
        {connections.map((link, index) => (
          <Xarrow
            key={`${link.x}-${link.y}-${index}`}
            start={`node-${link.x}`}
            end={`node-${link.y}`}
            strokeWidth={2}
            color="green"
            showHead={true}
            path="smooth"
            dashness={{ strokeLen: 2, nonStrokeLen: 5, animation: 1 }}
            startAnchor="right"
            endAnchor="left"
          />
        ))}
      </>
    );
  }
);

ArrowsComponent.displayName = "ArrowsComponent";

export const FlowGrid = ({
  data = [],
  connections = [],
  cellBorderData = [],
  siteCode,
}: FlowGridProps) => {
  const { openModal, closeModal } = useModal();
  const RESOURCE_MAP = useResourceMap();
  const [deploySiteResources] = useDeploySiteResourcesMutation();
  const [deleteResources, { isLoading: isDeleting }] =
    useDeleteResourceByCodeMutation();

  const [visibleConnections, setVisibleConnections] = useState<Connection[]>(
    []
  );

  const handleDelete = async ({ resourceCode }: { resourceCode: string }) => {
    try {
      const res = await deleteResources({
        resourceCode: resourceCode,
      }).unwrap();
      await deploySiteResources({ siteCode: siteCode }).unwrap();
      closeModal();
      showCustomToast(res.responseMessage, {
        toastOptions: { type: "success", autoClose: 5000 },
      });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const message = ErrorHandler.extractMessage(error);
      showCustomToast(message, {
        toastOptions: { type: "error", autoClose: 5000 },
      });
    }
  };

  // Use data instead of undefined resources variable
  const resources = data || [];

  useEffect(() => {
    if (resources.length === 0) {
      setVisibleConnections([]);
    } else {
      setVisibleConnections(connections);
    }
  }, [resources, connections]);

  const sortedConnections = useMemo(() => {
    if (!connections || connections.length === 0) return [];
    return [...connections].sort((a, b) => Number(a.serial) - Number(b.serial));
  }, [connections]);

  const gridStyle = useMemo(
    (): React.CSSProperties => ({
      width: `${gridWidthSize * cellSize}px`,
      height: `${gridHeightSize * cellSize}px`,
      display: "grid",
      gridTemplateColumns: `repeat(${gridWidthSize}, ${cellSize}px)`,
      gridTemplateRows: `repeat(${gridHeightSize}, ${cellSize}px)`,
      border: "1px solid white",
    }),
    []
  );

  const animateConnections = useCallback(() => {
    if (resources.length === 0 || sortedConnections.length === 0) return;

    setVisibleConnections([]);

    let i = 0;
    let interval: NodeJS.Timeout;

    const timeoutId = setTimeout(() => {
      interval = setInterval(() => {
        if (i < sortedConnections.length) {
          const connectionToAdd = sortedConnections[i];
          setVisibleConnections((prev) => [...prev, connectionToAdd]);
          i++;
        } else {
          clearInterval(interval);
        }
      }, 1000);
    }, 100);

    // Cleanup function to prevent memory leaks
    return () => {
      clearTimeout(timeoutId);
      if (interval) clearInterval(interval);
    };
  }, [sortedConnections, resources.length]);

  const handleInfoClick = useCallback(
    (resource: resourceNode) => {
      openModal({
        id: `modal-${resource.resourceCode}`,
        content: () => (
          <div className="max-w-xs text-left items-start flex justify-start flex-col space-y-4">
            <div>
              <p className="font-brfirma-bold text-base">
                Error & Warnings{" "}
                {resource.errors > 0 && (
                  <Badge
                    className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums"
                    variant="destructive"
                  >
                    {resource.errors}
                  </Badge>
                )}
              </p>
              <div className="text-xs">
                {/* <p className="font-medium mb-1">
                  {resource.message ||
                    "The current user does not have the required permissions to perform this action. Please ensure that the IAM role or policy attached includes the necessary access rights."}
                </p> */}
              </div>
            </div>
            <div>
              <p className="font-brfirma-bold text-base">Resource Details</p>
              <div className="text-xs">
                <p className="font-medium mb-1">
                  Name: {resource.resourceName}
                </p>
                <p className="font-medium mb-1">
                  Server House: {resource.resourceSiteCode}
                </p>
                <p className="font-medium mb-1">
                  Resource Type: {resource.resourceType}
                </p>
                <p className="font-medium mb-1">
                  Code: {resource.resourceCode}
                </p>
              </div>
            </div>
            <Button
              label={`Delete ${resource.resourceType}`}
              onClick={() =>
                handleDelete({
                  resourceCode: resource.resourceCode,
                })
              }
              isLoading={isDeleting}
            />
          </div>
        ),
      });
    },
    [openModal, handleDelete, isDeleting]
  );

  const resourceNodes = useMemo(() => {
    if (!resources || resources.length === 0) return [];

    return resources.map((resource) => {
      const config =
        RESOURCE_MAP[resource.resourceType as keyof typeof RESOURCE_MAP] ||
        defaultConfig;

      return (
        <ResourceNodeComponent
          key={`${resource.resourceCode}-${resource.row}-${resource.col}`}
          resource={resource}
          config={config}
          onInfoClick={handleInfoClick}
        />
      );
    });
  }, [resources, handleInfoClick, RESOURCE_MAP]);

  // Show empty state when no data
  if (!resources || resources.length === 0) {
    return (
      <div className="w-full">
        <div className="overflow-x-auto overflow-y-hidden">
          <div className="relative min-w-fit" style={gridStyle}>
            <GridCells cellBorderData={cellBorderData} />
          </div>
        </div>
        <div className="mt-4 text-center text-gray-500">
          <p>No resources to display</p>
        </div>
      </div>
    );
  }

  // const handleSubmit = async () => {
  //   console.log(siteCode);
  //   try {
  //     const res = await deploySiteResources({ siteCode }).unwrap();
  //     console.log(res);
  //     showCustomToast(res.responseMessage, {
  //       toastOptions: { type: "success", autoClose: 5000 },
  //     });
  //   } catch (error: any) {
  //     console.error("Deploy Site Error:", error);
  //     const message = ErrorHandler.extractMessage(error);
  //     showCustomToast(message, {
  //       toastOptions: { type: "error", autoClose: 5000 },
  //     });
  //   }
  // };

  return (
    <div className="w-full">
      <div className="overflow-x-auto overflow-y-hidden">
        <div className="justify-between my-4 flex gap-3">
          <p className="font-brfirma-bold underline">{siteCode}</p>
          <div className="flex gap-3">
            <Button
              label="Simulate"
              onClick={animateConnections}
              prefixIcon={<Play className="size-4" />}
              disabled={sortedConnections.length === 0}
            />
            {/* <Button
              label="Deploy Resources"
              isLoading={isLoading}
              onClick={handleSubmit}
              disabled={isLoading}
            /> */}
          </div>
        </div>
        <div className="relative min-w-fit" style={gridStyle}>
          <GridCells cellBorderData={cellBorderData} />
          {resourceNodes}
          <ArrowsComponent connections={visibleConnections} />
        </div>
      </div>
    </div>
  );
};
