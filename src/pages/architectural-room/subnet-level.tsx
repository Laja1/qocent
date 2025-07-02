import { RESOURCE_MAP } from "@/utilities/constants/icons";

type Resource = {
  id: number;
  name: string;
  instanceType: string;
  status: string;
};

type Subnet = {
  id: number;
  subnet: string;
  availabilityZone: string;
  resourcesDeployed: Resource[];
  routeTable: string;
  securityGroups: string[];
};

export type SubnetSectionProps = {
  subnet: Subnet;
  subnetId: string; // Add this prop for unique identification
};



export const SubnetLevel = ({ subnet, subnetId }: SubnetSectionProps) => {
  const isPublic = subnet.subnet.toLowerCase() === "public";
  console.log(isPublic);
  const containerClass = isPublic 
    ? "border-red-600 bg-red-50" 
    : "border-purple-600 bg-purple-50";

    const layoutClass = subnet.resourcesDeployed.length > 2 ? "grid grid-cols-2" : "flex flex-row";


  return (
    <div className="gap-2 flex flex-col">
      <div 
        id={subnetId} 
        className={`border ${containerClass} gap-4 rounded-sm   w-full items-center justify-center`}
      >
        <p className="items-center text-[10px] p-1">Server Room {subnet.id}</p>
        <div className={`w-full items-center ${layoutClass} justify-center gap-4`}>
          {subnet.resourcesDeployed.map((resource) => (
            <div key={resource.id} className="text-center">
              {RESOURCE_MAP[resource.name as keyof typeof RESOURCE_MAP] ?? <span className="text-red-500">Unknown</span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};