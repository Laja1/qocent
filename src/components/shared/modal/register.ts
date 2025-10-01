import NiceModal from "@ebay/nice-modal-react";
import { DrawerModal } from "./drawer";
import { AddPaymentMethodSheet } from "./paymentsheet";
import { WorkspaceModal } from "./workspace-modal";
import { InviteToWorkspace } from "./invite-to-workspace";
import { AccessDrawer } from "./access-drawer";
import { BookDemoModal } from "./book-demo-modal";
import { DeploymentDialog } from "./deplyment-modal";
import { ApplyForCertificate } from "./apply-for-certificate";

export const ModalConstant = {
    DrawerModal: "DrawerModal",
    PaymentSheet:'PaymentSheet',
    WorkspaceModal:"WorkspaceModal",
    InviteToWorkspace:"InviteToWorkspace",
    AccessDrawer:'AccessDrawer',
    BookDemoModal:'BookDemoModal',
    DeploymentDialog:'DeploymentDialog',
    ApplyForCertificate:'ApplyForCertificate'
  };

const registerSheets = {
    [ModalConstant.DrawerModal]: DrawerModal,
    [ModalConstant.PaymentSheet]:AddPaymentMethodSheet,
    [ModalConstant.WorkspaceModal]:WorkspaceModal,
    [ModalConstant.InviteToWorkspace]:InviteToWorkspace,
    [ModalConstant.AccessDrawer]:AccessDrawer,
    [ModalConstant.BookDemoModal]:BookDemoModal,
    [ModalConstant.DeploymentDialog]:DeploymentDialog,
    [ModalConstant.ApplyForCertificate]:ApplyForCertificate
}

Object.entries(registerSheets).forEach(([sheetId, SheetComponent]) => {
    NiceModal.register(sheetId, SheetComponent);
})

export {};

