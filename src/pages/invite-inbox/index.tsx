import { useMemo, useState } from "react";
import { Check, X } from "lucide-react";

import { Header, PageContent, Tabs } from "@/components/shared";
import { DataTable, type ColumnDef } from "@/components/shared/datatable";
import { StatusBadge } from "@/components/shared/status-badge";
import { Button as UiButton } from "@/components/ui/button";
import { showCustomToast } from "@/components/shared/toast";
import { ErrorHandler } from "@/service/httpClient/errorHandler";
import {
  useGetMyInvitesQuery,
  useUserRespondToInviteMutation,
  useCancelJoinRequestMutation,
} from "@/service/businessInviteApi";
import type { BusinessInviteResponse } from "@/models/response/businessInviteResponse";

const TAB = {
  received: 1,
  sent: 2,
} as const;

const formatDate = (dateStr: string) =>
  new Date(dateStr).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

interface AcceptModalProps {
  invite: BusinessInviteResponse;
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
          <span className="font-medium">{invite.proposed_role}</span> role.
          {invite.message && (
            <span className="mt-2 block italic">&ldquo;{invite.message}&rdquo;</span>
          )}
        </p>
        <p className="mt-3 text-xs text-muted-foreground">
          To set up a cloud account after joining, switch to the business context from your workspace switcher.
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
  const [activeTab, setActiveTab] = useState<number>(TAB.received);
  const [acceptingInvite, setAcceptingInvite] =
    useState<BusinessInviteResponse | null>(null);

  const { data, isLoading } = useGetMyInvitesQuery();
  const [userRespond, { isLoading: isResponding }] =
    useUserRespondToInviteMutation();
  const [cancelRequest, { isLoading: isCancelling }] =
    useCancelJoinRequestMutation();

  const allInvites = data?.data ?? [];
  const received = allInvites.filter((i) => i.initiated_by === "BUSINESS");
  const sent = allInvites.filter((i) => i.initiated_by === "USER");
  const displayList = activeTab === TAB.received ? received : sent;

  const columns = useMemo<ColumnDef<BusinessInviteResponse>[]>(
    () => [
      {
        id: "business_id",
        header: "Business",
        accessorKey: (row) => row.business_id,
        sortable: true,
      },
      {
        id: "role",
        header: "Role",
        accessorKey: (row) => row.proposed_role,
        cell: (row) => (
          <span className="rounded-sm bg-muted px-2 py-0.5 text-xs text-foreground">
            {row.proposed_role}
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
        accessorKey: (row) => row.created_at,
        sortable: true,
        cell: (row) => formatDate(row.created_at),
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
      const res = await userRespond({
        invite_id: acceptingInvite.invite_id,
        body: { action: "ACCEPT" },
      }).unwrap();
      showCustomToast(res.message, { toastOptions: { type: "success" } });
      setAcceptingInvite(null);
    } catch (error: unknown) {
      showCustomToast(ErrorHandler.extractMessage(error), {
        toastOptions: { type: "error" },
      });
      setAcceptingInvite(null);
    }
  };

  const handleDecline = async (invite: BusinessInviteResponse) => {
    try {
      const res = await userRespond({
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

  const handleCancelRequest = async (invite: BusinessInviteResponse) => {
    try {
      const res = await cancelRequest({ invite_id: invite.invite_id }).unwrap();
      showCustomToast(res.message, { toastOptions: { type: "info" } });
    } catch (error: unknown) {
      showCustomToast(ErrorHandler.extractMessage(error), {
        toastOptions: { type: "error" },
      });
    }
  };

  const actions =
    activeTab === TAB.received
      ? [
          {
            label: "Accept",
            icon: Check,
            onClick: (row: BusinessInviteResponse) => {
              if (row.status === "PENDING") setAcceptingInvite(row);
            },
          },
          {
            label: "Decline",
            icon: X,
            variant: "destructive" as const,
            onClick: (row: BusinessInviteResponse) => {
              if (row.status === "PENDING") handleDecline(row);
            },
          },
        ]
      : [
          {
            label: "Cancel",
            icon: X,
            onClick: (row: BusinessInviteResponse) => {
              if (row.status === "PENDING") handleCancelRequest(row);
            },
          },
        ];

  const tabs = [
    {
      id: TAB.received,
      text: `Received (${received.length})`,
      component: <></>,
    },
    {
      id: TAB.sent,
      text: `Sent (${sent.length})`,
      component: <></>,
    },
  ];

  return (
    <div className="min-h-screen">
      <Header
        title="Invite Inbox"
        description="Manage your business invitations and join requests."
      />

      <PageContent>
        <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

        <DataTable
          data={displayList}
          columns={columns}
          title={
            activeTab === TAB.received
              ? "Received invitations"
              : "Sent join requests"
          }
          description={
            activeTab === TAB.received
              ? "Invitations sent to you by businesses."
              : "Requests you have sent to join businesses."
          }
          searchPlaceholder="Search invitations..."
          isLoading={isLoading || isResponding || isCancelling}
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
                No {activeTab === TAB.received ? "received invitations" : "sent requests"} yet.
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
          isLoading={isResponding}
        />
      )}

    </div>
  );
};
