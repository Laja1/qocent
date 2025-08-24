import { Button, Header, type ColumnDef } from "@/components/shared";
import { DataTable } from "@/components/shared/datatable";
import { Eye } from "lucide-react";
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
      content: () => (
        <div className="p-4 space-y-4">
          <div className="text-xl font-semibold text-gray-800 dark:text-gray-200 border-b border-gray-200 dark:border-gray-700 pb-2">
            {securityClicked?.category}
          </div>
          <div>
            <div className="flex gap-4 text-sm text-gray-700 dark:text-gray-300">
              <div className="flex w-full space-x-2">
                <span className="font-medium text-sm text-gray-600 dark:text-gray-400">
                  Instance Type:
                </span>
                <div>{securityClicked?.type}</div>
              </div>
            </div>
            <div className="my-3 space-x-2">
              <span className="font-medium text-sm text-gray-600 dark:text-gray-400">
                Risk:
              </span>
              <div
                className={`inline-block px-2 py-1 rounded-md text-xs font-bold ${
                  securityClicked?.risk === "High"
                    ? "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400"
                    : securityClicked?.risk === "Medium"
                    ? "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400"
                    : "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                }`}
              >
                {securityClicked?.risk}
              </div>
            </div>

            <div className="">
              <p className="font-medium text-sm text-gray-600 dark:text-gray-400">
                Description:
              </p>
              <div className="text-xs text-gray-700 dark:text-gray-300">
                {securityClicked?.description}
              </div>
            </div>
            <div className="sm:col-span-2 mt-2">
              <span className="font-medium text-sm text-gray-600 dark:text-gray-400">
                Recommendation:
              </span>
              <div className="text-xs text-gray-700 dark:text-gray-300">
                {securityClicked?.recommendation}
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-gray-200 dark:border-gray-700">
            <Button onClick={() => closeModal()} label="Close" />
          </div>
        </div>
      ),
    });

  const getRiskClasses = (risk: string) => {
    switch (risk) {
      case "Low":
        return "bg-green-50 dark:bg-green-900/30 text-green-800 dark:text-green-400 border border-green-500 dark:border-green-400";
      case "Medium":
        return "bg-purple-50 dark:bg-purple-900/30 text-purple-800 dark:text-purple-400 border border-purple-500 dark:border-purple-400";
      case "High":
        return "bg-red-50 dark:bg-red-900/30 text-red-800 dark:text-red-400 border border-red-500 dark:border-red-400";
      default:
        return "bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-600";
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
      cell: (row) => (
        <span className="text-gray-900 dark:text-gray-100">{row.id}</span>
      ),
      sortable: true,
    },
    {
      id: "category",
      header: "Category",
      accessorKey: "category",
      cell: (row) => (
        <span className="text-gray-900 dark:text-gray-100">{row.category}</span>
      ),
      sortable: true,
    },
    {
      id: "type",
      header: "Type",
      accessorKey: "type",
      cell: (row) => (
        <span className="text-gray-900 dark:text-gray-100">{row.type}</span>
      ),
      sortable: true,
    },
    {
      id: "risk",
      header: "Risk",
      accessorKey: "risk",
      cell: (row) => (
        <div
          className={`px-2 py-1 rounded-md text-xs font-bold ${getRiskClasses(
            row.risk
          )}`}
        >
          {row.risk}
        </div>
      ),
      sortable: true,
    },
    {
      id: "description",
      header: "Description",
      accessorKey: "description",
      cell: (row) => (
        <span className="text-gray-700 dark:text-gray-300 line-clamp-2">
          {row.description}
        </span>
      ),
      sortable: true,
    },
  ];

  const actions = [
    {
      label: "View Details",
      icon: Eye,
      onClick: (row: secutiyAnalysisType) => {
        setRowId(row.id);
        handleOpen();
      },
    },
  ];

  return (
    <div className="w-full">
      <Header
        title="Security Analysis"
        description="Security analysis for your resources"
      />
      <DataTable
        data={securityAnalysisData}
        columns={securityTableColumn}
        actions={actions}
        highlightedRowId={rowId}
        onRowClick={(row) => setRowId(row.id)}
        showDownload={false}
        showSearch={false}
        getRowId={(row) => row.id}
      />
    </div>
  );
};
