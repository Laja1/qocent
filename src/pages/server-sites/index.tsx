/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Header, Tabs } from "@/components/shared";
import { DataTable } from "@/components/shared/datatable";
import { Edit, Eye, Trash2, PlusIcon, Plus, Users } from "lucide-react";
import { useState, useEffect } from "react";
import { ResourceTable } from "./server-sites-table";
import { Card } from "@/components/ui/card";
import { SiteLevel } from "../architectural-room/site-level";
import { SummaryTable } from "./summary-table";
import { Resource } from "../resource";
import { SecurityTable } from "./security-table";
import { DeployResources } from "@/components/not-shared/deploy-resources";
import { useModal } from "@/components/shared/modal";
import { useNavigate } from "react-router-dom";
import { CostTable } from "./cost";
import type { SiteData } from "@/models/response/siteResponse";
import {
  useGetSiteByProviderQuery,
  useGetResourcesInSiteQuery,
  useGetResourceTypeCountQuery,
  useGetSiteArchitectureQuery,
  useGetSiteDataFlowQuery,
  useDeleteSiteMutation,
} from "@/service/kotlin/siteApi";
import NiceModal from "@ebay/nice-modal-react";
import { ModalConstant } from "@/components/shared/modal/register";
import { FlowGrid } from "@/components/not-shared/data-flow/flow";
import { ResourceModal } from "../create-new-resource/resource-modal";
import type { RootState } from "@/store";
import { useSelector } from "react-redux";
import { showCustomToast } from "@/components/shared/toast";
import { ErrorHandler } from "@/service/httpClient/errorHandler";
import { DataFlowLoader } from "@/components/not-shared/data-flow/loader";
import { serverSiteColumns } from "@/utilities/constants/colums";

