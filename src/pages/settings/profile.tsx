/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, RenderField } from "@/components/shared";
import { useModal } from "@/components/shared/modal";
import { Info } from "lucide-react";
import { useFormik } from "formik";
import { providerOptions } from "@/components/not-shared/deploy-config";
import { IconMichelinStar } from "@tabler/icons-react";
import type { ParameterData } from "../create-new-site/type";
import { siteCreateJson } from "@/components/shared/json";

export const Profile = () => {
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
  const descriptionModal = (row: ParameterData) => {
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

  const initialValues = siteCreateJson.reduce((acc, item) => {
    acc[item.ParameterName] = ""; // or any logic you need
    return acc;
  }, {} as Record<string, any>) as ParameterData;

  const onSubmit = (values: typeof initialValues) => {
    console.log("Form submitted:", values);
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
  });
  console.log(formik.values);
  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col   bg-gray-100 shadow-t-md rounded-t-md">
        <div className="bg-gradient-to-r flex justify-between from-black to-green-800 rounded-t-md px-3 sm:px-5 py-5">
          <div>
            <p className="text-base sm:text-lg text-white">
              Profile Information
            </p>
            <p className="text-xs text-gray-400 leading-tight">
              A server can have one or more server houses. A server house is
              provided by a provider.
            </p>
          </div>
          <div>
            <IconMichelinStar color="white" size={40} />
          </div>
        </div>

        <div className=" grid grid-cols-2 px-5 mt-5   flex-col">
          {siteCreateJson.map((item) => (
            <div className="   w-full py-[1px] " key={item.ParameterSerial}>
              <div>
                <p className="text-xs  pr-3">{item.ParameterLabel}</p>
                <div className=" pr-3 flex gap-1">
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
            </div>
          ))}
        </div>

        <div className="flex m-3 sm:m-5 justify-end">
          <Button label="Save" onClick={handleProceed} />
        </div>
      </div>
    </div>
  );
};
