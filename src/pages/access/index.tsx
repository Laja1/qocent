import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { Edit, Trash2, UserPlus } from "lucide-react";
import NiceModal from "@ebay/nice-modal-react";

import { Button, Header, PageContent } from "@/components/shared";
import { DataTable, type ColumnDef } from "@/components/shared/datatable";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { ModalConstant } from "@/components/shared/modal/register";
import { showCustomToast } from "@/components/shared/toast";
import { ErrorHandler } from "@/service/httpClient/errorHandler";

import { useGetMyAccountsQuery } from "@/service/accountsApi";
import {
  useGetAccountMembersQuery,
  useRemoveAccountMemberMutation,
} from "@/service/accountsApi";
import type { AccountResponse } from "@/models/response/accountResponse";
import type { AccountMemberResponse } from "@/models/response/accountResponse";
import type { RootState } from "@/store";
import { SettingsSection } from "@/components/shared/settings-section";
import { canInviteBusinessUsers } from "@/utilities/contextPermissions";

const getInitials = (first?: string, last?: string, email?: string) => {
  const f = (first || "").trim();
  const l = (last || "").trim();
  if (f || l) return `${f.charAt(0)}${l.charAt(0)}`.toUpperCase() || "?";
  return (email?.charAt(0) || "?").toUpperCase();
};

