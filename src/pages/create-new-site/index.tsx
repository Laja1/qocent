import { imgLinks } from "@/assets/assetLink";
import { providerOptions } from "@/components/not-shared/deploy-config";
import { Button, Header, SelectField2, Textfield2 } from "@/components/shared";
import { useModal } from "@/components/shared/modal";
import { useFormik } from "formik";
import { Cloud, ArrowRight, Info } from "lucide-react";

export const CreateNewSite = () => {
  const { openModal, closeModal } = useModal();

  const formik = useFormik({
    initialValues: {
      siteName: "",
      provider: "",
      siteCode: "",
      ipAddress: "",
      siteDescription: "",
    },
    onSubmit: (values) => {
      console.log("Deploying with values:", values);
    },
    enableReinitialize: true,
  });

  const getIcon = () => {
    switch (formik.values.provider) {
      case "aws":
        return <img src={imgLinks.awsdark} className="size-6" />;
      case "huawei":
        return <img src={imgLinks.huawei} className="size-6" />;
      default:
        return <Cloud className="w-6 h-6 text-blue-600" />;
    }
  };

  const handleProceed = () => {
    openModal({
      id: "deploy-confirm",
      content: (
        <div className="flex flex-col w-full gap-4">
          <div className="items-center flex flex-col w-full space-y-2">
            {getIcon()}
            <h2 className="text-lg font-semibold border-b">Ready to Deploy?</h2>
          </div>
          <div className="text-sm text-gray-600 space-y-1">
            <p>
              <strong>Site Name:</strong> {formik.values.siteName || "—"}
            </p>
            <p>
              <strong>Provider:</strong>{" "}
              {providerOptions.find((p) => p.value === formik.values.provider)
                ?.label || "—"}
            </p>
            <p>
              <strong>Site Code:</strong> {formik.values.siteCode || "—"}
            </p>
            <p>
              <strong>IP Address:</strong> {formik.values.ipAddress || "—"}
            </p>
            <p>
              <strong>Description:</strong> {formik.values.siteDescription || "—"}
            </p>
          </div>

          <Button
            label="Deploy"
            onClick={() => {
              formik.handleSubmit();
              closeModal();
            }}
          />
        </div>
      ),
    });
  };

  return (
    <div className="flex flex-col">
      <Header
        title="Create Server Site"
        description="A server can have one or more server houses. A server house is provided by a provider."
      />

      <form onSubmit={(e) => e.preventDefault()}>
        <div className="flex flex-col gap-5 mt-5 mx-5 lg:mx-10 bg-gray-100 shadow-t-md rounded-t-md">
          <div className="bg-gradient-to-r from-black to-green-800 rounded-t-md pl-5 py-10">
            <p className="text-lg text-white">Create Server Site</p>
            <p className="text-xs text-gray-400 leading-tight truncate">
              A server can have one or more server houses. A server house is
              provided by a provider.
            </p>
          </div>

          <div className="flex w-full lg:w-1/2 px-3 lg:p-5 flex-col gap-">
            {/* Site Name */}
            <div className="items-center lg:pl-10 w-full flex lg:flex-row flex-col gap-0 lg:gap-3">
              <p className="text-sm text-start lg:text-right w-full lg:w-1/5">
                Site Name
              </p>
              <div className="items-center gap-1 lg:gap-3 flex w-full lg:w-4/5">
                <Textfield2 name="siteName" formik={formik} />
                <Info />
              </div>
            </div>

            {/* Provider */}
            <div className="items-center lg:pl-10 w-full flex lg:flex-row flex-col gap-0 lg:gap-3 mt-1">
              <p className="text-sm text-start lg:text-right w-full lg:w-1/5">
                Provider
              </p>
              <div className="items-center gap-1 lg:gap-3 flex w-full lg:w-4/5">
                <SelectField2
                  name="provider"
                  formik={formik}
                  placeholder="Select a cloud provider"
                  options={providerOptions}
                />
                <Info />
              </div>
            </div>

            {/* Site Code */}
            <div className="items-center lg:pl-10 w-full flex lg:flex-row flex-col gap-0 lg:gap-3">
              <p className="text-sm text-start lg:text-right w-full lg:w-1/5">
                Site Code
              </p>
              <div className="items-center gap-1 lg:gap-3 flex w-full lg:w-4/5">
                <Textfield2 name="siteCode" formik={formik} />
                <Info />
              </div>
            </div>

            {/* Site Description */}
            <div className="items-center lg:pl-10 w-full flex lg:flex-row flex-col gap-0 lg:gap-3">
              <p className="text-sm text-start lg:text-right w-full lg:w-1/5">
                Site Description
              </p>
              <div className="items-center gap-1 lg:gap-3 flex w-full lg:w-4/5">
                <Textfield2 name="siteDescription" formik={formik} />
                <Info />
              </div>
            </div>
          </div>

          <div className="flex m-5 justify-end">
            <Button
              label="Proceed"
              onClick={handleProceed}
              surfixIcon={<ArrowRight className="size-3" />}
            />
          </div>
        </div>
      </form>
    </div>
  );
};
