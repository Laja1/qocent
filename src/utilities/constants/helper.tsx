import { vpcData } from "./config";
export const RowsToRender = () => {
    // If there's only one VPC, return 1
    if (vpcData.length === 1) return 1;
  
    // If there are exactly 2 VPCs
    if (vpcData.length === 2) {
      // Count total subnets across both VPCs
      const totalSubnets = vpcData.reduce((acc, item) => acc + item.numberOfSubnets, 0);
  
      // Count total resources deployed across both VPCs
      const totalResources = vpcData.reduce((acc, item) => {
        return acc + item.subnet.reduce((subnetAcc, subnet) => subnetAcc + subnet.resourcesDeployed.length, 0);
      }, 0);
  
      // If the total subnets exceed 6 or resources exceed 8, return 1
      if (totalSubnets > 6 || totalResources > 8) {
        return 1;
      }
  
      // If neither of the above conditions are true, return 2
      return 2;
    }
  
    // If there are more than 2 VPCs, return 1
    if (vpcData.length > 2) return 1;
  
    return 2; // Default return 1
  };
  
  

  