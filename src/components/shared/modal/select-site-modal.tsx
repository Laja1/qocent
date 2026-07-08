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
import { useGetMyAccountsQuery } from "@/service/accountsApi";
import type { AccountResponse } from "@/models/response/accountResponse";

export const SelectSiteModal = NiceModal.create(() => {
  const modal = useModal(ModalConstant.SelectSiteModal);
  const dashboard = useSelector((state: RootState) => state.dashboard);

  const { data: accountsResponse, isLoading: isSiteLoading } =
    useGetMyAccountsQuery({
      provider: String(dashboard?.provider) || undefined,
    });

  const accounts = accountsResponse?.data ?? [];

  const handleSelect = (site: AccountResponse) => {
    modal.hide();
    NiceModal.show(ModalConstant.AccessDrawer, { site: site });
  };

  return (
    <Drawer open={modal.visible} onOpenChange={() => modal.hide()}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Select a site</DrawerTitle>
        </DrawerHeader>
        <div className="p-4 space-y-2">
          {isSiteLoading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="animate-spin" />
            </div>
          ) : accounts.length === 0 ? (
            <p className="text-sm text-muted-foreground">No sites found.</p>
          ) : (
            accounts.map((site) => (
              <Button
                key={site.account_id}
                variant="outline"
                className="w-full justify-start"
                onClick={() => handleSelect(site)}
              >
                {site.account_name}
              </Button>
            ))
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
});
