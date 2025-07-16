import Xarrow from "react-xarrows";
import { dataFlowData } from "@/utilities/constants/config";
import { ICON_MAP } from "@/utilities/constants/icons";

export const DataFlow = () => {
  return (
    <div className="w-full mt-10">
      {/* Mobile Layout - Vertical Stack */}
    

      {/* Desktop Layout - Grid/Positioned */}
      <div className="hidden lg:block">
        <div className="relative min-h-[600px] w-full">
          {/* Create a responsive grid layout for larger screens */}
          <div className="grid grid-cols-1 xl:grid-cols-3 2xl:grid-cols-4 gap-x-20 gap-y-16 place-items-center">
            {dataFlowData.map((item, index) => {
              const id = `box-desktop-${item.id}`;

              return (
                <div
                  key={item.id}
                  className="relative flex flex-col items-center"
                >
                  <div
                    id={id}
                    className="bg-white border rounded shadow px-8 py-4 flex items-center gap-3 min-w-[250px] justify-center hover:shadow-md transition-shadow"
                  >
                    {ICON_MAP[item.resourceType] ? (
                      <span className="text-xl">
                        {ICON_MAP[item.resourceType]}
                      </span>
                    ) : (
                      <span className="text-red-500">Unknown</span>
                    )}
                    <span className="font-medium">{item.resourceType}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Desktop Arrows */}
          {dataFlowData.flatMap((item) => {
            if (!item.connectedTo) return [];

            return item.connectedTo.map((targetId: string) => (
              <Xarrow
                key={`desktop-${item.id}-${targetId}`}
                start={`box-desktop-${item.id}`}
                end={`box-desktop-${targetId}`}
                color="#9810fa"
                strokeWidth={2}
                headSize={6}
                path="smooth"
                curveness={0.3}
              />
            ));
          })}
        </div>
      </div>

      {/* Alternative: Tablet Layout */}
      <div className="hidden md:block lg:hidden">
        <div className="relative min-h-[500px]">
          <div className="grid grid-cols-2 gap-x-16 gap-y-12 place-items-center">
            {dataFlowData.map((item) => {
              const id = `box-tablet-${item.id}`;

              return (
                <div
                  key={item.id}
                  className="relative flex flex-col items-center"
                >
                  <div
                    id={id}
                    className="bg-white border rounded shadow px-6 py-3 flex items-center gap-2 min-w-[220px] justify-center"
                  >
                    {ICON_MAP[item.resourceType] ? (
                      <span className="text-lg">
                        {ICON_MAP[item.resourceType]}
                      </span>
                    ) : (
                      <span className="text-red-500">Unknown</span>
                    )}
                    <span className="text-sm font-medium">
                      {item.resourceType}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Tablet Arrows */}
          {dataFlowData.flatMap((item) => {
            if (!item.connectedTo) return [];

            return item.connectedTo.map((targetId: string) => (
              <Xarrow
                key={`tablet-${item.id}-${targetId}`}
                start={`box-tablet-${item.id}`}
                end={`box-tablet-${targetId}`}
                color="#9810fa"
                strokeWidth={2}
                headSize={6}
                path="smooth"
              />
            ));
          })}
        </div>
      </div>
    </div>
  );
};
