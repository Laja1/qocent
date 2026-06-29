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
import type { SiteData } from "@/models/response/siteResponse";
import { InviteToWorkspaceSchema } from "@/utilities/schema/workspaceSchema";
import { showCustomToast } from "../toast";
import { ErrorHandler } from "@/service/httpClient/errorHandler";
import { useEffect } from "react";
import type { Account } from "@/models/response/organizationResponse";
import { useInitiateInviteAccountMutation } from "@/service/cloudServericesApi";
import { SelectField } from "../selectfield";

export const InviteToWorkspace = NiceModal.create<Account>(({ account_provider }) => {
  const [inviteToWorkspace, { isLoading }] = useInitiateInviteAccountMutation();
  const modal = useModal("InviteToWorkspace");
  const values = modal.args as unknown as SiteData;

  const handleSubmit = async (formValues: { recipient_identifier: string; role: string }) => {
    try {
      const res = await inviteToWorkspace({
        body: { member_identifier: formValues.recipient_identifier },
        csp: account_provider,
      }).unwrap();

      showCustomToast(res?.message ?? "Invite sent successfully", {
        toastOptions: { type: "success", autoClose: 5000 },
      });
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
          <DialogTitle>Invite to Workspace</DialogTitle>
          <DialogDescription>
            Invite team member to {values.siteName}
          </DialogDescription>
        </DialogHeader>

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
              label="Invite To Workspace"
              disabled={!formik.isValid || isLoading}
            />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
});
