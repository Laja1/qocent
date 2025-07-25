import NiceModal from "@ebay/nice-modal-react";
import { DrawerModal } from "../drawer";

export const ModalConstant = {
    DrawerModal: "DrawerModal",
  };

const registerSheets = {
    [ModalConstant.DrawerModal]: DrawerModal,
}

Object.entries(registerSheets).forEach(([sheetId, SheetComponent]) => {
    NiceModal.register(sheetId, SheetComponent);
})

export {};

