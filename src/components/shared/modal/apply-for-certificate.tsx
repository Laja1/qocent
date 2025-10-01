import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { create, useModal } from "@ebay/nice-modal-react";
import { useFormik } from "formik";
import type { RootState } from "@/store";
import { useSelector } from "react-redux";
import { Textfield2 } from "../textfield2";
import { SelectField } from "../selectfield";
import { deploymentModalSchema } from "@/utilities/schema/resourceSchema";
import { ModalConstant } from "./register";

export const ApplyForCertificate = create(() => {
  const modal = useModal(ModalConstant.ApplyForCertificate);

  const { provider } = useSelector((state: RootState) => state.dashboard);

  // Formik
  const formik = useFormik({
    initialValues: {
      serverPassword: "",
      siteCode: "",
      siteProvider: provider ?? "",
    },
    validationSchema: deploymentModalSchema,
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: () => {},
  });

  return (
    <Dialog open={modal.visible} onOpenChange={modal.hide}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle className="text-base">
            Apply for Private Certificate
          </DialogTitle>
          <p className="text-xs my-1">
            Configure your certificate settings. All fields are required to
            proceed.
          </p>
        </DialogHeader>

        <form onSubmit={formik.handleSubmit}>
          <div className="space-y-6 py-4">
            <div className="space-y-2">
              <Textfield2
                name="issuerId"
                label="Issuer ID"
                placeholder="Enter your issuer ID"
                formik={formik}
                className="w-full"
              />
              <SelectField
                name="distinguishedName"
                formik={formik}
                label="Distinguished Name"
                options={[]}
                placeholder="Select a distinguished name"
              />
              <SelectField
                name="keyAlgorithm"
                formik={formik}
                label="Key Algorithm"
                options={[]}
                placeholder="Select a key algorithm"
              />
              <SelectField
                name="signatureAlgorithm"
                formik={formik}
                label="Signature Algorithm"
                options={[]}
                placeholder="Select a signature algorithm"
              />
              <SelectField
                name="validityPeriod"
                formik={formik}
                label="Validity Period"
                options={[]}
                placeholder="Select a validity period"
              />
              <SelectField
                name="pendingDays"
                formik={formik}
                label="Pending Days"
                options={[]}
                placeholder="Select a pending days"
              />
            </div>
          </div>

          {/* Footer actions */}
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => modal.hide()}
              // disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={false}>
              Apply for Certificate
              {/* {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Deploying...
                  </>
                ) : (
                  "Deploy Infrastructure"
                )} */}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
});
