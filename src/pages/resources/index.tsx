/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Header } from "@/components/shared";
import { DataTable } from "@/components/shared/datatable";
import { Edit, Eye, Trash2, PlusIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
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
import { Obs } from "../obs";

export const Resources = () => {
  const [rowId, setRowId] = useState<number>(0);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const account = useSelector((state: RootState) => state.account);
  const [selectedType, setSelectedType] = useState("");
  const [deleteResources, { isLoading: isDeleting }] =
    useDeleteResourceMutation();

  const { data: resourceData, isLoading } = useGetAllResourcesQuery(
    { accountCode: account?.accountCode },
    { skip: !account?.accountCode }
  );

  const actions = [
    {
      label: "View",
      icon: Eye,
      onClick: (row: resourceType) => {
        console.log("View resource:", row.resourceId);
      },
    },
    {
      label: "Edit",
      icon: Edit,
      onClick: (row: resourceType) => {
        navigate(RouteConstant.dashboard.updateResources.path, { state: row });
      },
    },
    // ...(selectedType.toLowerCase() === "cloud storage"
    //   ? [
    //       {
    //         label: "Upload file",
    //         icon: Upload,
    //         onClick: (row: resourceType) => {
    //           navigate(RouteConstant.dashboard.obs.path, { state: row });
    //         },
    //       },
    //     ]
    //   : []),
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

  const handleRowClick = (row: resourceType) => {
    setRowId(row.resourceId);
    setSelectedType(row.resourceType);
  };

  const obsData = resourceData?.data.find((item) => item.resourceId === rowId);

  return (
    <div className="h-full">
      <Header
        title="Server Resources"
        description="Manage your server resource"
      >
        <Button
          intent="tertiary"
          label="Create New Resource"
          prefixIcon={<PlusIcon className="size-4" />}
          size="small"
          onClick={() => setIsOpen(true)}
        />
      </Header>

      <Card className="mx-5 px-5 mt-5 rounded-sm">
        <DataTable
          data={resourceData?.data || []}
          columns={resourcesColumns}
          searchPlaceholder="Search server resources..."
          pageSize={5}
          title="RESOURCES"
          actions={actions}
          highlightedRowId={rowId}
          isLoading={isLoading || isDeleting}
          onRowClick={handleRowClick}
          getRowId={(row) => row.resourceId}
          initialSorting={{ id: "resourceId", desc: false }}
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

      {selectedType.toLowerCase() === "cloud storage" && obsData && (
        <Obs resourceData={obsData} />
      )}
    </div>
  );
};
