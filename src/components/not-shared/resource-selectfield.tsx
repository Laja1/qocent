/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useFormik, type FormikProps } from "formik";
import { Button, SelectField } from "../shared";
import { useLazyGetSitesQuery } from "@/service/siteApi";
// import { useGetSitesQuery } from "@/service/siteApi";

const resourceSelect1 = [
  { label: "Resource A", value: "resource_a" },
  { label: "Resource B", value: "resource_b" },
  { label: "Resource C", value: "resource_c" },
  { label: "Resource D", value: "resource_d" },
];

const resourceSelect2 = [
  { label: "Service X", value: "service_x" },
  { label: "Service Y", value: "service_y" },
  { label: "Service Z", value: "service_z" },
  { label: "Service W", value: "service_w" },
];

const resourceSelect3 = [
  { label: "Item Alpha", value: "item_alpha" },
  { label: "Item Beta", value: "item_beta" },
  { label: "Item Gamma", value: "item_gamma" },
  { label: "Item Delta", value: "item_delta" },
];

// Map field names to their corresponding options
const optionsMap: Record<string, { label: string; value: string }[]> = {
  resourceSelect1,
  resourceSelect2,
  resourceSelect3,
};

type ResourceSelectFieldProps = {
  name: string;
  label?: string;
  formik: FormikProps<any>;
  placeholder?: string;
  parameterLookup:string
};

export const ResourceSelectField = ({
  name,
  label,
  formik,
  placeholder,
  parameterLookup,
}: ResourceSelectFieldProps) => {
  const [options, setOptions] = useState<{ label: string; value: string }[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(false);
  const [triggerGetSites] = useLazyGetSitesQuery();

  const handleFetchOptions = async (provider: string) => {
    setIsLoading(true);
    try {
      const res = await triggerGetSites({ provider }).unwrap();

      const mappedOptions = res.data?.map((site: any) => ({
        label: site.siteName,
        value: site.siteCode,
      })) ?? [];

      setOptions(mappedOptions);
    } catch (error) {
      console.error("Error fetching options:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const error =
    formik.touched[name] && formik.errors[name]
      ? (formik.errors[name] as string)
      : undefined;

  return (
    <div className="flex gap-2 w-full">
      <SelectField
        name={name}
        label={label}
        options={options}
        placeholder={
          options.length === 0
            ? placeholder || "Click 'Fetch options' to load..."
            : "Choose a resource..."
        }
        formik={formik}
        error={error}
        disabled={options.length === 0}
        className="w-full"
      />

      <Button
        label={isLoading ? "Loading..." : "Fetch options"}
        className="mx-3 border py-0 text-xs disabled:opacity-50"
        onClick={() => handleFetchOptions(parameterLookup)}
        disabled={isLoading}
      />
    </div>
  );
};


export const roomCreateData=[
  {"ParameterProvider":"aws","ParameterObject":"ServerRoom","ParameterSerial":"1","ParameterName":"houseCode","ParameterField":"houseCode","ParameterDataType":"Text","ParameterInputType":"ListBox","ParameterMandatory":"Yes","ParameterLabel":"House Code","ParameterInput":"Yes","ParameterLength":"20","ParameterValidation":"","ParameterSource":"","ParameterInfo1":"Select from the list of sites that you have created.","ParameterInfo2":"If you do not have a site, create one first. A srever house needs a server site.","ParameterInfo3":"Basically, a server house needs to be deployed in a server site."},
  {"ParameterProvider":"aws","ParameterObject":"ServerRoom","ParameterSerial":"4","ParameterName":"Name","ParameterField":"resourceName","ParameterDataType":"Text","ParameterInputType":"Textbox","ParameterMandatory":"Yes","ParameterLabel":"Room Name","ParameterInput":"Yes","ParameterLength":"20","ParameterValidation":"","ParameterSource":"","ParameterInfo1":"Provide the room name","ParameterInfo2":"","ParameterInfo3":""},
  {"ParameterProvider":"aws","ParameterObject":"ServerRoom","ParameterSerial":"2","ParameterName":"roomCode","ParameterField":"roomCode","ParameterDataType":"Text","ParameterInputType":"Textbox","ParameterMandatory":"Yes","ParameterLabel":"Room Code","ParameterInput":"Yes","ParameterLength":"20","ParameterValidation":"","ParameterSource":"","ParameterInfo1":"A simple unique code that you can remember.","ParameterInfo2":"The code appears on most screeens, so please choose a code that is self-descrptive and can be remembered easily.","ParameterInfo3":""},
]
export const MultiResourceForm = () => {
  const formik = useFormik({
    initialValues: {
      resourceSelect1: "",
      resourceSelect2: "",
      resourceSelect3: "",
    },
    onSubmit: (values) => {
      console.log("Form submitted with values:", values);
    },
  });

  const handleGetValues = () => {
    console.log("Current form values:", formik.values);
  };

  return (
    <div className="space-y-4 p-4">
      <h2 className="text-lg font-semibold">Multi Resource Selection Form</h2>

      <div className="space-y-3">
      

        {roomCreateData.map((item)=>
        <ResourceSelectField
        name={item.ParameterName}
        parameterLookup={formik.values.resourceSelect1}
        formik={formik}
        placeholder="Select resource..."
      />
        )}
      </div>

      <div className="flex gap-2">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={handleGetValues}
        >
          Get Values
        </button>

        <button
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          onClick={() => formik.handleSubmit()}
        >
          Submit Form
        </button>
      </div>

      {/* Display current values */}
      <div className="mt-4 p-3 bg-gray-100 rounded">
        <h3 className="font-medium">Current Values:</h3>
        <pre className="text-sm mt-1">
          {JSON.stringify(formik.values, null, 2)}
        </pre>
      </div>
    </div>
  );
};
