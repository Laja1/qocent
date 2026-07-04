import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { Check, UserPlus, X } from "lucide-react";

import { Button, Header, FormPageCard, PageContent } from "@/components/shared";
import { DataTable, type ColumnDef } from "@/components/shared/datatable";
import { StatusBadge } from "@/components/shared/status-badge";
import { Button as UiButton } from "@/components/ui/button";
import { showCustomToast } from "@/components/shared/toast";
import { ErrorHandler } from "@/service/httpClient/errorHandler";
import {
  useGetBusinessInvitesQuery,
  useInviteUserMutation,
  useCancelInviteMutation,
  useBusinessRespondToRequestMutation,
} from "@/service/businessInviteApi";
import type {
  BusinessInviteResponse,
  ProposedRole,
} from "@/models/response/businessInviteResponse";
import type { RootState } from "@/store";
import { canInviteBusinessUsers } from "@/utilities/contextPermissions";

const formatDate = (dateStr: string) =>
  new Date(dateStr).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

interface RespondModalProps {
  invite: BusinessInviteResponse;
  onConfirm: (proposedRole: ProposedRole) => void;
  onCancel: () => void;
  isLoading: boolean;
}

function RespondModal({
  invite,
  onConfirm,
  onCancel,
  isLoading,
}: RespondModalProps) {
  const [role, setRole] = useState<ProposedRole>("VIEWER");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-sm rounded-lg border border-border bg-card p-6 shadow-lg">
        <h3 className="text-sm font-semibold text-foreground">
          Accept join request
        </h3>
        <p className="mt-1 text-xs text-muted-foreground">
          Assign a role for{" "}
          <span className="font-medium">{invite.user_id}</span> before accepting.
        </p>
        {invite.message && (
          <p className="mt-3 text-xs italic text-muted-foreground">
            &ldquo;{invite.message}&rdquo;
          </p>
        )}
        <div className="mt-4">
          <label className="mb-1 block text-xs font-medium text-foreground">
            Role
          </label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value as ProposedRole)}
            className="h-9 w-full rounded-md border border-border bg-background px-3 text-sm"
          >
            <option value="VIEWER">VIEWER</option>
            <option value="MEMBER">MEMBER</option>
          </select>
        </div>
        <div className="mt-5 flex gap-2">
          <UiButton
            className="flex-1"
            size="sm"
            onClick={() => onConfirm(role)}
            disabled={isLoading}
          >
            Accept
          </UiButton>
          <UiButton
            variant="outline"
            className="flex-1"
            size="sm"
            onClick={onCancel}
            disabled={isLoading}
          >
            Cancel
          </UiButton>
        </div>
      </div>
    </div>
  );
}

