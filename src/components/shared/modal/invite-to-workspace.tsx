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
import {  Mail } from "lucide-react";
import { useFormik } from "formik";
import type { SiteData } from "@/models/response/siteResponse";
import { InviteToWorkspaceSchema } from "@/utilities/schema/workspaceSchema";
import { showCustomToast } from "../toast";
import { ErrorHandler } from "@/service/httpClient/errorHandler";
import { useEffect } from "react";
import type { Account } from "@/models/response/organizationResponse";
import { useCreateInvitationMutation } from "@/service/python/invitationApi";
import type { createInviteRequest } from "@/models/request/inviteRequest";
import { SelectField } from "../selectfield";



export const InviteToWorkspace = NiceModal.create<Account>(({account_id}) => {
  const [inviteToWorkspace, { isLoading }] = useCreateInvitationMutation();
  const modal = useModal("InviteToWorkspace");
  const values = modal.args as unknown as SiteData;
  const handleSubmit = async (formValues: createInviteRequest) => {
    try {
      const requestData = {
        body:{
          recipient_identifier: formValues.recipient_identifier,
          role: formValues.role,
          expires_in_hours: 72
        },
        accountId: account_id,
      };

      const res = await inviteToWorkspace(requestData).unwrap();
      console.log(res, "creating");

      showCustomToast(res.message, {
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

  const formik = useFormik<createInviteRequest>({
    initialValues: {
      recipient_identifier: '',
      role: "",
      expires_in_hours:72
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
                  formik?.touched.recipient_identifier && formik?.errors.recipient_identifier
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
                options={[{label:'Member',value:'Member'},{label:'Viewer',value:'Viewer'}]}
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
              disabled={
                !formik.isValid || isLoading
              }
            />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
});
