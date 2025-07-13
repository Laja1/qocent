import { Button } from "@/components/shared";
import { useModal } from "@/components/shared/modal";
import { RESOURCE_MAP } from "@/utilities/constants/icons";
import { Globe, Lock } from "lucide-react";

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
  subnetId: string;
};

export const SubnetLevel = ({ subnet, subnetId }: SubnetSectionProps) => {
  const { openModal, closeModal } = useModal();

  const handleOpen = (resource: Resource) =>
    openModal({
      id: `resource-${resource.id}`,
      content: () => (
        <>
          <div className="text-lg font-bold">{resource.name}</div>
          <p className="text-sm">
            Instance type: {resource.instanceType} <br />
            Status: {resource.status}
          </p>

          <div className="flex gap-4 mt-4">
            <Button
              onClick={() => {
                closeModal();
              }}
              label="See More"
            />
          </div>
        </>
      ),
    });

  const isPublic = subnet.subnet.toLowerCase() === "public";
  const containerClass = isPublic
    ? "border-red-600 bg-red-50"
    : "border-purple-600 bg-purple-50";

  const icon = isPublic ? (
    <Globe className="size-4 text-green-700" />
  ) : (
    <Lock className="size-4 text-purple-700" />
  );

  const layoutClass =
    subnet.resourcesDeployed.length > 2 ? "grid grid-cols-2" : "flex flex-row";

  return (
    <div className="gap-2 flex flex-col">
      <div
        id={subnetId}
        className={`border-2 ${containerClass} gap-4 rounded-sm w-full items-center justify-center`}
      >
        <p className="items-center text-[10px] flex p-1 gap-1">
          <span>{icon}</span>
          <span className="lg:flex md:flex hidden">
            Server Room {subnet.id}
          </span>
        </p>

        <div
          className={`w-full items-center ${layoutClass} justify-center lg:gap-4`}
        >
          {subnet.resourcesDeployed.map((resource) => (
            <div
              key={resource.id}
              onClick={() => handleOpen(resource)}
              className="text-center hover:cursor-pointer"
            >
              {RESOURCE_MAP[resource.name as keyof typeof RESOURCE_MAP] ?? (
                <span className="text-red-500">No icon</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
