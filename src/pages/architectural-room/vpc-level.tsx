import { svgLinks } from "@/assets/assetLink";
import Xarrow from "react-xarrows";
import { SubnetLevel } from "./subnet-level";
import type { VPC } from "./site-level";

export const VpcLevel =   ({ vpcDeployed }: { vpcDeployed: VPC[] }) => {
  return (
    <div className="w-full">
     

      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-10 w-full">
        {vpcDeployed.map((item) => {
          const layoutClass = item.subnet.length > 1 ? "grid grid-cols-3" : "grid grid-cols-2";

          return (
            <div key={item.vpcId} className="relative">
              <div className="border flex flex-col relative pb-5 rounded-sm border-green-700 px-5  mx-3 gap-10">
                
                  <div
                    id={`igw-${item.vpcId}`}
                    className="absolute -top-5 left-0 translate-y-1/2 -translate-x-1/2 flex items-center justify-center"
                  >
                    <div className="rounded-full px-3 h-[50px] w-fit flex flex-col items-center justify-center">
                      <img src={svgLinks.igw} className="size-7" />
                      <p className="text-xs">IGW</p>
                    </div>
                  </div>

                <div className={`${layoutClass} w-full `}>
                  {/* Left Subnets */}
                  <div className="flex flex-col pt-10 w-full gap-2">
                    {item.subnet
                      .filter((_, index) => index % 2 === 0)
                      .map((subnet, index) => (
                        <SubnetLevel
                          key={`${item.vpcId}-subnet-left-${subnet.id}-${index}`}
                          subnet={subnet}
                          subnetId={`subnet-${item.vpcId}-left-${subnet.id}-${index}`}
                        />
                      ))}
                  </div>

                  {/* Center DG */}
                  <div className="flex flex-col top-5 mt-[4px] items-center">
                    <div id={`dg-${item.vpcId}`} className="justify-center flex items-center">
                      <div className="rounded-sm px-4  w-fit flex items-center justify-center">
                        <div className="flex flex-col items-center text-xs">
                          <img src={svgLinks.router} className="size-8 " />
                          <p>DG</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Subnets */}
                  <div className="flex flex-col pt-10 w-full gap-2">
                    {item.subnet
                      .filter((_, index) => index % 2 === 1)
                      .map((subnet, index) => (
                        <SubnetLevel
                          key={`${item.vpcId}-subnet-right-${subnet.id}-${index}`}
                          subnet={subnet}
                          subnetId={`subnet-${item.vpcId}-right-${subnet.id}-${index}`}
                        />
                      ))}
                  </div>
                </div>
              </div>

              <p className="text-center text-xs mt-2">{item.houseName}</p>

              {/* IGW to DG Arrow */}
              <Xarrow
                start={`igw-${item.vpcId}`}
                end={`dg-${item.vpcId}`}
                color="green"
                strokeWidth={2}
                showHead={false}
                showTail={false}
                path="smooth"
                dashness={{ strokeLen: 2, nonStrokeLen: 5, animation: 1 }}
              />

              {/* Left Subnets to DG Arrows */}
              {item.subnet
                .filter((_, index) => index % 2 === 0)
                .map((subnet, index) => (
                  <Xarrow
                    key={`arrow-left-${item.vpcId}-${subnet.id}-${index}`}
                    start={`subnet-${item.vpcId}-left-${subnet.id}-${index}`}
                    end={`dg-${item.vpcId}`}
                    color="purple"
                    strokeWidth={1.5}
                    showHead={false}
                    showTail={false}
                    path="smooth"
                    dashness={{ strokeLen: 2, nonStrokeLen: 5, animation: 1 }}
                  />
                ))}

              {/* Right Subnets to DG Arrows */}
              {item.subnet
                .filter((_, index) => index % 2 === 1)
                .map((subnet, index) => (
                  <Xarrow
                    key={`arrow-right-${item.vpcId}-${subnet.id}-${index}`}
                    start={`subnet-${item.vpcId}-right-${subnet.id}-${index}`}
                    end={`dg-${item.vpcId}`}
                    color="purple"
                    strokeWidth={1.5}
                    showHead={false}
                    showTail={false}
                    path="smooth"
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