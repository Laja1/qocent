/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Header, PageContent } from "@/components/shared";
import { DataTable } from "@/components/shared/datatable";
  import { Edit, Eye, Trash2, PlusIcon, Users, KeyRound } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RouteConstant } from "@/router/routes";

import NiceModal from "@ebay/nice-modal-react";
import { ModalConstant } from "@/components/shared/modal/register";
import type { RootState } from "@/store";
import { useSelector } from "react-redux";
import { serverSiteColumns } from "@/utilities/constants/colums";
import { useGetUserAccountsByProviderQuery } from "@/service/organizationApi";
import type { Account } from "@/models/response/organizationResponse";
import { canInviteBusinessUsers } from "@/utilities/contextPermissions";

export const ServerSites = () => {
  const navigate = useNavigate();
  const dashboard = useSelector((state: RootState) => state.dashboard);
  const activeContext = useSelector(
    (state: RootState) => state.context?.activeContext
  );
  const canInvite = canInviteBusinessUsers(activeContext);

  const { data: organizationAccount, isLoading: isSiteLoading } =
    useGetUserAccountsByProviderQuery({
      provider: String(dashboard?.provider) || "",
    });

  const [selectedRowId, setSelectedRowId] = useState("");
  // const [selectedSiteCode, setSelectedSiteCode] = useState("");

  // const { data: architectureData } = useGetSiteArchitectureQuery(
  //   {
  //     siteCode: selectedSiteCode,
  //   },
  //   {
  //     skip: !selectedSiteCode,
  //   }
  // );
  // const { data, isLoading } = useGetQueryMonthlyBillQuery({
  //   bill_cycle: "2025-08",
  // });

  // const { data: resourcesInSiteData, isLoading: isResourceLoading } =
  //   useGetResourcesInSiteQuery(
  //     {
  //       siteCode: selectedSiteCode,
  //     },
  //     {
  //       skip: !selectedSiteCode,
  //     }
  //   );

  // const {
  //   data: dataFlow,
  //   isLoading: dataFlowLoading,
  //   refetch: refetchDataFlow,
  // } = useGetSiteDataFlowQuery(
  //   {
  //     siteCode: selectedSiteCode,
  //   },
  //   {
  //     skip: !selectedSiteCode,
  //   }
  // );

  const actions = [
    {
      label: "View",
      icon: Eye,
      onClick: (row: Account) => NiceModal.show(ModalConstant.DrawerModal, row),
    },
    {
      label: "Console Access",
      icon: KeyRound,
      onClick: (row: Account) =>
        navigate(RouteConstant.dashboard.siteCredentials.path, {
          state: {
            accountId: row.account_id,
            accountName: row.account_name,
          },
        }),
    },
    {
      label: "Edit",
      icon: Edit,
      onClick: (row: Account) =>
        console.log("Edit server room:", row.account_id),
    },
    {
      label: "Close Account",
      icon: Trash2,
      onClick: (row: Account) =>
        NiceModal.show(ModalConstant.CloseAccountModal, row),
      variant: "destructive" as const,
    },
  ];

  // Only business owners can invite users to the business
  if (canInvite) {
    actions.splice(1, 0, {
      label: "Invite user",
      icon: Users,
      onClick: (row: Account) =>
        NiceModal.show(ModalConstant.InviteToWorkspace, row),
    });
  }

  const handleRowClick = async (row: Account) => {
    // Clear existing timeout

    setSelectedRowId(row.account_id.toString());
    // setSelectedSiteCode(row.siteCode);

    try {
      // await refetchDataFlow();
    } catch (error) {
      console.error("Error refetching data flow:", error);
    }
  };
  // const selectedData = siteData?.data.find((item) => item.siteCode);
  // const tabData = [
  //   {
  //     id: 1,
  //     text: "Visual Site",
  //     component: (
  //       <div>
  //         {isDataFlowLoading ? (
  //           <DataFlowLoader />
  //         ) : (
  //           <div className="flex lg:flex-row flex-col  ">
  //             <FlowGrid
  //               data={dataFlow?.data?.resource || []}
  //               cellBorderData={dataFlow?.data?.house || []}
  //               connections={dataFlow?.data?.connection || []}
  //               siteCode={selectedSiteCode}
  //             />
  //           </div>
  //         )}
  //       </div>
  //     ),
  //   },
  //   {
  //     id: 2,
  //     text: "Resources",
  //     component: (
  //       <div className="">
  //         <ResourceTable
  //           isLoading={isResourceLoading}
  //           resourcesInSiteData={resourcesInSiteData?.data || []}
  //         />
  //       </div>
  //     ),
  //   },
  //   {
  //     id: 3,
  //     text: "Architecture",
  //     component: architectureData?.data ? (
  //       <div>
  //         <SiteLevel sitesData={architectureData.data} />
  //       </div>
  //     ) : (
  //       <div>No architecture data available</div>
  //     ),
  //   },
  //   {
  //     id: 4,
  //     text: "Notifications",
  //     component: <SecurityTable />,
  //   },
  //   // {
  //   //   id: 5,
  //   //   text: "Cost",
  //   //   component: (
  //   //     <div className="flex flex-col">
  //   //       <CostTable />
  //   //       {isLoading ? (
  //   //         <PacmanLoader />
  //   //       ) : (
  //   //         <MonthlyBill data={data as getQueryMonthlyBillResponse} />
  //   //       )}
  //   //     </div>
  //   //   ),
  //   // },
  //   // {
  //   //   id: 6,
  //   //   text: "Summary",
  //   //   component: (
  //   //     <div className="flex lg:flex-row flex-col">
  //   //       <div className="lg:w-1/4 lg:mr-5 flex">
  //   //         <div className="flex flex-col w-full">
  //   //           <SummaryTable
  //   //             summaryData={summaryData?.data || []}
  //   //             isLoading={isSiteSummaryLoading}
  //   //           />
  //   //           <Button
  //   //             label="Add Resource"
  //   //             prefixIcon={<PlusIcon className="size-4" />}
  //   //             size="small"
  //   //             className="mt-2 py-0 bg-black"
  //   //             intent="secondary"
  //   //             onClick={() =>
  //   //               openModal({
  //   //                 id: `deploy-${selectedSiteCode}`,
  //   //                 content: () => (
  //   //                   <DeployResources
  //   //                     closeModal={closeModal}
  //   //                     onProceed={() => navigate("/create-new-resource")}
  //   //                     onNavigate={(path, state) => {
  //   //                       navigate(path, { state });
  //   //                     }}
  //   //                   />
  //   //                 ),
  //   //               })
  //   //             }
  //   //           />
  //   //         </div>
  //   //       </div>
  //   //       <div className="w-full lg:w-3/4">
  //   //         <Resource />
  //   //       </div>
  //   //     </div>
  //   //   ),
  //   // },
  // ];
  const sitesToDisplay = organizationAccount?.data?.accounts?.filter(
    (item) =>
      item.account_provider?.toLocaleLowerCase() ===
      dashboard.provider?.toLocaleLowerCase()
  );

  return (
    <div className="min-h-screen">
      <Header title="Server Sites" description="Manage your server sites">
        <div className="flex gap-2">
          <Button
            intent="secondary"
            label="Create New Site"
            prefixIcon={<PlusIcon className="size-4" />}
            onClick={() => navigate(RouteConstant.dashboard.createnewsite.path)}
            size="small"
          />

          <Button
            intent="secondary"
            label="Join Site"
            prefixIcon={<PlusIcon className="size-4" />}
            onClick={() => NiceModal.show(ModalConstant.InviteSiteModal)}
            size="small"
          />
        </div>
      </Header>

      <PageContent>
        <DataTable
          data={sitesToDisplay || []}
          columns={serverSiteColumns}
          searchPlaceholder="Search sites by name, ID, or status..."
          pageSize={10}
          isLoading={isSiteLoading}
          exportOptions={{
            filename: "server_sites_export",
            includeHeaders: true,
          }}
          actions={actions}
          skeletonRows={sitesToDisplay?.length || 5}
          onRowClick={handleRowClick}
          getRowId={(row) => row.account_id.toString()}
          highlightedRowId={selectedRowId}
          initialSorting={{ id: "account_created_at", desc: true }}
        />
      </PageContent>
    </div>
  );
};