export const Access = () => {
  const dashboard = useSelector((state: RootState) => state.dashboard);
  const activeContext = useSelector(
    (state: RootState) => state.context?.activeContext
  );
  const canInvite = canInviteBusinessUsers(activeContext);

  const { data: accountsResponse, isLoading: isSiteLoading } =
    useGetMyAccountsQuery({
      provider: String(dashboard?.provider) || undefined,
    });

  const accounts = useMemo(
    () => accountsResponse?.data ?? [],
    [accountsResponse]
  );

  const [selectedAccountId, setSelectedAccountId] = useState<string>("");

  useEffect(() => {
    if (!selectedAccountId && accounts.length > 0) {
      setSelectedAccountId(accounts[0].account_id);
    }
  }, [accounts, selectedAccountId]);

  const selectedSite: AccountResponse | undefined = accounts.find(
    (a) => a.account_id === selectedAccountId
  );

  const { data: accountMembersData, isLoading: isMembersLoading } =
    useGetAccountMembersQuery(selectedAccountId, { skip: !selectedAccountId });

  const [removeMember, { isLoading: isRemoving }] =
    useRemoveAccountMemberMutation();

  const members: AccountMemberResponse[] = accountMembersData?.data ?? [];

  const isAdmin =
    selectedSite?.member_type === "Owner" ||
    selectedSite?.member_type === "Admin";

  const handleRemove = async (member: AccountMemberResponse) => {
    if (!selectedAccountId) return;
    const confirmed = window.confirm(
      `Remove ${member.user_first_name ?? member.user_email ?? "this member"} from ${selectedSite?.account_name}?`
    );
    if (!confirmed) return;
    try {
      await removeMember({
        account_id: selectedAccountId,
        body: { user_id: member.account_user_id },
      }).unwrap();
      showCustomToast("Member removed successfully", {
        toastOptions: { type: "success", autoClose: 4000 },
      });
    } catch (error: unknown) {
      showCustomToast(
        ErrorHandler.extractMessage(error) || "Failed to remove member",
        { toastOptions: { type: "error", autoClose: 5000 } }
      );
    }
  };

  const columns = useMemo<ColumnDef<AccountMemberResponse>[]>(
    () => [
      {
        id: "member",
        header: "Member",
        accessorKey: (row) =>
          `${row.user_first_name ?? ""} ${row.user_last_name ?? ""}`.trim() ||
          row.user_email ||
          "",
        sortable: true,
        cell: (row) => {
          const fullName =
            `${row.user_first_name ?? ""} ${row.user_last_name ?? ""}`.trim() ||
            row.user_email ||
            "Unknown";
          const initials = getInitials(
            row.user_first_name,
            row.user_last_name,
            row.user_email
          );
          return (
            <div className="flex items-center gap-3">
              <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                {initials}
              </div>
              <div className="min-w-0">
                <p className="truncate text-xs font-medium text-foreground">
                  {fullName}
                </p>
                {row.user_email && (
                  <p className="truncate text-[11px] text-muted-foreground">
                    {row.user_email}
                  </p>
                )}
              </div>
            </div>
          );
        },
      },
      {
        id: "role",
        header: "Role",
        accessorKey: (row) => row.account_member_type,
        sortable: true,
        cell: (row) => (
          <span className="rounded-sm bg-muted px-2 py-0.5 text-xs text-foreground">
            {row.account_member_type}
          </span>
        ),
      },
      {
        id: "joined",
        header: "Joined",
        accessorKey: (row) => row.account_member_created_at,
        sortable: true,
        cell: (row) =>
          new Date(row.account_member_created_at).toLocaleDateString(undefined, {
            month: "short",
            day: "numeric",
            year: "numeric",
          }),
      },
    ],
    []
  );

  const actions = isAdmin
    ? [
        {
          label: "Edit role",
          icon: Edit,
          onClick: (row: AccountMemberResponse) =>
            NiceModal.show(ModalConstant.EditAccessModal, { member: row }),
        },
        {
          label: "Remove",
          icon: Trash2,
          variant: "destructive" as const,
          onClick: (row: AccountMemberResponse) => handleRemove(row),
        },
      ]
    : [];

  return (
    <div className="min-h-screen">
      <Header
        title="Access"
        description="Manage team members, roles, and access across your sites"
      >
        {canInvite && selectedSite && (
          <Button
            label="Invite user"
            prefixIcon={<UserPlus className="size-4" />}
            size="small"
            intent="secondary"
            onClick={() =>
              NiceModal.show(ModalConstant.InviteToWorkspace, selectedSite)
            }
          />
        )}
      </Header>

      <PageContent>
        <SettingsSection
          title="Site"
          description="Choose which server site you want to manage."
        >
          {isSiteLoading ? (
            <p className="text-xs text-muted-foreground">Loading sites...</p>
          ) : accounts.length === 0 ? (
            <p className="text-xs text-muted-foreground">No sites available.</p>
          ) : (
            <div className="max-w-md space-y-3">
              <Select
                value={selectedAccountId}
                onValueChange={setSelectedAccountId}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a site" />
                </SelectTrigger>
                <SelectContent>
                  {accounts.map((site) => (
                    <SelectItem key={site.account_id} value={site.account_id}>
                      {site.account_name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {selectedSite && (
                <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                  <span className="rounded-sm bg-muted px-2 py-0.5">
                    {selectedSite.account_provider}
                  </span>
                  {selectedSite.member_type && (
                    <span className="rounded-sm bg-muted px-2 py-0.5">
                      Your role: {selectedSite.member_type}
                    </span>
                  )}
                </div>
              )}
            </div>
          )}
        </SettingsSection>

        <DataTable
          data={members}
          columns={columns}
          title={selectedSite ? `${selectedSite.account_name} members` : "Members"}
          description="View and manage who has access to this site."
          searchPlaceholder="Search by name or email..."
          isLoading={isMembersLoading || isRemoving}
          getRowId={(row) => row.account_user_id}
          actions={actions}
          showDownload={false}
          pageSize={10}
          emptyComponent={
            <tr>
              <td
                colSpan={columns.length + (actions.length ? 1 : 0)}
                className="h-24 text-center text-xs text-muted-foreground"
              >
                {!selectedAccountId
                  ? "Select a site to view members."
                  : "No members yet. Invite your teammates to get started."}
              </td>
            </tr>
          }
        />
      </PageContent>
    </div>
  );
};
