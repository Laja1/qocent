/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Header, RenderField } from "@/components/shared";
import { useModal } from "@/components/shared/modal";
import { ArrowRight, Info } from "lucide-react";
import { houseCreateData } from "./data";
import { useFormik } from "formik";
import type { HouseParameterItem } from "./type";
import { useGetSitesQuery } from "@/service/siteApi";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import { SiteDeployModal } from "@/components/not-shared/site-modal";
import { useState } from "react";
import type { createHouseRequest } from "@/models/request/houseRequest";
import { useCreateServerHouseMutation } from "@/service/houseApi";
import { showCustomToast } from "@/components/shared/toast";
import { RouteConstant } from "@/router/routes";
import { ErrorHandler } from "@/service/httpClient/errorHandler";
import { useNavigate } from "react-router-dom";
import { houseSchema } from "@/utilities/schema/resourceSchema";

// Provider regions configuration
const PROVIDER_REGIONS: Record<string, { label: string; value: string }[]> = {
  aws: [
    { label: "US East (N. Virginia)", value: "af-south-1" },
    // { label: "US West (Oregon)", value: "us-west-2" },
    // { label: "EU (Ireland)", value: "eu-west-1" },
  ],
  huawei: [
    { label: "CN North-Beijing4", value: "af-north-1" },
    // { label: "AF Johannesburg", value: "af-south-1" },
    // { label: "AP Singapore", value: "ap-southeast-3" },
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

export const CreateNewHouse = () => {
  // Hooks
  const navigate = useNavigate();
  const { openModal, closeModal } = useModal();

  // State
  const [isDeployModalOpen, setIsDeployModalOpen] = useState(false);
  const [progress, setProgress] = useState(0);

  // Redux state
  const dashboard = useSelector((state: RootState) => state.dashboard);
  const user = useSelector((state: RootState) => state.auth);

  // API hooks
  const [createHouse, { isLoading }] = useCreateServerHouseMutation();
  const { data: sitesData } = useGetSitesQuery({
    provider: dashboard.provider,
  });
  console.log(sitesData);
  // Computed values
  const siteOptions =
    sitesData?.data?.map((item) => ({
      label: item.siteName,
      value: String(item.siteCode),
    })) ?? [];

  const regionOptions = dashboard?.provider
    ? PROVIDER_REGIONS[dashboard.provider]
    : [];

  // Form initial values
  const initialValues = houseCreateData.reduce((acc, item) => {
    acc[item.ParameterName] = "";
    return acc;
  }, {} as Record<string, any>) as HouseParameterItem;

  // Form configuration
  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit,
    validationSchema: houseSchema,
    validateOnMount: true,
  });

  // Get selected site details
  const houseSite = sitesData?.data?.find(
    (item) => item.siteCode === (formik.values as any)["houseSiteCode"]
  );

  // Event handlers
  async function handleSubmit(values: any) {
    try {
      const payload: createHouseRequest = {
        ...values,
        siteUserId: user?.userId,
        houseSiteId: houseSite?.siteId,
      };

      const res = await createHouse(payload).unwrap();

      // Simulate deployment progress
      for (let i = 0; i <= 100; i += 10) {
        setProgress(i);
        await new Promise((resolve) => setTimeout(resolve, 100));
      }

      showCustomToast(res.responseMessage, {
        toastOptions: {
          type: "success",
          autoClose: 5000,
        },
      });

      setProgress(0);
      setIsDeployModalOpen(false);
      navigate(RouteConstant.dashboard.serverSite.path);
    } catch (error: any) {
      console.error("Error creating house:", error);
      const message = ErrorHandler.extractMessage(error);
      showCustomToast(message, {
        toastOptions: {
          type: "error",
          autoClose: 5000,
        },
      });
    }
  }

  const handleCloseDeployModal = () => {
    if (!isLoading) {
      setIsDeployModalOpen(false);
      setProgress(0);
    }
  };

  const handleDeploy = () => {
    formik.handleSubmit();
  };

  const handleProceed = () => {
    setIsDeployModalOpen(true);
  };

  const descriptionModal = (row: HouseParameterItem) => {
    openModal({
      id: "info-modal",
      content: () => (
        <div className="flex max-w-xs flex-col gap-4 p-4">
          <h2 className="text-lg uppercase border-b pb-2">
            {row.ParameterLabel}
          </h2>
          <div className="text-sm text-gray-600 space-y-2">
            {row.ParameterInfo1 && <p>{row.ParameterInfo1}</p>}
            {row.ParameterInfo2 && <p>{row.ParameterInfo2}</p>}
            {row.ParameterInfo3 && <p>{row.ParameterInfo3}</p>}
          </div>
          <div className="flex items-right justify-end">
            <Button label="Close" onClick={() => closeModal()} />
          </div>
        </div>
      ),
    });
  };

  const getFieldOptions = (parameterName: string) => {
    switch (parameterName) {
      case "houseSiteCode":
        return siteOptions;
      case "houseRegion":
        return regionOptions;
      default:
        return [];
    }
  };

  console.log(formik.values);

  return (
    <div className="flex flex-col">
      <Header
        title="Create Server House"
        description="A server can have one or more server houses. A server house is provided by a provider."
      />

      <div className="flex flex-col mt-5 mx-2 sm:mx-5 lg:mx-10 bg-gray-100 shadow-t-md rounded-t-md">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-black to-green-800 rounded-t-md pl-3 sm:pl-5 py-5">
          <p className="text-base sm:text-lg text-white">Create Server House</p>
          <p className="text-xs text-gray-400 leading-tight">
            A server can have one or more server houses. A server house is
            provided by a provider.
          </p>
        </div>

        {/* Form Fields */}
        <div className="flex mt-5 flex-col">
          {houseCreateData.map((item) => (
            <div
              className="flex items-center w-full py-[1px] border-b"
              key={item.ParameterSerial}
            >
              <p className="text-xs lg:w-1/6 w-1/2 pr-3 text-right">
                {item.ParameterMandatory === "Yes" && (
                  <span className="text-red-500 ml-1">*</span>
                )}
                {item.ParameterLabel}
              </p>

              <div className="lg:w-2/5 w-full pr-3 flex gap-1">
                <RenderField
                  name={item.ParameterName}
                  formik={formik}
                  type={item.ParameterInputType}
                  placeholder={`Enter your ${item.ParameterLabel}`}
                  autoComplete="off"
                  options={getFieldOptions(item.ParameterName)}
                />

                <div className="flex justify-center">
                  <button
                    type="button"
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

        {/* Action Button */}
        <div className="flex m-3 sm:m-5 justify-end">
          <Button
            label="Proceed"
            onClick={handleProceed}
            surfixIcon={<ArrowRight className="size-3" />}
            disabled={!formik.isValid || isLoading}
          />
        </div>
      </div>

      {/* Deploy Modal */}
      <SiteDeployModal
        isOpen={isDeployModalOpen}
        onClose={handleCloseDeployModal}
        formik={formik}
        json={houseCreateData}
        isLoading={isLoading}
        progress={progress}
        onDeploy={handleDeploy}
      />
    </div>
  );
};
