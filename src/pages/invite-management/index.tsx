import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { UserPlus, X } from "lucide-react";

import { Button, Header, FormPageCard, PageContent } from "@/components/shared";
import { DataTable, type ColumnDef } from "@/components/shared/datatable";
import { StatusBadge } from "@/components/shared/status-badge";
import { showCustomToast } from "@/components/shared/toast";
import { ErrorHandler } from "@/service/httpClient/errorHandler";
import {
  useListSentInvitationsQuery,
  useSendInvitationMutation,
  useRevokeInvitationMutation,
} from "@/service/invitationApi";
import type { InvitationData, MemberType } from "@/models/response/invitationResponse";
import type { RootState } from "@/store";
import { canInviteBusinessUsers } from "@/utilities/contextPermissions";
import { useGetMyAccountsQuery } from "@/service/accountsApi";

const formatDate = (dateStr: string) =>
  new Date(dateStr).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

export const InviteManagement = () => {
  const activeContext = useSelector(
    (state: RootState) => state.context?.activeContext
  );
  const isBusiness = useSelector((state: RootState) => state.auth.isBusiness);
  const canInvite = isBusiness || canInviteBusinessUsers(activeContext);

  const [showInviteForm, setShowInviteForm] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState<MemberType>("Member");
  const [inviteMessage, setInviteMessage] = useState("");
  const [accountId, setAccountId] = useState("");

  const { data: accountsData } = useGetMyAccountsQuery(undefined, {
    skip: !canInvite,
  });
  const accounts = accountsData?.data ?? [];

  const { data, isLoading } = useListSentInvitationsQuery(undefined, {
    skip: !canInvite,
  });

  const [sendInvitation, { isLoading: isInviting }] = useSendInvitationMutation();
  const [revokeInvitation, { isLoading: isRevoking }] =
    useRevokeInvitationMutation();

  const sentInvites = data?.data ?? [];

  const columns = useMemo<ColumnDef<InvitationData>[]>(
    () => [
      {
        id: "user_email",
        header: "Invitee",
        accessorKey: (row) => row.user_email ?? row.user_id,
        sortable: true,
      },
      {
        id: "account",
        header: "Account",
        accessorKey: (row) => row.account_name ?? row.account_id ?? "—",
      },
      {
        id: "role",
        header: "Role",
        accessorKey: (row) => row.role,
        cell: (row) => (
          <span className="rounded-sm bg-muted px-2 py-0.5 text-xs">
            {row.role}
          </span>
        ),
      },
      {
        id: "status",
        header: "Status",
        accessorKey: (row) => row.status,
        cell: (row) => <StatusBadge status={row.status} />,
      },
      {
        id: "created_at",
        header: "Created",
        accessorKey: (row) => row.created_at ?? "",
        sortable: true,
        cell: (row) => (row.created_at ? formatDate(row.created_at) : "—"),
      },
      {
        id: "message",
        header: "Message",
        accessorKey: (row) => row.message ?? "",
        cell: (row) => row.message || "—",
      },
    ],
    []
  );

  const handleInviteSubmit = async () => {
    if (!inviteEmail.trim() || !accountId || !canInvite) return;
    try {
      const res = await sendInvitation({
        account_id: accountId,
        user_email: inviteEmail.trim(),
        role: inviteRole,
        ...(inviteMessage.trim() ? { message: inviteMessage.trim() } : {}),
      }).unwrap();
      showCustomToast(res.message ?? `Invitation sent to ${inviteEmail.trim()}`, {
        toastOptions: { type: "success" },
      });
      setShowInviteForm(false);
      setInviteEmail("");
      setInviteMessage("");
      setInviteRole("Member");
    } catch (error: unknown) {
      showCustomToast(ErrorHandler.extractMessage(error), {
        toastOptions: { type: "error" },
      });
    }
  };

  const handleRevoke = async (invite: InvitationData) => {
    try {
      const res = await revokeInvitation(invite.invite_id).unwrap();
      showCustomToast(res.message, { toastOptions: { type: "info" } });
    } catch (error: unknown) {
      showCustomToast(ErrorHandler.extractMessage(error), {
        toastOptions: { type: "error" },
      });
    }
  };

  return (
    <div className="min-h-screen">
      <Header
        title="Invite Management"
        description="Invite individuals to your organization's cloud accounts."
      >
        {canInvite && (
          <Button
            label="Invite user"
            prefixIcon={<UserPlus className="size-4" />}
            size="small"
            intent="secondary"
            onClick={() => setShowInviteForm((value) => !value)}
          />
        )}
      </Header>

      <PageContent>
        {!canInvite && (
          <p className="mb-4 rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-800">
            Only business accounts can send cloud account invitations.
          </p>
        )}
        {showInviteForm && canInvite && (
          <FormPageCard
            title="Invite a user"
            subtitle="Grant an individual access to one of your cloud accounts."
            footer={
              <div className="flex gap-2">
                <Button
                  label="Send invite"
                  onClick={handleInviteSubmit}
                  disabled={
                    isInviting ||
                    !inviteEmail.trim() ||
                    !accountId ||
                    !canInvite
                  }
                  isLoading={isInviting}
                />
                <Button
                  label="Cancel"
                  intent="secondary"
                  onClick={() => setShowInviteForm(false)}
                />
              </div>
            }
          >
            <div className="max-w-md space-y-4">
              <div>
                <label className="mb-1 block text-xs font-medium text-foreground">
                  Cloud account
                </label>
                <select
                  value={accountId}
                  onChange={(e) => setAccountId(e.target.value)}
                  className="h-9 w-full rounded-md border border-border bg-background px-3 text-sm"
                >
                  <option value="">Select account</option>
                  {accounts.map((account) => (
                    <option key={account.account_id} value={account.account_id}>
                      {account.account_name} ({account.account_provider})
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-foreground">
                  Email address
                </label>
                <input
                  type="email"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  placeholder="user@example.com"
                  className="h-9 w-full rounded-md border border-border bg-background px-3 text-sm"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-foreground">
                  Role
                </label>
                <select
                  value={inviteRole}
                  onChange={(e) => setInviteRole(e.target.value as MemberType)}
                  className="h-9 w-full rounded-md border border-border bg-background px-3 text-sm"
                >
                  <option value="Admin">Admin</option>
                  <option value="Member">Member</option>
                  <option value="Viewer">Viewer</option>
                </select>
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-foreground">
                  Message (optional)
                </label>
                <textarea
                  value={inviteMessage}
                  onChange={(e) => setInviteMessage(e.target.value)}
                  placeholder="Add a personal note..."
                  rows={3}
                  className="w-full resize-none rounded-md border border-border bg-background px-3 py-2 text-sm"
                />
              </div>
            </div>
          </FormPageCard>
        )}

        <DataTable
          data={sentInvites}
          columns={columns}
          title="Sent invitations"
          description="Pending and historical invitations across your accounts."
          searchPlaceholder="Search invites..."
          isLoading={isLoading || isRevoking}
          getRowId={(row) => row.invite_id}
          actions={[
            {
              label: "Revoke",
              icon: X,
              onClick: (row) => {
                if (row.status === "PENDING") handleRevoke(row);
              },
            },
          ]}
          showDownload={false}
          pageSize={10}
        />
      </PageContent>
    </div>
  );
};
