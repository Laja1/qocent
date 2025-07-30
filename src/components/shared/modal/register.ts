import NiceModal from "@ebay/nice-modal-react";
import { DrawerModal } from "./drawer";
import { AddPaymentMethodSheet } from "./paymentsheet";

export const ModalConstant = {
    DrawerModal: "DrawerModal",
    PaymentSheet:'PaymentSheet'
  };

const registerSheets = {
    [ModalConstant.DrawerModal]: DrawerModal,
    [ModalConstant.PaymentSheet]:AddPaymentMethodSheet
}

Object.entries(registerSheets).forEach(([sheetId, SheetComponent]) => {
    NiceModal.register(sheetId, SheetComponent);
})

export {};