export const ServerSites = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [tabShow, setTabShow] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState("");
  const [selectedSiteCode, setSelectedSiteCode] = useState("");
  const dashboard = useSelector((state: RootState) => state.dashboard);
  const user = useSelector((state: RootState) => state.auth);
  const account = useSelector((state: RootState) => state.account);
  const [isArtificialLoading, setIsArtificialLoading] = useState(false);
  const [loadingTimeout, setLoadingTimeout] = useState<NodeJS.Timeout | null>(
    null
  );

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (loadingTimeout) {
        clearTimeout(loadingTimeout);
      }
    };
  }, [loadingTimeout]);

  const { data: siteData, isLoading: isSiteLoading } =
    useGetSiteByProviderQuery(
      {
        provider: dashboard.provider,
        siteAccountId: account.accountCode || "",
      },
      {
        skip: !user.userId || !dashboard.provider,
      }
    );

  const { data: summaryData, isLoading: isSiteSummaryLoading } =
    useGetResourceTypeCountQuery(
      {
        siteCode: selectedSiteCode,
      },
      {
        skip: !selectedSiteCode,
      }
    );

  const { data: architectureData } = useGetSiteArchitectureQuery(
    {
      siteCode: selectedSiteCode,
    },
    {
      skip: !selectedSiteCode,
    }
  );
  const [deleteSite, { isLoading: isDeleteLoading }] = useDeleteSiteMutation();

  const { data: resourcesInSiteData, isLoading: isResourceLoading } =
    useGetResourcesInSiteQuery(
      {
        siteCode: selectedSiteCode,
      },
      {
        skip: !selectedSiteCode,
      }
    );

  const {
    data: dataFlow,
    isLoading: dataFlowLoading,
    refetch: refetchDataFlow,
  } = useGetSiteDataFlowQuery(
    {
      siteCode: selectedSiteCode,
    },
    {
      skip: !selectedSiteCode,
    }
  );
  const { openModal, closeModal } = useModal();

  const actions = [
    {
      label: "View",
      icon: Eye,
      onClick: (row: SiteData) => {
        console.log("View server Site:", row.siteId);
        NiceModal.show(ModalConstant.DrawerModal, row);
      },
    },
    {
      label: "Invite to Site",
      icon: Users,
      onClick: (row: SiteData) => {
        console.log("View server Site:", row.siteId);
        NiceModal.show(ModalConstant.InviteToWorkspace, row);
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
      onClick: () => {
        setIsOpen(true);
      },
    },
    {
      label: "Delete",
      icon: Trash2,
      onClick: async (row: SiteData) => {
        try {
          const res = await deleteSite({ siteId: row.siteId }).unwrap();
          showCustomToast(res.responseMessage, {
            toastOptions: { type: "success", autoClose: 5000 },
          });
        } catch (error: any) {
          console.error("Delete Site Error:", error);
          const message = ErrorHandler.extractMessage(error);
          showCustomToast(message, {
            toastOptions: { type: "error", autoClose: 5000 },
          });
        }
      },
      variant: "destructive" as const,
    },
  ];

  const isDataFlowLoading = dataFlowLoading || isArtificialLoading;

  const handleRowClick = async (row: SiteData) => {
    // Clear existing timeout
    if (loadingTimeout) {
      clearTimeout(loadingTimeout);
    }

    setTabShow(true);
    setSelectedRowId(row.siteId.toString());
    setSelectedSiteCode(row.siteCode);

    setIsArtificialLoading(true);

    const timeout = setTimeout(() => {
      setIsArtificialLoading(false);
    }, 1500);

    setLoadingTimeout(timeout);

    try {
      await refetchDataFlow();
    } catch (error) {
      console.error("Error refetching data flow:", error);
      setIsArtificialLoading(false);
    }
  };
  // const selectedData = siteData?.data.find((item) => item.siteCode);
  const tabData = [
    {
      id: 1,
      text: "Visual Site",
      component: (
        <div>
          {isDataFlowLoading ? (
            <DataFlowLoader />
          ) : (
            <div className="flex lg:flex-row flex-col  ">
              <FlowGrid
                data={dataFlow?.data?.resource || []}
                cellBorderData={dataFlow?.data?.house || []}
                connections={dataFlow?.data?.connection || []}
                siteCode={selectedSiteCode}
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
          <ResourceTable
            isLoading={isResourceLoading}
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
        <div>No architecture data available</div>
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
          <div className="lg:w-1/4 lg:mr-5 flex">
            <div className="flex flex-col w-full">
              <SummaryTable
                summaryData={summaryData?.data || []}
                isLoading={isSiteSummaryLoading}
              />
              <Button
                label="Add Resource"
                prefixIcon={<PlusIcon className="size-4" />}
                size="small"
                className="mt-2 py-0 bg-black dark:bg-white"
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
    <div className="h-full mt-5">
      <Header title="Server Sites" description="Manage your server site">
        <Button
          intent="tertiary"
          label="Create New Site"
          prefixIcon={<PlusIcon className="size-4" />}
          onClick={() => navigate("/create-new-site")}
          size="small"
        />
      </Header>

      <div className="flex gap-4 mb-10 lg:mb-20 flex-col overflow-y-hidden h-full">
        <Card className="mx-5 px-5 rounded-sm">
          <DataTable
            data={siteData?.data || []}
            columns={serverSiteColumns}
            title={"SERVER SITES"}
            // description="Server Site"
            filterableColumns={["siteStatus"]}
            searchPlaceholder="Search server rooms by name, ID, or code..."
            pageSize={5}
            isLoading={isSiteLoading || isDeleteLoading}
            exportOptions={{
              filename: "server_sites_export",
              includeHeaders: true,
            }}
            actions={actions}
            skeletonRows={siteData?.data?.length || 5}
            onRowClick={handleRowClick}
            getRowId={(row) => row.siteId.toString()}
            highlightedRowId={selectedRowId}
            initialSorting={{ id: "siteCreatedAt", desc: false }}
          />
        </Card>

        {tabShow && (
          <div className="mx-5 mt-5">
            <Tabs tabs={tabData} />
          </div>
        )}
      </div>

      <ResourceModal
        isOpen={isOpen}
        closeModal={() => setIsOpen(false)}
        onProceed={() => navigate("/create-new-resource")}
        onNavigate={(path, state) => navigate(path, { state })}
        onClose={() => setIsOpen(false)}
        id=""
        siteCodeId={undefined}
      />
    </div>
  );
};
