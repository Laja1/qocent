import { Button, Header, type ColumnDef } from "@/components/shared";
import { DataTable } from "@/components/shared/datatable";
import { Eye, PlusIcon } from "lucide-react";
import { useState } from "react";
import type { secutiyAnalysisType } from "./type";
import { securityAnalysisData } from "./config";
import { useModal } from "@/components/shared/modal";

export const SecurityTable = () => {
  const [rowId, setRowId] = useState("104");
  const { openModal, closeModal } = useModal();
  const securityClicked = securityAnalysisData.find(
    (item) => item.id === rowId
  );
  const handleOpen = () =>
    openModal({
      id: `resource-${securityClicked?.id}`,
      content: (
        <div className="p-4 space-y-4">
          <div className="text-xl font-semibold text-gray-800 border-b pb-2">
            {securityClicked?.category}
          </div>
<div>
<div className="flex gap-4 text-sm  text-gray-700">
            <div className="flex w-full space-x-2">
              <span className="font-medium text-sm text-gray-600">Instance Type:</span>
              <div>{securityClicked?.type}</div>
            </div>
            
          </div>
          <div className="my-3 space-x-2">
              <span className="font-medium  text-sm text-gray-600">Risk:</span>
              <div
                className={`inline-block px-2 py-1 rounded-md text-xs font-bold ${
                  securityClicked?.risk === "High"
                    ? "bg-red-100 text-red-700"
                    : securityClicked?.risk === "Medium"
                    ? "bg-purple-100 text-purple-700"
                    : "bg-green-100 text-green-700"
                }`}
              >
                {securityClicked?.risk}
              </div>
            </div>
          
<div className="">
              <p className="font-medium text-sm text-gray-600">Description:</p>
              <div className=" text-xs">{securityClicked?.description}</div>
            </div>
            <div className="sm:col-span-2 mt-2">
              <span className="font-medium text-sm text-gray-600">Recommendation:</span>
              <div className=" text-xs">{securityClicked?.recommendation}</div>
            </div>
</div>
         

          <div className="flex justify-end pt-4 border-t">
            <Button onClick={() => closeModal()} label="Close" />
          </div>
        </div>
      ),
    });

  const getRiskClasses = (risk: string) => {
    switch (risk) {
      case "Low":
        return "bg-green-50 text-green-800 border border-green-500";
      case "Medium":
        return "bg-purple-50 text-purple-800 border border-purple-500";
      case "High":
        return "bg-red-50 text-red-800 border border-red-500";
      default:
        return "bg-gray-50 text-gray-800 border border-gray-300";
    }
  };

  const securityTableColumn: ColumnDef<secutiyAnalysisType>[] = [
    // {
    //   id: "favourite",
    //   header: "",
    //   accessorKey: "favourite",
    //   cell: (row) => (
    //     <span className="hover:cursor-pointer">
    //       <Star key={row.id} size={16} color="green"/>
    //     </span>
    //   ),
    //   sortable: true,
    // },
    {
      id: "id",
      header: "ID",
      accessorKey: "id",
      cell: (row) => <span className="">{row.id}</span>,
      sortable: true,
    },
    {
      id: "category",
      header: "Category",
      accessorKey: "category",
      cell: (row) => (
        <span className="line-clamp-1 font-brfirma-bold  text-xs">
          {row.category}
        </span>
      ),
      sortable: true,
    },
    {
      id: "type",
      header: "Type",
      accessorKey: "type",
      cell: (row) => (
        <span className="hover:text-red-500 line-clamp-1">{row.type}</span>
      ),
      sortable: true,
    },
    {
      id: "description",
      header: "Description",
      accessorKey: "description",
      sortable: true,
      cell: (row) => <span className="line-clamp-1  ">{row.description}</span>,
    },
    {
      id: "risk",
      header: "Risk",
      accessorKey: "risk",
      sortable: true,
      cell: (row) => (
        <div
          className={`flex items-center justify-center rounded-md p-1 text-[8px] ${getRiskClasses(
            row.risk
          )}`}
        >
          {row.risk}
        </div>
      ),
    },
    {
      id: "recommendation",
      header: "Recommendation",
      accessorKey: "recommendation",
      sortable: true,
      cell: (row) => (
        <span className="hover:text-red-500 line-clamp-1">
          {row.recommendation}
        </span>
      ),
    },
  ];

  const actions = [
    {
      label: "View More",
      icon: Eye,
      onClick: (row: secutiyAnalysisType) => {
        console.log("View server room:", row.id);
        handleOpen();
      },
    },
  ];

  return (
    <div className=" h-full mt-5">
      <Header title="Server Sites" description="Manage your server site">
        <Button
          intent="tertiary"
          label="Create New Site"
          prefixIcon={<PlusIcon className="size-4" />}
          size="small"
        />
      </Header>

      <div className="flex gap-4  flex-col overflow-y-auto overflow-y-hidden h-full">
        <div className="  rounded-sm">
          <DataTable
            data={securityAnalysisData}
            columns={securityTableColumn}
            searchPlaceholder="Search server rooms by name, ID, or region..."
            pageSize={5}
            actions={actions}
            showDownload={false}
            showSearch={false}
            onRowClick={(row) => setRowId(row.id)}
            getRowId={(row) => row.id}
            highlightedRowId={rowId}
            initialSorting={{ id: "siteName", desc: false }}
          />
        </div>
      </div>
    </div>
  );
};
