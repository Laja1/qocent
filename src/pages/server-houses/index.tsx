import { imgLinks } from "@/assets/assetLink";
import { Button, Header, Tabs, type ColumnDef } from "@/components/shared";
import { DataTable } from "@/components/shared/datatable";
import { Edit, Eye, Trash2, PlusIcon } from "lucide-react";
import type { houseRoomType } from "./type";
import { useNavigate } from "react-router-dom";
import { SummaryTable } from "../server-sites/summary-table";
import { DeployResources } from "@/components/not-shared/deploy-resources";
import { Resource } from "../resource";
import { ServerSitesTable2 } from "../server-sites/server-sites-table";
import { SecurityTable } from "../server-sites/security-table";
import { useState } from "react";
import { useModal } from "@/components/shared/modal";
import { houseArchitectureData } from "@/utilities/constants/config";
import { HouseLevel } from "../architectural-room/house-level";
import { useGetHousesByProviderQuery } from "@/service/houseApi";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import { formatDate } from "@/utilities/helper";
import { DataFlow } from "@/components/not-shared/data-flow";

export const ServerHouses = () => {
  const navigate = useNavigate();
  const { openModal, closeModal } = useModal();
  const [rowId, setRowId] = useState(100004);
  const dashboard = useSelector((state: RootState) => state.dashboard);
  const serverHouseColumn: ColumnDef<houseRoomType>[] = [
    {
      id: "houseId",
      header: "HOUSE ID",
      accessorKey: "houseId",
      cell: (row) => <span className="line-clamp-1">{row.houseId}</span>,
      sortable: true,
    },
    {
      id: "houseName",
      header: "HOUSE NAME",
      accessorKey: "houseName",
      cell: (row) => (
        <span className="line-clamp-1 font-brfirma-bold">{row.houseName}</span>
      ),
      sortable: true,
    },
    {
      id: "houseCode",
      header: "HOUSE CODE",
      accessorKey: "houseCode",
      cell: (row) => <span className=" line-clamp-1">{row.houseCode}</span>,
      sortable: true,
      filterType: "select",
    },
    {
      id: "houseSiteCode",
      header: "SITE CODE",
      accessorKey: "houseSiteCode",
      cell: (row) => <span className=" line-clamp-1">{row.houseSiteCode}</span>,
      sortable: true,
      filterType: "select",
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
    //   id: "rooms",
    //   header: "ROOMS",
    //   accessorKey: "rooms",
    //   sortable: true,
    //   cell: (row) => (
    //     <span className="text-center justify-center flex">{row.rooms}</span>
    //   ),
    // },
    {
      id: "houseProviderId",
      header: "PROVIDER",
      accessorKey: "houseProviderId",
      sortable: true,
      cell: (row) => (
        <span className="text-center justify-center flex line-clamp-1">
          {row.houseProviderId === 1 ? (
            <img src={imgLinks.awsdark} className="size-5" alt="AWS" />
          ) : (
            <img src={imgLinks.huawei} className="size-5" alt="Huawei" />
          )}
        </span>
      ),
    },
    {
      id: "houseCreatedAt",
      header: "DATE CREATED",
      headerClassName: "text-right",
      accessorKey: "houseCreatedAt",
      sortable: true,
      cell: (row) => (
        <span className="text-right block ">
          {formatDate(row.houseCreatedAt)}
        </span>
      ),
    },
    {
      id: "houseCidr",
      header: "IP RANGE",
      headerClassName: "text-right",
      accessorKey: "houseCidr",
      sortable: true,
      cell: (row) => (
        <span className="text-right block line-clamp-1">{row.houseCidr}</span>
      ),
    },
  ];

  const { data: houseData, isLoading } = useGetHousesByProviderQuery({
    provider: dashboard.providerId,
  });
  console.log(houseData);
  const actions = [
    {
      label: "View",
      icon: Eye,
      onClick: (row: houseRoomType) => {
        console.log("View server room:", row.houseId);
        // TODO: Implement view functionality
      },
    },
    {
      label: "Edit",
      icon: Edit,
      onClick: (row: houseRoomType) => {
        console.log("Edit server room:", row.houseId);
        // TODO: Implement edit functionality
      },
    },
    {
      label: "Delete",
      icon: Trash2,
      onClick: (row: houseRoomType) => {
        console.log("Delete server room:", row.houseId);
        // TODO: Implement delete confirmation
      },
      variant: "destructive" as const,
    },
  ];

  const tabData = [
    {
      id: 1,
      text: "Summary",
      component: (
        <div className="flex">
          <div className="w-1/4 flex">
            <div className=" flex mr-5 flex-col w-full">
              <SummaryTable />
              <Button
                label="Add Resource"
                prefixIcon={<PlusIcon className="size-4" />}
                size="small"
                className="mt-2 py-0 bg-black"
                intent="secondary"
                onClick={() =>
                  openModal({
                    id: `deploy-${rowId}`,
                    content: () => <DeployResources closeModal={closeModal} />,
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
      component: (
        <div>
          <HouseLevel houseData={houseArchitectureData} />
          <div className="my-10">
            <DataFlow />
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
          data={houseData?.data ?? []}
          columns={serverHouseColumn}
          isLoading={isLoading}
          searchPlaceholder="Search server rooms by name, ID, or code..."
          pageSize={5}
          actions={actions}
          onRowClick={(row) => setRowId(Number(row.houseId))}
          highlightedRowId={rowId}
          getRowId={(row) => row.houseId}
          initialSorting={{ id: "houseName", desc: false }}
        />
      </div>

      <div className="mx-5 mt-5 ">
        <Tabs tabs={tabData} />
      </div>
    </div>
  );
};
