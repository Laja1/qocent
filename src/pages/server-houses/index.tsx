/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Header, Tabs, type ColumnDef } from "@/components/shared";
import { DataTable } from "@/components/shared/datatable";
import { Eye, PlusIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { SummaryTable } from "../server-sites/summary-table";
import { DeployResources } from "@/components/not-shared/deploy-resources";
import { Resource } from "../resource";
import { SecurityTable } from "../server-sites/security-table";
import { useState } from "react";
import { useModal } from "@/components/shared/modal";
// import { houseArchitectureData } from "@/utilities/constants/config";
// import { HouseLevel } from "../architectural-room/house-level";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import { formatDate, getStatusClassName } from "@/utilities/helper";
import { FlowGrid } from "@/components/not-shared/data-flow/flow";
import { useGetSiteDataFlowQuery } from "@/service/kotlin/siteApi";
import { useGetAllHouseQuery } from "@/service/kotlin/houseApi";
import type { HouseItem } from "@/models/response/houseResponse";
import NiceModal from "@ebay/nice-modal-react";
import { ModalConstant } from "@/components/shared/modal/register";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

// Cute Data Flow Loader Component
export const DataFlowLoader = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px]  rounded-lg p-8">
      {/* Main loader container */}
      <div className="relative">
        {/* Animated circles representing data flow */}
        <div className="flex items-center space-x-4 mb-6">
          {/* Server node */}
          <div className="relative">
            <div className="w-12 h-12 bg-black rounded-xs flex items-center justify-center shadow-lg animate-pulse">
              <div className="w-6 h-6 bg-white rounded-xs opacity-80"></div>
            </div>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-black rounded-full animate-ping"></div>
          </div>

          {/* Flowing data dots */}
          <div className="flex space-x-1">
            {[0, 1, 2].map((index) => (
              <div
                key={index}
                className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
                style={{
                  animationDelay: `${index * 0.2}s`,
                  animationDuration: "1s",
                }}
              ></div>
            ))}
          </div>

          {/* Database node */}
          <div className="relative">
            <div className="w-12 h-12 bg-black rounded-xs flex items-center justify-center shadow-lg animate-pulse">
              <div className="w-6 h-4 bg-white rounded-sm opacity-80"></div>
            </div>
          </div>

          {/* More flowing data dots */}
          <div className="flex space-x-1">
            {[0, 1, 2].map((index) => (
              <div
                key={index}
                className="w-2 h-2 bg-black rounded-full animate-bounce"
                style={{
                  animationDelay: `${index * 0.2 + 0.5}s`,
                  animationDuration: "1s",
                }}
              ></div>
            ))}
          </div>

          {/* Cloud node */}
          <div className="relative">
            <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center shadow-lg animate-pulse">
              <div className="w-6 h-3 bg-white rounded-xs opacity-80"></div>
            </div>
          </div>
        </div>

        {/* Cute loading message */}
        <div className="text-center">
          <div className="inline-flex items-center space-x-2 mb-2">
            <div className="w-8 h-8 border-3 border-  -200 border-t-  -500 rounded-xs animate-spin"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ServerHouses = () => {
  const navigate = useNavigate();
  const { openModal, closeModal } = useModal();

  const [rowId, setRowId] = useState("");

  const account = useSelector((state: RootState) => state.account);
  const { data, isLoading } = useGetAllHouseQuery({
    accountCode: account?.accountCode,
  });

  const { data: dataFlow, isLoading: dataFlowLoading } =
    useGetSiteDataFlowQuery({
      siteCode: "sample-site-000",
    });
  console.log(dataFlow);

  const serverHouseColumn: ColumnDef<HouseItem>[] = [
    {
      id: "houseId",
      header: "HOUSE ID",
      accessorKey: "houseId",
      cell: (row) => <span className="line-clamp-1">{row?.houseId}</span>,
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
      id: "houseSite",
      header: "House Site",
      accessorKey: "houseSite",
      sortable: true,
      cell: (row) => <span>{row.houseSite}</span>,
    },
    {
      id: "houseStatus",
      header: "STATUS",
      accessorKey: "houseStatus",
      cell: (row) => (
        <div className="">
          <Badge
            variant="outline"
            className={getStatusClassName(row.houseStatus)}
          >
            {row.houseStatus}
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
    // {
    //   id: "resourceMaker",
    //   header: "PROVIDER",
    //   accessorKey: "resourceMaker",
    //   sortable: true,
    //   cell: (row) => (
    //     <span className="text-center justify-center flex line-clamp-1">
    //       {row. === "1" ? (
    //         <img src={imgLinks.awsdark} className="size-5" alt="AWS" />
    //       ) : (
    //         <img src={imgLinks.huawei} className="size-5" alt="Huawei" />
    //       )}
    //     </span>
    //   ),
    // },
    {
      id: "houseCidr",
      header: "House Cidr",
      accessorKey: "houseCidr",
      sortable: true,
      cell: (row) => <span className=" ">{row.houseCidr}</span>,
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
  ];

  const actions = [
    {
      label: "View",
      icon: Eye,
      onClick: (row: HouseItem) => {
        NiceModal.show(ModalConstant.DrawerModal, row);
      },
    },
    // {
    //   label: "Edit",
    //   icon: Edit,
    //   onClick: (row: HouseItem) => {
    //     console.log("Edit server room:", row.HouseItem);
    //     // TODO: Implement edit functionality
    //   },
    // },
    // {
    //   label: "Delete",
    //   icon: Trash2,
    //   onClick: (row: HouseItem) => {
    //     console.log("Delete server room:", row.resourceName);
    //     // TODO: Implement delete confirmation
    //   },
    //   variant: "destructive" as const,
    // },
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
              {row && <SummaryTable summaryData={[]} isLoading={false} />}
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
        <div className="">{/* <ServerSitesTable2 rowId={rowId} /> */}</div>
      ),
    },
    {
      id: 3,
      text: "Architecture",
      component: (
        <div>
          {/* Show cute loader while data is loading */}
          {dataFlowLoading ? (
            <DataFlowLoader />
          ) : (
            <div className="my-10">
              <FlowGrid
                data={{ data: dataFlow?.data || [] }}
                connections={{ connections: dataFlow?.connections || [] }}
              />
            </div>
          )}
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

      <Card className="mx-5 px-5 mt-5 rounded-sm">
        <DataTable
          data={data?.data ?? []}
          columns={serverHouseColumn}
          isLoading={isLoading}
          searchPlaceholder="Search server house by name, ID, or code..."
          pageSize={5}
          actions={actions}
          onRowClick={(row) => setRowId(row.houseId)}
          highlightedRowId={rowId}
          getRowId={(row) => row.houseId}
          initialSorting={{ id: "houseCreatedAt", desc: false }}
        />
        </Card>


      <div className="mx-5 mt-5 ">
        <Tabs tabs={tabData} />
      </div>
    </div>
  );
};
