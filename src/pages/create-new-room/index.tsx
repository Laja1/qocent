/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Header, RenderField } from "@/components/shared";
import { useModal } from "@/components/shared/modal";
import { ArrowRight, Info } from "lucide-react";
import { useFormik } from "formik";
import type { roomParameterItem } from "./type";
import { roomCreateData } from "./data";
import { IconServerBolt } from "@tabler/icons-react";
import {
  createRoomInit,
  type createRoomRequest,
} from "@/models/request/homeRequest";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useCreateServeRoomMutation } from "@/service/roomApi";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import { useGetHousesByProviderQuery } from "@/service/houseApi";
import { SiteDeployModal } from "@/components/not-shared/site-modal";
import { showCustomToast } from "@/components/shared/toast";
import { RouteConstant } from "@/router/routes";
import { ErrorHandler } from "@/service/httpClient/errorHandler";

export const CreateNewRoom = () => {
  const navigate = useNavigate();
  const { openModal, closeModal } = useModal();
  const [isDeployModalOpen, setIsDeployModalOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const dashboard = useSelector((state: RootState) => state.dashboard);
  const user = useSelector((state: RootState) => state.auth);
  const [createRoom, { isLoading }] = useCreateServeRoomMutation();
  const { data: houseData } = useGetHousesByProviderQuery({
    provider: dashboard.providerId,
  });
  console.log(houseData);
  const houseOptions =
    houseData?.data?.map((item) => ({
      label: item.houseName,
      value: String(item.houseCode),
    })) ?? [];
  const descriptionModal = (row: roomParameterItem) => {
    openModal({
      id: "info-modal",
      content: () => (
        <div className="flex max-w-xs  flex-col gap-4 p-4">
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

  async function handleSubmit(values: any) {
    try {
      const payload: createRoomRequest = {
        ...values,
        roomUserId: user?.userId,
        roomHouseCode: houseSite?.houseCode,
      };

      const res = await createRoom(payload).unwrap();

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
  const formik = useFormik({
    initialValues: createRoomInit,
    onSubmit: handleSubmit,
  });
  console.log(formik.values);

  const houseSite = houseData?.data?.find(
    (item) => item.houseSiteCode === (formik.values as any)["houseSiteCode"]
  );
  return (
    <div className="flex flex-col">
      <Header
        title="Create Server Room"
        description="A server can have one or more server houses. A server house is provided by a provider."
      />

      <div className="flex flex-col  mt-5 mx-2 sm:mx-5 lg:mx-10 bg-gray-100 shadow-t-md rounded-t-md">
        <div className="bg-gradient-to-r flex justify-between items-center from-black to-green-800 rounded-t-md px-3 sm:px-5 py-5">
          <div>
            {" "}
            <p className="text-base sm:text-lg text-white">
              Create Server Room
            </p>
            <p className="text-xs text-gray-400 leading-tight">
              A server can have one or more server houses. A server house is
              provided by a provider.
            </p>
          </div>
          <div>
            <IconServerBolt color="white" />
          </div>
        </div>

        <div className=" flex mt-5   flex-col">
          {roomCreateData.map((item) => (
            <div
              className="flex items-center w-full py-[1px] border-b"
              key={item.ParameterSerial}
            >
              <p className="text-xs lg:w-1/6 w-1/2 pr-3 text-right">
                {item.ParameterMandatory === "Yes" && (
                  <span className="text-red-500 ml-1">*</span>
                )}{" "}
                {item.ParameterLabel}
              </p>{" "}
              <div className="lg:w-2/5 w-full pr-3 flex gap-1">
                <RenderField
                  name={item.ParameterName}
                  formik={formik}
                  type={item.ParameterInputType}
                  options={
                    item.ParameterSource === "houseCode" ? houseOptions : []
                  }
                />
                <div className=" flex justify-center">
                  <button
                    onClick={() => descriptionModal(item)}
                    className="rounded-full  flex items-center justify-center text-gray-600 hover:bg-gray-100 cursor-pointer"
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
            onClick={handleProceed}
            surfixIcon={<ArrowRight className="size-3" />}
          />
        </div>
      </div>
      <SiteDeployModal
        isOpen={isDeployModalOpen}
        onClose={handleCloseDeployModal}
        formik={formik}
        json={roomCreateData}
        isLoading={isLoading}
        progress={progress}
        onDeploy={handleDeploy}
      />
    </div>
  );
};
