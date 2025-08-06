/* eslint-disable @typescript-eslint/no-explicit-any */
// workspace-modal.tsx
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
import type { AccountData } from "@/models/response/siteResponse";
import { InviteToWorkspaceSchema } from "@/utilities/schema/workspaceSchema";
import { showCustomToast } from "../toast";
import { ErrorHandler } from "@/service/httpClient/errorHandler";
import { useInviteToWorkspaceMutation } from "@/service/kotlin/authApi";
import type { invitationRequest } from "@/models/request/authRequest";
import { useEffect } from "react";

export const InviteToWorkspace = NiceModal.create(() => {
  const [inviteToWorkspace, { isLoading }] = useInviteToWorkspaceMutation();
  const modal = useModal("InviteToWorkspace");
  const values = modal.args as AccountData;

  const handleSubmit = async (values: invitationRequest) => {
    try {
      const res = await inviteToWorkspace(values).unwrap();
      console.log(res, "creating");

      showCustomToast(res.responseMessage, {
        toastOptions: { type: "success", autoClose: 5000 },
      });
      modal.hide();
      formik.resetForm();
    } catch (error: any) {
      console.error("Create Resource Error:", error);
      const message = ErrorHandler.extractMessage(error);
      showCustomToast(message, {
        toastOptions: { type: "error", autoClose: 5000 },
      });
    }
  };

  const formik = useFormik<invitationRequest>({
    initialValues: {
      accountCode: values.accountCode,
      inviteeEmail: "",
      inviterUserCode: values.accountUserCode || "",
    },
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validationSchema: InviteToWorkspaceSchema,
  });
  useEffect(() => {
    formik.validateForm();
  }, []);
  console.log(formik.errors);
  return (
    <Dialog open={modal.visible} onOpenChange={() => modal.hide()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Invite to Workspace</DialogTitle>
          <DialogDescription>
            Invite team members to {values.accountName}
          </DialogDescription>
        </DialogHeader>

        <form>
          <div className="grid gap-4 pb-4">
            <div className="w-full items-center gap-4">
              <Textfield
                label="Email Address"
                name="inviteeEmail"
                formik={formik}
                prefixIcon={<Mail size={16} />}
                placeholder="Enter your email"
                error={
                  formik?.touched.inviteeEmail && formik?.errors.inviteeEmail
                    ? formik?.errors.inviteeEmail
                    : ""
                }
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
              onClick={() => formik.handleSubmit()}
            />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
});
