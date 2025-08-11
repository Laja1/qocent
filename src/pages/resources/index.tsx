import { Button, Header, type ColumnDef } from "@/components/shared";
import { DataTable } from "@/components/shared/datatable";
import { Badge } from "@/components/ui/badge";
import { Edit, Eye, Trash2, PlusIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
// import { SecurityTable } from "../server-sites/security-table";
// import { CostTable } from "../server-sites/cost";
// import { ResourceDetails } from "./resource-details";
import { ResourceModal } from "../create-new-resource/resource-modal";
import type { resourceType } from "@/models/response/resourceResponse";
import type { RootState } from "@/store";
import { useSelector } from "react-redux";
import { imgLinks } from "@/assets/assetLink";
import {  getResourceTypeClassName } from "@/utilities/helper";
import { useGetAllResourcesQuery } from "@/service/kotlin/resourceApi";
import moment from "moment";
import { Card } from "@/components/ui/card";

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
  // {
  //   id: "siteCode",
  //   header: "SITE CODE",
  //   accessorKey: "siteCode",
  //   cell: (row) => <span className="line-clamp-1">{row.}</span>,
  //   sortable: true,
  //   filterType: "select",
  // },
  // {
  //   id: "houseCode",
  //   header: "HOUSE CODE",
  //   accessorKey: "houseCode",
  //   cell: (row) => <span className="line-clamp-1">{row.houseCode}</span>,
  //   sortable: true,
  //   filterType: "select",
  // },
  // {
  //   id: "roomCode",
  //   header: "ROOM CODE",
  //   accessorKey: "roomCode",
  //   cell: (row) => <span className="line-clamp-1">{row.roomCode}</span>,
  //   sortable: true,
  //   filterType: "select",
  // },
  {
    id: "resourceType",
    header: "TYPE",
    accessorKey: "resourceType",
    sortable: true,
    cell: (row) => (
      <Badge
        variant="outline"
        className={`${getResourceTypeClassName(row.resourceType)} text-right justify-center flex w-full`}
      >
        {row.resourceType}
      </Badge>
    ),
  },
  {
    id: "resourceProvider",
    header: "PROVIDER",
    accessorKey: "resourceProvider",
    sortable: true,
    cell: (row) => (
      <span className="text-center justify-center flex">
        {row.resourceProvider === "AWS" ? (
          <img src={imgLinks.awsdark} className="size-5" alt="AWS" />
        ) : (
          <img src={imgLinks.huawei} className="size-5" alt="Huawei" />
        )}
      </span>
    ),
  },
  {
    id: "resourceCreatedAt",
    header: "DATE CREATED",
    headerClassName: "text-right",
    accessorKey: "resourceCreatedAt",
    sortable: true,
    cell: (row) => (
      <span className="text-right block">
        {moment(row?.resourceCreatedAt, "MM/DD/YYYY").format(
          "YYYY-MM-DD"
        )}
      </span>
    ),
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
  const account = useSelector((state: RootState) => state.account);
  const { data: resourceData, isLoading } = useGetAllResourcesQuery(
    {
      accountCode: account?.accountCode,
    },
    {
      skip: !account?.accountCode,
    }
  );
  const [rowId, setRowId] = useState<number>(0);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleOpenDeployModal = () => {
    setIsOpen(true);
  };

  const handleRowClick = (row: resourceType) => {
    setRowId(row.resourceId);
  };

  // Check if tabs should be shown (when a resource is selected)
  // const tabShow = !!rowId;

  // const tabData = [
  //   {
  //     id: 1,
  //     text: "Resource Details",
  //     component: (
  //       <div className="flex">
  //         <div className="w-1/4 mr-5 flex">
  //           <ResourceDetails
  //             resourceData={resourceData}
  //             selectedResourceId={rowId}
  //           />
  //         </div>
  //         {/* <div className="w-3/4">
  //           <Resource />
  //         </div> */}
  //       </div>
  //     ),
  //   },
  //   {
  //     id: 2,
  //     text: "Security",
  //     component: <SecurityTable />,
  //   },
  //   {
  //     id: 3,
  //     text: "Usage & Cost",
  //     component: <CostTable />,
  //   },
  // ];

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

      <Card className="mx-5 px-5 mt-5 rounded-sm">
        <DataTable
          data={resourceData?.data || []}
          columns={resourcesColumns}
          searchPlaceholder="Search server resources by name, ID, or region..."
          pageSize={5}
          actions={actions}
          highlightedRowId={rowId}
          isLoading={isLoading}
          onRowClick={handleRowClick}
          getRowId={(row) => row.resourceId}
          initialSorting={{ id: "resourceName", desc: false }}
        />
      </Card>

      {/* {tabShow && (
        <div className="mx-5 mt-5">
          <Tabs tabs={tabData} />
        </div>
      )} */}
      <ResourceModal
        isOpen={isOpen}
        closeModal={() => setIsOpen(false)}
        onProceed={() => navigate("/create-new-resource")}
        onNavigate={(path, state) => {
          navigate(path, { state });
          setIsOpen(false);
        }}
        onClose={() => setIsOpen(false)}
        id="" // optional, or pass based on your logic
        siteCodeId={undefined} // optional, or pass relevant id
      />
    </div>
  );
};
