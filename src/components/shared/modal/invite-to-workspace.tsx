/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { Button } from "../button";
import { Textfield } from "../textfield";
import { Mail } from "lucide-react";
import { useFormik } from "formik";
import { InviteToWorkspaceSchema } from "@/utilities/schema/workspaceSchema";
import { showCustomToast } from "../toast";
import { ErrorHandler } from "@/service/httpClient/errorHandler";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import type { Account } from "@/models/response/organizationResponse";
import type { ProposedRole } from "@/models/response/businessInviteResponse";
import { useInviteUserMutation } from "@/service/businessInviteApi";
import type { RootState } from "@/store";
import { canInviteBusinessUsers } from "@/utilities/contextPermissions";
import { SelectField } from "../selectfield";
import { ModalConstant } from "./register";

const ROLE_MAP: Record<string, ProposedRole> = {
  Member: "MEMBER",
  Viewer: "VIEWER",
};

export const InviteToWorkspace = NiceModal.create<Account>(
  ({ account_name }) => {
  const [inviteUser, { isLoading }] = useInviteUserMutation();
  const modal = useModal(ModalConstant.InviteToWorkspace);
  const activeContext = useSelector(
    (state: RootState) => state.context?.activeContext
  );
  const canInvite = canInviteBusinessUsers(activeContext);

  const handleSubmit = async (formValues: {
    recipient_identifier: string;
    role: string;
  }) => {
    if (!canInvite) {
      showCustomToast(
        "Only business owners can send invitations. Switch to your business workspace as owner.",
        {
          toastOptions: { type: "error", autoClose: 5000 },
        }
      );
      return;
    }

    try {
      const res = await inviteUser({
        user_email: formValues.recipient_identifier.trim(),
        proposed_role: ROLE_MAP[formValues.role] ?? "VIEWER",
      }).unwrap();

      showCustomToast(
        res?.message ?? `Invitation sent to ${formValues.recipient_identifier}`,
        {
        toastOptions: { type: "success", autoClose: 5000 },
        }
      );
      modal.hide();
      formik.resetForm();
    } catch (error: any) {
      const message = ErrorHandler.extractMessage(error);
      showCustomToast(message, {
        toastOptions: { type: "error", autoClose: 5000 },
      });
    }
  };

  const formik = useFormik<{ recipient_identifier: string; role: string }>({
    initialValues: {
      recipient_identifier: "",
      role: "",
    },
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validationSchema: InviteToWorkspaceSchema,
  });

  useEffect(() => {
    formik.validateForm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Dialog open={modal.visible} onOpenChange={() => modal.hide()}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Invite User to Workspace</DialogTitle>
          <DialogDescription>
            As a business owner, invite a registered user to join{" "}
            {activeContext?.display_name ?? account_name}.
          </DialogDescription>
        </DialogHeader>

        {!canInvite && (
          <p className="rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-800">
            Only business owners can send invitations. Users who want to join a
            business should use Request to Join instead.
          </p>
        )}

        <form onSubmit={formik.handleSubmit}>
          <div className="grid gap-4 pb-4">
            <div className="w-full items-center gap-4">
              <Textfield
                label="Email Address"
                name="recipient_identifier"
                formik={formik}
                prefixIcon={<Mail size={16} />}
                placeholder="Enter email address"
                error={
                  formik?.touched.recipient_identifier &&
                  formik?.errors.recipient_identifier
                    ? formik?.errors.recipient_identifier
                    : ""
                }
              />
            </div>
            <div className="w-full items-center gap-4">
              <SelectField
                label="Role"
                name="role"
                formik={formik}
                options={[
                  { label: "Member", value: "Member" },
                  { label: "Viewer", value: "Viewer" },
                ]}
                placeholder="Select role"
              />
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button
                type="button"
                label="Cancel"
                onClick={() => modal.hide()}
              />
            </DialogClose>
            <Button
              type="submit"
              label="Send Invitation"
              disabled={!formik.isValid || isLoading || !canInvite}
            />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
});
