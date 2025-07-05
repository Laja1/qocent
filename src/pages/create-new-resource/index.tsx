import { useState } from "react";
import { useFormik } from "formik";
import { Plus, PlusIcon } from "lucide-react";
import type { ColumnDef } from "@/components/shared/datatable";
import { DataTable } from "@/components/shared/datatable";
import { Button, Header, Textfield } from "@/components/shared";
import { DeployResources } from "@/components/not-shared/deploy-resources";
import { useModal } from "@/components/shared/modal";
import type { CreateNewResourceProps } from "./type";

const resourceData: CreateNewResourceProps[] = [
  { resourceParamter: "Availability Zone", resource: "availabilityZone" },
  { resourceParamter: "Instance Type", resource: "instanceType" },
  { resourceParamter: "Region", resource: "region" },
];

export const CreateNewResource = () => {
  const { openModal, closeModal } = useModal();
  const [resourceType, setResourceType] = useState(resourceData[0].resource);

  const formik = useFormik({
    initialValues: {
      availabilityZone: "",
      instanceType: "",
      region: "",
    },
    onSubmit: (values) => {
      console.log("Form values:", values);
    },
    enableReinitialize: true,
  });

  const resourceColumns: ColumnDef<CreateNewResourceProps>[] = [
    {
      id: "label",
      header: "Resource Parameters",
      accessorKey: "resourceParamter",
      cell: (row) => (
        <span className="text-amber-800 font-brfirma-bold font-medium line-clamp-1">
          {row.resourceParamter}
        </span>
      ),
    },
    {
      id: "value",
      header: "Value",
      accessorKey: "resource",
      cell: (row) => {
        const fieldName = row.resource as keyof typeof formik.initialValues;
  
        return (
          <Textfield formik={formik} name={fieldName} className="h-6" />
        );
      },
    },
  ];
  
  

  const actions = [
    {
      label: "Add resource",
      icon: Plus,
      onClick: (row: CreateNewResourceProps) => {
        setResourceType(row.resource);
        openModal({
          id: `deploy-${row.resource}`,
          content: (
            <DeployResources
              id={row.resource}
              closeModal={closeModal}
            />
          ),
        });
      },
    },
  ];

  return (
    <div className="w-full">
      <Header title="Create New Resource" description="ss">
        <Button
          intent="tertiary"
          label={`Create New 'Resource'`}
          prefixIcon={<PlusIcon className="size-4" />}
          size="small"
        />
      </Header>

      <div className="mx-5">
        <DataTable
          data={resourceData}
          columns={resourceColumns}
          actions={actions}
          highlightedRowId={resourceType}
          onRowClick={(row) => setResourceType(row.resource)}
          showDownload={false}
          showSearch={false}
          getRowId={(row) => row.resource}
        />
      </div>
    </div>
  );
};
