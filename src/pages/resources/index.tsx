import { imgLinks } from "@/assets/assetLink";
import { Button, Header, Tabs, type ColumnDef } from "@/components/shared";
import { DataTable } from "@/components/shared/datatable";
import { Badge } from "@/components/ui/badge";
import { Edit, Eye, Trash2, PlusIcon } from "lucide-react";
import type { resourceType } from "./type";
import { resourceData } from "./config";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { SecurityTable } from "../server-sites/security-table";
import { CostTable } from "../server-sites/cost";
import { ResourceDetails } from "./resource-details";
import { ResourceModal } from "../create-new-resource/resource-modal";

export const resourcesColumns: ColumnDef<resourceType>[] = [
  {
    id: "resourceId",
    header: "RESOURCE ID",
    accessorKey: "resourceId",
    cell: (row) => (
      <span className="text-amber-800 line-clamp-1">{row.resourceId}</span>
    ),
    sortable: true,
  },
  {
    id: "resourceName",
    header: "RESOURCE NAME",
    accessorKey: "resourceName",
    cell: (row) => <span className="line-clamp-1">{row.resourceName}</span>,
    sortable: true,
  },
  {
    id: "resourceCode",
    header: "CODE",
    accessorKey: "resourceCode",
    cell: (row) => (
      <span className="text-amber-800 line-clamp-1">{row.resourceCode}</span>
    ),
    sortable: true,
    filterType: "select",
  },
  {
    id: "siteCode",
    header: "SITE CODE",
    accessorKey: "siteCode",
    cell: (row) => <span className="line-clamp-1">{row.siteCode}</span>,
    sortable: true,
    filterType: "select",
  },
  {
    id: "houseCode",
    header: "HOUSE CODE",
    accessorKey: "houseCode",
    cell: (row) => <span className="line-clamp-1">{row.houseCode}</span>,
    sortable: true,
    filterType: "select",
  },
  {
    id: "roomCode",
    header: "ROOM CODE",
    accessorKey: "roomCode",
    cell: (row) => <span className="line-clamp-1">{row.roomCode}</span>,
    sortable: true,
    filterType: "select",
  },
  {
    id: "type",
    header: "TYPE",
    accessorKey: "type",
    sortable: true,
    cell: (row) => (
      <Badge
        variant="outline"
        className={`${
          row.type === "Database"
            ? "border-blue-200 bg-blue-50 text-blue-700"
            : "border-amber-200 bg-amber-50 text-amber-700"
        } text-right justify-center flex w-full`}
      >
        {row.type}
      </Badge>
    ),
  },
  {
    id: "provider",
    header: "PROVIDER",
    accessorKey: "provider",
    sortable: true,
    cell: (row) => (
      <span className="text-center justify-center flex">
        {row.provider === "AWS" ? (
          <img src={imgLinks.awsdark} className="size-5" alt="AWS" />
        ) : (
          <img src={imgLinks.huawei} className="size-5" alt="Huawei" />
        )}
      </span>
    ),
  },
  {
    id: "createdAt",
    header: "DATE CREATED",
    headerClassName: "text-right",
    accessorKey: "createdAt",
    sortable: true,
    cell: (row) => <span className="text-right block">{row.createdAt}</span>,
  },
  {
    id: "ipRange",
    header: "IP RANGE",
    headerClassName: "text-right",
    accessorKey: "ipRange",
    sortable: true,
    cell: (row) => <span className="text-right block">{row.ipRange}</span>,
  },
];

const actions = [
  {
    label: "View",
    icon: Eye,
    onClick: (row: resourceType) => {
      console.log("View server resource:", row.resourceId);
      // TODO: Implement view functionality
    },
  },
  {
    label: "Edit",
    icon: Edit,
    onClick: (row: resourceType) => {
      console.log("Edit server resource:", row.resourceId);
      // TODO: Implement edit functionality
    },
  },
  {
    label: "Delete",
    icon: Trash2,
    onClick: (row: resourceType) => {
      console.log("Delete server resource:", row.resourceId);
      // TODO: Implement delete confirmation
    },
    variant: "destructive" as const,
  },
];

export const Resources = () => {
  const [rowId, setRowId] = useState<string>("1001");
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleOpenDeployModal = () => {
    setIsOpen(true);
  };
  

  const handleRowClick = (row: resourceType) => {
    setRowId(row.resourceId);
  };

  // Check if tabs should be shown (when a resource is selected)
  const tabShow = !!rowId;

  const tabData = [
    {
      id: 1,
      text: "Resource Details",
      component: (
        <div className="flex">
          <div className="w-1/4 mr-5 flex">
            <ResourceDetails
              resourceData={resourceData}
              selectedResourceId={rowId}
            />
          </div>
          {/* <div className="w-3/4">
            <Resource />
          </div> */}
        </div>
      ),
    },
    {
      id: 2,
      text: "Security",
      component: <SecurityTable />,
    },
    {
      id: 3,
      text: "Usage & Cost",
      component: <CostTable />,
    },
  ];

  return (
    <div className="bg-white h-full">
      <Header
        title="Server Resources"
        description="Manage your server resource"
      >
        <Button
          intent="tertiary"
          label="Create New Resource"
          prefixIcon={<PlusIcon className="size-4" />}
          size="small"
          onClick={handleOpenDeployModal}
        />
      </Header>

      <div className="px-5 flex flex-col">
        <DataTable
          data={resourceData}
          columns={resourcesColumns}
          searchPlaceholder="Search server resources by name, ID, or region..."
          pageSize={5}
          actions={actions}
          highlightedRowId={rowId}
          onRowClick={handleRowClick}
          getRowId={(row) => row.resourceId}
          initialSorting={{ id: "resourceName", desc: false }}
        />
      </div>

      {tabShow && (
        <div className="mx-5 mt-5">
          <Tabs tabs={tabData} />
        </div>
      )}
      <ResourceModal
        isOpen={isOpen}
        closeModal={() => setIsOpen(false)}
        onProceed={() => navigate("/create-new-resource")}
        onNavigate={(path, state) => navigate(path, { state })}
        onClose={() => setIsOpen(false)}
        id="" // optional, or pass based on your logic
        siteCodeId={undefined} // optional, or pass relevant id
      />
    </div>
  );
};
