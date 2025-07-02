import { svgLinks } from "@/assets/assetLink";
import Xarrow from "react-xarrows";
import { AwsLogo, HuaweiLogo } from "@/utilities/constants/icons";
import { SubnetLevel } from "./subnet-level";
import { sitesData } from "@/utilities/constants/config";

export const VpcLevel = () => {
  return (
    <div>
      <p className="text-black text-start text-base pl-2 mb-2  pt-2 font-bold">
        {sitesData?.whereDeployed === "AWS" && <AwsLogo />}
        {sitesData?.whereDeployed === "Huawei" && <HuaweiLogo />}
      </p>

      <div className="grid grid-cols-2 gap-10">
        {sitesData?.vpcDeployed.map((item) => {
          const layoutClass = item.subnet.length > 1 ? "grid grid-cols-3" : "grid grid-cols-2";

          return (
            <div key={item.vpcId} className="relative">
              <div className="border flex flex-col relative p-10 rounded-sm border-green-700 px-5 py-3 mx-10 gap-10">
                {/* IGW */}
                <div
                  id={`igw-${item.vpcId}`}
                  className="absolute -top-5 left-1/2 -translate-x-1/2 flex items-center justify-center"
                >
                  <div className="rounded-full px-3 h-[50px] w-fit flex flex-col items-center justify-center">
                    <img src={svgLinks.igw} className="size-7" />
                    <p className="text-xs">IGW</p>
                  </div>
                </div>

                <div className={`${layoutClass} w-full mt-5`}>
                  {/* Left Subnets */}
                  <div className="flex flex-col w-full gap-2">
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
                  <div className="flex flex-col items-center justify-center w-full gap-10">
                    <div id={`dg-${item.vpcId}`} className="justify-center flex items-center">
                      <div className="rounded-sm px-4 py-2 w-fit flex items-center justify-center">
                        <div className="flex flex-col items-center text-xs">
                          <img src={svgLinks.router} className="size-8" />
                          <p>DG</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Subnets */}
                  <div className="flex flex-col w-full gap-2">
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

              <p className="text-center mt-2">{item.houseName}</p>

              {/* IGW to DG connection */}
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
            </div>
          );
        })}
      </div>
    </div>
  );
};
