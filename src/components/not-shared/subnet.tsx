import { ICON_MAP } from "@/utilities/constants/icons";
import { Globe, Lock } from "lucide-react";
type Resource = {
  id: number;
  name: keyof typeof ICON_MAP;
};

type Subnet = {
  id: number;
  subnet: "Public" | "Private";
  availabilityZone: string;
  resourcesDeployed: Resource[];
};

type SubnetSectionProps = {
  subnet: Subnet;
};
export const SubnetSection = ({ subnet }: SubnetSectionProps) => {
  const isPublic = subnet.subnet.toLowerCase() === "public";

  const containerClass = isPublic ? " border-[#A17246]" : " border-blue-300";
  const icon = isPublic ? (
    <Globe className="h-6 w-6 text-green-600 mx-auto mb-1" />
  ) : (
    <Lock className="h-6 w-6 text-purple-600 mx-auto mb-1" />
  );

  return (
    <div className={`rounded-xl  border p-2 mb-6 shadow-sm ${containerClass}`}>
      <div className="flex items-start">{icon}</div>

      <div className="flex flex-wrap  items-center justify-center gap-4">
        {subnet.resourcesDeployed.map((resource) => (
          <div key={resource.id}>
            {ICON_MAP[resource.name] ?? (
              <span className="text-red-500">Unknown</span>
            )}
          </div>
        ))}
      </div>
      <div>
        <p className="text-xs text-white text-center">
          {subnet.availabilityZone}
        </p>
      </div>
    </div>
  );
};
