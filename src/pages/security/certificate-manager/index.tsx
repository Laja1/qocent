/* eslint-disable @typescript-eslint/no-explicit-any */
import { Header } from "@/components/shared";
import { DataTable } from "@/components/shared/datatable";
import { Card } from "@/components/ui/card";
import {
  certificateManagerColumns,
  type certificateManagerType,
} from "@/utilities/constants/colums";
import { useState } from "react";

import { FileKeyIcon, Shield, Plus, Upload } from "lucide-react";
import { useResourceMap } from "@/utilities/constants/icons";
import NiceModal from "@ebay/nice-modal-react";
import { ModalConstant } from "@/components/shared/modal/register";

// 🔹 Reusable ActionCard component
const ActionCard = ({
  icon,
  title,
  description,
  className,
  onClick,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  className?: string;
  onClick?: () => void;
}) => (
  <button
    className={`group cursor-pointer glass-effect rounded-sm bg-red-200 items-start  min-w-[250px] justify-start flex flex-col text-white p-5 transition-all hover:shadow-lg ${className}`}
    onClick={onClick}
  >
    <div className="items-start p-3 flex-col justify-start mb-4 rounded-sm bg-gray-300 inline-flex">
      {icon}
    </div>
    <h3 className="font-bold text-gray-900">{title}</h3>
    <p className="text-xs text-gray-700">{description}</p>
  </button>
);

export const CertificateManager = () => {
  const [rowId, setRowId] = useState<string>("");
  const [certificates] = useState<certificateManagerType[]>([]);

  const handleRowClick = (row: certificateManagerType) => {
    if (row.name) setRowId(row.name);
  };

  return (
    <div className="h-full w-full">
      <Header
        title="CERTIFICATE MANAGER"
        description="Manage and monitor your SSL/TLS certificates"
      />

      {/* 🔹 Data Table */}
      <Card className="mx-5 px-5 mt-5 rounded-sm">
        <DataTable
          data={certificates}
          columns={certificateManagerColumns}
          searchPlaceholder="Search certificates by name..."
          pageSize={5}
          isLoading={false}
          title="CERTIFICATE MANAGER"
          highlightedRowId={rowId}
          onRowClick={handleRowClick}
          emptyComponent={
            <tr className="text-center w-full">
              <td colSpan={7} className="py-12 text-center">
                <div className="flex flex-col   rounded-sm items-center gap-3">
                  {useResourceMap().CertificateManager.icon}
                  <div>
                    <p className="text-muted-foreground font-medium">
                      No certificates found
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Push your first certificate to get started
                    </p>
                  </div>
                </div>
              </td>
            </tr>
          }
          initialSorting={{ id: "id", desc: false }}
        />
      </Card>

      {/* 🔹 Actions */}
      <div className="flex flex-wrap flex-row gap-4 m-5">
        <ActionCard
          icon={<Plus className="h-4 w-4 text-black" />}
          title="Apply for Certificate"
          description="Request a new SSL/TLS certificate"
          onClick={() => {
            NiceModal.show(ModalConstant.ApplyForCertificate);
          }}
        />
        <ActionCard
          icon={<Upload className="h-4 w-4 text-black" />}
          title="Upload Certificate"
          description="Import existing certificates"
        />
        <ActionCard
          icon={<FileKeyIcon className="h-4 w-4 text-black" />}
          title="Create Private CA"
          description="Set up private authority"
        />
        <ActionCard
          icon={<Shield className="h-4 w-4 text-black" />}
          title="Private Certificate"
          description="Apply for private cert"
        />
      </div>
    </div>
  );
};
