import { imgLinks } from "@/assets/assetLink";
import { FlexibleTabs } from "@/components/shared";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import type { roomType } from "./type";


interface ServerRoomTabProps {
  serverRoom?: roomType;
}

  export const ServerRoomsTab: React.FC<ServerRoomTabProps> = ({ serverRoom }) => {
    const tabs = [
        { label: "Room Details", value: "room-details" },
        { label: "Room View", value: "room-view" },
      ];
    
  return (
    <div><div className="m-5 ">
   
      <div className="px-5 ">
        <h1 className="font-bold text-2xl text-left mb-2">
          {serverRoom?.roomName} ({serverRoom?.roomCode})
        </h1>
        <FlexibleTabs tabs={tabs} defaultValue="room-details">
          {(value) => {
            switch (value) {
              case "room-details":
                return (
                  <div className="w-[300px]  lg:w-[400px]">
                    <div className="space-y-1"></div>
                    <Separator className="my-4" />
                    <div className="space-y-4 text-sm">
                    {[
                        { label: "Room ID", value: serverRoom?.roomId },
                        { label: "Room Name", value: serverRoom?.roomName },
                        { label: "Resources Deployed", value: serverRoom?.resourcesDeployed },
                        { label: "IP Range", value: serverRoom?.ipRange },
                        {
                          label: "Date Created",
                          value: serverRoom?.createdAt,
                        },
                       
                        
                        {
                          label: "Type",
                          value:  <Badge
                          variant="outline"
                          className={
                            serverRoom?.type === "Private"
                              ? "bg-green-50 text-green-700 text-[10px] border-green-200"
                              : "bg-red-50 text-red-700 text-[10px] border-red-200"
                          }
                        >
                          {serverRoom?.type}
                        </Badge>
                        },
                        {
                          label: "Provider",
                          value: <span className="text-end justify-end flex">
                          {serverRoom?.provider === "AWS" ? (
                            <img src={imgLinks.awsdark} className="size-5" alt="AWS" />
                          ) : (
                            <img src={imgLinks.huawei} className="size-5" alt="Huawei" />
                          )}
                        </span>
                        },
                        
                      ].map((item, index) => (
                        <div className="flex flex-col">
                          <div
                            key={index}
                            className="flex items-center  justify-between space-x-4 h-4"
                          >
                            <div className="w-40">{item.label}</div>
                            <Separator
                              orientation="vertical"
                              className=""
                            />
                            <div className="w-40 text-end">{item.value}</div>
                          </div>
                          <Separator className="mt-2 h-4" />
                        </div>
                      ))}
                    </div>
                  </div>
                );
              case "room-view":
                return <div>Analytics dashboard here</div>;
            }
          }}
        </FlexibleTabs>
      </div>
  </div></div>
  )
}
