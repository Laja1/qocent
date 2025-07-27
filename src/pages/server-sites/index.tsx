/* eslint-disable @typescript-eslint/no-explicit-any */
import { imgLinks } from "@/assets/assetLink";
import { Button, Header, Tabs, type ColumnDef } from "@/components/shared";
import { DataTable } from "@/components/shared/datatable";
import { Badge } from "@/components/ui/badge";
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
import type { SiteData } from "@/models/response/siteResponse";
import {
  useGetAllSitesQuery,
  useGetResourcesInSiteQuery,
  useGetResourceTypeCountQuery,
  useGetSiteArchitectureQuery,
  useGetSiteDataFlowQuery,
} from "@/service/kotlin/siteApi";
import NiceModal from "@ebay/nice-modal-react";
import { ModalConstant } from "@/components/shared/modal/register";
import { FlowGrid } from "@/components/not-shared/data-flow/flow";
import { DataFlowLoader } from "../server-houses";
import { getStatusClassName } from "@/utilities/helper";

export const ServerSites = () => {
  const navigate = useNavigate();
  const [tabShow, setTabShow] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState("");
  const [selectedSiteCode, setSelectedSiteCode] = useState("");
  const [isArtificialLoading, setIsArtificialLoading] = useState(false);
  const [loadingTimeout, setLoadingTimeout] = useState<NodeJS.Timeout | null>(
    null
  );

  const { data: siteData, isLoading: isSiteLoading } = useGetAllSitesQuery();
  const { data: summaryData, isLoading: isSiteSummaryLoading } =
    useGetResourceTypeCountQuery({
      siteCode: selectedSiteCode,
    });

  const { data: architectureData } = useGetSiteArchitectureQuery({
    siteCode: selectedSiteCode,
  });
  const { data: resourcesInSiteData } = useGetResourcesInSiteQuery({
    siteCode: selectedSiteCode,
  });
  const {
    data: dataFlow,
    isLoading: dataFlowLoading,
    refetch: refetchDataFlow,
  } = useGetSiteDataFlowQuery({
    siteCode: selectedSiteCode,
  });

  const { openModal, closeModal } = useModal();

  const [showAlert, setShowAlert] = useState(true);

  const serverRoomColumns: ColumnDef<SiteData>[] = [
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
      id: "siteId",
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
    {
      id: "siteRegion",
      header: "Site Region",
      headerClassName: "text-right",
      accessorKey: "siteRegion",
      sortable: true,
      cell: (row) => <span className="text-right block">{row.siteRegion}</span>,
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
            className={getStatusClassName(row.siteStatus)}
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
      id: "siteExpiryDate",
      header: "Site Expiry Date",
      headerClassName: "text-right",
      accessorKey: "siteExpiryDate",
      sortable: true,
      cell: (row) => (
        <span className="text-right block">{row.siteExpiryDate}</span>
      ),
    },
    // {
    //   id: "siteEOLAction",
    //   header: "Site Expiry Date",
    //   headerClassName: "text-right",
    //   accessorKey: "siteEOLAction",
    //   sortable: true,
    //   cell: (row) => (
    //     <span className="text-right block">{row.siteEOLAction}</span>
    //   ),
    // },
    // {
    //   id: "resourceBill",
    //   header: "BILL (USD)",
    //   accessorKey: "resourceBill",
    //   headerClassName: "text-right",
    //   cell: (row) => (
    //     <span className="block text-green-700 text-right">
    //       {row.resourceBill.toLocaleString("en-US", {
    //         minimumFractionDigits: 2,
    //       })}
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

  // const row = siteData?.data.find((item: any) => item.resourceId === rowId);

  const actions = [
    {
      label: "View",
      icon: Eye,
      onClick: (row: SiteData) => {
        console.log("View server room:", row.siteId);
        NiceModal.show(ModalConstant.DrawerModal, row);
      },
    },
    {
      label: "Edit",
      icon: Edit,
      onClick: (row: SiteData) => {
        console.log("Edit server room:", row.siteId);
        // TODO: Implement edit functionality
      },
    },
    {
      label: "Deploy Resource",
      icon: Plus,
      onClick: (row: SiteData) => {
        openModal({
          id: `deploy-${row.siteId}`,
          content: () => (
            <DeployResources
              // sitecodeId={Number(row.siteId)}
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
      onClick: (row: SiteData) => {
        console.log("Delete server room:", row.siteId);
        // TODO: Implement delete confirmation
      },
      variant: "destructive" as const,
    },
  ];
  const isDataFlowLoading = dataFlowLoading || isArtificialLoading;
  const handleRowClick = async (row: SiteData) => {
    setTabShow(true);
    setSelectedRowId(row.siteId.toString()); 
    setSelectedSiteCode(row.siteCode); // For API calls
    if (loadingTimeout) {
      clearTimeout(loadingTimeout);
    }

    setTabShow(true);
    setSelectedRowId(row.siteId.toString());
    setSelectedSiteCode(row.siteCode);

    setIsArtificialLoading(true);

    const timeout = setTimeout(() => {
      setIsArtificialLoading(false);
    }, 1500); // 1.5 seconds

    setLoadingTimeout(timeout);

    await refetchDataFlow();
  };

  const tabData = [
    {
      id: 1,
      text: "Visual Site",
      component: (
        <div>
          {isDataFlowLoading ? (
            <DataFlowLoader />
          ) : (
            <div className="">
              {/* <p className="my-3">Data Flow Diagram</p> */}
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
      id: 2,
      text: "Resources",
      component: (
        <div className="">
          <ServerSitesTable2
            resourcesInSiteData={resourcesInSiteData?.data || []}
          />
        </div>
      ),
    },
    {
      id: 3,
      text: "Architecture",
      component: architectureData?.data ? (
        <div>
          <SiteLevel sitesData={architectureData.data} />
        </div>
      ) : (
        <></>
      ),
    },
    {
      id: 4,
      text: "Notifications",
      component: <SecurityTable />,
    },
    {
      id: 5,
      text: "Cost",
      component: <CostTable />,
    },
    {
      id: 6,
      text: "Summary",
      component: (
        <div className="flex lg:flex-row flex-col">
          <div className=" lg:w-1/4 lg:mr-5 flex">
            <div className=" flex flex-col w-full ">
              {/* {row && <SummaryTable />} */}
              <SummaryTable
                summaryData={summaryData?.data || []}
                isLoading={isSiteSummaryLoading}
              />
              <Button
                label="Add Resource"
                prefixIcon={<PlusIcon className="size-4" />}
                size="small"
                className="mt-2 py-0 bg-black"
                intent="secondary"
                onClick={() =>
                  openModal({
                    id: `deploy-${selectedSiteCode}`,
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
            getRowId={(row) => row.siteId.toString()} // Convert to string for consistency
            highlightedRowId={selectedRowId} // Use the separate state
            initialSorting={{ id: "siteId", desc: false }}
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
