/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/shared";
import { useModal } from "@/components/shared/modal";
import type { ServerRoom } from "@/models/response/siteResponse";
import { RESOURCE_MAP } from "@/utilities/constants/icons";
import { Globe, Lock } from "lucide-react";

interface SubnetLevelProps {
  serverRoom: ServerRoom;
  id: string;
}

export const SubnetLevel = ({ serverRoom, id }: SubnetLevelProps) => {
  const { openModal, closeModal } = useModal();

  const handleOpen = (resource: any) =>
    openModal({
      id: `resource-${resource.id}`,
      content: () => (
        <>
          <div className="text-lg font-bold">{resource.name || "Resource Detail"}</div>
          <p className="text-sm text-muted-foreground">Resource Code: {resource.resourceCode}</p>

          <div className="flex gap-4 mt-4">
            <Button onClick={closeModal} label="Close" />
          </div>
        </>
      ),
    });

  const isPublic = serverRoom.serverRoom.toLowerCase() === "public";

  const containerClass = isPublic
    ? "border-red-600 bg-red-50"
    : "border-purple-600 bg-purple-50";

  const icon = isPublic ? (
    <Globe className="size-4 text-green-700" />
  ) : (
    <Lock className="size-4 text-purple-700" />
  );

  const layoutClass =
    serverRoom.resourcesDeployed.length > 2 ? "grid grid-cols-2" : "flex flex-row";

  return (
    <div className="gap-2 flex flex-col">
      <div
        id={id}
        className={`border-2 ${containerClass} gap-4 rounded-sm w-full items-center justify-center`}
      >
        <p className="items-center text-[10px] flex p-1 gap-1">
          <span>{icon}</span>
          <span className="lg:flex md:flex hidden">Server Room {serverRoom.id}</span>
        </p>

        <div className={`w-full items-center ${layoutClass} justify-center lg:gap-4`}>
          {serverRoom.resourcesDeployed.map((resource) => (
            <div
              key={resource.id}
              onClick={() => handleOpen(resource)}
              className="text-center hover:cursor-pointer"
            >
              {RESOURCE_MAP[resource.name as keyof typeof RESOURCE_MAP] ?? (
                <span className="text-red-500 text-xs">No icon</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
