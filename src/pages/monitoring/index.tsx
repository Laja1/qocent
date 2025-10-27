/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Header, Tabs } from "@/components/shared";
import { DataTable } from "@/components/shared/datatable";
import { Eye, PlusIcon, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { SummaryTable } from "../server-sites/summary-table";
import { DeployResources } from "@/components/not-shared/deploy-resources";
import { Resource } from "../resource";
import { SecurityTable } from "../server-sites/security-table";
import { useState } from "react";
import { useModal } from "@/components/shared/modal";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";

import {
  useDeleteHouseMutation,
  useGetAllHouseQuery,
  useGetResourceInHouseQuery,
} from "@/service/kotlin/houseApi";
import type { HouseItem } from "@/models/response/houseResponse";
import NiceModal from "@ebay/nice-modal-react";
import { ModalConstant } from "@/components/shared/modal/register";
import { Card } from "@/components/ui/card";
import { showCustomToast } from "@/components/shared/toast";
import { ErrorHandler } from "@/service/httpClient/errorHandler";
import { ResourceTable } from "../server-sites/server-sites-table";
import { serverHouseColumn } from "@/utilities/constants/colums";
import { ResourceModal } from "../create-new-resource/resource-modal";
// Cute Data Flow Loader Component

export const Monitoring = () => {
  const navigate = useNavigate();
  const { openModal, closeModal } = useModal();
  const [isOpen, setIsOpen] = useState(false);
  const [tabShow, setTabShow] = useState(false);
  const [selectedHouseCode, setSelectedHouseCode] = useState("");
  const [rowId, setRowId] = useState("");
  const [deleteHouse, { isLoading: isDeleting }] = useDeleteHouseMutation();
  const account = useSelector((state: RootState) => state.account);
  const dashboard = useSelector((state: RootState) => state.dashboard);

  const { data, isLoading } = useGetAllHouseQuery({
    accountCode: account?.accountCode,
    provider: dashboard?.provider,
    type: account?.type || "",
  });

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
    {
      label: "Delete",
      icon: Trash2,
      onClick: async (row: HouseItem) => {
        try {
          const res = await deleteHouse({
            houseId: Number(row.houseId),
          }).unwrap();
          showCustomToast(res.responseMessage, {
            toastOptions: { type: "success", autoClose: 5000 },
          });
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
          const message = ErrorHandler.extractMessage(error);
          showCustomToast(message, {
            toastOptions: { type: "error", autoClose: 5000 },
          });
        }
      },
      variant: "destructive" as const,
    },
  ];
  const row = data?.data.find((item: any) => item.siteId === rowId);
  const { data: resourcesInHouseData, isLoading: isResourceLoading } =
    useGetResourceInHouseQuery(
      {
        houseCode: selectedHouseCode,
      },
      {
        skip: !selectedHouseCode,
      }
    );
  console.log(resourcesInHouseData?.data, "useGetResourceInHouseQuery");
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
        <div className="">
          <ResourceTable
            resourcesInSiteData={resourcesInHouseData?.data || []}
            isLoading={isResourceLoading}
          />
        </div>
      ),
    },
    // {
    //   id: 3,
    //   text: "Architecture",
    //   component: (
    //     // <div>
    //     //   {/* Show cute loader while data is loading */}
    //     //   {dataFlowLoading ? (
    //     //     <DataFlowLoader />
    //     //   ) : (
    //     //     <div className="my-10">
    //     //       {/* <FlowGrid
    //     //         data={{ data: dataFlow?.data || [] }}
    //     //         connections={{ connections: dataFlow?.connections || [] }}
    //     //       /> */}
    //     //     </div>
    //     //   )}
    //     // </div>
    //   )
    // },
    {
      id: 4,
      text: "Security",
      component: <SecurityTable />,
    },
  ];
  const handleRowClick = async (row: HouseItem) => {
    setTabShow(true);
    setRowId(row.houseId);
    setSelectedHouseCode(row.houseCode);

    // setIsArtificialLoading(true);

    // const timeout = setTimeout(() => {
    //   setIsArtificialLoading(false);
    // }, 1500);

    // setLoadingTimeout(timeout);

    try {
      // await refetchDataFlow();
    } catch (error) {
      console.error("Error refetching data flow:", error);
      // setIsArtificialLoading(false);
    }
  };
  return (
    <div className=" h-full">
      <Header
        title="Monitoring & Observability"
        description="Track, analyze, and manage your infrastructure in real time"
      >
        <Button
          intent="tertiary"
          label="Provision New Resource"
          prefixIcon={<PlusIcon className="size-4" />}
          size="small"
          onClick={() => setIsOpen(true)}
        />
      </Header>

      <Card className="mx-5 px-5 mt-5 rounded-sm">
        <DataTable
          data={data?.data ?? []}
          columns={serverHouseColumn}
          isLoading={isLoading || isDeleting}
          filterableColumns={["houseStatus"]}
          title="Monitored Environments"
          searchPlaceholder="Search environments by name, ID, or code..."
          pageSize={5}
          actions={actions}
          onRowClick={handleRowClick}
          highlightedRowId={rowId}
          getRowId={(row) => row.houseId}
          initialSorting={{ id: "houseCreatedAt", desc: false }}
        />
      </Card>
      <ResourceModal
        isOpen={isOpen}
        closeModal={() => setIsOpen(false)}
        onProceed={() => navigate("/create-new-resource")}
        onNavigate={(path, state) => {
          navigate(path, { state });
          setIsOpen(false);
        }}
        onClose={() => setIsOpen(false)}
        id=""
        siteCodeId={undefined}
      />
      {tabShow && (
        <div className="mx-5 mt-5">
          <Tabs tabs={tabData} />
        </div>
      )}
    </div>
  );
};
