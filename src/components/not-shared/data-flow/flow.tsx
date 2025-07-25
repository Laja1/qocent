import Xarrow from "react-xarrows";
import {
  Database,
  Network,
  Server,
  Router,
  Globe,
  Shield,
  Zap,
  CircleCheck,
  CircleX,
} from "lucide-react";
import { useModal } from "@/components/shared/modal";

const cellSize = 50;

const FlowData = {
  resources: [
    { id: 1, resourceType: "IGW", row: 1, column: 7, connection: true },
    {
      id: 2,
      resourceType: "Router",
      row: 4,
      column: 7,
      connection: false,
      message: "You are running a bad archietecture",
    },
    { id: 3, resourceType: "LB", row: 6, column: 7 },
    { id: 4, resourceType: "Subnet1", row: 8, column: 4 },
    {
      id: 5,
      resourceType: "Subnet2",
      row: 8,
      column: 10,
      connection: false,
      message: "You are running a bad archietecture",
    },
    { id: 6, resourceType: "Server1", row: 10, column: 3 },
    { id: 7, resourceType: "Server2", row: 10, column: 1 },
    { id: 8, resourceType: "Database", row: 10, column: 9 },
    { id: 9, resourceType: "API", row: 10, column: 15 },
    { id: 9, resourceType: "API", row: 9, column: 15 },
  ],
  connections: [
    { from: 1, to: 2 },
    { from: 2, to: 3 },
    { from: 3, to: 4 },
    { from: 3, to: 5 },
    { from: 4, to: 6 },
    { from: 4, to: 7 },
    { from: 5, to: 8 },
    { from: 5, to: 9 },
  ],
  totalRow: 12,
  totalColumns: 14,
};

const RESOURCE_ICON_MAP = {
  IGW: {
    icon: <Globe className="w-6 h-6" />,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
  },
  Router: {
    icon: <Router className="w-6 h-6" />,
    color: "text-green-600",
    bgColor: "bg-green-100",
  },
  LB: {
    icon: <Shield className="w-6 h-6" />,
    color: "text-purple-600",
    bgColor: "bg-purple-100",
  },
  Subnet1: {
    icon: <Network className="w-6 h-6" />,
    color: "text-orange-600",
    bgColor: "bg-orange-100",
  },
  Subnet2: {
    icon: <Network className="w-6 h-6" />,
    color: "text-orange-600",
    bgColor: "bg-orange-100",
  },
  Server1: {
    icon: <Server className="w-6 h-6" />,
    color: "text-red-600",
    bgColor: "bg-red-100",
  },
  Server2: {
    icon: <Server className="w-6 h-6" />,
    color: "text-red-600",
    bgColor: "bg-red-100",
  },
  Database: {
    icon: <Database className="w-6 h-6" />,
    color: "text-indigo-600",
    bgColor: "bg-indigo-100",
  },
  API: {
    icon: <Zap className="w-6 h-6" />,
    color: "text-yellow-600",
    bgColor: "bg-yellow-100",
  },
};

export default function FlowGrid() {
  const { openModal } = useModal();

  return (
    <div
      className="relative"
      style={{
        width: `${FlowData.totalColumns * cellSize}px`,
        height: `${FlowData.totalRow * cellSize}px`,
        display: "grid",
        gridTemplateColumns: `repeat(${FlowData.totalColumns}, ${cellSize}px)`,
        gridTemplateRows: `repeat(${FlowData.totalRow}, ${cellSize}px)`,
        border: "1px solid white",
      }}
    >
      {/* Grid Cells */}
      {Array.from({ length: FlowData.totalColumns * FlowData.totalRow }).map(
        (_, i) => (
          <div
            key={i}
            className="border border-gray-100"
            style={{ width: cellSize, height: cellSize }}
          />
        )
      )}

      {/* Resource Nodes */}
      {FlowData.resources.map((res) => {
        const config = RESOURCE_ICON_MAP[
          res.resourceType as keyof typeof RESOURCE_ICON_MAP
        ] || {
          icon: null,
          color: "text-gray-600",
          bgColor: "bg-gray-100",
        };

        const showBadge = res.connection !== undefined;
        const isError = res.connection === false;
        const hasMessage = !!res.message;

        return (
          <div
            key={`${res.id}-${res.row}-${res.column}`}
            id={`node-${res.id}`}
            className={`absolute flex flex-col items-center justify-center text-[10px] border border-white rounded-sm p-1 ${config.bgColor} ${config.color}`}
            style={{
              top: (res.row - 1) * cellSize,
              left: (res.column - 1) * cellSize,
              width: cellSize,
              height: cellSize,
            }}
          >
            {/* Badge */}
            {showBadge && (
              <button
                className={`absolute -top-0 -right-2 px-1 text-[9px] font-semibold rounded-full `}
                onClick={() => {
                  if (hasMessage) {
                    openModal({
                      id: `modal-${res.id}`,
                      content: () => (
                        <div className="text-sm max-w-xs text-center">
                          <p className="font-medium mb-1">{res.resourceType}</p>
                          <p>{res.message}</p>
                        </div>
                      ),
                    });
                  }
                }}
              >
                {isError ? (
                  <CircleX className="size-4 text-red-600" />
                ) : (
                  <CircleCheck className="size-4 text-green-600" />
                )}
              </button>
            )}

            {config.icon}
            <span className="text-center">{res.resourceType}</span>
          </div>
        );
      })}

      {/* Arrows */}
      {FlowData.connections.map((link, i) => (
        <Xarrow
          key={i}
          start={`node-${link.from}`}
          end={`node-${link.to}`}
          strokeWidth={2}
          color="green"
          showHead={true}
          path="smooth"
          dashness={{ strokeLen: 2, nonStrokeLen: 5, animation: 1 }}
        />
      ))}
    </div>
  );
}
