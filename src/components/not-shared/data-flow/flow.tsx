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
const totalCells = gridSize * gridSize;

// Memoized resource icon map to prevent recreation on each render
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

const defaultConfig = {
  icon: null,
  color: "text-gray-600",
  bgColor: "bg-gray-100",
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

type FlowGridProps = {
  data: { data: ResourceNode[] };
  connections: { connections: Connection[] };
};

// Memoized ResourceNode component to prevent unnecessary re-renders
const ResourceNodeComponent = memo(
  ({
    resource,
    config,
    onInfoClick,
  }: {
    resource: ResourceNode;
    config: any;
    onInfoClick: (resource: ResourceNode) => void;
  }) => {
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
  }
);

ResourceNodeComponent.displayName = "ResourceNodeComponent";

// Memoized grid cells component
const GridCells = memo(() => {
  const cells = useMemo(
    () =>
      Array.from({ length: totalCells }).map((_, i) => (
        <div
          key={i}
          className="border border-gray-100"
          style={{ width: cellSize, height: cellSize }}
        />
      )),
    []
  );

  return <>{cells}</>;
});

GridCells.displayName = "GridCells";

// Memoized arrows component
const ArrowsComponent = memo(
  ({ connections }: { connections: Connection[] }) => {
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

export const FlowGrid = ({ data, connections }: FlowGridProps) => {
  const { openModal } = useModal();
  const resources = data.data;
  const allConnections = connections.connections;

  const [visibleConnections, setVisibleConnections] =
    useState<Connection[]>(allConnections);

  // Clear connections when data is empty
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
    () => ({
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
    // Don't animate if there's no data
    if (resources.length === 0) return;

    setVisibleConnections([]); // Clear existing arrows first

    let i = 0;

    // Add a small delay before starting
    setTimeout(() => {
      const interval = setInterval(() => {
        if (i < sortedConnections.length) {
          const connectionToAdd = sortedConnections[i];

          setVisibleConnections((prev) => {
            const newConnections = [...prev, connectionToAdd];
            return newConnections;
          });

          i++;
        } else {
          clearInterval(interval);
        }
      }, 1000);
    }, 100); // 100ms delay before starting
  }, [sortedConnections, resources.length]);

  // Memoize modal content creation function
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

  // Memoize resource nodes to prevent unnecessary re-renders
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
      {/* Container with horizontal scroll for mobile */}
      <div className="overflow-x-auto overflow-y-hidden">
        <div className="relative min-w-fit" style={gridStyle}>
          {/* Grid cells */}
          <GridCells />

          {/* Nodes - only render if data exists */}
          {resources.length > 0 && resourceNodes}

          {/* Arrows - only render if data exists */}
          {resources.length > 0 && (
            <ArrowsComponent connections={visibleConnections} />
          )}
        </div>
      </div>

      {/* Animate Button - only show if there's data */}
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
