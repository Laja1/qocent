import NiceModal from "@ebay/nice-modal-react";
import { ModalConstant } from "@/components/shared/modal/register";

import { Button } from "@/components/shared/button";
import { CardContent } from "@/components/ui/card";
import { Header } from "@/components/shared";
import { Users } from "lucide-react";

export const Access = () => {
  return (
    <div>
      <Header
        title="Access"
        description="Manage team members, roles, and access"
      />

      <div className="m-5 lg:my-5 flex lg:flex-row flex-col gap-5">
        {/* Invite Members Card */}
        {/* <div className="border border-gray-200 rounded-lg max-w-sm hover:shadow-lg transition-shadow duration-300 bg-white">
          <CardContent className="p-6">
            <div className="flex items-start space-x-4 mb-4">
              <div className="h-12 w-12 bg-gradient-to-br bg-black rounded-sm flex items-center justify-center flex-shrink-0 shadow-md">
                <UserPlus className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 text-base mb-1">
                  Invite Members
                </h4>
                <p className="text-sm text-gray-500">Expand your team</p>
              </div>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed mb-5">
              Share access to your cloud resources with your team for better
              collaboration.
            </p>
            <Button
              label="Send Invitations"
              className="w-full text-white font-medium py-2.5 rounded-lg transition-colors duration-200"
            />
          </CardContent>
        </div> */}

        {/* Team Members Card */}
        <div className="border border-gray-200 rounded-xs max-w-sm  transition-shadow duration-300 bg-white">
          <CardContent className="p-6">
            <div className="flex items-start space-x-4 mb-4">
              <div className="h-12 w-12 bg-gradient-to-br bg-black rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
                <Users className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 text-base mb-1">
                  Team Members
                </h4>
                <p className="text-sm text-gray-500">Manage your team</p>
              </div>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed mb-5">
              View and manage all team members with access to your cloud
              resources.
            </p>
            <Button
              label="View All Members"
              onClick={() => {
                NiceModal.show(ModalConstant.SelectSiteModal);
              }}
              className="w-full bg-gray-900 hover:bg-gray-800 text-white font-medium py-2.5 rounded-lg transition-colors duration-200"
            />
          </CardContent>
        </div>
      </div>
    </div>
  );
};
