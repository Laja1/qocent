/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ArrowRight, Info } from "lucide-react";
import { IconMichelinStar } from "@tabler/icons-react";
import { Button, Header, RenderField } from "@/components/shared";
import { useModal } from "@/components/shared/modal";
import { showCustomToast } from "@/components/shared/toast";
import { SiteDeployModal } from "@/components/not-shared/site-modal";
import { RouteConstant } from "@/router/routes";
import { ErrorHandler } from "@/service/httpClient/errorHandler";
import { generateDynamicSchema } from "@/utilities/schema/resourceSchema";
import type { RootState } from "@/store";
import type { ParameterData } from "../create-new-site/type";
import {
  useCreateResourceMutation,
  useGetConfigQuery,
  useGetResourceTemplateQuery,
} from "@/service/kotlin/resourceApi";
import type { createResourceRequest } from "@/models/request/resourceRequest";
import { replaceConfigPlaceholders } from "@/utilities/helper";
import type { ConfigResponse } from "@/models/response/resourceResponse";

export const CreateNewHouse = () => {
  const navigate = useNavigate();
  const dashboard = useSelector((state: RootState) => state.dashboard);
  const [createResource, { isLoading: isCreatingLoading }] =
    useCreateResourceMutation();
  const { data: configData } = useGetConfigQuery({
    serviceId: "ServerHouse",
    configProvider: dashboard?.provider || "",
  });
  const { openModal, closeModal } = useModal();
  const [progress, setProgress] = useState(0);
  const {
    data: serverHouseTemplate,
    isError,
    isLoading: isParamsLoading,
  } = useGetResourceTemplateQuery({
    resource: "serverHouse",
    provider: dashboard.provider,
  });
  const [isDeployModalOpen, setIsDeployModalOpen] = useState(false);

  const handleSubmit = async () => {
    try {
      if (!newJsonConfig) {
        throw new Error("Configuration data is not available");
      }

      console.log(
        newJsonConfig.data,
        '"config" is an excess property and therefore is not allowed'
      );
      const payload: createResourceRequest =
        "data" in newJsonConfig
          ? (newJsonConfig.data?.configJson as unknown as createResourceRequest)
          : (newJsonConfig as createResourceRequest);
      await createResource(payload).unwrap();

      // Simulate deployment progress
      for (let i = 0; i <= 100; i += 10) {
        setProgress(i);
        await new Promise((resolve) => setTimeout(resolve, 100));
      }

      showCustomToast(`Server house successfully created`, {
        toastOptions: { type: "success", autoClose: 5000 },
      });

      setProgress(0);
      setIsDeployModalOpen(false);
      navigate(RouteConstant.dashboard.resources.path);
    } catch (error: any) {
      console.error("Create Resource Error:", error);
      const message = ErrorHandler.extractMessage(error);
      showCustomToast(message, {
        toastOptions: { type: "error", autoClose: 5000 },
      });
      setProgress(0);
    }
  };

  const initialValues =
    serverHouseTemplate?.data?.reduce(
      (acc: Record<string, string>, item: ParameterData) => ({
        ...acc,
        [item.parameterField]: "",
      }),
      {}
    ) || {};

  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit,
    validationSchema: () => generateDynamicSchema(serverHouseTemplate?.data),
    validateOnMount: true,
    enableReinitialize: true,
  });

  const newJsonConfig = configData
    ? (replaceConfigPlaceholders(configData, {
        ...formik.values,
        resourceProvider: dashboard.provider,
        resourceType: "ServerHouse",
      }) as ConfigResponse)
    : null;

  console.log(formik?.errors, formik?.values);
  useEffect(() => {
    if (serverHouseTemplate?.data) {
      const newValues = serverHouseTemplate.data.reduce(
        (acc: Record<string, string>, item: ParameterData) => ({
          ...acc,
          [item.parameterName]: "",
        }),
        {}
      );
      formik.setValues(newValues);
    }
  }, [serverHouseTemplate?.data]);

  // Modal for parameter descriptions
  const descriptionModal = (row: ParameterData) => {
    openModal({
      id: "info-modal",
      content: () => (
        <div className="flex max-w-xs flex-col gap-4 p-4">
          <h2 className="text-lg uppercase border-b pb-2">
            {row.parameterLabel}
          </h2>
          <div className="text-sm text-gray-600 space-y-2">
            {row.parameterInfo1 && <p>{row.parameterInfo1}</p>}
            {row.parameterInfo2 && <p>{row.parameterInfo2}</p>}
            {row.parameterInfo3 && <p>{row.parameterInfo3}</p>}
          </div>
          <div className="flex justify-end">
            <Button label="Close" onClick={closeModal} />
          </div>
        </div>
      ),
    });
  };

  // Loading state
  if (isParamsLoading) {
    return (
      <div className="">
        <Header
          title="Create Server House"
          description="A server can have one or more server houses. A server house is provided by a provider."
        />
        <div className="animate-pulse space-y-4 mx-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-12 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  // Error state
  if (isError || !serverHouseTemplate?.data) {
    return (
      <div className="p-4 text-red-500">
        Failed to load house parameters. Please try again later.
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col">
        <Header
          title="Create Server House"
          description="A server can have one or more server houses. A server house is provided by a provider."
        />

        <div className="flex flex-col mt-5 mx-2 sm:mx-5 lg:mx-10 bg-gray-100 shadow-t-md rounded-t-md">
          <div className="bg-gradient-to-r flex justify-between from-black to-gray-800 rounded-t-md px-3 sm:px-5 py-5">
            <div>
              <p className="text-base sm:text-lg text-white">
                Create Server House
              </p>
              <p className="text-xs text-gray-400 leading-tight">
                A server can have one or more server houses. A server house is
                provided by a provider.
              </p>
            </div>
            <IconMichelinStar color="white" size={40} />
          </div>

          <div className="flex mt-5 flex-col">
            {/* <div className="flex items-center w-full py-[1px] border-b">
              <p className="text-xs lg:w-1/6 w-1/2 pr-3 text-right">
                <span className="text-red-500 ml-1">*</span>
                Server Site
              </p>
              <div className="lg:w-2/5 w-full pr-3 flex gap-1">
                <RenderField
                  name="serverSite"
                  formik={formik}
                  placeholder={`Select your Server Site`}
                  parameterLookup={"serverSite"}
                  type={"ListBox"}
                  autoComplete="off"
                />
                <button
                  // onClick={() => descriptionModal(item)}
                  className="rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-100 cursor-pointer"
                  title="View more info"
                >
                  <Info size={16} />
                </button>
              </div>
            </div> */}
            {serverHouseTemplate.data.map((item) => (
              <div
                className="flex items-center w-full py-[1px] border-b"
                key={item.parameterSerial}
              >
                <p className="text-xs lg:w-1/6 w-1/2 pr-3 text-right">
                  {item.parameterMandatory && (
                    <span className="text-red-500 ml-1">*</span>
                  )}
                  {item.parameterLabel}
                </p>
                <div className="lg:w-2/5 w-full pr-3 flex gap-1">
                  <RenderField
                    name={item.parameterName}
                    formik={formik}
                    parameterLookup={item.parameterLookup}
                    placeholder={`Enter your ${item.parameterLabel}`}
                    type={item.parameterInputType || "text"}
                    autoComplete="off"
                  />
                  <button
                    onClick={() => descriptionModal(item)}
                    className="rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-100 cursor-pointer"
                    title="View more info"
                  >
                    <Info size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex m-3 sm:m-5 justify-end">
            <Button
              label="Proceed"
              disabled={!formik.isValid || isCreatingLoading}
              onClick={() => setIsDeployModalOpen(true)}
              surfixIcon={<ArrowRight className="size-3" />}
            />
          </div>
        </div>
      </div>

      <SiteDeployModal
        isOpen={isDeployModalOpen}
        onClose={() => !isCreatingLoading && setIsDeployModalOpen(false)}
        formik={formik}
        json={serverHouseTemplate}
        isLoading={isCreatingLoading}
        progress={progress}
        onDeploy={formik.handleSubmit}
      />
    </>
  );
};
