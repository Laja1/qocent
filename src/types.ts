type ResourceDeployed = {
    id: number;
    name: string;
    instanceType: string;
    status: 'running' | 'stopped';
  };
  
  type Subnet = {
    id: number;
    subnet: string;
    availabilityZone: string;
    resourcesDeployed: ResourceDeployed[];
    routeTable: string;
    securityGroups: string[];
  };
  
  export type VPC = {
    vpcId: string;
    whereDeployed: string;
    cidrBlock: string;
    id: number;
    numberOfSubnets: number;
    subnet: Subnet[];
  };