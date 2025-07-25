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
import { useCreateServerSiteMutation } from "@/service/typescript/siteApi";
import { generateDynamicSchema } from "@/utilities/schema/resourceSchema";
import type { RootState } from "@/store";
import { useGetResourceTemplateQuery } from "@/service/typescript/resourceApi";
import type { ParameterData } from "../create-new-site/type";

export const CreateNewRoom = () => {
  const navigate = useNavigate();
  const [createSite, { isLoading }] = useCreateServerSiteMutation();
  const {
    data: serverRoomTemplate,
    isError,
    isLoading: isParamsLoading,
  } = useGetResourceTemplateQuery({ resource: "serverRoom" });
  const { openModal, closeModal } = useModal();
  const user = useSelector((state: RootState) => state.auth);
  const [progress, setProgress] = useState(0);
  const dashboard = useSelector((state: RootState) => state.dashboard);
  const [isDeployModalOpen, setIsDeployModalOpen] = useState(false);
  console.log(dashboard);
  // Initialize form with empty values
  const initialValues =
    serverRoomTemplate?.data?.reduce(
      (acc: Record<string, string>, item: ParameterData) => ({
        ...acc,
        [item.parameterName]: "",
      }),
      {
        serverSite: "",
        serverHouse: "",
      }
    ) || {};

  // Form submission handler
  const handleSubmit = async (values: any) => {
    try {
      const payload = {
        ...values,
        siteUserId: user.userId || "",
      };

      // Simulate deployment progress
      for (let i = 0; i <= 100; i += 10) {
        setProgress(i);
        await new Promise((resolve) => setTimeout(resolve, 100));
      }

      const res = await createSite(payload).unwrap();
      showCustomToast(res.responseMessage, {
        toastOptions: { type: "success", autoClose: 5000 },
      });

      setProgress(0);
      setIsDeployModalOpen(false);
      navigate(RouteConstant.dashboard.serverSite.path);
    } catch (error: any) {
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

  console.log(formik?.errors, formik?.values);
  useEffect(() => {
    if (serverRoomTemplate?.data) {
      const newValues = serverRoomTemplate.data.reduce(
        (acc: Record<string, string>, item: ParameterData) => ({
          ...acc,
          [item.parameterName]: "",
        }),
        {}
      );
      formik.setValues(newValues);
    }
  }, [serverRoomTemplate?.data]);

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

        <div className="flex flex-col mt-5 mx-2 sm:mx-5 lg:mx-10 bg-gray-100 shadow-t-md rounded-t-md">
          <div className="bg-gradient-to-r flex justify-between from-black to-gray-800 rounded-t-md px-3 sm:px-5 py-5">
            <div>
              <p className="text-base sm:text-lg text-white">
                Create Server Room
              </p>
              <p className="text-xs text-gray-400 leading-tight">
                A server can have one or more server rooms. A server room is
                provided by a provider.
              </p>
            </div>
            <IconMichelinStar color="white" size={40} />
          </div>

          <div className="flex mt-5 flex-col">
            <div className="flex items-center w-full py-[1px] border-b">
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
            </div>
            <div className="flex items-center w-full py-[1px] border-b">
              <p className="text-xs lg:w-1/6 w-1/2 pr-3 text-right">
                <span className="text-red-500 ml-1">*</span>
                Server House
              </p>
              <div className="lg:w-2/5 w-full pr-3 flex gap-1">
                <RenderField
                  name="serverHouse"
                  formik={formik}
                  placeholder={`Select your Server House`}
                  parameterLookup={"serverHouse"}
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
            </div>
            {serverRoomTemplate.data.map((item) => (
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
      </div>

      <SiteDeployModal
        isOpen={isDeployModalOpen}
        onClose={() => !isLoading && setIsDeployModalOpen(false)}
        formik={formik}
        json={serverRoomTemplate}
        isLoading={isLoading}
        progress={progress}
        onDeploy={formik.handleSubmit}
      />
    </>
  );
};
