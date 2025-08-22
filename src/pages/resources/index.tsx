import { Button, Header } from "@/components/shared";
import { DataTable } from "@/components/shared/datatable";
import { Edit, Eye, Trash2, PlusIcon, Upload } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
// import { SecurityTable } from "../server-sites/security-table";
// import { CostTable } from "../server-sites/cost";
// import { ResourceDetails } from "./resource-details";
import { ResourceModal } from "../create-new-resource/resource-modal";
import type { resourceType } from "@/models/response/resourceResponse";
import type { RootState } from "@/store";
import { useSelector } from "react-redux";

import {
  useDeleteResourceMutation,
  useGetAllResourcesQuery,
} from "@/service/kotlin/resourceApi";
import { Card } from "@/components/ui/card";
import { RouteConstant } from "@/router/routes";
import { showCustomToast } from "@/components/shared/toast";
import { ErrorHandler } from "@/service/httpClient/errorHandler";
import { resourcesColumns } from "@/utilities/constants/colums";

export const Resources = () => {
  const [rowId, setRowId] = useState<number>(0);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const account = useSelector((state: RootState) => state.account);
  const [resourceType, setResourceType] = useState("");
  const [deleteResources, { isLoading: isDeleting }] =
    useDeleteResourceMutation();

  const { data: resourceData, isLoading } = useGetAllResourcesQuery(
    {
      accountCode: account?.accountCode,
    },
    {
      skip: !account?.accountCode,
    }
  );

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
        navigate(RouteConstant.dashboard.updateResources.path, { state: row });
      },
    },
    ...(resourceType.toLocaleLowerCase() === "obs"
      ? [
          {
            label: "Upload file",
            icon: Upload,
            onClick: (row: resourceType) => {
              navigate(RouteConstant.dashboard.obs.path, {
                state: row,
              });
            },
          },
        ]
      : []),
    {
      label: "Delete",
      icon: Trash2,
      onClick: async (row: resourceType) => {
        try {
          const res = await deleteResources({
            resourceId: Number(row.resourceId),
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
  const handleOpenDeployModal = () => {
    setIsOpen(true);
  };

  const handleRowClick = (row: resourceType) => {
    setRowId(row.resourceId);
    setResourceType(row.resourceType);
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
    <div className=" h-full">
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
          searchPlaceholder="Search server resources by name, code, or ID..."
          pageSize={5}
          title={"RESOURCES"}
          actions={actions}
          highlightedRowId={rowId}
          isLoading={isLoading || isDeleting}
          onRowClick={handleRowClick}
          getRowId={(row) => row.resourceId}
          initialSorting={{ id: "resourceId", desc: false }}
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
