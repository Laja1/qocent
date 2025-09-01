import { VpcLevel } from "./vpc-level";
import {
  AwsLogo,
  HuaweiLogo,
  useResourceMap,
} from "@/utilities/constants/icons";
import type { SiteArchitecture } from "@/models/response/siteResponse";

export const SiteLevel = ({ sitesData }: { sitesData: SiteArchitecture }) => {
  const RESOURCE_MAP = useResourceMap();
  console.log(sitesData);
  return (
    <div className="w-full flex ">
      <div
        className="w-1/8 justify-center rounded-l-sm items-center relative flex
       border-dashed bg-red-50 dark:bg-red-950/20 
      "
      >
        <div className="text-gray-600 dark:text-gray-300 items-start justify-start absolute top-2 left-2 flex ">
          {sitesData?.siteProvider.toLocaleLowerCase() === "aws" && <AwsLogo />}
          {sitesData?.siteProvider.toLocaleLowerCase() === "huawei" && (
            <HuaweiLogo />
          )}
        </div>

        <div className="flex flex-col text-center items-center">
          <span className={RESOURCE_MAP.User.color}>
            {RESOURCE_MAP.User.icon}
          </span>
          <p className="text-xs capitalize text-black dark:text-white">user</p>
        </div>
      </div>
      <div className="w-7/8 flex relative border border-dashed border-red-600 dark:border-red-400 bg-red-50 dark:bg-red-950/20">
        <div className="w-1/7 flex pb-2">
          <div className="grid grid-cols-3 items-end gap-3  mt-10">
            {sitesData.extraResources.resources.map((item) => (
              <div key={item.resourceId}>
                {item.resourceType &&
                RESOURCE_MAP[item.resourceType as keyof typeof RESOURCE_MAP] ? (
                  RESOURCE_MAP[item.resourceType as keyof typeof RESOURCE_MAP]
                    .icon
                ) : (
                  <span className="text-red-500 dark:text-red-400">?</span>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="w-6/7 flex ">
          <div className="mt-6 w-full pb-5">
            <VpcLevel vpcDeployed={sitesData.config.houses} />
          </div>
        </div>

        {/* <div className="items-end flex m-2">
          <Maximize2
            onClick={() => openArchitecture()}
            className="size-4 hover:cursor-pointer"
          />
        </div> */}
      </div>
    </div>
  );
};
