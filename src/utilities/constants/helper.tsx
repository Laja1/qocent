import type { VPC } from "@/types";

export const RowsToRender = (vpcData: VPC): string => {
  const vpcSubnet = vpcData.subnet;

  if (vpcSubnet.length > 4) {
    return "grid grid-cols-1 lg:grid-cols-2";
  }

  const totalResourcesDeployed = vpcSubnet.reduce(
    (acc, subnet) => acc + subnet.resourcesDeployed.length,
    0
  );

  if (vpcSubnet.length <= 4 && totalResourcesDeployed > 8) {
    return "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4";
  }

  if (vpcSubnet.length <= 3 && totalResourcesDeployed <= 8) {
    return "flex flex-row";
  }

  return "grid grid-cols-1 md:grid-cols-2";
};

export const deployedToRender = (resourcesDeployed:number) => {
  const vpcSubnet = resourcesDeployed;
  // const totalResourcesDeployed = vpcSubnet.reduce(
  //     (acc, subnet) => acc + subnet.resourcesDeployed.length,
  //     0
  // );
  if (vpcSubnet > 4) {
    return "flex flex-wrap";
  }
  return "flex";
};
