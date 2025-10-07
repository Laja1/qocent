import { useEffect, useMemo, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { EyeClosed, EyeIcon, Loader2, Lock } from "lucide-react";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { useFormik } from "formik";
import { useGetSiteByProviderQuery } from "@/service/kotlin/siteApi";
import type { RootState } from "@/store";
import { useSelector } from "react-redux";
import { Textfield2 } from "../textfield2";
import { useCreateStaterPackMutation } from "@/service/kotlin/resourceApi";
import { ErrorHandler } from "@/service/httpClient/errorHandler";
import { showCustomToast } from "../toast";
import { SelectField } from "../selectfield";
import { deploymentModalSchema } from "@/utilities/schema/resourceSchema";

const getTierTitle = (tier: 1 | 2 | 3 | null) => {
  switch (tier) {
    case 1:
      return "1-Tier Architecture";
    case 2:
      return "2-Tier Architecture";
    case 3:
      return "3-Tier Architecture";
    default:
      return "Infrastructure";
  }
};

interface DeploymentDialogProps {
  tier: 1 | 2 | 3 | null;
}

export const DeploymentDialog = NiceModal.create(
  ({ tier }: DeploymentDialogProps) => {
    const modal = useModal();
    const [seePassword, setSeePassword] = useState(false);

    // Redux state
    const { provider } = useSelector((state: RootState) => state.dashboard);
    const { accountCode } = useSelector((state: RootState) => state.account);
    const { userId } = useSelector((state: RootState) => state.auth);

    // API hooks
    const [createStaterPack, { isLoading }] = useCreateStaterPackMutation();
    const { data: siteData } = useGetSiteByProviderQuery(
      { provider, siteAccountId: accountCode ?? "" },
      { skip: !userId || !provider }
    );

    // Formik
    const formik = useFormik({
      initialValues: {
        accountCode: accountCode ?? "",
        serverPassword: "",
        siteCode: "",
        siteProvider: provider ?? "",
        tier: tier || 0,
      },
      validationSchema: deploymentModalSchema,
      validateOnBlur: true,
      validateOnChange: true,
      enableReinitialize: true, // ✅ Add this to reinitialize when props change
      onSubmit: async (values) => {
        console.log(values, "values");
        try {
          const res = await createStaterPack(values).unwrap();
          showCustomToast(res.responseMessage, {
            toastOptions: { type: "success", autoClose: 5000 },
          });
          modal.hide();
          formik.resetForm();
        } catch (error) {
          const message = ErrorHandler.extractMessage(error);
          console.log(error, "message");
          showCustomToast(message, {
            toastOptions: { type: "error", autoClose: 5000 },
          });
        }
      },
    });

    // ✅ Update form when tier changes
    useEffect(() => {
      if (modal.visible) {
        formik.setFieldValue("tier", tier || 0);
      }
    }, [tier, modal.visible]);

    const onModalClose = () => {
      modal.hide();
      formik.resetForm();
      setSeePassword(false); // ✅ Also reset password visibility
    };

    useEffect(() => {
      if (!modal.visible) {
        formik.resetForm();
        setSeePassword(false); // ✅ Reset password visibility on close
      }
    }, [modal.visible]);

    // Transform site options
    const siteOptions = useMemo(
      () =>
        siteData?.data.map((site) => ({
          label: site.siteName,
          value: site.siteCode,
        })) ?? [],
      [siteData]
    );

    return (
      <Dialog open={modal.visible} onOpenChange={onModalClose}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle className="text-base">
              Deploy {getTierTitle(tier)}
            </DialogTitle>
            <p className="text-xs my-1">
              Configure your deployment settings. All fields are required to
              proceed.
            </p>
          </DialogHeader>

          <form onSubmit={formik.handleSubmit}>
            <div className="space-y-6 py-4">
              {/* Site selection */}
              <div className="space-y-2">
                <SelectField
                  name="siteCode"
                  formik={formik}
                  label="Site"
                  options={siteOptions}
                  placeholder="Select a site"
                />
                <p className="text-xs text-muted-foreground">
                  What site do you want to deploy in?
                </p>
              </div>

              {/* Password input */}
              <div className="space-y-2">
                <Textfield2
                  name="serverPassword"
                  label="Password"
                  placeholder="Enter your password"
                  formik={formik}
                  className="w-full"
                  prefixIcon={<Lock size={16} className="text-black" />}
                  type={seePassword ? "text" : "password"}
                  suffixIcon={
                    <span
                      role="button"
                      tabIndex={0}
                      onClick={() => setSeePassword((prev) => !prev)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          setSeePassword((prev) => !prev);
                        }
                      }}
                    >
                      {seePassword ? (
                        <EyeIcon size={16} className="dark:text-black" />
                      ) : (
                        <EyeClosed size={16} className="dark:text-black" />
                      )}
                    </span>
                  }
                  error={formik.errors.serverPassword}
                />
                <p className="text-xs text-muted-foreground">
                  Set a secure password for your infrastructure
                </p>
              </div>
            </div>

            {/* Footer actions */}
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={onModalClose}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Deploying...
                  </>
                ) : (
                  "Deploy Infrastructure"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    );
  }
);
