/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Header, RenderField } from "@/components/shared";
import { useModal } from "@/components/shared/modal";
import { ArrowRight, Info } from "lucide-react";
import { useFormik } from "formik";
import { IconMichelinStar } from "@tabler/icons-react";
import type { ParameterData } from "../create-new-site/type";
import {
  useCreateResourceMutation,
  useGetResourceTemplateQuery,
} from "@/service/resourceApi";
import { useLocation, useNavigate } from "react-router-dom";
import { generateDynamicSchema } from "@/utilities/schema/resourceSchema";
import { SiteDeployModal } from "@/components/not-shared/site-modal";
import { useState } from "react";
import { showCustomToast } from "@/components/shared/toast";
import { RouteConstant } from "@/router/routes";
import { ErrorHandler } from "@/service/httpClient/errorHandler";
import type { createResourceRequest } from "@/models/request/resourceRequest";

export const CreateNewResource = () => {
  const navigate = useNavigate();
  const { openModal, closeModal } = useModal();
  const [createResource] = useCreateResourceMutation();
  const [isDeployModalOpen, setIsDeployModalOpen] = useState(false);
  const location = useLocation();
  const [progress, setProgress] = useState(0);
  console.log(location.state);
  const { data: resourceTemplate, isLoading } = useGetResourceTemplateQuery({
    resource: location.state.resourceType,
  });

  const handleSubmit = async (values: any) => {
    const getResourceName = (values: Record<string, any>): string => {
      const nameRegex = /name/i;
      const nameKey = Object.keys(values).find((key) => nameRegex.test(key));
      return nameKey && values[nameKey] ? values[nameKey] : "";
    };
  
    // Generate a resource code based on resource name
    const generateResourceCode = (name: string): string => {
      return name.toLowerCase().replace(/[^a-z0-9]/g, '-') || 'resource-code';
    };
  
    try {
      const resourceName = getResourceName(values);
      
      const payload: createResourceRequest = {
        resource: {
          resourceId: 0, // ✅ REQUIRED - was missing
          resourceSite: location?.state?.resourceSiteCode || "string",
          resourceType: location?.state?.resourceType || "string",
          resourceName: resourceName || "string",
          resourceCode: generateResourceCode(resourceName) || "string",
          resourceContainerType: "string",
          resourceContainerCode: "string",
          resourceStatus: "string",
          resourceDate: new Date().toISOString(), 
          resourceConfig: "string",
          resourceMaker: "string",
          resourceMakerId: "string",
          resourceUserId: 0,
          resourceCheckerId: "string",
          resourceRef: "string",
          resourceClass: "string", 
          resourceLocation: "string",
          resourceTag: "string",
          resourceInfo: "string",
        },
        resourceTemplate: {
          service: "string",
          version: "string",
          region: "string",
          clientClass: "string",
          requestClass: "string", 
          operation: "string",
          authType: "BASIC",
          requestBody: { ...values },
          customHeaders: {
            "additionalProp1": "string",
            "additionalProp2": "string",
            "additionalProp3": "string"
          },
          async: true,
          timeout: 0,
          customEndpoint: "string",
          debugMode: true,
        }
      };
      
      console.log("Sending payload:", JSON.stringify(payload, null, 2));
      
      const res = await createResource(payload).unwrap();
  
      // Simulate deployment progress
      for (let i = 0; i <= 100; i += 10) {
        setProgress(i);
        await new Promise((resolve) => setTimeout(resolve, 100));
      }
  
      showCustomToast(res.message, {
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
        [item.parameterName]: "",
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
  console.log(formik.values);
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
                  name={item.parameterName}
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
            disabled={!formik.isValid || isLoading}
            onClick={() => setIsDeployModalOpen(true)}
            surfixIcon={<ArrowRight className="size-3" />}
          />
        </div>
      </div>
      <SiteDeployModal
        isOpen={isDeployModalOpen}
        onClose={() => !isLoading && setIsDeployModalOpen(false)}
        formik={formik}
        json={resourceTemplate?.data || []}
        isLoading={isLoading}
        progress={progress}
        onDeploy={formik.handleSubmit}
      />
    </div>
  );
};
