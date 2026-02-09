import { svgLinks } from "@/assets/assetLink";
import Xarrow from "react-xarrows";
import { SubnetLevel } from "./subnet-level";
import type { houses } from "@/models/response/siteResponse";

export const VpcLevel = ({ vpcDeployed }: { vpcDeployed: houses[] }) => {
  if (!vpcDeployed || vpcDeployed.length === 0) {
    return (
      <div className="w-full">
        <p className="text-center text-gray-500">No VPC data available</p>
      </div>
    );
  }

  return (
    <div className="relative w-full">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 w-full">
        {vpcDeployed.map((item) => {
          const layoutClass =
            item.rooms?.length > 1 ? "grid grid-cols-3" : "grid grid-cols-2";

          return (
            <div key={item.houseCode} className="relative">
              <div className="border flex flex-col relative pb-5 rounded-sm border-red-500 px-5 mx-3 gap-10">
                <div className={`${layoutClass} w-full`}>
                  {/* Left Subnets */}
                  <div className="flex flex-col pt-10 w-full gap-3">
                    {item.rooms
                      ?.filter((_, index) => index % 2 === 0)
                      .map((subnet, index) => (
                        <SubnetLevel
                          key={`left-${item.houseCode}-${subnet.roomCode}-${index}`}
                          serverRoom={subnet}
                          id={`subnet-${item.houseCode}-left-${subnet.roomCode}-${index}`}
                        />
                      ))}
                  </div>

                  {/* Center IGW + DG */}
                  <div className="flex flex-col items-center gap-6">
                    <div
                      id={`igw-${item.houseCode}`}
                      className="flex items-center justify-center min-w-[50px] min-h-[50px]"
                    >
                      <div className="rounded-full p-2 flex flex-col items-center justify-center">
                        <img src={svgLinks.igw} className="size-7" />
                        <p className="text-xs text-black">
                          IGW
                        </p>
                      </div>
                    </div>

                    <div
                      id={`dg-${item.houseCode}`}
                      className="flex items-center justify-center min-w-[60px] min-h-[60px]"
                    >
                      <div className="px-3 flex flex-col items-center text-xs">
                        <img src={svgLinks.router} className="size-8" />
                        <p className="text-black">DG</p>
                      </div>
                    </div>
                  </div>

                  {/* Right Subnets */}
                  <div className="flex flex-col pt-10 w-full gap-3">
                    {item.rooms
                      ?.filter((_, index) => index % 2 === 1)
                      .map((subnet, index) => (
                        <SubnetLevel
                          key={`right-${item.houseCode}-${subnet.roomCode}-${index}`}
                          serverRoom={subnet}
                          id={`subnet-${item.houseCode}-right-${subnet.roomCode}-${index}`}
                        />
                      ))}
                  </div>
                </div>
              </div>

              <p className="text-center text-black text-xs mt-2">
                {item.houseCode}
              </p>

              {/* IGW → DG Arrow */}
              <Xarrow
                start={`igw-${item.houseCode}`}
                end={`dg-${item.houseCode}`}
                color="green"
                strokeWidth={2}
                showHead={false}
                path="smooth"
                startAnchor="bottom"
                endAnchor="top"
                dashness={{ strokeLen: 2, nonStrokeLen: 5, animation: 1 }}
              />

              {/* Left Subnets → DG */}
              {item.rooms
                ?.filter((_, index) => index % 2 === 0)
                .map((subnet, index) => (
                  <Xarrow
                    key={`arrow-left-${item.houseCode}-${subnet.roomCode}-${index}`}
                    start={`subnet-${item.houseCode}-left-${subnet.roomCode}-${index}`}
                    end={`dg-${item.houseCode}`}
                    color="purple"
                    strokeWidth={1.5}
                    showHead={false}
                    path="smooth"
                    startAnchor="right"
                    endAnchor="left"
                    dashness={{ strokeLen: 2, nonStrokeLen: 5, animation: 1 }}
                  />
                ))}

              {/* Right Subnets → DG */}
              {item.rooms
                ?.filter((_, index) => index % 2 === 1)
                .map((subnet, index) => (
                  <Xarrow
                    key={`arrow-right-${item.houseCode}-${subnet.roomCode}-${index}`}
                    start={`subnet-${item.houseCode}-right-${subnet.roomCode}-${index}`}
                    end={`dg-${item.houseCode}`}
                    color="purple"
                    strokeWidth={1.5}
                    showHead={false}
                    path="smooth"
                    startAnchor="left"
                    endAnchor="right"
                    dashness={{ strokeLen: 2, nonStrokeLen: 5, animation: 1 }}
                  />
                ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};
