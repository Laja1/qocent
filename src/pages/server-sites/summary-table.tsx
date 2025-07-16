import { DataTable, type ColumnDef } from "@/components/shared/datatable";
import type { summaryType } from "./type";
import { Plus } from "lucide-react";
import { ICON_MAP } from "@/utilities/constants/icons";
import { summaryData } from "./config";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RouteConstant } from "@/router/routes";

export const SummaryTable = () => {
  const navigate = useNavigate();
  const [resourceType, setResourceType] = useState("");
  const summaryColums: ColumnDef<summaryType>[] = [
    {
      id: "resourceIcon",
      header: "",
      accessorKey: "resourceType",
      cell: (row) => (
        <span className="hover:cursor-pointer">
          {ICON_MAP[row.resourceType as keyof typeof ICON_MAP]}
        </span>
      ),
      sortable: false,
    },
    {
      id: "resourceTypeText",
      header: "Resource Type",
      accessorKey: "resourceType",
      cell: (row) => (
        <span className="line-clamp-1 text-xs py-1">{row.resourceType}</span>
      ),
      sortable: false,
    },
    {
      id: "count",
      header: "Count",
      accessorKey: "count",
      cell: (row) => <span className="line-clamp-1 text-xs">{row.count}</span>,
      sortable: true,
    },
  ];

  const actions = [
    {
      label: `Add resource`,
      icon: Plus,
      onClick: (row: summaryType) => {
        setResourceType(row.resourceType);
        navigate(RouteConstant.dashboard.createResources.path, {});
        // openModal({
        //   id: `deploy-${row.id}`,
        //   content: () => (
        //     <DeployResources
        //       id={row.resourceType}
        //       siteCodeId={Number(rowData?.siteId)}
        //       closeModal={closeModal}
        //       onProceed={() => navigate("/create-new-resource")}
        //     />
        //   ),
        // });
      },
    },
  ];

  return (
    <div className=" w-full">
      <DataTable
        data={summaryData}
        columns={summaryColums}
        actions={actions}
        highlightedRowId={resourceType}
        onRowClick={(row) => setResourceType(row.id)}
        showDownload={false}
        showSearch={false}
        getRowId={(row) => row.id}
        // initialSorting={{ id: "resourceType", }}
      />
    </div>
  );
};