export const InviteManagement = () => {
  const activeContext = useSelector(
    (state: RootState) => state.context?.activeContext
  );
  const isBusiness = useSelector((state: RootState) => state.auth.isBusiness);

  // Direct business login (isBusiness=true) OR a user in business-owner context
  const canInvite = isBusiness || canInviteBusinessUsers(activeContext);

  const [showInviteForm, setShowInviteForm] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState<ProposedRole>("VIEWER");
  const [inviteMessage, setInviteMessage] = useState("");
  const [respondTarget, setRespondTarget] =
    useState<BusinessInviteResponse | null>(null);

  const { data, isLoading } = useGetBusinessInvitesQuery(
    { status: "PENDING" },
    { skip: !canInvite }
  );

  const [inviteUser, { isLoading: isInviting }] = useInviteUserMutation();
  const [cancelInvite, { isLoading: isCancelling }] = useCancelInviteMutation();
  const [businessRespond, { isLoading: isResponding }] =
    useBusinessRespondToRequestMutation();

  const allInvites = data?.data ?? [];
  const sentInvites = allInvites.filter((i) => i.initiated_by === "BUSINESS");
  const joinRequests = allInvites.filter((i) => i.initiated_by === "USER");

  const columns = useMemo<ColumnDef<BusinessInviteResponse>[]>(
    () => [
      {
        id: "user_id",
        header: "User",
        accessorKey: (row) => row.user_id,
        sortable: true,
      },
      {
        id: "role",
        header: "Role",
        accessorKey: (row) => row.proposed_role,
        cell: (row) => (
          <span className="rounded-sm bg-muted px-2 py-0.5 text-xs">
            {row.proposed_role}
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
        accessorKey: (row) => row.created_at,
        sortable: true,
        cell: (row) => formatDate(row.created_at),
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
    if (!inviteEmail.trim() || !canInvite) return;
    try {
      const res = await inviteUser({
        user_email: inviteEmail.trim(),
        proposed_role: inviteRole,
        ...(inviteMessage.trim() ? { message: inviteMessage.trim() } : {}),
      }).unwrap();
      showCustomToast(`Invitation sent to ${res.user_id}`, {
        toastOptions: { type: "success" },
      });
      setShowInviteForm(false);
      setInviteEmail("");
      setInviteMessage("");
      setInviteRole("VIEWER");
    } catch (error: unknown) {
      showCustomToast(ErrorHandler.extractMessage(error), {
        toastOptions: { type: "error" },
      });
    }
  };

  const handleCancelInvite = async (invite: BusinessInviteResponse) => {
    try {
      const res = await cancelInvite({ invite_id: invite.invite_id }).unwrap();
      showCustomToast(res.message, { toastOptions: { type: "info" } });
    } catch (error: unknown) {
      showCustomToast(ErrorHandler.extractMessage(error), {
        toastOptions: { type: "error" },
      });
    }
  };

  const handleRejectRequest = async (invite: BusinessInviteResponse) => {
    try {
      const res = await businessRespond({
        invite_id: invite.invite_id,
        body: { action: "REJECT" },
      }).unwrap();
      showCustomToast(res.message, { toastOptions: { type: "info" } });
    } catch (error: unknown) {
      showCustomToast(ErrorHandler.extractMessage(error), {
        toastOptions: { type: "error" },
      });
    }
  };

  const handleRespondConfirm = async (proposedRole: ProposedRole) => {
    if (!respondTarget) return;
    try {
      const res = await businessRespond({
        invite_id: respondTarget.invite_id,
        body: { action: "ACCEPT", proposed_role: proposedRole },
      }).unwrap();
      showCustomToast(res.message, { toastOptions: { type: "success" } });
      setRespondTarget(null);
    } catch (error: unknown) {
      showCustomToast(ErrorHandler.extractMessage(error), {
        toastOptions: { type: "error" },
      });
      setRespondTarget(null);
    }
  };

  return (
    <div className="min-h-screen">
      <Header
        title="Invite Management"
        description="Manage invitations for your business."
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
            Only business owners can invite users. Individual users should use
            Request to Join from their personal workspace.
          </p>
        )}
        {showInviteForm && canInvite && (
          <FormPageCard
            title="Invite a user"
            subtitle="Send an invitation to join your business workspace."
            footer={
              <div className="flex gap-2">
                <Button
                  label="Send invite"
                  onClick={handleInviteSubmit}
                  disabled={isInviting || !inviteEmail.trim() || !canInvite}
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
                  onChange={(e) =>
                    setInviteRole(e.target.value as ProposedRole)
                  }
                  className="h-9 w-full rounded-md border border-border bg-background px-3 text-sm"
                >
                  <option value="VIEWER">VIEWER</option>
                  <option value="MEMBER">MEMBER</option>
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
          title="Business invites sent"
          description="Pending invitations you have sent to users."
          searchPlaceholder="Search invites..."
          isLoading={isLoading || isCancelling}
          getRowId={(row) => row.invite_id}
          actions={[
            {
              label: "Cancel",
              icon: X,
              onClick: (row) => {
                if (row.status === "PENDING") handleCancelInvite(row);
              },
            },
          ]}
          showDownload={false}
          pageSize={10}
        />

        <DataTable
          data={joinRequests}
          columns={columns}
          title="Join requests received"
          description="Users requesting to join your business."
          searchPlaceholder="Search requests..."
          isLoading={isLoading || isResponding}
          getRowId={(row) => row.invite_id}
          actions={[
            {
              label: "Accept",
              icon: Check,
              onClick: (row) => {
                if (row.status === "PENDING") setRespondTarget(row);
              },
            },
            {
              label: "Reject",
              icon: X,
              variant: "destructive",
              onClick: (row) => {
                if (row.status === "PENDING") handleRejectRequest(row);
              },
            },
          ]}
          showDownload={false}
          pageSize={10}
        />
      </PageContent>

      {respondTarget && (
        <RespondModal
          invite={respondTarget}
          onConfirm={handleRespondConfirm}
          onCancel={() => setRespondTarget(null)}
          isLoading={isResponding}
        />
      )}
    </div>
  );
};
