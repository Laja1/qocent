import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { create, useModal } from "@ebay/nice-modal-react";
import { ModalConstant } from "./register";

export const SubscriptionModal = create(() => {
  const modal = useModal(ModalConstant.SubscriptionModal);

  return (
    <Dialog open={modal.visible} onOpenChange={(open) => !open && modal.hide()}>
      <DialogContent className="sm:max-w-[420px]">
        <DialogHeader className="space-y-2">
          <DialogTitle className="text-base font-semibold">
            Access Required
          </DialogTitle>
          <p className="text-sm dark:text-gray-300 text-gray-700">
            You haven’t subscribed to Qocent FinOps or added your cloud Access &
            Secret keys yet.
          </p>
        </DialogHeader>

        <div className="text-sm dark:text-gray-300 text-gray-700 space-y-2">
          <p>To start tracking and optimizing your cloud costs, you need to:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Subscribe to Qocent FinOps</li>
            <li>Add your cloud Access & Secret keys</li>
          </ul>
        </div>

        <DialogFooter className="mt-4">
          <Button
            className="w-full"
            onClick={() => {
              modal.hide();
              // navigate to subscription / setup screen
            }}
          >
            Set Up FinOps Access
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
});
