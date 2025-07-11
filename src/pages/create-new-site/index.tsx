/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Header, RenderField } from "@/components/shared";
import { useModal } from "@/components/shared/modal";
import { ArrowRight, Info } from "lucide-react";
import { siteCreateJson } from "./json";
import { useFormik } from "formik";
import type { ParameterData } from "./type";
import { IconMichelinStar } from "@tabler/icons-react";
import { imgLinks } from "@/assets/assetLink";
import { useCreateServerSiteMutation } from "@/service/siteApi";
import { ErrorHandler } from "@/service/httpClient/errorHandler";
import { showCustomToast } from "@/components/shared/toast";
import type { createSiteRequest } from "@/models/request/siteRequest";
import { RouteConstant } from "@/router/routes";
import { useNavigate } from "react-router-dom";
import { createSiteSchema } from "@/utilities/schema/resourceSchema";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";

export const CreateNewSite = () => {
  const navigate = useNavigate();
  const [createSite, { isLoading }] = useCreateServerSiteMutation();
  const { openModal, closeModal } = useModal();
  const user = useSelector((state: RootState) => state.auth);
  const handleSubmit = async (values: createSiteRequest) => {
    try {
      const payload: createSiteRequest = {
        ...values,
        siteUserId: user.userId,
      };
      const res = await createSite(payload).unwrap();

      showCustomToast(res.responseMessage, {
        toastOptions: {
          type: "success",
          autoClose: 5000,
        },
      });
      navigate(RouteConstant.dashboard.serverSite.path);
      closeModal();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error);

      const message = ErrorHandler.extractMessage(error);
      showCustomToast(message, {
        toastOptions: {
          type: "error",
          autoClose: 5000,
        },
      });
    }
  };
  const getIcon = (siteProvider: string) => {
    switch (siteProvider) {
      case "aws":
        return <img src={imgLinks.awsdark} alt="AWS" className="size-16" />;
      case "huawei":
        return (
          <img src={imgLinks.huawei} alt="Huawei Cloud" className="size-16" />
        );
      default:
        return null;
    }
  };

  const descriptionModal = (row: ParameterData) => {
    openModal({
      id: "info-modal",
      content: (
        <div className="flex max-w-xs flex-col gap-4 p-4">
          <h2 className="text-lg uppercase border-b pb-2">
            {row.ParameterLabel}
          </h2>
          <div className="text-sm text-gray-600 space-y-2">
            {row.ParameterInfo1 && <p>{row.ParameterInfo1}</p>}
            {row.ParameterInfo2 && <p>{row.ParameterInfo2}</p>}
            {row.ParameterInfo3 && <p>{row.ParameterInfo3}</p>}
          </div>
          <div className="flex justify-end">
            <Button
              label="Close"
              isLoading={isLoading}
              onClick={() => formik.handleSubmit()}
            />
          </div>
        </div>
      ),
    });
  };

  const providerRegions: Record<string, { label: string; value: string }[]> = {
    aws: [
      { label: "US East (N. Virginia)", value: "us-east-1" },
      { label: "US West (Oregon)", value: "us-west-2" },
      { label: "EU (Ireland)", value: "eu-west-1" },
    ],
    huawei: [
      { label: "CN North-Beijing4", value: "cn-north-4" },
      { label: "AF Johannesburg", value: "af-south-1" },
      { label: "AP Singapore", value: "ap-southeast-3" },
    ],
    gcp: [
      { label: "Iowa (us-central1)", value: "us-central1" },
      { label: "Belgium (europe-west1)", value: "europe-west1" },
    ],
    azure: [
      { label: "East US", value: "eastus" },
      { label: "West Europe", value: "westeurope" },
    ],
  };

  // const initialValues = siteCreateJson.reduce(
  //   (acc, item) => {
  //     if (item.ParameterName in acc) {
  //       (acc as any)[item.ParameterName] = "";
  //     }
  //     return acc;
  //   },)
  const createSiteInit = {
    siteCode: "",
    siteDescription: "",
    siteEOLAction: "",
    siteExpiryDate: "",
    siteName: "",
    siteProvider: "",
    siteRegion: "",
    siteUserId: 0,
  };

  const formik = useFormik({
    initialValues: createSiteInit,
    onSubmit: handleSubmit,
    validationSchema: createSiteSchema,
  });
  console.log(formik.errors);
  const selectedProvider = formik.values["siteProvider"];
  const regionOptions =
    selectedProvider && providerRegions[selectedProvider]
      ? providerRegions[selectedProvider]
      : [];
  const handleProceed = () => {
    openModal({
      id: "deploy-confirm",
      content: (
        <div className="flex flex-col w-full gap-4">
          <div className="items-center flex flex-col w-full space-y-2">
            <h2 className="text-lg font-semibold border-b">Ready to Deploy?</h2>
            {getIcon(formik.values["siteProvider"])}
          </div>

          <div className="text-sm text-gray-600 space-y-1">
            <p>
              <strong>Site Name:</strong> {formik.values.siteName || "—"}
            </p>
            <p>
              <strong>Site Code:</strong> {formik.values.siteCode || "—"}
            </p>
            <p>
              <strong>Provider:</strong>{" "}
              {siteCreateJson
                .find((p) => p.ParameterName === "siteProvider")
                ?.ParameterDropdown?.find(
                  (opt) => opt.value === formik.values.siteProvider
                )?.label || "—"}
            </p>
            <p>
              <strong>Region:</strong>{" "}
              {providerRegions[formik.values.siteProvider]?.find(
                (r) => r.value === formik.values.siteRegion
              )?.label || "—"}
            </p>
            <p>
              <strong>Expiry Date:</strong>{" "}
              {formik.values.siteExpiryDate || "—"}
            </p>
            <p>
              <strong>EOL Action:</strong>{" "}
              {siteCreateJson
                .find((p) => p.ParameterName === "siteEndOfLifeAction")
                ?.ParameterDropdown?.find(
                  (opt) => opt.value === formik.values.siteEOLAction
                )?.label || "—"}
            </p>
            <p>
              <strong>Description:</strong>{" "}
              {formik.values.siteDescription || "—"}
            </p>
          </div>

          <Button
            label="Deploy"
            isLoading={isLoading}
            onClick={() => {
              formik.handleSubmit();
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

      <div className="flex flex-col mt-5 mx-2 sm:mx-5 lg:mx-10 bg-gray-100 shadow-t-md rounded-t-md">
        <div className="bg-gradient-to-r flex justify-between from-black to-green-800 rounded-t-md px-3 sm:px-5 py-5">
          <div>
            <p className="text-base sm:text-lg text-white">
              Create Server Site
            </p>
            <p className="text-xs text-gray-400 leading-tight">
              A server can have one or more server houses. A server house is
              provided by a provider.
            </p>
          </div>
          <IconMichelinStar color="white" size={40} />
        </div>

        <div className="flex mt-5 flex-col">
          {siteCreateJson.map((item) => (
            <div
              className="flex items-center w-full py-[1px] border-b"
              key={item.ParameterSerial}
            >
              <p className="text-xs lg:w-1/6 w-1/2 pr-3 text-right">
                {item.ParameterMandatory === "Yes" && (
                  <span className="text-red-500 ml-1">*</span>
                )}{" "}
                {item.ParameterLabel}
              </p>
              <div className="lg:w-2/5 w-full pr-3 flex gap-1">
                <RenderField
                  name={item.ParameterName}
                  formik={formik}
                  placeholder={`Enter your ${item.ParameterLabel}`}
                  type={item.ParameterInputType}
                  options={
                    item.ParameterName === "siteRegion"
                      ? regionOptions
                      : item.ParameterDropdown || []
                  }
                  autoComplete="off"
                />

                <div className="flex justify-center">
                  <button
                    onClick={() => descriptionModal(item)}
                    className="rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-100 cursor-pointer"
                    title="View more info"
                  >
                    <Info size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex m-3 sm:m-5 justify-end">
          <Button
            label="Proceed"
            disabled={!formik.isValid}
            onClick={handleProceed}
            surfixIcon={<ArrowRight className="size-3" />}
          />
        </div>
      </div>
    </div>
  );
};
