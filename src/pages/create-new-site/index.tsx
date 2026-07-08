/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Info, User } from "lucide-react";
import { Button, Header, Textfield2, FormPageCard, PageContent } from "@/components/shared";
import { useModal } from "@/components/shared/modal";
import { showCustomToast } from "@/components/shared/toast";
import { SiteDeployModal } from "@/components/not-shared/site-modal";
import { RouteConstant } from "@/router/routes";
import { ErrorHandler } from "@/service/httpClient/errorHandler";
import { serverSiteSchema } from "@/utilities/schema/resourceSchema";
import { useCreateAccountMutation } from "@/service/cloudServericesApi";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";

export const CreateNewSite = () => {
  const navigate = useNavigate();
  const [createSite, { isLoading }] = useCreateAccountMutation();
  const dahsboard = useSelector((state: RootState) => state.dashboard);
  const { openModal, closeModal } = useModal();

  const [progress, setProgress] = useState(0);
  const [isDeployModalOpen, setIsDeployModalOpen] = useState(false);

  // ✅ Formik
  const formik = useFormik({
    initialValues: { siteName: "" },
    validationSchema: serverSiteSchema,
    onSubmit: async (values) => {
      setIsDeployModalOpen(true);

      try {
        const payload = {
          account_name: values.siteName,
        };

        // Show indeterminate progress (e.g., 30% while waiting)
        setProgress(30);

        const created = await createSite({
          body: payload,
          csp: dahsboard?.provider,
        }).unwrap();

        setProgress(100);

        // Brief pause to show completion
        await new Promise((r) => setTimeout(r, 500));

        showCustomToast("Server Site Successfully Created", {
          toastOptions: { type: "success", autoClose: 5000 },
        });

        setIsDeployModalOpen(false);
        setProgress(0);
        navigate(RouteConstant.dashboard.siteCredentials.path, {
          state: {
            accountId: created.account_id,
            accountName: values.siteName,
          },
        });
      } catch (error: any) {
        const message = ErrorHandler.extractMessage(error);
        showCustomToast(message, {
          toastOptions: { type: "error", autoClose: 5000 },
        });
        setIsDeployModalOpen(false);
        setProgress(0);
      }
    },
  });

  // ✅ Description Modal (fixed)
  const descriptionModal = () => {
    openModal({
      id: "info-modal",
      content: () => (
        <div className="flex flex-col gap-4 p-4 max-w-xs">
          <h2 className="text-lg uppercase border-b pb-2">Server Site Name</h2>
          <p className="text-sm text-gray-600">
            This is the name of the server site you want to create.
          </p>
          <div className="flex justify-end">
            <Button label="Close" onClick={closeModal} />
          </div>
        </div>
      ),
    });
  };

  return (
    <>
      <Header
        title="Create Server Site"
        description="A server can have one or more server houses. A server house is provided by a provider."
      />

      <PageContent>
        <FormPageCard
          className="max-w-2xl"
          title="Create Server Site"
          subtitle="Enter the server site details below."
          icon={<User className="size-8" />}
          footer={
            <Button
              label="Proceed"
              disabled={!formik.isValid || isLoading}
              onClick={() => setIsDeployModalOpen(true)}
              surfixIcon={<ArrowRight className="size-3" />}
            />
          }
        >
          <div className="flex w-full max-w-md items-center gap-2">
            <Textfield2
              name="siteName"
              labelClassName="text-foreground"
              label="Server Site Name"
              placeholder="Enter your server site name"
              formik={formik}
              className="w-full"
            />

            <button
              type="button"
              onClick={descriptionModal}
              className="mt-6 rounded-full p-2 text-muted-foreground hover:bg-muted"
              title="View info"
            >
              <Info size={18} />
            </button>
          </div>
        </FormPageCard>
      </PageContent>

      {/* Deploy Modal */}
      <SiteDeployModal
        isOpen={isDeployModalOpen}
        onClose={() => !isLoading && setIsDeployModalOpen(false)}
        formik={formik}
        isLoading={isLoading}
        progress={progress}
        onDeploy={formik.handleSubmit}
        json={[
          { parameterLabel: "Server Site Name", parameterField: "siteName" },
        ]}
      />
    </>
  );
};
