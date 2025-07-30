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

type CellBorder = {
  row: number;
  col: number;
  // CSS Style approach
  borderTop?: string;
  borderRight?: string;
  borderBottom?: string;
  borderLeft?: string;
};

type CellBorderData = {
  borders: CellBorder[];
};

type ResourceNode = {
  col: number;
  row: number;
  resourceCode: string;
  resourceName: string;
  resourceSiteCode: string;
  resourceType: string;
  connection?: boolean;
  errors: number;
  message?: string;
};

type Connection = {
  x: string;
  y: string;
  serial: string;
};

type FlowGridData = {
  data: ResourceNode[];
};

type FlowGridConnections = {
  connections: Connection[];
};

type FlowGridProps = {
  data?: FlowGridData;
  connections?: FlowGridConnections;
  cellBorderData?: CellBorderData;
};

type ResourceConfig = {
  icon: React.ReactNode;
  color: string;
  bgColor: string;
};

// Cell border styling data structure with both CSS and Tailwind examples
const cellBorderStyles: CellBorderData = {
  borders: [
    // // CSS Style approach - Create a square border
    // { row: 10, col: 8, borderTop: "2px solid black" },
    //  { row: 1, col: 1, borderTop: "2px solid black" },
    //  { row: 1, col: 1, borderLeft: "2px solid black" },
    //  { row: 1, col: 1, borderBottom: "2px solid red" },

    // { row: 12, col: 11, borderTop: "2px solid black" },
    // { row: 11, col: 8, borderBottom: "2px solid black" },
    // { row: 11, col: 9, borderBottom: "2px solid black" },
    // { row: 10, col: 8, borderLeft: "2px solid black" },
    // { row: 11, col: 8, borderLeft: "2px solid black" },
    // { row: 10, col: 9, borderRight: "2px solid black" },
    // { row: 11, col: 9, borderRight: "2px solid black" },

    // // Mixed approach - L-shape with different methods
    // { row: 7, col: 3, borderTop: "2px solid green" },
    // { row: 7, col: 4, borderTop: "2px solid green" },
    // { row: 7, col: 5, borderTop: "2px solid green" },
  ],
};

// Helper function to get border styles and classes for a specific cell
const getCellBorderStyleAndClasses = (
  row: number,
  col: number,
  cellBorderData?: CellBorderData
) => {
  if (!cellBorderData || !cellBorderData.borders)
    return { style: {}, classes: [] };

  const cellBorders = cellBorderData.borders.filter(
    (border) => border.row === row && border.col === col
  );

  const style: React.CSSProperties = {};
  const classes: string[] = [];

  cellBorders.forEach((border) => {
    // Handle CSS styles
    if (border.borderTop) style.borderTop = border.borderTop;
    if (border.borderRight) style.borderRight = border.borderRight;
    if (border.borderBottom) style.borderBottom = border.borderBottom;
    if (border.borderLeft) style.borderLeft = border.borderLeft;
  });

  return { style, classes };
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
    icon: <img src={imgLinks.switch} alt="switch" />,
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
  icon: null,
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

// Modified grid cells component with both CSS and Tailwind border styling
const GridCells = memo<{ cellBorderData?: CellBorderData }>(
  ({ cellBorderData }) => {
    const cells = useMemo(() => {
      const cellArray: React.ReactElement[] = [];

      for (let row = 1; row <= gridSize; row++) {
        for (let col = 1; col <= gridSize; col++) {
          const index = (row - 1) * gridSize + (col - 1);

          // Get custom border styles and classes for this cell
          const { style: customBorderStyle, classes: tailwindClasses } =
            getCellBorderStyleAndClasses(row, col, cellBorderData);

          cellArray.push(
            <div
              key={index}
              className={`border border-gray-100 ${tailwindClasses.join(" ")}`}
              style={{
                width: cellSize,
                height: cellSize,
                ...customBorderStyle, // Apply custom CSS border styles
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
  data,
  connections,
  cellBorderData = cellBorderStyles,
}: FlowGridProps) => {
  const { openModal } = useModal();
  const resources = data?.data || [];
  const allConnections = connections?.connections || [];

  const [visibleConnections, setVisibleConnections] =
    useState<Connection[]>(allConnections);

  useEffect(() => {
    if (resources.length === 0) {
      setVisibleConnections([]);
    } else {
      setVisibleConnections(allConnections);
    }
  }, [resources, allConnections]);

  const sortedConnections = useMemo(
    () =>
      [...allConnections].sort((a, b) => Number(a.serial) - Number(b.serial)),
    [allConnections]
  );

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
    if (resources.length === 0) return;

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
                  The current user does not have the required permissions to
                  perform this action. Please ensure that the IAM role or policy
                  attached includes the necessary access rights.
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
              </div>
            </div>
          </div>
        ),
      });
    },
    [openModal]
  );

  const resourceNodes = useMemo(
    () =>
      resources.map((resource) => {
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
      }),
    [resources, handleInfoClick]
  );

  return (
    <div className="w-full">
      <div className="overflow-x-auto overflow-y-hidden">
        <div className="relative min-w-fit" style={gridStyle}>
          <GridCells cellBorderData={cellBorderData} />
          {resources.length > 0 && resourceNodes}
          {resources.length > 0 && (
            <ArrowsComponent connections={visibleConnections} />
          )}
        </div>
      </div>

      {resources.length > 0 && (
        <div className="mt-4 text-center">
          <Button
            label="Simulate"
            onClick={animateConnections}
            prefixIcon={<Play className="size-4" />}
          />
        </div>
      )}
    </div>
  );
};
