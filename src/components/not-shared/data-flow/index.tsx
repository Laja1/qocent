import React, { useState, useEffect, type JSX } from "react";
import {  Globe, Database,  Code, Shield, User } from "lucide-react";

// Type definitions
interface DataFlowItem {
  id: string;
  resourceType: ResourceType;
  connectedTo?: string[];
}

type ResourceType = "User" | "Proxy" | "S3" | "IGW" | "API";

interface SimpleArrowProps {
  start: string;
  end: string;
  containerRef: React.RefObject<HTMLDivElement>;
}

// Mock data
const dataFlowData: DataFlowItem[] = [
  { id: "server-1", resourceType: "User", connectedTo: ["proxy-1"] },
  { id: "proxy-1", resourceType: "Proxy", connectedTo: ["s3-1"] },
  { id: "r53-1", resourceType: "API", connectedTo: ["proxy-1"] },

  { id: "s3-1", resourceType: "S3" },
  { id: "igw-1", resourceType: "IGW", connectedTo: ["s3-1"] },
  { id: "api-1", resourceType: "API", connectedTo: ["s3-1"] },
  { id: "r53-1", resourceType: "API", connectedTo: ["s3-1"] },
  { id: "r53-2", resourceType: "API", connectedTo: ["s3-1"] },
  { id: "r53-9", resourceType: "API", connectedTo: ["s3-1"] },
  { id: "r53-10", resourceType: "API", connectedTo: ["s3-1"] },
  { id: "r53-3", resourceType: "API", connectedTo: ["s3-1"] },
  { id: "r53-4", resourceType: "API", connectedTo: ["s3-1"] },
  { id: "r53-5", resourceType: "API", connectedTo: ["s3-1"] },
  { id: "r53-6", resourceType: "IGW", connectedTo: ["s3-1"] },
];

// Icon mapping with proper typing
const ICON_MAP: Record<ResourceType, JSX.Element> = {
  "User": <User className="w-5 h-5" />,
  "Proxy": <Shield className="w-5 h-5" />,
  "S3": <Database className="w-5 h-5" />,
  "IGW": <Globe className="w-5 h-5" />,
  "API": <Code className="w-5 h-5" />,
};

// Simple arrow component using CSS
const SimpleArrow: React.FC<SimpleArrowProps> = ({ start, end, containerRef }) => {
  const [arrowStyle, setArrowStyle] = useState<React.CSSProperties>({});

  useEffect(() => {
    if (!containerRef.current) return;

    const updateArrow = () => {
      const startElement = document.getElementById(`box-${start}`);
      const endElement = document.getElementById(`box-${end}`);
      const container = containerRef.current;

      if (!startElement || !endElement || !container) return;

      const containerRect = container.getBoundingClientRect();
      const startRect = startElement.getBoundingClientRect();
      const endRect = endElement.getBoundingClientRect();

      // Calculate positions relative to container
      const startX = startRect.left - containerRect.left + startRect.width / 2;
      const startY = startRect.top - containerRect.top + startRect.height / 2;
      const endX = endRect.left - containerRect.left + endRect.width / 2;
      const endY = endRect.top - containerRect.top + endRect.height / 2;

      // Calculate line properties
      const deltaX = endX - startX;
      const deltaY = endY - startY;
      const length = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      const angle = (Math.atan2(deltaY, deltaX) * 180) / Math.PI;

      setArrowStyle({
        position: "absolute",
        left: startX,
        top: startY,
        width: length,
        height: "2px",
        backgroundColor: "#000",
        transformOrigin: "0 50%",
        transform: `rotate(${angle}deg)`,
        zIndex: 1,
        pointerEvents: "none",
      });
    };

    updateArrow();

    const handleResize = () => {
      setTimeout(updateArrow, 100);
    };

    window.addEventListener("resize", handleResize);
    const timeoutId = setTimeout(updateArrow, 100);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timeoutId);
    };
  }, [start, end, containerRef]);

  return <div style={arrowStyle} />;
};

export const DataFlow: React.FC = () => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Group items by type for better organization
  // const groupedItems = dataFlowData.reduce((acc, item) => {
  //   if (!acc[item.resourceType]) {
  //     acc[item.resourceType] = [];
  //   }
  //   acc[item.resourceType].push(item);
  //   return acc;
  // }, {});

  return (
    <div className="w-full p-4">
      <div
        ref={containerRef}
        className={`
          relative w-full min-h-[400px] 
          ${isMobile ? "min-h-[600px]" : "min-h-[500px]"}
        `}
      >
        {/* Main layout container */}
        <div
          className={`
          relative w-full h-full
          ${
            isMobile
              ? "flex flex-col items-center gap-6"
              : "grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 items-start justify-items-center"
          }
        `}
        >
          {/* Render items */}
          {dataFlowData.map((item, ) => {
            const id = `box-${item.id}`;

            return (
              <div
                key={item.id}
                className={`
                  relative flex flex-col items-center
                  ${isMobile ? "w-full max-w-xs" : "w-full max-w-[100px]"}
                `}
                style={{
                  // For non-mobile, use CSS Grid positioning
                  gridColumn: !isMobile ? "auto" : undefined,
                  zIndex: 10,
                }}
              >
                <div
                  id={id}
                  className={`
                    bg-white border-2 border-gray-300 rounded-lg shadow-md 
                    px-2 py-3 flex items-center gap-3
                    hover:shadow-lg transition-shadow duration-200
                    ${
                      isMobile
                        ? "w-full justify-center"
                        : "w-full min-w-[100px]"
                    }
                  `}
                >
                  {ICON_MAP[item.resourceType] ? (
                    <span className="text-purple-600 flex-shrink-0">
                      {ICON_MAP[item.resourceType]}
                    </span>
                  ) : (
                    <span className="text-red-500 flex-shrink-0">⚠️</span>
                  )}
                  <span
                    className={`
                    font-medium text-gray-700
                    ${isMobile ? "text-xs" : "text-xs lg:text-[10px]"}
                  `}
                  >
                    {item.resourceType}
                  </span>
                </div>

                {/* Item ID label for debugging */}
                <span className="text-[8px] text-gray-400 mt-1">{item.id}</span>
              </div>
            );
          })}
        </div>

        {/* Arrows - only render on larger screens */}
        {!isMobile &&
          dataFlowData.flatMap((item) => {
            if (!item.connectedTo) return [];
            return item.connectedTo.map((targetId) => (
              <SimpleArrow
                key={`${item.id}-${targetId}`}
                start={item.id}
                end={targetId}
                containerRef={containerRef as React.RefObject<HTMLDivElement>}
              />
            ));
          })}

        {/* Mobile connection list */}
        {isMobile && (
          <div className="mt-8 w-full max-w-md mx-auto">
            <h3 className="text-xs font-semibold mb-2 text-center">
              Connections
            </h3>
            <div className="space-y-2">
              {dataFlowData
                .filter(
                  (item) => item.connectedTo && item.connectedTo.length > 0
                )
                .map((item) => (
                  <div key={item.id} className="bg-gray-50 rounded-lg p-2">
                    <div className="text-xs font-medium text-gray-700 mb-1">
                      {item.id} ({item.resourceType})
                    </div>
                    <div className="text-xs text-gray-500">
                      → {item.connectedTo!.join(", ")}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};