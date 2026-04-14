/* eslint-disable @typescript-eslint/no-explicit-any */
import { DataTable } from "@/components/shared/datatabless";
import { Card } from "@/components/ui/card";
import {
  containerRegistryColumn,
  type containerRegistryType,
} from "@/utilities/constants/colums";
import { useState } from "react";
import type { resourceType } from "@/models/response/resourceResponse";
import {
  useDeleteS3FileMutation,
  useDownloadFileMutation,
  useGetS3ListContentMutation,
} from "@/service/python/formApi";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import { Download, Package, Trash2 } from "lucide-react";
import { showCustomToast } from "@/components/shared/toast";
import { CommandDisplay } from "./command-line";
// import { calculatePresignedUrlExpiry } from "@/utilities/helper";

export const ContainerRegistry = ({
  resourceData,
}: {
  resourceData: resourceType;
}) => {
  console.log(resourceData?.resourceCode, "resourceData");

  const [rowId, setRowId] = useState<string>("");
  const [getS3Files, { isLoading }] = useGetS3ListContentMutation();
  const [deleteFile, { isLoading: isDeleteLoading }] =
    useDeleteS3FileMutation();

  const [downloadFile] = useDownloadFileMutation();
  const [s3] = useState<containerRegistryType[]>([]);
  const site = useSelector((state: RootState) => state.site);

  const siteData = site?.find(
    (item) => item.siteCode === resourceData?.resourceSiteCode
  );

  const fetchS3Files = async () => {
    if (!resourceData?.resourceName || !siteData?.siteKey) {
      return;
    }

    try {
      const res = await getS3Files({
        category: "storage" as const,
        resource: "s3" as const,
        action: "list_bucket_content" as const,
        body: { name: resourceData.resourceName },
        xKey: siteData.siteKey,
      }).unwrap();

      console.log(res);
    } catch (err) {
      console.error("Error fetching S3 files:", err);
      showCustomToast("Failed to fetch S3 files", {
        toastOptions: { type: "error", autoClose: 5000 },
      });
    }
  };

  const actions = [
    {
      label: "Download",
      icon: Download,
      onClick: async (row: containerRegistryType) => {
        // Fix: Check if row.imageType is not null before proceeding
        if (!row.imageType) {
          showCustomToast("File key is missing", {
            toastOptions: { type: "error", autoClose: 5000 },
          });
          return;
        }

        try {
          const blob = await downloadFile({
            category: "storage",
            resource: "s3",
            action: "download_bucket_content",
            body: {
              name: resourceData?.resourceName as string,
              key: row.imageType,
            },
            xKey: siteData?.siteKey as string,
          }).unwrap();

          // Fix: Get filename from row.imageType since blob doesn't have headers
          // The content-disposition header would be available in the response headers,
          // but since we're getting a Blob, we'll use the Key as fallback
          // eslint-disable-next-line prefer-const
          let fileName = row.imageType.split("/").pop() || "downloaded-file";

          // If you need to access response headers, you'll need to modify the API
          // to return both the blob and headers, or handle this differently in your RTK Query setup

          const url = window.URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = fileName;
          a.click();
          window.URL.revokeObjectURL(url);

          showCustomToast(
            `${resourceData?.resourceName} downloaded successfully`,
            { toastOptions: { type: "success", autoClose: 5000 } }
          );
        } catch (error: any) {
          console.error("Download File Error:", error);
          showCustomToast(error?.data?.message || "Failed to download file", {
            toastOptions: { type: "error", autoClose: 5000 },
          });
        }
      },
    },
    {
      label: "Delete",
      icon: Trash2,
      onClick: async (row: containerRegistryType) => {
        // Fix: Check if row.imageType is not null before proceeding
        if (!row.imageType) {
          showCustomToast("File key is missing", {
            toastOptions: { type: "error", autoClose: 5000 },
          });
          return;
        }

        try {
          const res = await deleteFile({
            category: "storage",
            resource: "s3",
            action: "delete_bucket_content",
            body: {
              name: resourceData?.resourceName as string,
              keys: [{ Key: row.imageType }],
            },
            xKey: siteData?.siteKey,
          }).unwrap();
          showCustomToast(res.responseMessage, {
            toastOptions: { type: "success", autoClose: 5000 },
          });
          fetchS3Files(); // refresh list
        } catch (error: any) {
          console.error("Delete File Error:", error);
          showCustomToast(error?.data?.message || "Failed to delete file", {
            toastOptions: { type: "error", autoClose: 5000 },
          });
        }
      },
      variant: "destructive" as const,
    },
  ];

  // Correct import from parameterApi

  const handleRowClick = (row: containerRegistryType) => {
    // Fix: Check if row.imageType is not null before setting it
    if (row.imageType) {
      setRowId(row.imageType);
    }
  };

  return (
    <div className="h-full w-full">
      <Card className="mx-5 px-5 mt-5 rounded-xs">
        <DataTable
          data={s3}
          columns={containerRegistryColumn}
          searchPlaceholder="Search files by name..."
          pageSize={5}
          actions={actions}
          isLoading={isDeleteLoading || isLoading}
          title="Container Registry"
          emptyComponent={
            <tr>
              <td colSpan={4} className="py-12 text-center">
                <div className="flex flex-col items-center gap-3">
                  <div className="p-3 bg-muted rounded-full">
                    <Package className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-muted-foreground font-medium">
                      No container images found
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Push your first container image to get started
                    </p>
                  </div>
                </div>
              </td>
            </tr>
          }
          highlightedRowId={rowId}
          onRowClick={handleRowClick}
          initialSorting={{ id: "id", desc: false }}
        />
      </Card>

      <div className="w-full justify-center p-5 flex">
        <CommandDisplay />
      </div>
    </div>
  );
};
