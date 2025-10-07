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
import { showCustomToast } from "../toast";
import { ErrorHandler } from "@/service/httpClient/errorHandler";
import { useDeleteRoomMutation } from "@/service/kotlin/roomApi";
import type { roomData } from "@/models/response/roomResponse";

export const DeleteRoomModal = create<roomData>(() => {
  const modal = useModal(ModalConstant.DeleteRoomModal);
  const row = modal.args;
  const [deleteRoom, { isLoading: isDeleting }] = useDeleteRoomMutation();

  const handleDelete = async () => {
    if (isDeleting) return;
    try {
      const res = await deleteRoom({ roomId: Number(row?.roomId) }).unwrap();
      modal.hide();
      showCustomToast(res.responseMessage, {
        toastOptions: { type: "success", autoClose: 5000 },
      });
    } catch (error) {
      const message = ErrorHandler.extractMessage(error);
      showCustomToast(message, {
        toastOptions: { type: "error", autoClose: 5000 },
      });
    }
  };

  return (
    <Dialog
      open={modal.visible}
      onOpenChange={(open) => !isDeleting && !open && modal.hide()}
    >
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle className="text-base">
            {`Delete Room ${row?.roomCode ?? ""}`}
          </DialogTitle>
          <p className="text-xs my-1">
            Are you sure you want to delete this room?
          </p>
        </DialogHeader>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleDelete();
          }}
        >
          {/* Footer actions */}
          <DialogFooter>
            <Button type="submit" variant="destructive" disabled={isDeleting}>
              {isDeleting ? "Deleting..." : "Delete Room"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
});
