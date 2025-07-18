/* eslint-disable @typescript-eslint/no-explicit-any */
import { imgLinks } from "@/assets/assetLink";
import { Button, Header, Tabs, type ColumnDef } from "@/components/shared";
import { DataTable } from "@/components/shared/datatable";
import { Badge } from "@/components/ui/badge";
import { sitesData } from "@/utilities/constants/config";
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
import { formatDate } from "@/utilities/helper";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import { useGetResourceByProviderQuery } from "@/service/resourceApi";
import type { resourceType } from "@/models/response/resourceResponse";
import { ApiEnums } from "@/utilities/enums";

export const ServerSites = () => {
  const navigate = useNavigate();
  const dashboard = useSelector((state: RootState) => state.dashboard);
  const [tabShow, setTabShow] = useState(true);
  const { data: siteData, isLoading: isSiteLoading } =
    useGetResourceByProviderQuery({
      provider: dashboard.provider,
      resource: ApiEnums.Site,
    });
  console.log(siteData);
  const { openModal, closeModal } = useModal();
  const [rowId, setRowId] = useState(100004);
  const [showAlert, setShowAlert] = useState(true);

  const serverRoomColumns: ColumnDef<resourceType>[] = [
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
      accessorKey: "resourceId",
      cell: (row) => <span className="">{row.resourceId}</span>,
      sortable: true,
    },
    {
      id: "resourceName",
      header: "SITE NAME",
      accessorKey: "resourceName",
      cell: (row) => (
        <span className="line-clamp-1 font-brfirma-bold  text-xs">
          {row.resourceName}
        </span>
      ),
      sortable: true,
    },
    {
      id: "resourceCode",
      header: "SITE CODE",
      accessorKey: "resourceCode",
      cell: (row) => (
        <span className="hover:text-red-500 line-clamp-1">
          {row.resourceCode}
        </span>
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
      id: "resourceProvider",
      header: "PROVIDER",
      accessorKey: "resourceProvider",
      headerClassName: "text-center ",
      sortable: true,
      cell: (row) => (
        <span className="text-center justify-center items-left  flex">
          {row.resourceProvider === "aws" ? (
            <img src={imgLinks.awsdark} className="size-5" alt="AWS" />
          ) : (
            <img src={imgLinks.huawei} className="size-5" alt="Huawei" />
          )}
        </span>
      ),
    },
    {
      id: "resourceStatus",
      header: "STATUS",
      accessorKey: "resourceStatus",
      cell: (row) => (
        <div className="">
          <Badge
            variant="outline"
            className={
              row.resourceStatus === "ACTIVE"
                ? "bg-green-50 text-green-800 border-green-500 text-[10px] "
                : "bg-red-50 text-red-800 border-red-500 text-[10px]"
            }
          >
            {row.resourceStatus}
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
      id: "resourceCreatedAt",
      header: "DATE CREATED",
      headerClassName: "text-right",
      accessorKey: "resourceCreatedAt",
      sortable: true,
      cell: (row) => (
        <span className="text-right block">
          {formatDate(row.resourceCreatedAt)}
        </span>
      ),
    },
    {
      id: "resourceBill",
      header: "BILL (USD)",
      accessorKey: "resourceBill",
      headerClassName: "text-right",
      cell: (row) => (
        <span className="block text-green-700 text-right">
          {row.resourceBill.toLocaleString("en-US", {
            minimumFractionDigits: 2,
          })}
        </span>
      ),
      sortable: true,
    },
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

  const row = siteData?.data.find((item: any) => item.resourceId === rowId);

  const actions = [
    {
      label: "View",
      icon: Eye,
      onClick: (row: resourceType) => {
        console.log("View server room:", row.resourceId);
        // TODO: Implement view functionality
      },
    },
    {
      label: "Edit",
      icon: Edit,
      onClick: (row: resourceType) => {
        console.log("Edit server room:", row.resourceId);
        // TODO: Implement edit functionality
      },
    },
    {
      label: "Deploy Resource",
      icon: Plus,
      onClick: (row: resourceType) => {
        openModal({
          id: `deploy-${row.resourceId}`,
          content: () => (
            <DeployResources
              siteCodeId={row.resourceId}
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
      onClick: (row: resourceType) => {
        console.log("Delete server room:", row.resourceId);
        // TODO: Implement delete confirmation
      },
      variant: "destructive" as const,
    },
  ];

  const handleRowClick = (row: resourceType) => {
    setTabShow(true);
    setRowId(row.resourceId);
  };

  const tabData = [
    {
      id: 1,
      text: "Summary",
      component: (
        <div className="flex lg:flex-row flex-col">
          <div className=" lg:w-1/4 lg:mr-5 flex">
            <div className=" flex flex-col w-full ">
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
                        onNavigate={(path, state) => {
                          navigate(path, { state });
                        }}
                      />
                    ),
                  })
                }
              />
            </div>
          </div>
          <div className="w-full lg:w-3/4">
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
          prefixIcon={<PlusIcon className="size-4" />}
          onClick={() => navigate("/create-new-site")}
          size="small"
        />
      </Header>

      <div className="flex gap-4  flex-col overflow-y-hidden h-full">
        <Card className="mx-5 px-5 rounded-sm">
          <DataTable
            data={siteData?.data || []}
            columns={serverRoomColumns}
            searchPlaceholder="Search server rooms by name, ID, or region..."
            pageSize={5}
            isLoading={isSiteLoading}
            actions={actions}
            skeletonRows={siteData?.data.length}
            onRowClick={handleRowClick}
            getRowId={(row) => row.resourceId}
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
      {/* <div className="ml-3 w-full">
        <MultiResourceForm />
      </div> */}
    </div>
  );
};
