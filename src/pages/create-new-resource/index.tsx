/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Header, RenderField, FormPageCard, PageContent } from "@/components/shared";
import { useModal } from "@/components/shared/modal";
import { ArrowRight, Info } from "lucide-react";
import { useFormik } from "formik";
import type { ParameterData } from "../create-new-site/type";
import { useLocation, useNavigate } from "react-router-dom";
import { generateDynamicSchema } from "@/utilities/schema/resourceSchema";
import { SiteDeployModal } from "@/components/not-shared/site-modal";
import { useState, useEffect, useMemo } from "react";
import { showCustomToast } from "@/components/shared/toast";
import { RouteConstant } from "@/router/routes";
import { ErrorHandler } from "@/service/httpClient/errorHandler";
import type { createResourceRequest } from "@/models/request/resourceRequest";
import type { ConfigResponse } from "@/models/response/resourceResponse";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import {
  useCreateResourceMutation,
  useGetConfigQuery,
  useGetResourceTemplateQuery,
} from "@/service/resourceApi";
import { replaceConfigPlaceholders } from "@/utilities/helper";
import { useResourceMap } from "@/utilities/constants/icons";
import { useGetSiteByProviderQuery } from "@/service/siteApi";

export const CreateNewResource = () => {
  const navigate = useNavigate();
  const { openModal, closeModal } = useModal();
  const [createResource, { isLoading: isCreatingLoading }] =
    useCreateResourceMutation();
  const [isDeployModalOpen, setIsDeployModalOpen] = useState(false);
  const location = useLocation();
  const RESOURCE_MAP = useResourceMap();

  const [progress, setProgress] = useState(0);

  const dashboard = useSelector((state: RootState) => state.dashboard);
  const user = useSelector((state: RootState) => state.account);
  const { data: siteData } = useGetSiteByProviderQuery(
    {
      provider: dashboard.provider,
      siteAccountId: user.accountCode || "",
      type: user.type || "",
    },
    {
      skip: !dashboard.provider,
    }
  );
  const siteUserId = siteData?.data?.[0]?.siteUserId || user?.accountCode || "";

  const locationState = location.state as any;
  // ALL HOOKS MUST BE CALLED BEFORE ANY EARLY RETURNS
  const { data: configData, isLoading: isConfigLoading } = useGetConfigQuery(
    {
      serviceId: locationState?.resourceType,
      configProvider: dashboard?.provider,
    },
    {
      skip: !locationState?.resourceType || !dashboard?.provider,
    }
  );

  const { data: resourceTemplate, isLoading } = useGetResourceTemplateQuery(
    {
      resource: locationState?.resourceType || "",
      provider: dashboard?.provider || "",
    },
    {
      skip: !locationState?.resourceType || !dashboard?.provider,
    }
  );
  // console.log(resourceTemplate);
  // Initialize form values
  const initialValues = useMemo(() => {
    const templateValues =
      resourceTemplate?.data?.reduce(
        (acc: Record<string, string>, item: ParameterData) => ({
          ...acc,
          [item.parameterField]: "",
        }),
        {}
      ) || {};

    return {
      ...templateValues,
      siteUserId: siteUserId,
    };
  }, [resourceTemplate?.data, dashboard]);

  const formik = useFormik({
    initialValues,
    onSubmit: async () => {
      await handleSubmit();
    },
    validationSchema: () => generateDynamicSchema(resourceTemplate?.data),
    validateOnMount: true,
    enableReinitialize: true,
  });

  // Handle redirect for invalid state
  useEffect(() => {
    if (!locationState || !locationState.resourceType) {
      showCustomToast("Please select a resource type first.", {
        toastOptions: { type: "error", autoClose: 5000 },
      });
      navigate(RouteConstant.dashboard.resources.path);
    }
  }, [locationState, navigate]);

  // NOW it's safe to do early returns after all hooks are called
  if (!locationState || !locationState.resourceType) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p>Redirecting...</p>
        </div>
      </div>
    );
  }

  const newJsonConfig = configData
    ? (replaceConfigPlaceholders(configData, {
        ...formik.values,
        resourceProvider: dashboard.provider,
        resourceType: locationState.resourceType,
      }) as ConfigResponse)
    : null;

  const handleSubmit = async () => {
    try {
      if (!newJsonConfig) {
        throw new Error("Configuration data is not available");
      }

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

      showCustomToast(`${locationState.resourceType} successfully created`, {
        toastOptions: { type: "success", autoClose: 5000 },
      });

      setProgress(0);
      navigate(RouteConstant.dashboard.resources.path);
      setIsDeployModalOpen(false);
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

  const handleProceedClick = () => {
    setIsDeployModalOpen(true);
  };

  // console.log(
  //   "Dynamic config with formik values:",
  //   newJsonConfig?.data?.configJson

  if (isLoading) {
    return (
      <div className="">
        <Header
          title="Create New Resource"
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

      <PageContent>
        <FormPageCard
          className="max-w-4xl"
          title={locationState.resourceType}
          subtitle={locationState?.selectedField?.serviceDescription}
          icon={
            typeof locationState.resourceType === "string"
              ? RESOURCE_MAP?.[
                  locationState.resourceType as keyof typeof RESOURCE_MAP
                ]?.icon
              : undefined
          }
          footer={
            <Button
              label="Proceed"
              disabled={!formik.isValid || isLoading || isConfigLoading}
              onClick={handleProceedClick}
              surfixIcon={<ArrowRight className="size-3" />}
            />
          }
        >
          <div className="flex flex-col divide-y divide-border">
            {resourceTemplate?.data
              ?.slice()
              .sort(
                (a, b) => Number(a.parameterSerial) - Number(b.parameterSerial)
              )
              .map((item) => (
                <div
                  className="flex w-full flex-col gap-2 py-3 first:pt-0 last:pb-0 lg:flex-row lg:items-center lg:gap-3"
                  key={item.parameterId}
                >
                  <p className="w-full shrink-0 text-xs text-muted-foreground lg:w-1/3 lg:text-right">
                    {item.parameterMandatory && (
                      <span className="mr-1 text-primary">*</span>
                    )}
                    {item.parameterLabel}
                  </p>
                  <div className="flex min-w-0 flex-1 items-center gap-1">
                    <RenderField
                      name={item.parameterField}
                      formik={formik}
                      placeholder={`Enter your ${item.parameterLabel}`}
                      parameterLookup={item.parameterLookup}
                      options={item.parameterOptions}
                      type={item.parameterInputType || "text"}
                      autoComplete="off"
                    />
                    <button
                      type="button"
                      onClick={() => descriptionModal(item)}
                      className="flex cursor-pointer items-center justify-center rounded-full p-1.5 text-muted-foreground hover:bg-muted"
                      title="View more info"
                    >
                      <Info size={16} />
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </FormPageCard>
      </PageContent>
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
