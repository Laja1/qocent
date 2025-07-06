/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Info } from "lucide-react";
import { useFormik } from "formik";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import type { ParameterData } from "./type";
import { siteCreateJson } from "./json";
import { EditableDataTable } from "@/components/shared";
import { useModal } from "@/components/shared/modal";

export const CreateNewSiteTable = () => {
  const { openModal, closeModal } = useModal();

  const [parameters, setParameters] = useState<ParameterData[]>(siteCreateJson);
  const [dateValues, setDateValues] = useState<
    Record<string, Date | undefined>
  >({});
  type FormValues = {
    siteName: string;
    siteProvider: string;
    siteCode: string;
    siteDescription: string;
    siteEndDate: string;
    siteEndOfLifeAction: string;
  };

  const formik = useFormik<FormValues>({
    initialValues: {
      siteName: "",
      siteProvider: "",
      siteCode: "",
      siteDescription: "",
      siteEndDate: "",
      siteEndOfLifeAction: "",
    },
    onSubmit: () => {},
  });

  const selectOptions: Record<string, { label: string; value: string }[]> = {
    siteProvider: [
      { value: "AWS", label: "AWS - Amazon Web Services" },
      { value: "HCS", label: "HCS - HUAWEI Cloud Services" },
      { value: "GCP", label: "GCP - Google Cloud Services" },
      { value: "Azure", label: "Microsoft Azure" },
    ],
    siteEndOfLifeAction: [
      { value: "archive", label: "Archive" },
      { value: "delete", label: "Delete" },
      { value: "extend", label: "Extend" },
    ],
  };

  const handleDateChange = (parameterName: string, date: Date | undefined) => {
    setDateValues((prev) => ({ ...prev, [parameterName]: date }));
    formik.setFieldValue(parameterName, date ? format(date, "yyyy-MM-dd") : "");
  };

  const descriptionModal = (row: ParameterData) => {
    openModal({
      id: "info-modal",
      content: (
        <div className="flex max-w-md  flex-col gap-4 p-4">
          <h2 className="text-lg  font-semibold border-b pb-2">
            {row.ParameterLabel}
          </h2>
          <div className="text-sm text-gray-600 space-y-2">
            {row.ParameterInfo1 && <p>{row.ParameterInfo1}</p>}
            {row.ParameterInfo2 && <p>{row.ParameterInfo2}</p>}
            {row.ParameterInfo3 && <p>{row.ParameterInfo3}</p>}
          </div>
          <Button onClick={closeModal}>Close</Button>
        </div>
      ),
    });
  };

  const columns = [
    {
      id: "ParameterLabel",
      header: "Field",
      accessorKey: "ParameterLabel" as keyof ParameterData,
      cell: (row: ParameterData) => (
        <div className="font-medium text-right pr-4 max-w-[200px]">
          {row.ParameterLabel}
          {row.ParameterMandatory === "Yes" && (
            <span className="text-red-500 ml-1">*</span>
          )}
        </div>
      ),
      headerClassName: "w-[200px]",
    },
    {
      id: "UserValue",
      header: "Value",
      accessorKey: "UserValue" as keyof ParameterData,
      editable: true,
      editType: "text" as const,
      cell: (row: ParameterData) => {
        const currentValue =
          formik.values[row.ParameterName as keyof FormValues] || row.UserValue;
        return (
          <div className="max-w-[500px]  text-gray-500 italic min-h-[30px] p-2 rounded flex items-center">
            {row.ParameterInputType === "DateBox" &&
            dateValues[row.ParameterName]
              ? format(dateValues[row.ParameterName]!, "PPP")
              : currentValue || `Enter ${row.ParameterLabel.toLowerCase()}`}
          </div>
        );
      },
      editCell: (
        row: ParameterData,
        value: any,
        onChange: (value: any) => void
      ) => {
        const fieldValue =
          formik.values[row.ParameterName as keyof FormValues] || value || "";

        return (
          <div className="w-full ">
            {row.ParameterInputType === "CommentBox" ? (
              <textarea
                name={row.ParameterName}
                value={fieldValue}
                onChange={(e) => {
                  formik.handleChange(e);
                  onChange(e.target.value);
                }}
                onBlur={formik.handleBlur}
                placeholder={`Enter ${row.ParameterLabel.toLowerCase()}`}
                maxLength={parseInt(row.ParameterLength)}
                className="block w-full bg-white border border-green-800 rounded-[4px] h-[80px] px-3 py-2 text-xs resize-none focus:ring-1 focus:ring-green-900 focus:border-black"
              />
            ) : row.ParameterInputType === "DateBox" ? (
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal h-[30px] border-green-800 focus:ring-1 focus:ring-green-900 focus:border-black text-xs"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateValues[row.ParameterName] ? (
                      format(dateValues[row.ParameterName]!, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={dateValues[row.ParameterName]}
                    onSelect={(date) => {
                      handleDateChange(row.ParameterName, date);
                      onChange(date ? format(date, "yyyy-MM-dd") : "");
                    }}
                    className="rounded-lg border"
                  />
                </PopoverContent>
              </Popover>
            ) : row.ParameterInputType === "ListBox" ? (
              <select
                name={row.ParameterName}
                value={fieldValue}
                onChange={(e) => {
                  formik.handleChange(e);
                  onChange(e.target.value);
                }}
                onBlur={formik.handleBlur}
                className="block w-full bg-white my-1 border border-green-800 rounded-[4px] h-[30px] px-3 text-xs focus:ring-1 focus:ring-green-900 focus:border-black"
              >
                <option value="">
                  Select {row.ParameterLabel.toLowerCase()}
                </option>
                {selectOptions[row.ParameterName]?.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type="text"
                name={row.ParameterName}
                value={fieldValue}
                onChange={(e) => {
                  formik.handleChange(e);
                  onChange(e.target.value);
                }}
                onBlur={formik.handleBlur}
                placeholder={`Enter ${row.ParameterLabel.toLowerCase()}`}
                maxLength={parseInt(row.ParameterLength)}
                className="block w-full bg-white my-1 border border-green-800 rounded-[4px] h-[30px] px-3 text-xs focus:ring-1 focus:ring-green-900 focus:border-black"
              />
            )}

            {formik.touched[row.ParameterName as keyof FormValues] &&
              formik.errors[row.ParameterName as keyof FormValues] && (
                <div className="text-red-500 text-xs mt-1">
                  {formik.errors[row.ParameterName as keyof FormValues]}
                </div>
              )}
          </div>
        );
      },
      headerClassName: "w-[400px]",
    },
    {
      id: "info",
      header: "Info",
      accessorKey: "ParameterInfo1" as keyof ParameterData,
      cell: (row: ParameterData) => (
        <div className="w-[10px] flex justify-center">
          <button
            onClick={() => descriptionModal(row)}
            className="rounded-full w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 cursor-pointer"
            title="View more info"
          >
            <Info size={16} />
          </button>
        </div>
      ),
      headerClassName: "w-[50px]",
    },
  ];

  const handleDataChange = (newData: ParameterData[]) => {
    setParameters(newData);
    newData.forEach((param) => {
      if (param.UserValue !== undefined) {
        formik.setFieldValue(param.ParameterName, param.UserValue);
      }
    });
  };

  return (
      <div className="mx-auto items-left flex justify-start   w-full">
              <div className="lg:w-4/5 w-full">
      <EditableDataTable
        data={parameters}
        columns={columns}
        editable={true}
        formik={formik}
        showTableHeader={false}
        onDataChange={handleDataChange}
        showDownload={false}
        showSearch={false}
        getRowId={(row, index) => `${row.ParameterName}-${index}`}
      />
    </div></div>
  );
};
