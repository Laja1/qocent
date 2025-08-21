/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/shared";
import { useModal } from "@/components/shared/modal";
import { Badge } from "@/components/ui/badge";
import type { ServerRoom } from "@/models/response/siteResponse";
import { RESOURCE_MAP } from "@/utilities/constants/icons";
import { getStatusClassName } from "@/utilities/helper";
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
        <div className="p-2  w-full max-w-md">
          {/* Header */}
          <div className="mb-4">
            <h2 className="text-xl font-semibold text-gray-900">
              {resource.name || "Resource Detail"}
            </h2>
            <p className="text-xs text-gray-500">
              Code: {resource.resourceCode}
            </p>
          </div>

          {/* Details */}
          <div className="space-y-3 text-xs">
            <div className="flex justify-between border-b pb-2">
              <span className="text-gray-500">Type</span>
              <span className="font-medium text-gray-800">
                {resource.resourceType}
              </span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="text-gray-500">Bill</span>
              <span className="font-medium text-gray-800">
                {resource.resourceBill}
              </span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="text-gray-500">Created At</span>
              <span className="font-medium text-gray-800">
                {resource.resourceCreatedAt}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Status</span>
              <Badge
            variant="outline"
            className={getStatusClassName(resource.resourceStatus)}
          >
            {resource.resourceStatus}
          </Badge>
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end mt-6">
            <Button onClick={closeModal} label="Close" />
          </div>
        </div>
      ),
    });

  const isPublic = serverRoom.roomStatus.toLowerCase() === "public";

  const containerClass = isPublic
    ? "border-red-600 bg-red-50"
    : "border-purple-600 bg-purple-50";

  const icon = isPublic ? (
    <Globe className="size-4 text-green-700" />
  ) : (
    <Lock className="size-4 text-purple-700" />
  );

  const layoutClass =
    serverRoom.resourcesDeployed && serverRoom.resourcesDeployed.length > 2
      ? "grid grid-cols-3"
      : "flex flex-row";

  return (
    <div className="gap-2 flex flex-col">
      <div
        id={id}
        className={`border-2 ${containerClass} gap-4 rounded-sm w-full items-center justify-center`}
      >
        <p className="items-center text-[10px] flex p-1 gap-1">
          <span>{icon}</span>
          <span className="lg:flex md:flex hidden dark:text-black">{serverRoom.roomCode}</span>
        </p>

        <div
          className={`w-full items-center ${layoutClass} justify-center lg:gap-4`}
        >
          {(serverRoom.resourcesDeployed ?? []).map((resource) => {
            const mappedResource =
              RESOURCE_MAP[resource?.resourceType as keyof typeof RESOURCE_MAP];

            return (
              <div
                key={resource.resourceCode}
                onClick={() => handleOpen(resource)}
                className="text-center pb-1 px-2 hover:cursor-pointer"
              >
                {mappedResource ? (
                  <div className={mappedResource.color}>
                    {mappedResource.icon}
                  </div>
                ) : (
                  <span className="text-red-500 text-xs">No icon</span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
