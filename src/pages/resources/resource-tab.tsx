import { imgLinks } from "@/assets/assetLink";
import { FlexibleTabs } from "@/components/shared";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import type { resourceType } from "./type";


interface ServerResourceTabProps {
  resource?: resourceType;
}

  export const ResourceTab: React.FC<ServerResourceTabProps> = ({ resource }) => {
    const tabs = [
        { label: "Resource Details", value: "room-details" },
        { label: "Resource View", value: "room-view" },
      ];
    
  return (
    <div><div className="m-5 ">
    
      <div className="px-5 ">
        <h1 className="font-bold text-2xl mb-2 text-left">
          {resource?.resourceName} ({resource?.roomCode})
        </h1>
        <FlexibleTabs tabs={tabs} defaultValue="room-details">
          {(value) => {
            switch (value) {
              case "room-details":
                return (
                  <div className="w-[300px] lg:w-[400px]">
                    <div className="space-y-1"></div>
                    <Separator className="my-4" />
                    <div className="space-y-4 text-sm">
                      {[
                        { label: "Resource ID", value: resource?.resourceId },
                        { label: "Resource Name", value: resource?.resourceName },
                        { label: "IP Range", value: resource?.ipRange },
                        {
                          label: "Date Created",
                          value: resource?.createdAt,
                        },
                       
                        
                        {
                          label: "Type",
                          value:  <Badge
                          variant="outline"
                          className={
                            resource?.type === "Database"
                              ? "bg-green-50 text-green-700 text-[10px] border-green-200"
                              : "bg-red-50 text-red-700 text-[10px] border-red-200"
                          }
                        >
                          {resource?.type}
                        </Badge>
                        },
                        {
                          label: "Provider",
                          value: <span className="text-end justify-end flex">
                          {resource?.provider === "AWS" ? (
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
