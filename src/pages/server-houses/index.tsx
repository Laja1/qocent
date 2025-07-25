/* eslint-disable @typescript-eslint/no-explicit-any */
import { imgLinks } from "@/assets/assetLink";
import { Button, Header, Tabs, type ColumnDef } from "@/components/shared";
import { DataTable } from "@/components/shared/datatable";
import { Edit, Eye, Trash2, PlusIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { SummaryTable } from "../server-sites/summary-table";
import { DeployResources } from "@/components/not-shared/deploy-resources";
import { Resource } from "../resource";
import { ServerSitesTable2 } from "../server-sites/server-sites-table";
import { SecurityTable } from "../server-sites/security-table";
import { useState } from "react";
import { useModal } from "@/components/shared/modal";
// import { houseArchitectureData } from "@/utilities/constants/config";
// import { HouseLevel } from "../architectural-room/house-level";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import { formatDate } from "@/utilities/helper";
import { useGetResourceByProviderQuery } from "@/service/typescript/resourceApi";
import type { resourceType } from "@/models/response/resourceResponse";
import { ApiEnums } from "@/utilities/enums";
import GridLayout from "@/components/not-shared/data-flow/flow";

export const ServerHouses = () => {
  const navigate = useNavigate();
  const { openModal, closeModal } = useModal();
  const [rowId, setRowId] = useState(100004);
  const dashboard = useSelector((state: RootState) => state.dashboard);
  const { data, isLoading } = useGetResourceByProviderQuery({
    provider: dashboard.provider,
    resource: ApiEnums.House,
  });
  console.log(data);
  const serverHouseColumn: ColumnDef<resourceType>[] = [
    {
      id: "resourceId",
      header: "HOUSE ID",
      accessorKey: "resourceId",
      cell: (row) => <span className="line-clamp-1">{row?.resourceId}</span>,
      sortable: true,
    },
    {
      id: "resourceName",
      header: "HOUSE NAME",
      accessorKey: "resourceName",
      cell: (row) => (
        <span className="line-clamp-1 font-brfirma-bold">
          {row.resourceName}
        </span>
      ),
      sortable: true,
    },
    {
      id: "resourceCode",
      header: "HOUSE CODE",
      accessorKey: "resourceCode",
      cell: (row) => <span className=" line-clamp-1">{row.resourceCode}</span>,
      sortable: true,
      filterType: "select",
    },
    // {
    //   id: "resourceSiteCode",
    //   header: "SITE CODE",
    //   accessorKey: "resourceSiteCode",
    //   cell: (row) => (
    //     <span className=" line-clamp-1">{row.resourceSiteCode}</span>
    //   ),
    //   sortable: true,
    //   filterType: "select",
    // },
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
    //   id: "rooms",
    //   header: "ROOMS",
    //   accessorKey: "rooms",
    //   sortable: true,
    //   cell: (row) => (
    //     <span className="text-center justify-center flex">{row.rooms}</span>
    //   ),
    // },
    {
      id: "resourceMaker",
      header: "PROVIDER",
      accessorKey: "resourceMaker",
      sortable: true,
      cell: (row) => (
        <span className="text-center justify-center flex line-clamp-1">
          {row.resourceMaker === "1" ? (
            <img src={imgLinks.awsdark} className="size-5" alt="AWS" />
          ) : (
            <img src={imgLinks.huawei} className="size-5" alt="Huawei" />
          )}
        </span>
      ),
    },
    {
      id: "resourceDate",
      header: "DATE CREATED",
      headerClassName: "text-right",
      accessorKey: "resourceDate",
      sortable: true,
      cell: (row) => (
        <span className="text-right block ">
          {formatDate(row.resourceDate)}
        </span>
      ),
    },
    // {
    //   id: "resourceIP",
    //   header: "IP RANGE",
    //   headerClassName: "text-right",
    //   accessorKey: "resourceIP",
    //   sortable: true,
    //   cell: (row) => (
    //     <span className="text-right block line-clamp-1">{row.resourceIP}</span>
    //   ),
    // },
  ];

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
        console.log("Edit server room:", row.resourceType);
        // TODO: Implement edit functionality
      },
    },
    {
      label: "Delete",
      icon: Trash2,
      onClick: (row: resourceType) => {
        console.log("Delete server room:", row.resourceName);
        // TODO: Implement delete confirmation
      },
      variant: "destructive" as const,
    },
  ];
  const row = data?.data.find((item: any) => item.siteId === rowId);

  const tabData = [
    {
      id: 1,
      text: "Summary",
      component: (
        <div className="flex lg:flex-row flex-col">
          <div className=" lg:w-1/4 lg:mr-5 flex">
            <div className=" flex flex-col w-full ">
              {row && <SummaryTable
                summaryData={ []}
                isLoading={false}
              />}
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
      component: (
        <div>
          {/* <HouseLevel houseData={houseArchitectureData} /> */}
          <div className="my-10">
            {/* <DataFlow /> */}
            <GridLayout />

          </div>
        </div>
      ),
    },
    {
      id: 4,
      text: "Security",
      component: <SecurityTable />,
    },
  ];
  return (
    <div className="bg-white h-full">
      <Header title="Server Houses" description="Manage your server house">
        <Button
          intent="tertiary"
          label="Create New House"
          onClick={() => navigate("/create-new-house")}
          prefixIcon={<PlusIcon className="size-4" />}
          size="small"
        />
      </Header>

      <div className="px-5 flex flex-col">
        <DataTable
          data={data?.data ?? []}
          columns={serverHouseColumn}
          isLoading={isLoading}
          searchPlaceholder="Search server house by name, ID, or code..."
          pageSize={5}
          actions={actions}
          onRowClick={(row) => setRowId(row.resourceId)}
          highlightedRowId={rowId}
          getRowId={(row) => row.resourceId}
          initialSorting={{ id: "houseName", desc: false }}
        />
      </div>

      <div className="mx-5 mt-5 ">
        <Tabs tabs={tabData} />
      </div>
    </div>
  );
};
