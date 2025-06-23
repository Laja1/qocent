import { imgLinks } from "@/assets/assetLink";
import { FlexibleTabs } from "@/components/shared";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { HouseData } from "./type";




interface ServerHousesTabProps {
  serverHouse: HouseData;
}

export const ServerHousesTab: React.FC<ServerHousesTabProps> = ({
  serverHouse,
}) => {
  const tabs = [
    { label: "House Details", value: "house-details" },
    { label: "House View", value: "house-view" },
  ];

  return (
    <div>
      <div className="m-5 ">
      <Card className="w-full bg-gradient-to-tl from-bg-[#edf2ef] to-[#649c7b] text-black">
          <div className="px-5 ">
            <h1 className="font-bold text-2xl text-center">
              {serverHouse?.houseName} ({serverHouse?.houseCode})
            </h1>
            <FlexibleTabs tabs={tabs} defaultValue="house-details">
              {(value) => {
                switch (value) {
                  case "house-details":
                    return (
                      <div>
                        <div className="space-y-1"></div>
                        <Separator className="my-4" />
                        <div className="space-y-4 text-sm">
                          {[
                            { label: "House ID", value: serverHouse?.houseId },
                            { label: "House Name", value: serverHouse?.houseName },
                            { label: "Server Rooms", value: serverHouse?.rooms },
                            {
                              label: "Date Created",
                              value: serverHouse?.createdAt,
                            },
                            { label: "IP Range", value: serverHouse?.ipRange },
                            {
                              label: "Status",
                              value: (
                                <Badge
                                  variant="outline"
                                  className={
                                    serverHouse?.status === "Active"
                                      ? "bg-green-50 text-green-700 text-[10px] border-green-200"
                                      : "bg-red-50 text-red-700 text-[10px] border-red-200"
                                  }
                                >
                                  {serverHouse?.status}
                                </Badge>
                              ),
                            },
                            {
                              label: "Provider",
                              value: (
                                <span className="text-end justify-end flex">
                                  {serverHouse?.provider === "AWS" ? (
                                    <img
                                      src={imgLinks.awsdark}
                                      className="size-5"
                                      alt="AWS"
                                    />
                                  ) : (
                                    <img
                                      src={imgLinks.huawei}
                                      className="size-5"
                                      alt="Huawei"
                                    />
                                  )}
                                </span>
                              ),
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
                                <div className="w-40 text-end">
                                  {item.value}
                                </div>
                              </div>
                              <Separator className="mt-2 h-4" />
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  case "house-view":
                    return <div>Analytics dashboard here</div>;
                }
              }}
            </FlexibleTabs>
          </div>
        </Card>
      </div>
    </div>
  );
};
