import { Header } from "@/components/shared";
import { DataTable } from "@/components/shared/datatable";
import { FileUploader } from "@/components/shared/file-picker";
import { Card } from "@/components/ui/card";
import { obsColumns, type obsType } from "@/utilities/constants/colums";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import type { resourceType } from "@/models/response/resourceResponse";

export const Obs = () => {
  const [rowId, setRowId] = useState<number>(0);
  const location = useLocation();
  const resourceData = location.state as resourceType;

  // Log the resource data for debugging
  console.log("Resource data:", resourceData);

  const handleFileSelect = (file: File) => {
    console.log(file);
  };

  const handleFileRemove = () => {
    console.log("File removed");
  };

  const handleRowClick = (row: obsType) => {
    setRowId(row.id);
  };

  return (
    <div className="h-full w-full">
      <Header title="OBS" description="Manage your obs" />
      <div className="w-full  justify-center flex">
        <div className="max-w-xl justify-center flex flex-col items-center ">
          <FileUploader
            className="rounded-sm"
            onFileSelect={handleFileSelect}
            onFileRemove={handleFileRemove}
            acceptedFileTypes={[
              "image/*", // all image formats (png, jpg, jpeg, gif, svg, etc.)
              "application/pdf", // PDF
              "application/msword", // .doc
              "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // .docx
              "text/plain", // .txt
            ]}
            maxFileSize={5 * 1024 * 1024} // 5MB
          />
        </div>
      </div>
      <Card className="mx-5 px-5 mt-5 rounded-sm">
        <DataTable
          data={[]} // TODO: Replace with actual OBS data
          columns={obsColumns}
          searchPlaceholder="Search OBS files by name, code, or ID..."
          pageSize={5}
          title={"OBS FILES"}
          highlightedRowId={rowId}
          onRowClick={handleRowClick}
          getRowId={(row) => row.id}
          initialSorting={{ id: "id", desc: false }}
        />
      </Card>
    </div>
  );
};
