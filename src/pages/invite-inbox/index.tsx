import { useMemo, useState } from "react";
import { Check, X } from "lucide-react";

import { Header, PageContent } from "@/components/shared";
import { DataTable, type ColumnDef } from "@/components/shared/datatable";
import { StatusBadge } from "@/components/shared/status-badge";
import { Button as UiButton } from "@/components/ui/button";
import { showCustomToast } from "@/components/shared/toast";
import { ErrorHandler } from "@/service/httpClient/errorHandler";
import {
  useGetMyInvitationsQuery,
  useAcceptInvitationMutation,
  useRejectInvitationMutation,
} from "@/service/invitationApi";
import type { InvitationData } from "@/models/response/invitationResponse";

const formatDate = (dateStr: string) =>
  new Date(dateStr).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

interface AcceptModalProps {
  invite: InvitationData;
  onConfirm: () => void;
  onCancel: () => void;
  isLoading: boolean;
}

function AcceptModal({ invite, onConfirm, onCancel, isLoading }: AcceptModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-sm rounded-lg border border-border bg-card p-6 shadow-lg">
        <h3 className="text-sm font-semibold text-foreground">Accept invitation</h3>
        <p className="mt-1 text-xs text-muted-foreground">
          You are accepting a{" "}
          <span className="font-medium">{invite.role}</span> role on{" "}
          <span className="font-medium">{invite.account_name ?? "a cloud account"}</span>.
          {invite.message && (
            <span className="mt-2 block italic">&ldquo;{invite.message}&rdquo;</span>
          )}
        </p>
        <div className="mt-5 flex gap-2">
          <UiButton
            className="flex-1"
            size="sm"
            onClick={onConfirm}
            disabled={isLoading}
          >
            Confirm
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

export const InviteInbox = () => {
  const [acceptingInvite, setAcceptingInvite] = useState<InvitationData | null>(null);

  const { data, isLoading } = useGetMyInvitationsQuery();
  const [acceptInvitation, { isLoading: isAccepting }] =
    useAcceptInvitationMutation();
  const [rejectInvitation, { isLoading: isRejecting }] =
    useRejectInvitationMutation();

  const invitations = data?.data ?? [];

  const columns = useMemo<ColumnDef<InvitationData>[]>(
    () => [
      {
        id: "business",
        header: "Organization",
        accessorKey: (row) => row.business_display_name ?? row.business_id,
        sortable: true,
      },
      {
        id: "account",
        header: "Account",
        accessorKey: (row) => row.account_name ?? row.account_id ?? "—",
        sortable: true,
      },
      {
        id: "role",
        header: "Role",
        accessorKey: (row) => row.role,
        cell: (row) => (
          <span className="rounded-sm bg-muted px-2 py-0.5 text-xs text-foreground">
            {row.role}
          </span>
        ),
      },
      {
        id: "status",
        header: "Status",
        accessorKey: (row) => row.status,
        sortable: true,
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
        id: "expires_at",
        header: "Expires",
        accessorKey: (row) => row.expires_at ?? "",
        cell: (row) => (row.expires_at ? formatDate(row.expires_at) : "—"),
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

  const handleAcceptConfirm = async () => {
    if (!acceptingInvite) return;
    try {
      const res = await acceptInvitation(acceptingInvite.invite_id).unwrap();
      showCustomToast(res.message, { toastOptions: { type: "success" } });
      setAcceptingInvite(null);
    } catch (error: unknown) {
      showCustomToast(ErrorHandler.extractMessage(error), {
        toastOptions: { type: "error" },
      });
      setAcceptingInvite(null);
    }
  };

  const handleDecline = async (invite: InvitationData) => {
    try {
      const res = await rejectInvitation(invite.invite_id).unwrap();
      showCustomToast(res.message, { toastOptions: { type: "info" } });
    } catch (error: unknown) {
      showCustomToast(ErrorHandler.extractMessage(error), {
        toastOptions: { type: "error" },
      });
    }
  };

  const actions = [
    {
      label: "Accept",
      icon: Check,
      onClick: (row: InvitationData) => {
        if (row.status === "PENDING") setAcceptingInvite(row);
      },
    },
    {
      label: "Decline",
      icon: X,
      variant: "destructive" as const,
      onClick: (row: InvitationData) => {
        if (row.status === "PENDING") handleDecline(row);
      },
    },
  ];

  return (
    <div className="min-h-screen">
      <Header
        title="Invite Inbox"
        description="Cloud account invitations sent to you by organizations."
      />

      <PageContent>
        <DataTable
          data={invitations}
          columns={columns}
          title="Received invitations"
          description="Accept or decline invitations to join cloud accounts."
          searchPlaceholder="Search invitations..."
          isLoading={isLoading || isAccepting || isRejecting}
          getRowId={(row) => row.invite_id}
          actions={actions}
          showDownload={false}
          pageSize={10}
          emptyComponent={
            <tr>
              <td
                colSpan={columns.length + 1}
                className="h-24 text-center text-xs text-muted-foreground"
              >
                No invitations yet.
              </td>
            </tr>
          }
        />
      </PageContent>

      {acceptingInvite && (
        <AcceptModal
          invite={acceptingInvite}
          onConfirm={handleAcceptConfirm}
          onCancel={() => setAcceptingInvite(null)}
          isLoading={isAccepting}
        />
      )}
    </div>
  );
};
