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
import { useGetSiteByProviderQuery } from "@/service/kotlin/siteApi"; // hypothetical endpoint
import { useSelector } from "react-redux";
import { type RootState } from "@/store";
import { Loader2 } from "lucide-react";
import type { SiteData } from "@/models/response/siteResponse";

export const SelectSiteModal = NiceModal.create(() => {
  const modal = useModal(ModalConstant.SelectSiteModal);
  const dashboard = useSelector((state: RootState) => state.dashboard);
  const account = useSelector((state: RootState) => state.account);

  const { data: siteData, isLoading: isSiteLoading } =
    useGetSiteByProviderQuery(
      {
        provider: dashboard.provider,
        siteAccountId: account.accountCode || "",
        type: account.type,
      },
      {
        skip: !account.accountCode || !dashboard.provider,
      }
    );
  const handleSelect = (site: SiteData) => {
    modal.hide();
    NiceModal.show(ModalConstant.AccessDrawer, { site: site }); // open next step
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
              siteData?.data?.map((site: any) => (
                <Button
                  key={site.siteId}
                  className="w-full  "
                  onClick={() => handleSelect(site)}
                >
                  {site.siteName}
                </Button>
              ))
            )}
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
});
