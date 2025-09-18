/* eslint-disable @typescript-eslint/no-explicit-any */
import { DataTable } from "@/components/shared/datatable";
import {
  FileUploader,
  type FileUploaderHandle,
} from "@/components/shared/file-picker";
import { Card } from "@/components/ui/card";
import { obsColumns, type obsType } from "@/utilities/constants/colums";
import { useEffect, useRef, useState } from "react";
import type { resourceType } from "@/models/response/resourceResponse";
import {
  useDeleteS3FileMutation,
  useDownloadFileMutation,
  useGenerateUploadUrlMutation,
  useGetS3ListContentMutation,
} from "@/service/python/formApi";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import { Download, Trash2 } from "lucide-react";
import { showCustomToast } from "@/components/shared/toast";
// import { calculatePresignedUrlExpiry } from "@/utilities/helper";

export const RouteTable = ({ resourceData }: { resourceData: resourceType }) => {
  console.log(resourceData?.resourceCode, "resourceData");
  const uploaderRef = useRef<FileUploaderHandle>(null);
  const [rowId, setRowId] = useState<string>("");
  const [getS3Files, { isLoading }] = useGetS3ListContentMutation();
  const [uploadFile] = useGenerateUploadUrlMutation();
  const [deleteFile, { isLoading: isDeleteLoading }] =
    useDeleteS3FileMutation();

  const [downloadFile] = useDownloadFileMutation();
  const [s3, setS3] = useState<obsType[]>([]);
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

      setS3(res?.data || []);
    } catch (err) {
      console.error("Error fetching S3 files:", err);
      showCustomToast("Failed to fetch S3 files", {
        toastOptions: { type: "error", autoClose: 5000 },
      });
    }
  };

  useEffect(() => {
    if (resourceData?.resourceName && siteData?.siteKey) {
      fetchS3Files();
    }
  }, [resourceData?.resourceName, siteData?.siteKey]);

  const actions = [
    {
      label: "Download",
      icon: Download,
      onClick: async (row: obsType) => {
        // Fix: Check if row.Key is not null before proceeding
        if (!row.Key) {
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
              key: row.Key,
            },
            xKey: siteData?.siteKey as string,
          }).unwrap();

          // Fix: Get filename from row.Key since blob doesn't have headers
          // The content-disposition header would be available in the response headers,
          // but since we're getting a Blob, we'll use the Key as fallback
          // eslint-disable-next-line prefer-const
          let fileName = row.Key.split("/").pop() || "downloaded-file";

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
      onClick: async (row: obsType) => {
        // Fix: Check if row.Key is not null before proceeding
        if (!row.Key) {
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
              keys: [{ Key: row.Key }],
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

  const handleFileSelect = async (file: File) => {
    console.log("Selected file:", file);

    try {
      const res = await uploadFile({
        category: "storage",
        resource: "s3",
        action: "get_signed_bucket_url",
        body: {
          name: resourceData?.resourceName || "my-bucket",
          key: `${file.name}`,
          file: file.name,
          folder: "uploads",
          expiresIn: 600,
        },
        xKey: siteData?.siteKey as string,
      }).unwrap();

      // Upload the file using the signed URL
      const signedUrl = res.data.uploadUrl;
      const uploadResponse = await fetch(signedUrl, {
        method: "PUT",
        body: file,
        headers: {
          "Content-Type": file.type || "application/octet-stream",
        },
      });

      if (!uploadResponse.ok) {
        throw new Error(
          `Upload failed: ${uploadResponse.status} ${uploadResponse.statusText}`
        );
      }

      console.log("File uploaded successfully");

      // ✅ Clear the file AFTER successful upload
      // Alternative: Add a small delay if needed
      setTimeout(() => {
        uploaderRef.current?.clearFile();
      }, 100);
      showCustomToast("File uploaded successfully", {
        toastOptions: { type: "success", autoClose: 5000 },
      });

      // Refresh the file list after successful upload
      await fetchS3Files();
    } catch (error: any) {
      console.error("Upload error:", error);

      showCustomToast(error?.message || "Failed to upload file", {
        toastOptions: { type: "error", autoClose: 5000 },
      });
    }
  };

  const handleFileRemove = () => {
    console.log("File removed");
  };

  const handleRowClick = (row: obsType) => {
    // Fix: Check if row.Key is not null before setting it
    if (row.Key) {
      setRowId(row.Key);
    }
  };

  return (
    <div className="h-full w-full">
      <Card className="mx-5 px-5 mt-5 rounded-sm">
        <DataTable
          data={s3}
          columns={obsColumns}
          searchPlaceholder="Search files by name..."
          pageSize={5}
          actions={actions}
          isLoading={isDeleteLoading || isLoading}
          title="CLOUD STORAGE"
          highlightedRowId={rowId}
          onRowClick={handleRowClick}
          initialSorting={{ id: "id", desc: false }}
        />
      </Card>

      <div className="w-full justify-center flex">
        <div className="w-full justify-center flex flex-col items-center m-5">
          <FileUploader
            className="rounded-sm"
            onFileSelect={handleFileSelect}
            onFileRemove={handleFileRemove}
            maxFileSize={5 * 1024 * 1024}
          />
        </div>
      </div>
    </div>
  );
};
