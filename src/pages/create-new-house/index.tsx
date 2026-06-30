/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useMemo } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ArrowRight, Info } from "lucide-react";
import { IconHome } from "@tabler/icons-react";
import { Button, Header, RenderField, FormPageCard, PageContent } from "@/components/shared";
import { useModal } from "@/components/shared/modal";
import { showCustomToast } from "@/components/shared/toast";
import { SiteDeployModal } from "@/components/not-shared/site-modal";
import { RouteConstant } from "@/router/routes";
import { ErrorHandler } from "@/service/httpClient/errorHandler";
import { generateDynamicSchema } from "@/utilities/schema/resourceSchema";
import type { RootState } from "@/store";
import type { ParameterData } from "../create-new-site/type";
import {
  useGetConfigQuery,
  useGetResourceTemplateQuery,
} from "@/service/resourceApi";
import type { createResourceRequest } from "@/models/request/resourceRequest";
import { replaceConfigPlaceholders } from "@/utilities/helper";
import type { ConfigResponse } from "@/models/response/resourceResponse";
import { useCreateHouseMutation } from "@/service/houseApi";
import { useGetSiteByProviderQuery } from "@/service/siteApi";

export const CreateNewHouse = () => {
  const navigate = useNavigate();
  const dashboard = useSelector((state: RootState) => state.dashboard);

  const [createHouse, { isLoading: isCreatingLoading }] =
    useCreateHouseMutation();
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
  const [isDeployModalOpen, setIsDeployModalOpen] = useState(false);

  const handleSubmit = async () => {
    try {
      if (!newJsonConfig) {
        throw new Error("Configuration data is not available");
      }

      const payload: createResourceRequest =
        "data" in newJsonConfig
          ? (newJsonConfig.data?.configJson as unknown as createResourceRequest)
          : (newJsonConfig as createResourceRequest);
      console.log(payload);

      await createHouse(payload).unwrap();
      // Simulate deployment progress
      for (let i = 0; i <= 100; i += 10) {
        setProgress(i);
        await new Promise((resolve) => setTimeout(resolve, 100));
      }

      showCustomToast(`Server house successfully created`, {
        toastOptions: { type: "success", autoClose: 5000 },
      });

      setProgress(0);
      navigate(RouteConstant.dashboard.serverHouses.path);
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

  const initialValues = useMemo(() => {
    const templateValues =
      serverHouseTemplate?.data?.reduce(
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
  }, [serverHouseTemplate?.data, dashboard]);

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

  // Modal for parameter descriptions
  const descriptionModal = (row: ParameterData) => {
    openModal({
      id: "info-modal",
      content: () => (
        <div className="flex max-w-xs flex-col gap-4 p-4">
          <h2 className="text-lg uppercase border-b pb-2 ">
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

        <PageContent>
          <FormPageCard
            className="max-w-4xl"
            title="Create Server House"
            subtitle="A server can have one or more server houses. A server house is provided by a provider."
            icon={<IconHome className="size-8" />}
            footer={
              <Button
                label="Proceed"
                disabled={!formik.isValid || isCreatingLoading}
                onClick={() => setIsDeployModalOpen(true)}
                surfixIcon={<ArrowRight className="size-3" />}
              />
            }
          >
            <div className="flex flex-col divide-y divide-border">
              {serverHouseTemplate?.data
                ?.slice()
                .sort(
                  (a, b) => Number(a.parameterSerial) - Number(b.parameterSerial)
                )
                .map((item) => (
                  <div
                    className="flex w-full items-center gap-3 py-3 first:pt-0 last:pb-0"
                    key={item.parameterSerial}
                  >
                    <p className="w-1/3 shrink-0 text-right text-xs text-muted-foreground">
                      {item.parameterMandatory && (
                        <span className="mr-1 text-primary">*</span>
                      )}
                      {item.parameterLabel}
                    </p>
                    <div className="flex min-w-0 flex-1 items-center gap-1">
                      <RenderField
                        name={item.parameterField}
                        formik={formik}
                        parameterLookup={item.parameterLookup}
                        options={item.parameterOptions}
                        placeholder={`Enter your ${item.parameterLabel}`}
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
      </div>

      <SiteDeployModal
        isOpen={isDeployModalOpen}
        onClose={() => !isCreatingLoading && setIsDeployModalOpen(false)}
        formik={formik}
        json={serverHouseTemplate?.data}
        isLoading={isCreatingLoading}
        progress={progress}
        onDeploy={formik.handleSubmit}
      />
    </>
  );
};
