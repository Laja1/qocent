/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Header, RenderField } from "@/components/shared";
import { useModal } from "@/components/shared/modal";
import { ArrowRight, Info } from "lucide-react";
import { houseCreateData } from "./data";
import { useFormik } from "formik";
import { providerOptions } from "@/components/not-shared/deploy-config";
import type { HouseParameterItem } from "./type";

export const CreateNewHouse = () => {
  const { openModal, closeModal } = useModal();

  const handleProceed = () => {
    openModal({
      id: "deploy-confirm",
      content: (
        <div className="flex flex-col w-full gap-4">
          <div className="items-center flex flex-col w-full space-y-2">
            <h2 className="text-lg font-semibold border-b">Ready to Deploy?</h2>
          </div>
          <div className="text-sm text-gray-600 space-y-1">
            <p>{/* Add your deployment confirmation details here */}</p>
          </div>
          <Button
            label="Deploy"
            onClick={() => {
              closeModal();
            }}
          />
        </div>
      ),
    });
  };
  const descriptionModal = (row: HouseParameterItem) => {
    openModal({
      id: "info-modal",
      content: (
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

  const initialValues = houseCreateData.reduce((acc, item) => {
    acc[item.ParameterName] = ""; // or any logic you need
    return acc;
  }, {} as Record<string, any>) as HouseParameterItem;

  const onSubmit = (values: typeof initialValues) => {
    console.log("Form submitted:", values);
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
  });
  console.log(formik.values);
  return (
    <div className="flex flex-col">
      <Header
        title="Create Server House"
        description="A server can have one or more server houses. A server house is provided by a provider."
      />

      <div className="flex flex-col  mt-5 mx-2 sm:mx-5 lg:mx-10 bg-gray-100 shadow-t-md rounded-t-md">
        <div className="bg-gradient-to-r from-black to-green-800 rounded-t-md pl-3 sm:pl-5 py-5">
          <p className="text-base sm:text-lg text-white">Create Server House</p>
          <p className="text-xs text-gray-400 leading-tight">
            A server can have one or more server houses. A server house is
            provided by a provider.
          </p>
        </div>

        <div className=" flex mt-5   flex-col">
          {houseCreateData.map((item) => (
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
                    item.ParameterSource === "ProviderList"
                      ? providerOptions
                      : []
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
    </div>
  );
};
