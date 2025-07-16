/* eslint-disable @typescript-eslint/no-explicit-any */
import { imgLinks } from "@/assets/assetLink";
import { Button, Header, Tabs, type ColumnDef } from "@/components/shared";
import { DataTable } from "@/components/shared/datatable";
import { Badge } from "@/components/ui/badge";
import { sitesData, type ServerRoomType } from "@/utilities/constants/config";
import { Edit, Eye, Trash2, PlusIcon, Plus } from "lucide-react";
import { useState } from "react";
import { ServerSitesTable2 } from "./server-sites-table";
import { Card } from "@/components/ui/card";
import { SiteLevel } from "../architectural-room/site-level";
import { AlertBox } from "@/components/shared/alerts";
import { SummaryTable } from "./summary-table";
import { Resource } from "../resource";
import { SecurityTable } from "./security-table";
import { DeployResources } from "@/components/not-shared/deploy-resources";
import { useModal } from "@/components/shared/modal";
import { useNavigate } from "react-router-dom";
import { CostTable } from "./cost";
import { useGetSitesQuery } from "@/service/siteApi";
import { formatDate } from "@/utilities/helper";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import { RouteConstant } from "@/router/routes";
import { MultiResourceForm } from "@/components/not-shared/resource-selectfield";

export const ServerSites = () => {
  const navigate = useNavigate();
  const dashboard = useSelector((state: RootState) => state.dashboard);
  const user = useSelector((state: RootState) => state.auth);
  const [tabShow, setTabShow] = useState(false);
  const { data, isLoading } = useGetSitesQuery({
    provider: dashboard.provider,
    userId: user?.userId || 0,
  });
  console.log(dashboard);
  console.log(data);
  const { openModal, closeModal } = useModal();
  const [rowId, setRowId] = useState(100004);
  const [showAlert, setShowAlert] = useState(true);

  const serverRoomColumns: ColumnDef<ServerRoomType>[] = [
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
      accessorKey: "siteId",
      cell: (row) => <span className="">{row.siteId}</span>,
      sortable: true,
    },
    {
      id: "siteName",
      header: "SITE NAME",
      accessorKey: "siteName",
      cell: (row) => (
        <span className="line-clamp-1 font-brfirma-bold  text-xs">
          {row.siteName}
        </span>
      ),
      sortable: true,
    },
    {
      id: "siteCode",
      header: "SITE CODE",
      accessorKey: "siteCode",
      cell: (row) => (
        <span className="hover:text-red-500 line-clamp-1">{row.siteCode}</span>
      ),
      sortable: true,

      // filterOptions: [
      //   { label: "US", value: "US" },
      //   { label: "UK", value: "UK" },
      //   { label: "France", value: "France" },
      //   { label: "Germany", value: "Germany" },
      //   { label: "South Africa", value: "South Africa" },
      // ],
    },
    // {
    //   id: "alerts",
    //   header: "ALERTS",
    //   accessorKey: "alerts",
    //   sortable: true,
    //   cell: (row) => (
    //     <div
    //       className={`flex items-center justify-center w-5 text-[10px] h-5 rounded-full ${
    //         row.alerts > 0
    //           ? "bg-red-50 text-red-800 border border-red-500"
    //           : "bg-green-50 text-green-800 border border-green-500"
    //       }`}
    //     >
    //       {row.alerts}
    //     </div>
    //   ),
    // },
    // {
    //   id: "houses",
    //   header: "HOUSES (VPC)",
    //   accessorKey: "houses",
    //   sortable: true,
    //   cell: (row) => (
    //     <span className="text-center justify-center flex">{row.houses}</span>
    //   ),
    // },
    {
      id: "siteProvider",
      header: "PROVIDER",
      accessorKey: "siteProvider",
      headerClassName: "text-center ",
      sortable: true,
      cell: (row) => (
        <span className="text-center justify-center items-left  flex">
          {row.siteProvider === "aws" ? (
            <img src={imgLinks.awsdark} className="size-5" alt="AWS" />
          ) : (
            <img src={imgLinks.huawei} className="size-5" alt="Huawei" />
          )}
        </span>
      ),
    },
    {
      id: "siteStatus",
      header: "STATUS",
      accessorKey: "siteStatus",
      cell: (row) => (
        <div className="">
          <Badge
            variant="outline"
            className={
              row.siteStatus === "ACTIVE"
                ? "bg-green-50 text-green-800 border-green-500 text-[10px] "
                : "bg-red-50 text-red-800 border-red-500 text-[10px]"
            }
          >
            {row.siteStatus}
          </Badge>
        </div>
      ),
      sortable: true,
      filterType: "select",
      filterOptions: [
        { label: "Active", value: "Active" },
        { label: "Maintenance", value: "Maintenance" },
      ],
    },
    {
      id: "siteCreatedAt",
      header: "DATE CREATED",
      headerClassName: "text-right",
      accessorKey: "siteCreatedAt",
      sortable: true,
      cell: (row) => (
        <span className="text-right block">
          {formatDate(row.siteCreatedAt)}
        </span>
      ),
    },
    // {
    //   id: "bill",
    //   header: "BILL (USD)",
    //   accessorKey: "bill",
    //   headerClassName: "text-right",
    //   cell: (row) => (
    //     <span className="block text-green-700 text-right">
    //       {row.bill.toLocaleString("en-US", { minimumFractionDigits: 2 })}
    //     </span>
    //   ),
    //   sortable: true,
    // },
    // {
    //   id: "balance",
    //   header: "BALANCE (USD)",
    //   headerClassName: "text-right",
    //   accessorKey: "balance",
    //   cell: (row) => (
    //     <span className="block text-right text-green-700">
    //       {row.balance.toLocaleString("en-US", { minimumFractionDigits: 2 })}
    //     </span>
    //   ),
    //   sortable: true,
    // },
  ];

  const row = data?.data.find((item: any) => item.siteId === rowId);

  const actions = [
    {
      label: "View",
      icon: Eye,
      onClick: (row: ServerRoomType) => {
        console.log("View server room:", row.siteId);
        // TODO: Implement view functionality
      },
    },
    {
      label: "Edit",
      icon: Edit,
      onClick: (row: ServerRoomType) => {
        console.log("Edit server room:", row.siteId);
        // TODO: Implement edit functionality
      },
    },
    {
      label: "Deploy Resource",
      icon: Plus,
      onClick: (row: ServerRoomType) => {
        openModal({
          id: `deploy-${row.siteId}`,
          content: () => (
            <DeployResources
              siteCodeId={row.siteId}
              closeModal={closeModal}
              onProceed={() => navigate("/create-new-resource")}
            />
          ),
        });
      },
    },
    {
      label: "Delete",
      icon: Trash2,
      onClick: (row: ServerRoomType) => {
        console.log("Delete server room:", row.siteId);
        // TODO: Implement delete confirmation
      },
      variant: "destructive" as const,
    },
  ];

  const handleRowClick = (row: ServerRoomType) => {
    setTabShow(true);
    setRowId(row.siteId);
  };

  const tabData = [
    {
      id: 1,
      text: "Summary",
      component: (
        <div className="flex">
          <div className="w-1/4 mr-5 flex">
            <div className=" flex flex-col w-full">
              {row && <SummaryTable />}
              <Button
                label="Add Resource"
                prefixIcon={<PlusIcon className="size-4" />}
                size="small"
                className="mt-2 py-0 bg-black"
                intent="secondary"
                onClick={() =>
                  openModal({
                    id: `deploy-${rowId}`,
                    content: () => (
                      <DeployResources
                        closeModal={closeModal}
                        onProceed={() => navigate("/create-new-resource")}
                      />
                    ),
                  })
                }
              />
            </div>
          </div>
          <div className="w-3/4">
            <Resource />
          </div>
        </div>
      ),
    },
    {
      id: 2,
      text: "Resources",
      component: (
        <div className="">
          <ServerSitesTable2 rowId={rowId} />
        </div>
      ),
    },
    {
      id: 3,
      text: "Architecture",
      component: <SiteLevel sitesData={sitesData} />,
    },
    {
      id: 4,
      text: "Security",
      component: <SecurityTable />,
    },
    {
      id: 5,
      text: "Cost",
      component: <CostTable />,
    },
  ];

  return (
    <div className=" h-full mt-5">
      <Header title="Server Sites" description="Manage your server site">
        <Button
          intent="tertiary"
          label="Create New Site"
          onClick={() => navigate(RouteConstant.dashboard.createnewsite.path)}
          prefixIcon={<PlusIcon className="size-4" />}
          size="small"
        />
      </Header>

      <div className="flex gap-4  flex-col overflow-y-hidden h-full">
        <Card className="mx-5 px-5 rounded-sm">
          <DataTable
            data={data?.data || []}
            columns={serverRoomColumns}
            searchPlaceholder="Search server rooms by name, ID, or region..."
            pageSize={5}
            isLoading={isLoading}
            actions={actions}
            skeletonRows={data?.data.length}
            onRowClick={handleRowClick}
            getRowId={(row) => row.siteId}
            highlightedRowId={rowId}
            initialSorting={{ id: "siteName", desc: false }}
          />
        </Card>

        {tabShow && (
          <div className="mx-5 mt-5">
            <Tabs tabs={tabData} />
          </div>
        )}

        <div className="mx-5 mb-20">
          {showAlert && (
            <AlertBox
              variant="default"
              title="AWS Notice"
              description="Server Room Provisioning in progress"
              onClose={() => setShowAlert(false)}
            />
          )}
        </div>
      </div>
      <div className="ml-3 w-full">
        {/* <MultiResourceForm /> */}
      </div>
    </div>
  );
};
