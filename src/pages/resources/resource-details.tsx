// ResourceDetails.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */
import { DataTable, type ColumnDef } from "@/components/shared/datatable";
import type { resourceType } from "@/models/response/resourceResponse";

interface ResourceDetailsProps {
  resourceData: resourceType[];
  selectedResourceId: number;
}

interface ResourceDataProps {
  id: number;
  label: string;
  [key: string]: any; // dynamic resource values
}

export const ResourceDetails = ({
  resourceData,
  selectedResourceId,
}: ResourceDetailsProps) => {
  const resourceHighlighted = resourceData.find(
    (item) => item.resourceId === selectedResourceId
  );

  if (!resourceHighlighted) {
    return (
      <div className="p-4 text-center text-gray-500">
        Select a resource to view details
      </div>
    );
  }

  // Create dynamic data based on the selected resource
  const resourceDetailData: ResourceDataProps[] = [
    {
      id: 1,
      label: "Resource ID",
      [selectedResourceId]: resourceHighlighted.resourceId,
    },
    {
      id: 2,
      label: "Resource Name",
      [selectedResourceId]: resourceHighlighted.resourceName,
    },
    {
      id: 3,
      label: "Resource Type",
      [selectedResourceId]: resourceHighlighted.resourceType,
    },
    {
      id: 4,
      label: "Resource Code",
      [selectedResourceId]: resourceHighlighted.resourceCode,
    },
    {
      id: 5,
      label: "Site Code",
      [selectedResourceId]: resourceHighlighted.resourceSiteCode,
    },
    // {
    //   id: 6,
    //   label: "House Code",
    //   [selectedResourceId]: resourceHighlighted.houseCode,
    // },
    // {
    //   id: 7,
    //   label: "Room Code",
    //   [selectedResourceId]: resourceHighlighted.res,
    // },
    {
      id: 8,
      label: "Provider",
      [selectedResourceId]: resourceHighlighted.resourceProvider,
    },
    {
      id: 9,
      label: "Date Created",
      [selectedResourceId]: resourceHighlighted.resourceCreatedAt,
    },
    {
      id: 10,
      label: "IP Range",
      [selectedResourceId]: resourceHighlighted.resourceIP,
    },
  ];

  const resourcesDetailsColumns: ColumnDef<ResourceDataProps>[] = [
    {
      id: "label",
      header: "Resource Parameters",
      accessorKey: "label",
      cell: (row) => (
        <span className="text-green-800 font-brfirma-bold font-medium line-clamp-1 my-1">
          {row.label}
        </span>
      ),
      sortable: false,
    },
    {
      id: "d",
      header: `${resourceHighlighted.resourceType} (${resourceHighlighted.resourceName})`,
      accessorKey: selectedResourceId,
      cell: (row) => (
        <span className="line-clamp-1">{row[selectedResourceId]}</span>
      ),
      sortable: false,
    },
  ];

  return (
    <div>
      <DataTable
        data={resourceDetailData}
        columns={resourcesDetailsColumns}
        showSearch={false}
        showDownload={false}
        searchPlaceholder="Search resource details..."
        pageSize={10}
        actions={[]}
        initialSorting={{ id: "label", desc: false }}
      />
    </div>
  );
};
