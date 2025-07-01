import { imgLinks } from "@/assets/assetLink";
import { Button, Header, type ColumnDef } from "@/components/shared";
import { DataTable } from "@/components/shared/datatable";
import { Badge } from "@/components/ui/badge";
import { Edit, Eye, Trash2, PlusIcon } from "lucide-react";
import type { resourceType } from "./type";
import { resourceData } from "./config";
import { useNavigate } from "react-router-dom";

export const Resources = () => {
  // const [rowId, setRowId] = useState("1001");
  const navigate = useNavigate();
  const resourcesColumns: ColumnDef<resourceType>[] = [
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
      accessorKey: "siteCode",
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

  // const resource = resourceData.find(
  //   (resource) => resource.resourceId === rowId
  // ) as resourceType | undefined;

  return (
    <div className="bg-white h-full">
      <Header
        title="Server Resources"
        description="Manage your server resource"
      >
        <Button
          intent="tertiary"
          label="Create New resource"
          prefixIcon={<PlusIcon className="size-4" />}
          size="small"
          onClick={() => navigate("/create-resource")}
        />
      </Header>

      <div className="px-5 flex flex-col">
        <DataTable
          data={resourceData}
          columns={resourcesColumns}
          searchPlaceholder="Search server resources by name, ID, or region..."
          pageSize={5}
          actions={actions}
          getRowId={(row) => row.resourceId}
          initialSorting={{ id: "siteName", desc: false }}
        />
      </div>
      {/* <ResourceTab resource={resource} /> */}
    </div>
  );
};
 