/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Header, RenderField } from "@/components/shared";
import { useModal } from "@/components/shared/modal";
import { ArrowRight, Info } from "lucide-react";
import { useFormik } from "formik";
import { IconMichelinStar } from "@tabler/icons-react";
import type { ParameterData } from "../create-new-site/type";
import {
  useCreateResourceMutation,
  useGetConfigQuery,
  useGetResourceTemplateQuery,
} from "@/service/typescript/resourceApi";
import { useLocation, useNavigate } from "react-router-dom";
import { generateDynamicSchema } from "@/utilities/schema/resourceSchema";
import { SiteDeployModal } from "@/components/not-shared/site-modal";
import { useState, useEffect } from "react";
import { showCustomToast } from "@/components/shared/toast";
import { RouteConstant } from "@/router/routes";
import { ErrorHandler } from "@/service/httpClient/errorHandler";
import type { createResourceRequest } from "@/models/request/resourceRequest";
import type { getResourceConfigResponse } from "@/models/response/resourceResponse";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";

export const CreateNewResource = () => {
  const navigate = useNavigate();
  const { openModal, closeModal } = useModal();
  const [createResource, { isLoading: isCreatingLoading }] =
    useCreateResourceMutation();
  const [isDeployModalOpen, setIsDeployModalOpen] = useState(false);
  const location = useLocation();
  const [progress, setProgress] = useState(0);

  const dashboard = useSelector((state: RootState) => state.dashboard);
  const locationState = location.state as { resourceType?: string } | null;
  const { data: configData, isLoading: isConfigLoading } = useGetConfigQuery({
    serviceId: locationState?.resourceType || "",
    configProvider: dashboard?.provider || "",
  });

  useEffect(() => {
    if (!locationState || !locationState.resourceType) {
      showCustomToast("Please select a resource type first.", {
        toastOptions: { type: "error", autoClose: 5000 },
      });
      navigate(RouteConstant.dashboard.resources.path);
    }
  }, [locationState, navigate]);

  const shouldFetchData = !!locationState?.resourceType;

  const { data: resourceTemplate, isLoading } = useGetResourceTemplateQuery(
    {
      resource: locationState?.resourceType || "",
      provider:dashboard.provider
    },
    {
      skip: !shouldFetchData,
    }
  );

  const handleSubmit = async () => {
    try {
      if (!newJsonConfig) {
        throw new Error("Configuration data is not available");
      }

      const payload: createResourceRequest =
        "data" in newJsonConfig
          ? (newJsonConfig.data as createResourceRequest)
          : (newJsonConfig as createResourceRequest);

      const res = await createResource(payload).unwrap();
      console.log(res, "creating");

      // Simulate deployment progress
      for (let i = 0; i <= 100; i += 10) {
        setProgress(i);
        await new Promise((resolve) => setTimeout(resolve, 100));
      }

      showCustomToast(`${locationState?.resourceType} successfully created`, {
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

  const initialValues =
    resourceTemplate?.data?.reduce(
      (acc: Record<string, string>, item: ParameterData) => ({
        ...acc,
        [item.parameterField]: "",
      }),
      {}
    ) || {};

  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit,
    validationSchema: () => generateDynamicSchema(resourceTemplate?.data),
    validateOnMount: true,
    enableReinitialize: true,
  });

  const replaceConfigPlaceholders = (
    obj: unknown,
    formikValues: { [x: string]: any }
  ): unknown => {
    if (Array.isArray(obj)) {
      return obj.map((item) => replaceConfigPlaceholders(item, formikValues));
    } else if (obj !== null && typeof obj === "object") {
      const newObj: { [key: string]: unknown } = {};
      for (const [key, value] of Object.entries(
        obj as Record<string, unknown>
      )) {
        newObj[key] = replaceConfigPlaceholders(value, formikValues);
      }
      return newObj;
    } else if (typeof obj === "string" && obj.startsWith("@")) {
      // Remove @ and get the corresponding formik value
      const fieldName = obj.substring(1);
      return formikValues[fieldName] || obj; // Return original if not found
    }
    return obj;
  };

  const newJsonConfig = configData
    ? (replaceConfigPlaceholders(
        configData,
        formik.values
      ) as getResourceConfigResponse)
    : null;

  console.log("Original config:", configData);
  console.log("Dynamic config with formik values:", newJsonConfig);

  // Show loading state while redirecting or if no valid state
  if (!locationState || !locationState.resourceType) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p>Redirecting...</p>
        </div>
      </div>
    );
  }

  const handleProceedClick = async () => {
    setIsDeployModalOpen(true);
  };
  if (isLoading) {
    return (
      <div className="">
        <Header
          title="Create Server Site"
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

  return (
    <div className="flex flex-col">
      <Header
        title="Create New Resource"
        description="A server can have one or more server houses. A server house is provided by a provider."
      />

      <div className="flex flex-col  mt-5 mx-2 sm:mx-5 lg:mx-10 bg-gray-100 shadow-t-md rounded-t-md">
        <div className="bg-gradient-to-r flex justify-between from-black to-gray-800 rounded-t-md px-3 sm:px-5 py-5">
          <div>
            <p className="text-base sm:text-lg text-white">EC2</p>
            <p className="text-xs text-gray-400 leading-tight">
              A server can have one or more server houses. A server house is
              provided by a provider.
            </p>
          </div>
          <div>
            <IconMichelinStar color="white" size={40} />
          </div>
        </div>

        <div className=" flex mt-5   flex-col">
          {resourceTemplate?.data?.map((item) => (
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
                  name={item.parameterField}
                  formik={formik}
                  placeholder={`Enter your ${item.parameterLabel}`}
                  parameterLookup={item.parameterLookup}
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
            disabled={!formik.isValid || isLoading || isConfigLoading}
            onClick={handleProceedClick}
            surfixIcon={<ArrowRight className="size-3" />}
          />
        </div>
      </div>
      <SiteDeployModal
        isOpen={isDeployModalOpen}
        onClose={() => !isLoading && setIsDeployModalOpen(false)}
        formik={formik}
        json={resourceTemplate?.data || []}
        isLoading={isLoading || isCreatingLoading}
        progress={progress}
        onDeploy={formik.handleSubmit}
      />
    </div>
  );
};
