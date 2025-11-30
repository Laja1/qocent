/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  Drawer,
  DrawerContent,
  // DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { ModalConstant } from "./register";
import { DataTable } from "../datatable";
import type { ColumnDef } from "../table";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2 } from "lucide-react";
import {
  useDeleteMemberMutation,
  useGetAccountMembersQuery,
} from "@/service/python/authApi";
import type { AccountMember } from "@/models/response/authResponse";
import { showCustomToast } from "../toast";
import type { SiteData } from "@/models/response/siteResponse";
import { ErrorHandler } from "@/service/httpClient/errorHandler";

export const AccessDrawer = NiceModal.create<{ site: SiteData }>(({ site }) => {
  const modal = useModal(ModalConstant.AccessDrawer);
  const { data: accountMembersData, isLoading: isAccountMemberLoading } =
    useGetAccountMembersQuery({
      siteCode: site.siteCode,
    });
  const [deleteMember] = useDeleteMemberMutation();
  // const getDescription = () => {
  //     if (!details) return "No data available";
  //     const keys = Object.keys(details);
  //     return `Viewing object with ${keys.length} properties`;
  // };
  const handleDeleteMembers = async (code: string) => {
    try {
      await deleteMember({
        siteCode: site.siteCode,
        memberUserCode: code,
      }).unwrap();
      showCustomToast("Member deleted successfully", {
        toastOptions: { type: "success", autoClose: 5000 },
      });
    } catch (error) {
      const message = ErrorHandler.extractMessage(error);
      showCustomToast(message, {
        toastOptions: { type: "success", autoClose: 5000 },
      });
    }
  };
  const memberColumns: ColumnDef<AccountMember>[] = [
    {
      id: "user",
      header: "User",
      accessorKey: "userFirstName",
      cell: (row) => (
        <div className="flex items-center space-x-3">
          <div>
            <p className="text-xs  my-1">
              {row.userFirstName} {row.userLastName}
            </p>
          </div>
        </div>
      ),
      sortable: true,
    },
    {
      id: "userEmail",
      header: "Email",
      accessorKey: "userEmail",
      cell: (row) => (
        <div className="flex items-center space-x-3">
          <div>
            <p className="text-xs">{row.userEmail}</p>
          </div>
        </div>
      ),
      sortable: true,
    },

    {
      id: "memberStatus",
      header: "Status",
      accessorKey: "memberStatus",
      cell: (row) => (
        <Badge
          variant="outline"
          className={
            row.memberStatus === "ACTIVE"
              ? "bg-green-50 text-green-700 border-green-200"
              : row.memberStatus === "INACTIVE"
              ? "bg-yellow-50 text-yellow-700 border-yellow-200"
              : "bg-red-50 text-red-700 border-red-200"
          }
        >
          {row.memberStatus}
        </Badge>
      ),
      sortable: true,
      filterType: "select",
      filterOptions: [
        { label: "Active", value: "Active" },
        { label: "Pending", value: "Pending" },
        { label: "Suspended", value: "Suspended" },
      ],
    },

    {
      id: "memberCreatedAt",
      header: "Member Created At",
      accessorKey: "memberCreatedAt",
      cell: (row) => (
        <div className="flex items-center space-x-3">
          <div>
            <p className="text-xs">{row.memberCreatedAt}</p>
          </div>
        </div>
      ),
      sortable: true,
    },
  ];

  return (
    <Drawer
      open={modal.visible}
      onOpenChange={(open) => {
        if (!open) modal.hide();
      }}
    >
      <DrawerContent>
        <div className="mx-auto w-full max-w-4xl max-h-[80vh] overflow-hidden">
          <DrawerHeader className="pb-4">
            <DrawerTitle>{accountMembersData?.accountName} Members</DrawerTitle>
            {/* <DrawerDescription>{getDescription()}</DrawerDescription> */}
          </DrawerHeader>

          <div className="px-4 pb-6 overflow-y-auto max-h-[60vh]">
            <div className="px-5 flex flex-col">
              <DataTable
                data={accountMembersData?.members || []}
                columns={memberColumns}
                searchPlaceholder="Search member"
                showDownload={false}
                isLoading={isAccountMemberLoading}
                showSearch={false}
                pageSize={5}
                actions={[
                  {
                    label: "Edit Role",
                    icon: Edit,
                    onClick: (row) =>
                      NiceModal.show(ModalConstant.EditAccessModal, {
                        site,
                        member: row,
                      }),
                  },
                  {
                    label: "Remove Member",
                    icon: Trash2,
                    onClick: (row) => handleDeleteMembers(row.memberUserCode),
                    variant: "destructive",
                  },
                ]}
                // actions={actions}
                // highlightedRowId={rowId}
                // onRowClick={handleRowClick}
                // getRowId={(row) => row.resourceId}
                initialSorting={{ id: "resourceName", desc: false }}
              />
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
});
