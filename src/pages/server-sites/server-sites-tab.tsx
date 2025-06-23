import { imgLinks } from "@/assets/assetLink";
import { FlexibleTabs } from "@/components/shared";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export interface ServerSite {
    siteId: string;
    siteName: string;
    siteCode: string;
    houses: number;
    createdAt: string;
    status: "Active" | "Suspended"; 
    provider: "AWS" | "Huawei"; 
    bill: number;
    balance: number;
  }
  
export type ServerSitesTabProps = {
    serverSite?: ServerSite;
  };

  export const ServerSitesTab: React.FC<ServerSitesTabProps> = ({ serverSite }) => {
    const tabs = [
        { label: "Site Details", value: "site-details" },
        { label: "Site View", value: "site-view" },
      ];
    
  return (
    <div><div className="m-5 ">
    <Card className="w-full bg-gradient-to-tl from-bg-[#edf2ef] to-[#649c7b] text-black">
      <div className="px-5 ">
        <h1 className="font-bold text-2xl text-center">
          {serverSite?.siteName} ({serverSite?.siteCode})
        </h1>
        <FlexibleTabs tabs={tabs} defaultValue="site-details">
          {(value) => {
            switch (value) {
              case "site-details":
                return (
                  <div>
                    <div className="space-y-1"></div>
                    <Separator className="my-4" />
                    <div className="space-y-4 text-sm">
                      {[
                        { label: "Site ID", value: serverSite?.siteId },
                        { label: "Site Name", value: serverSite?.siteName },
                        { label: "Site Houses", value: serverSite?.houses },
                        {
                          label: "Date Created",
                          value: serverSite?.createdAt,
                        },
                       
                        
                        {
                          label: "Status",
                          value:  <Badge
                          variant="outline"
                          className={
                            serverSite?.status === "Active"
                              ? "bg-green-50 text-green-700 text-[10px] border-green-200"
                              : "bg-red-50 text-red-700 text-[10px] border-red-200"
                          }
                        >
                          {serverSite?.status}
                        </Badge>
                        },
                        {
                          label: "Provider",
                          value: <span className="text-end justify-end flex">
                          {serverSite?.provider === "AWS" ? (
                            <img src={imgLinks.awsdark} className="size-5" alt="AWS" />
                          ) : (
                            <img src={imgLinks.huawei} className="size-5" alt="Huawei" />
                          )}
                        </span>
                        },
                        {
                          label: "Total Bill",
                          value: `$${serverSite?.bill.toLocaleString(
                            "en-US",
                            { minimumFractionDigits: 2 }
                          )}`,
                        },
                        {
                          label: "Total Balance",
                          value: `$${serverSite?.balance.toLocaleString(
                            "en-US",
                            { minimumFractionDigits: 2 }
                          )}`,
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
              case "site-view":
                return <div>Analytics dashboard here</div>;
            }
          }}
        </FlexibleTabs>
      </div>
    </Card>
  </div></div>
  )
}
