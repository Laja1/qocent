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
import { DataTable } from "../datatabless";
import type { ColumnDef } from "../table";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2 } from "lucide-react";
import { showCustomToast } from "../toast";
import type { Account } from "@/models/response/organizationResponse";
import {
  useGetAccountMembersQuery,
  useRemoveAccountMemberMutation,
} from "@/service/python/accountsApi";
import type { AccountMemberResponse } from "@/models/response/accountResponse";

export const AccessDrawer = NiceModal.create<{ site: Account }>(({ site }) => {
  const modal = useModal(ModalConstant.AccessDrawer);
  const { data: accountMembersData, isLoading: isAccountMemberLoading } =
    useGetAccountMembersQuery(site.account_id);
  const [removeMember] = useRemoveAccountMemberMutation();
  // const getDescription = () => {
  //     if (!details) return "No data available";
  //     const keys = Object.keys(details);
  //     return `Viewing object with ${keys.length} properties`;
  // };
  const handleDeleteMembers = async (userId: string) => {
    try {
      await removeMember({
        account_id: site.account_id,
        body: { user_id: userId },
      }).unwrap();
      showCustomToast("Member deleted successfully", {
        toastOptions: { type: "success", autoClose: 5000 },
      });
    } catch (error: any) {
      const message = error?.data?.message || "Failed to delete member";
      showCustomToast(message, {
        toastOptions: { type: "error", autoClose: 5000 },
      });
    }
  };
  const memberColumns: ColumnDef<AccountMemberResponse>[] = [
    {
      id: "user",
      header: "User",
      accessorKey: "user_first_name",
      cell: (row) => (
        <div className="flex items-center space-x-3">
          <div>
            <p className="text-xs  my-1">
              {row.user_first_name} {row.user_last_name}
            </p>
          </div>
        </div>
      ),
      sortable: true,
    },
    {
      id: "userEmail",
      header: "Email",
      accessorKey: "user_email",
      cell: (row) => (
        <div className="flex items-center space-x-3">
          <div>
            <p className="text-xs">{row.user_email}</p>
          </div>
        </div>
      ),
      sortable: true,
    },

    {
      id: "account_member_type",
      header: "Role",
      accessorKey: "account_member_type",
      cell: (row) => (
        <Badge
          variant="outline"
          className={
            row.account_member_type === "Admin"
              ? "bg-blue-50 text-blue-700 border-blue-200"
              : "bg-gray-50 text-gray-700 border-gray-200"
          }
        >
          {row.account_member_type}
        </Badge>
      ),
      sortable: true,
      filterType: "select",
      filterOptions: [
        { label: "Admin", value: "Admin" },
        { label: "Member", value: "Member" },
        { label: "Viewer", value: "Viewer" },
      ],
    },

    {
      id: "account_member_created_at",
      header: "Member Created At",
      accessorKey: "account_member_created_at",
      cell: (row) => (
        <div className="flex items-center space-x-3">
          <div>
            <p className="text-xs">
              {new Date(row.account_member_created_at).toLocaleDateString()}
            </p>
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
            <DrawerTitle>{site.account_name} Members</DrawerTitle>
            {/* <DrawerDescription>{getDescription()}</DrawerDescription> */}
          </DrawerHeader>

          <div className="px-4 pb-6 overflow-y-auto max-h-[60vh]">
            <div className="px-5 flex flex-col">
              <DataTable
                data={accountMembersData?.data || []}
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
                        member: row,
                      }),
                  },
                  {
                    label: "Remove Member",
                    icon: Trash2,
                    onClick: (row) => handleDeleteMembers(row.account_user_id),
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
