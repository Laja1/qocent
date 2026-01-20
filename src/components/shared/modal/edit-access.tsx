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
import { useFormik } from "formik";
import { showCustomToast } from "../toast";
import { ErrorHandler } from "@/service/httpClient/errorHandler";
import { useEffect } from "react";
import { ModalConstant } from "./register";
import { useUpdateAccountMembershipMutation } from "@/service/python/accountsApi";
import { SelectField } from "../selectfield";
import type { Account } from "@/models/response/organizationResponse";
import type { AccountMemberResponse } from "@/models/response/accountResponse";
import type { AccountMembershipPayload } from "@/models/request/accountRequest";

type editAccessProps = {
  site: Account;
  member: AccountMemberResponse;
};
export const EditAccessModal = NiceModal.create<editAccessProps>(
  ({ site, member }) => {
    const [updateMember, { isLoading }] = useUpdateAccountMembershipMutation();

    const modal = useModal(ModalConstant.EditAccessModal);

    const handleSubmit = async (formValues: AccountMembershipPayload) => {
      try {
        const requestData = {
          body: {
            account_member_id: formValues.account_member_id,
            member_type: formValues.member_type,
          },
          account_id: site?.account_id,
        };

        const res = await updateMember(requestData).unwrap();

        showCustomToast(res.message, {
          toastOptions: { type: "success", autoClose: 5000 },
        });
        modal.hide();
        formik.resetForm();
      } catch (error: any) {
        console.error("Update Member Error:", error);
        const message = ErrorHandler.extractMessage(error);
        showCustomToast(message, {
          toastOptions: { type: "error", autoClose: 5000 },
        });
      }
    };

    const formik = useFormik({
      initialValues: {
        account_member_id: member.account_id,
        member_type: site.member_type,
      },
      onSubmit: handleSubmit,
      enableReinitialize: true,
    });

    useEffect(() => {
      formik.validateForm();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
      <Dialog
        open={modal.visible}
        onOpenChange={() => {
          modal.hide();
          formik.resetForm();
        }}
      >
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Access</DialogTitle>
            <DialogDescription>
              Edit privileges for {member.user_first_name}{" "}
              {member.user_last_name} in {site.account_name}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={formik.handleSubmit}>
            <div className="grid gap-4 pb-4">
              <SelectField
                label="Role"
                name="member_type"
                formik={formik}
                options={[
                  { label: "Member", value: "Member" },
                  { label: "Viewer", value: "Viewer" },
                ]}
                placeholder="Select role"
              />
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
                label="Update Access"
                disabled={!formik.isValid || isLoading}
              />
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    );
  }
);
