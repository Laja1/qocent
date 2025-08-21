import { svgLinks } from "@/assets/assetLink";
import Xarrow from "react-xarrows";
import { SubnetLevel } from "./subnet-level";
import type { houses } from "@/models/response/siteResponse";

export const HouseVpcLevel = ({ vpcDeployed }: { vpcDeployed: houses }) => {
  const layoutClass =
    vpcDeployed.rooms.length > 1 ? "grid grid-cols-3" : "grid grid-cols-2";

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 gap-10 w-full">
        <div key={vpcDeployed.houseCode} className="relative">
          <div className="border flex flex-col relative p-10 rounded-sm border-green-700 px-5 py-3 mx-3 gap-10">
            <div
              id={`igw-${vpcDeployed.houseCode}`}
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
                {vpcDeployed.rooms
                  .filter((_, index) => index % 2 === 0)
                  .map((subnet, index) => (
                    <SubnetLevel
                      key={`${vpcDeployed.houseCode}-subnet-left-${subnet.roomCode}-${index}`}
                      serverRoom={subnet}
                      id={`subnet-${vpcDeployed.houseCode}-left-${subnet.roomCode}-${index}`}
                    />
                  ))}
              </div>

              {/* Center DG */}
              <div className="flex flex-col items-center justify-center w-full">
                <div
                  id={`dg-${vpcDeployed.houseCode}`}
                  className="justify-center flex items-center"
                >
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
                {vpcDeployed.rooms
                  .filter((_, index) => index % 2 === 1)
                  .map((subnet, index) => (
                    <SubnetLevel
                      key={`${vpcDeployed.houseCode}-subnet-right-${subnet.roomCode}-${index}`}
                      serverRoom={subnet}
                      id={`subnet-${vpcDeployed.houseCode}-right-${subnet.roomCode}-${index}`}
                    />
                  ))}
              </div>
            </div>
          </div>

          <p className="text-center text-xs mt-2">{vpcDeployed.houseCode}</p>

          {/* IGW to DG Arrow */}
          <Xarrow
            start={`igw-${vpcDeployed.houseCode}`}
            end={`dg-${vpcDeployed.houseCode}`}
            color="green"
            strokeWidth={2}
            showHead={false}
            showTail={false}
            path="smooth"
            dashness={{ strokeLen: 2, nonStrokeLen: 5, animation: 1 }}
          />

          {/* Left Subnets to DG Arrows */}
          {vpcDeployed.rooms
            .filter((_, index) => index % 2 === 0)
            .map((subnet, index) => (
              <Xarrow
                key={`arrow-left-${vpcDeployed.houseCode}-${subnet.roomCode}-${index}`}
                start={`subnet-${vpcDeployed.houseCode}-left-${subnet.roomCode}-${index}`}
                end={`dg-${vpcDeployed.houseCode}`}
                color="purple"
                strokeWidth={1.5}
                showHead={false}
                showTail={false}
                path="smooth"
                dashness={{ strokeLen: 2, nonStrokeLen: 5, animation: 1 }}
              />
            ))}

          {/* Right Subnets to DG Arrows */}
          {vpcDeployed.rooms
            .filter((_, index) => index % 2 === 1)
            .map((subnet, index) => (
              <Xarrow
                key={`arrow-right-${vpcDeployed.houseCode}-${subnet.roomCode}-${index}`}
                start={`subnet-${vpcDeployed.houseCode}-right-${subnet.roomCode}-${index}`}
                end={`dg-${vpcDeployed.houseCode}`}
                color="purple"
                strokeWidth={1.5}
                showHead={false}
                showTail={false}
                path="smooth"
                dashness={{ strokeLen: 2, nonStrokeLen: 5, animation: 1 }}
              />
            ))}
        </div>
      </div>
    </div>
  );
};
