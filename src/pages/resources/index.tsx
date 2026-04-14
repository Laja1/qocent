/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Header } from "@/components/shared";
import { DataTable } from "@/components/shared/datatabless";
import { Edit, Eye, Trash2, PlusIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ResourceModal } from "../create-new-resource/resource-modal";
import type { resourceType } from "@/models/response/resourceResponse";
import type { RootState } from "@/store";
import { useSelector } from "react-redux";
import { useGetAllResourcesQuery } from "@/service/kotlin/resourceApi";
import { Card } from "@/components/ui/card";
import { RouteConstant } from "@/router/routes";
import { resourcesColumns } from "@/utilities/constants/colums";
import { ContainerRegistry } from "../ecr";
import NiceModal from "@ebay/nice-modal-react";
import { ModalConstant } from "@/components/shared/modal/register";
export const Resources = () => {
  const [rowId, setRowId] = useState<number>(0);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const account = useSelector((state: RootState) => state.account);
  const dashboard = useSelector((state: RootState) => state.dashboard);
  const [selectedType, setSelectedType] = useState("");

  const { data: resourceData, isLoading } = useGetAllResourcesQuery(
    {
      accountCode: account?.accountCode,
      provider: dashboard.provider,
      type: account.type,
    },
    { skip: !account?.accountCode }
  );

  const actions = [
    {
      label: "View",
      icon: Eye,
      onClick: (row: resourceType) => {
        NiceModal.show(ModalConstant.DrawerModal, row);
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
        NiceModal.show(ModalConstant.DeleteResourceModal, row);
      },
      variant: "destructive" as const,
    },
  ];

  const handleRowClick = (row: resourceType) => {
    setRowId(row.resourceId);
    setSelectedType(row.resourceType);
  };

  const selectedData = resourceData?.data.find(
    (item) => item.resourceId === rowId
  );

  return (
    <div className="h-full">
      <Header title="Resources" description="Manage your resources">
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
          isLoading={isLoading}
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

      {selectedType.toLowerCase() === "containerregistry" && selectedData && (
        <ContainerRegistry resourceData={selectedData} />
      )}
    </div>
  );
};
