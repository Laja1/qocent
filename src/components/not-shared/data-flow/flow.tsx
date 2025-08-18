/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState, useMemo, useCallback, memo } from "react";
import Xarrow from "react-xarrows";
import {
  Info,
  User,
  Globe,
  Shield,
  Router,
  DatabaseIcon,
  Server,
  CircleX,
  Play,
} from "lucide-react";
import { useModal } from "@/components/shared/modal";
import { imgLinks } from "@/assets/assetLink";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/shared";

const cellSize = 40;
const gridSize = 20;

// Updated interfaces to match the provided types
interface HouseCell {
  row: number;
  col: number;
  top: "Yes" | "No";
  bottom: "Yes" | "No";
  left: "Yes" | "No";
  right: "Yes" | "No";
  color: string;
  width?: number;
  fillColor?: string;
}

interface ResourceNode {
  col: number;
  row: number;
  resourceCode: string;
  resourceName: string;
  resourceSiteCode: string;
  resourceType: string;
  connection?: boolean;
  errors: number;
  message?: string;
}

interface Connection {
  x: string;
  y: string;
  serial: number;
}

interface FlowGridProps {
  data?: ResourceNode[];
  connections?: Connection[];
  cellBorderData?: HouseCell[];
}

interface ResourceConfig {
  icon: React.ReactNode;
  color: string;
  bgColor: string;
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

// Memoized resource icon map
const RESOURCE_ICON_MAP = {
  User: {
    icon: <User className="size-5" />,
    color: "text-pink-600",
    bgColor: "bg-pink-100",
  },
  IGW: {
    icon: <Globe className="size-5" />,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
  },
  HouseRouter: {
    icon: <Router className="size-5" />,
    color: "text-green-600",
    bgColor: "bg-green-100",
  },
  InternetRouter: {
    icon: <Globe className="size-5" />,
    color: "text-green-600",
    bgColor: "bg-green-100",
  },
  LB: {
    icon: <Shield className="size-5" />,
    color: "text-purple-600",
    bgColor: "bg-purple-100",
  },
  ServerRoom: {
    icon: <img src={imgLinks.switch} alt="switch" className="size-5" />,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
  },
  Server: {
    icon: <Server className="size-5" />,
    color: "text-red-600",
    bgColor: "bg-red-100",
  },
  Database: {
    icon: <DatabaseIcon className="size-5" />,
    color: "text-indigo-600",
    bgColor: "bg-indigo-100",
  },
  "Database-SQL": {
    icon: <DatabaseIcon className="size-5" />,
    color: "text-indigo-600",
    bgColor: "bg-indigo-100",
  },
};

const defaultConfig: ResourceConfig = {
  icon: <Server className="size-5" />,
  color: "text-gray-600",
  bgColor: "bg-gray-100",
};

// Memoized ResourceNode component
const ResourceNodeComponent = memo<{
  resource: ResourceNode;
  config: ResourceConfig;
  onInfoClick: (resource: ResourceNode) => void;
}>(({ resource, config, onInfoClick }) => {
  const handleClick = useCallback(() => {
    onInfoClick(resource);
  }, [resource, onInfoClick]);

  return (
    <div
      id={`node-${resource.resourceCode}`}
      className={`absolute flex flex-col items-center justify-center text-[10px] border border-white rounded-sm p-1 ${config.bgColor} ${config.color}`}
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
          <CircleX className="size-4 text-red-600" />
        ) : (
          <Info className="size-4 text-black" />
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

      for (let row = 1; row <= gridSize; row++) {
        for (let col = 1; col <= gridSize; col++) {
          const index = (row - 1) * gridSize + (col - 1);

          // Get custom border styles for this cell
          const customBorderStyle = getCellBorderStyle(
            row,
            col,
            cellBorderData
          );

          cellArray.push(
            <div
              key={index}
              className="border border-gray-100"
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
}: FlowGridProps) => {
  const { openModal } = useModal();
  const [visibleConnections, setVisibleConnections] = useState<Connection[]>(
    []
  );

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
      width: `${gridSize * cellSize}px`,
      height: `${gridSize * cellSize}px`,
      display: "grid",
      gridTemplateColumns: `repeat(${gridSize}, ${cellSize}px)`,
      gridTemplateRows: `repeat(${gridSize}, ${cellSize}px)`,
      border: "1px solid white",
    }),
    []
  );

  const animateConnections = useCallback(() => {
    if (resources.length === 0 || sortedConnections.length === 0) return;

    setVisibleConnections([]);

    let i = 0;

    setTimeout(() => {
      const interval = setInterval(() => {
        if (i < sortedConnections.length) {
          const connectionToAdd = sortedConnections[i];
          setVisibleConnections((prev) => [...prev, connectionToAdd]);
          i++;
        } else {
          clearInterval(interval);
        }
      }, 1000);
    }, 100);
  }, [sortedConnections, resources.length]);

  const handleInfoClick = useCallback(
    (resource: ResourceNode) => {
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
                <p className="font-medium mb-1">
                  {resource.message ||
                    "The current user does not have the required permissions to perform this action. Please ensure that the IAM role or policy attached includes the necessary access rights."}
                </p>
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
          </div>
        ),
      });
    },
    [openModal]
  );

  const resourceNodes = useMemo(() => {
    if (!resources || resources.length === 0) return [];

    return resources.map((resource) => {
      const config =
        RESOURCE_ICON_MAP[
          resource.resourceType as keyof typeof RESOURCE_ICON_MAP
        ] || defaultConfig;

      return (
        <ResourceNodeComponent
          key={`${resource.resourceCode}-${resource.row}-${resource.col}`}
          resource={resource}
          config={config}
          onInfoClick={handleInfoClick}
        />
      );
    });
  }, [resources, handleInfoClick]);

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

  return (
    <div className="w-full">
      <div className="overflow-x-auto overflow-y-hidden">
        <div className="relative min-w-fit" style={gridStyle}>
          <GridCells cellBorderData={cellBorderData} />
          {resourceNodes}
          <ArrowsComponent connections={visibleConnections} />
        </div>
      </div>

      <div className="mt-4 text-center">
        <Button
          label="Simulate"
          onClick={animateConnections}
          prefixIcon={<Play className="size-4" />}
          disabled={sortedConnections.length === 0}
        />
      </div>
    </div>
  );
};
