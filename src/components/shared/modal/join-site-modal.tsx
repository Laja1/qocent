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
import { showCustomToast } from "../toast";
import { ErrorHandler } from "@/service/httpClient/errorHandler";
import { useEffect, useState } from "react";
import { ModalConstant } from "./register";
import {
  useCompleteInviteAccountMutation,
  useInitiateInviteAccountMutation,
} from "@/service/python/cloudServericesApi";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import type { InviteAccountPayload } from "@/models/request/cloudService";
import { inviteSiteSchema } from "@/utilities/schema/resourceSchema";

export const InviteSiteModal = NiceModal.create(() => {
  const modal = useModal(ModalConstant.InviteSiteModal);
  const dashboard = useSelector((state: RootState) => state.dashboard);

  const [activeStep, setActiveStep] = useState<1 | 2>(1);
  const [handshake, setHandshake] = useState("");

  const [inviteToWorkspace, { isLoading }] = useInitiateInviteAccountMutation();

  const [completeHandshake, { isLoading: isCompletedLoading }] =
    useCompleteInviteAccountMutation();

  const handleSubmit = async (formValues: InviteAccountPayload) => {
    try {
      const res = await inviteToWorkspace({
        body: { member_identifier: formValues.member_identifier },
        csp: dashboard?.provider,
      }).unwrap();

      setHandshake(res.handshake_id);
      setActiveStep(2);

      showCustomToast(res?.message ?? "Invite sent successfully", {
        toastOptions: { type: "success", autoClose: 3000 },
      });
    } catch (error: any) {
      showCustomToast(ErrorHandler.extractMessage(error), {
        toastOptions: { type: "error" },
      });
    }
  };

  /* ---------------- STEP 2: COMPLETE ---------------- */
  const handleCompleteHandshake = async () => {
    try {
      const res = await completeHandshake({
        body: { handshake_id: handshake },
        csp: dashboard?.provider,
      }).unwrap();

      showCustomToast(res?.message ?? "Cloud account connected", {
        toastOptions: { type: "success", autoClose: 3000 },
      });

      // reset everything
      modal.hide();
      setActiveStep(1);
      setHandshake("");
      formik.resetForm();
    } catch (error: any) {
      showCustomToast(ErrorHandler.extractMessage(error), {
        toastOptions: { type: "error" },
      });
    }
  };

  const formik = useFormik<InviteAccountPayload>({
    initialValues: {
      member_identifier: "",
    },
    validationSchema: inviteSiteSchema,
    onSubmit: handleSubmit,
  });

  useEffect(() => {
    formik.validateForm();
  }, []);

  return (
    <Dialog
      open={modal.visible}
      onOpenChange={(open) => {
        if (!open && activeStep === 1) modal.hide();
      }}
    >
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Add Cloud Account</DialogTitle>
          <DialogDescription>
            {activeStep === 1
              ? `Invite a ${dashboard?.provider} cloud account to start tracking costs.`
              : `Accept the invite in your ${dashboard?.provider} console to complete setup.`}
          </DialogDescription>

          <p className="text-xs text-muted-foreground mt-1">
            Step {activeStep} of 2
          </p>
        </DialogHeader>

        {activeStep === 1 && (
          <form onSubmit={formik.handleSubmit}>
            <div className="grid gap-4 pb-4">
              <Textfield
                label="Cloud Account ID"
                name="member_identifier"
                formik={formik}
                prefixIcon={<Mail size={16} />}
                placeholder={`Enter ${dashboard?.provider?.toUpperCase()} account ID`}
                error={
                  formik.touched.member_identifier &&
                  formik.errors.member_identifier
                    ? formik.errors.member_identifier
                    : ""
                }
              />
            </div>

            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" label="Cancel" />
              </DialogClose>

              <Button
                type="submit"
                label="Send Invite"
                disabled={!formik.isValid || isLoading}
              />
            </DialogFooter>
          </form>
        )}

        {activeStep === 2 && (
          <>
            <div className="space-y-3 text-sm text-muted-foreground">
              <p>An invitation has been sent to the cloud account.</p>
              <p>
                Please log in to your <b>{dashboard?.provider}</b> console and
                accept the invite.
              </p>
              <p>
                Once done, click <b>Complete Setup</b> below.
              </p>
            </div>

            <DialogFooter>
              <Button
                intent="secondary"
                label="Back"
                onClick={() => setActiveStep(1)}
              />
              <Button
                label="Complete Setup"
                onClick={handleCompleteHandshake}
                disabled={isCompletedLoading}
              />
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
});
