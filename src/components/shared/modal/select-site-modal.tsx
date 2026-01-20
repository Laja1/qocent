/* eslint-disable @typescript-eslint/no-explicit-any */
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { ModalConstant } from "./register";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import { type RootState } from "@/store";
import { Loader2 } from "lucide-react";
import { useGetUserAccountsByProviderQuery } from "@/service/python/organizationApi";
import type { Account } from "@/models/response/organizationResponse";

export const SelectSiteModal = NiceModal.create(() => {
  const modal = useModal(ModalConstant.SelectSiteModal);
  const dashboard = useSelector((state: RootState) => state.dashboard);

  const { data: organizationAccount, isLoading: isSiteLoading } =
    useGetUserAccountsByProviderQuery({
      provider: String(dashboard?.provider) || "",
    });
  const handleSelect = (site: Account) => {
    modal.hide();
    NiceModal.show(ModalConstant.AccessDrawer, { site: site });
  };

  return (
    <Drawer open={modal.visible} onOpenChange={(open) => !open && modal.hide()}>
      <DrawerContent>
        <div className="mx-auto w-full max-w-md">
          <DrawerHeader>
            <DrawerTitle>Select a Site</DrawerTitle>
          </DrawerHeader>

          <div className="px-6 pb-6 space-y-4">
            {isSiteLoading ? (
              <div className="flex justify-center items-center py-6">
                <Loader2 className="animate-spin w-6 h-6 text-gray-600" />
              </div>
            ) : (
              organizationAccount?.data?.accounts.map((site: Account) => (
                <Button
                  key={site.account_id}
                  className="w-full  "
                  onClick={() => handleSelect(site)}
                >
                  {site.account_name}
                </Button>
              ))
            )}
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
});
