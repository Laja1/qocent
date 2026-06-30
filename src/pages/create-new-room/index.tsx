/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useMemo } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ArrowRight, Info } from "lucide-react";
import { IconMichelinStar } from "@tabler/icons-react";
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
import type { getResourceConfigResponse } from "@/models/response/resourceResponse";
import { useCreateRoomMutation } from "@/service/roomApi";
import { useGetSiteByProviderQuery } from "@/service/siteApi";

export const CreateNewRoom = () => {
  const navigate = useNavigate();
  const dashboard = useSelector((state: RootState) => state.dashboard);
  const [createRoom, { isLoading: isCreatingLoading }] =
    useCreateRoomMutation();
  const { data: configData } = useGetConfigQuery({
    serviceId: "ServerRoom",
    configProvider: dashboard?.provider || "",
  });
  const { openModal, closeModal } = useModal();

  const [progress, setProgress] = useState(0);
  const [isDeployModalOpen, setIsDeployModalOpen] = useState(false);
  const user = useSelector((state: RootState) => state.account);
  const {
    data: serverRoomTemplate,
    isError,
    isLoading: isParamsLoading,
  } = useGetResourceTemplateQuery({
    resource: "serverRoom",
    provider: dashboard.provider,
  });

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

  // Initialize form with empty values
  const initialValues = useMemo(() => {
    const templateValues =
      serverRoomTemplate?.data?.reduce(
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
  }, [serverRoomTemplate?.data, dashboard]);
  // Form submission handler
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
      console.log(payload);

      const res = await createRoom(payload).unwrap();
      console.log(res, "creating");

      // Simulate deployment progress
      for (let i = 0; i <= 100; i += 10) {
        setProgress(i);
        await new Promise((resolve) => setTimeout(resolve, 100));
      }

      showCustomToast(`Server room successfully created`, {
        toastOptions: { type: "success", autoClose: 5000 },
      });

      setProgress(0);
      navigate(RouteConstant.dashboard.serverRooms.path);
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

  // Initialize Formik
  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit,
    validationSchema: () => generateDynamicSchema(serverRoomTemplate?.data),
    validateOnMount: true,
    enableReinitialize: true,
  });

  const newJsonConfig = configData
    ? (replaceConfigPlaceholders(configData, {
        ...formik.values,
        resourceProvider: dashboard.provider,
        resourceType: "ServerRoom",
      }) as getResourceConfigResponse<any>)
    : null;

  console.log(formik?.errors, formik?.values);

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
          title="Create Server Room"
          description="A server can have one or more server rooms. A server room is provided by a provider."
        />
        <div className="animate-pulse space-y-4 mx-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-12 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  if (isError || !serverRoomTemplate?.data) {
    return (
      <div className="p-4 text-red-500">
        Failed to load room parameters. Please try again later.
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col">
        <Header
          title="Create Server Room"
          description="A server can have one or more server rooms. A server room is provided by a provider."
        />

        <PageContent>
          <FormPageCard
            className="max-w-4xl"
            title="Create Server Room"
            subtitle="A server can have one or more server rooms. A server room is provided by a provider."
            icon={<IconMichelinStar className="size-8" />}
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
              {serverRoomTemplate.data
                .slice()
                .sort(
                  (a, b) => Number(a.parameterSerial) - Number(b.parameterSerial)
                )
                .map((item) => (
                  <div
                    className="flex w-full items-center gap-3 py-3 first:pt-0 last:pb-0"
                    key={item.parameterId}
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
        json={serverRoomTemplate?.data}
        isLoading={isCreatingLoading}
        progress={progress}
        onDeploy={formik.handleSubmit}
      />
    </>
  );
};
