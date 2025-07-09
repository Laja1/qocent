import {Cloud, User2Icon } from "lucide-react";
import { VpcLevel } from "./vpc-level";
import { AwsLogo, HuaweiLogo, RESOURCE_MAP } from "@/utilities/constants/icons";
export type Resource = {
  id: number;
  name: string;
  instanceType: string;
  status: string;
};

export type Subnet = {
  id: number;
  subnet: string;
  availabilityZone: string;
  resourcesDeployed: Resource[];
  routeTable: string;
  securityGroups: string[];
};

export type VPC = {
  vpcId: string;
  houseName: string;
  cidrBlock: string;
  id?: number; 
  subnet: Subnet[];
};

export type ExtraResource = {
  id: number;
  name: string;
  type: string;
  status: string;
  createdAt: string;
  owner: string;
};

export type SitesDataProps = {
  noOfVPCDeployed: number;
  whereDeployed: string;
  parentId: string;
  parent: string;
  vpcDeployed: VPC[];
  extraResources: {
    resources: ExtraResource[];
  };
};

export const SiteLevel = ({ sitesData }: { sitesData: SitesDataProps }) => {


  // const openArchitecture = () => {
  //   openModal({
  //     id: `architecture`,
  //     content: (
  //       <div>
  //         {/* <SiteLevel /> */}

  //         <Button label="X" onClick={() => closeModal()} />
  //       </div>
  //     ),
  //   });
  // };

  return (
    <div className="w-full flex ">
      <div
        className="w-1/6 justify-center items-center relative flex
       border-dashed border  border-gray-400 bg-gray-100 
      "
      >
        <Cloud className="text-gray-600 items-start justify-start absolute top-2 left-2 flex " />

        <div className="flex flex-col text-center">
          <User2Icon className="size-10 " />
          <p className="text-xs">user</p>
        </div>
      </div>
      <div className="w-5/6 flex relative border border-dashed border-purple-800 w-full  bg-green-50">
        <div className="w-1/7 flex pb-2">
          <p className="text-black text-start text-base pl-2 mb-2   pt-2 font-bold">
            {sitesData?.whereDeployed === "AWS" && <AwsLogo />}
            {sitesData?.whereDeployed === "Huawei" && <HuaweiLogo />}
          </p>
          <div className="grid grid-cols-3 items-end gap-3  mt-10">
            {sitesData.extraResources.resources.map((item) => (
              <div key={item.id}>
                {RESOURCE_MAP[item.name as keyof typeof RESOURCE_MAP] ?? (
                  <span className="text-red-500">?</span>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="w-6/7 flex ">
          <div className="mt-6 w-full pb-5">
            <VpcLevel vpcDeployed={sitesData.vpcDeployed}/>
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
