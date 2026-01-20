import NiceModal from "@ebay/nice-modal-react";
import { DrawerModal } from "./drawer";
import { AddPaymentMethodSheet } from "./paymentsheet";
import { WorkspaceModal } from "./workspace-modal";
import { InviteToWorkspace } from "./invite-to-workspace";
import { AccessDrawer } from "./access-drawer";
import { BookDemoModal } from "./book-demo-modal";
import { DeploymentDialog } from "./deplyment-modal";
import { ApplyForCertificate } from "./apply-for-certificate";
import { DeleteSiteModal } from "./delete-site-modal";
import { DeleteHouseModal } from "./delete-house-modal";
import { DeleteRoomModal } from "./delete-room-modal";
import { DeleteResourceModal } from "./delete-resource-modal";
import { SelectSiteModal } from "./select-site-modal";
import { EditAccessModal } from "./edit-access";
import { ServiceModal } from "./servicemodal";
import { SubscriptionModal } from "./subscription-modal";
import { InviteSiteModal } from "./join-site-modal";

export const ModalConstant = {
    DrawerModal: "DrawerModal",
    SubscriptionModal:"SubscriptionModal",
    PaymentSheet:'PaymentSheet',
    WorkspaceModal:"WorkspaceModal",
    InviteToWorkspace:"InviteToWorkspace",
    AccessDrawer:'AccessDrawer',
    InviteSiteModal:'InviteSiteModal',
    BookDemoModal:'BookDemoModal',
    DeploymentDialog:'DeploymentDialog',
    ApplyForCertificate:'ApplyForCertificate'   ,
    DeleteSiteModal:'DeleteSiteModal',
    DeleteHouseModal:'DeleteHouseModal',
    DeleteRoomModal:'DeleteRoomModal',
    DeleteResourceModal:'DeleteResourceModal',
    SelectSiteModal:'SelectSiteModal',
    EditAccessModal:'EditAccessModal',
    ServiceModal:'ServiceModal'
  };

const registerSheets = {
    [ModalConstant.DrawerModal]: DrawerModal,
    [ModalConstant.PaymentSheet]:AddPaymentMethodSheet,
    [ModalConstant.WorkspaceModal]:WorkspaceModal,
    [ModalConstant.InviteToWorkspace]:InviteToWorkspace,
    [ModalConstant.AccessDrawer]:AccessDrawer,
    [ModalConstant.InviteSiteModal]:InviteSiteModal,
    [ModalConstant.BookDemoModal]:BookDemoModal,
    [ModalConstant.ServiceModal]:ServiceModal,
    [ModalConstant.DeploymentDialog]:DeploymentDialog,
    [ModalConstant.ApplyForCertificate]:ApplyForCertificate,
    [ModalConstant.DeleteSiteModal]:DeleteSiteModal,
    [ModalConstant.DeleteHouseModal]:DeleteHouseModal,
    [ModalConstant.DeleteRoomModal]:DeleteRoomModal,
    [ModalConstant.DeleteResourceModal]:DeleteResourceModal,
    [ModalConstant.SelectSiteModal]:SelectSiteModal,
    [ModalConstant.EditAccessModal]:EditAccessModal,
    [ModalConstant.SubscriptionModal]:SubscriptionModal
}

Object.entries(registerSheets).forEach(([sheetId, SheetComponent]) => {
    NiceModal.register(sheetId, SheetComponent);
})

export {};

