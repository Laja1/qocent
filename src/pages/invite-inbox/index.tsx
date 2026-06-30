import { useMemo, useState } from "react";
import { Check, Mail, X } from "lucide-react";

import { Button, Header, PageContent, Tabs } from "@/components/shared";
import { DataTable, type ColumnDef } from "@/components/shared/datatable";
import { StatusBadge } from "@/components/shared/status-badge";
import { SettingsSection } from "@/components/shared/settings-section";
import { Button as UiButton } from "@/components/ui/button";
import { showCustomToast } from "@/components/shared/toast";
import { ErrorHandler } from "@/service/httpClient/errorHandler";
import {
  useGetMyInvitesQuery,
  useUserRespondToInviteMutation,
  useCancelJoinRequestMutation,
  useGenerateCloudLoginUrlMutation,
} from "@/service/businessInviteApi";
import type {
  BusinessInviteResponse,
  Csp,
} from "@/models/response/businessInviteResponse";

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
  onConfirm: (csp?: Csp) => void;
  onCancel: () => void;
  isLoading: boolean;
}

function AcceptModal({
  invite,
  onConfirm,
  onCancel,
  isLoading,
}: AcceptModalProps) {
  const [csp, setCsp] = useState<Csp>("aws");
  const requiresCsp = invite.proposed_role === "MEMBER";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-sm rounded-lg border border-border bg-card p-6 shadow-lg">
        <h3 className="text-sm font-semibold text-foreground">Accept invitation</h3>
        <p className="mt-1 text-xs text-muted-foreground">
          You are accepting a{" "}
          <span className="font-medium">{invite.proposed_role}</span> role.
        </p>
        {requiresCsp && (
          <div className="mt-4">
            <label className="mb-1 block text-xs font-medium text-foreground">
              Cloud provider
            </label>
            <select
              value={csp}
              onChange={(e) => setCsp(e.target.value as Csp)}
              className="h-9 w-full rounded-md border border-border bg-background px-3 text-sm"
            >
              <option value="aws">AWS</option>
              <option value="huawei">Huawei</option>
            </select>
          </div>
        )}
        <div className="mt-5 flex gap-2">
          <UiButton
            className="flex-1"
            size="sm"
            onClick={() => onConfirm(requiresCsp ? csp : undefined)}
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
  const [respondedInviteResult, setRespondedInviteResult] = useState<{
    invite_id: string;
    cloud_account_id?: string | null;
    csp?: string | null;
  } | null>(null);

  const { data, isLoading } = useGetMyInvitesQuery();
  const [userRespond, { isLoading: isResponding }] =
    useUserRespondToInviteMutation();
  const [cancelRequest, { isLoading: isCancelling }] =
    useCancelJoinRequestMutation();
  const [generateLoginUrl, { isLoading: isGeneratingUrl }] =
    useGenerateCloudLoginUrlMutation();

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

  const handleAcceptConfirm = async (csp?: Csp) => {
    if (!acceptingInvite) return;
    try {
      const res = await userRespond({
        invite_id: acceptingInvite.invite_id,
        body: { action: "ACCEPT", ...(csp ? { csp } : {}) },
        ...(csp ? { csp } : {}),
      }).unwrap();
      showCustomToast(res.message, { toastOptions: { type: "success" } });
      if (res.cloud_account_id) {
        setRespondedInviteResult({
          invite_id: res.invite_id,
          cloud_account_id: res.cloud_account_id,
          csp: res.cloud_provider,
        });
      }
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

  const handleSendLoginUrl = async () => {
    if (
      !respondedInviteResult?.cloud_account_id ||
      !respondedInviteResult.csp
    )
      return;
    try {
      const res = await generateLoginUrl({
        account_id: respondedInviteResult.cloud_account_id,
        csp: respondedInviteResult.csp,
      }).unwrap();
      showCustomToast(res.message, { toastOptions: { type: "success" } });
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
        {respondedInviteResult?.cloud_account_id && (
          <SettingsSection
            title="Invitation accepted"
            description="Your cloud account is ready."
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-muted-foreground">
                Cloud account ID:{" "}
                <span className="font-mono text-foreground">
                  {respondedInviteResult.cloud_account_id}
                </span>
              </p>
              {respondedInviteResult.csp && (
                <Button
                  label="Send login URL"
                  prefixIcon={<Mail className="size-4" />}
                  size="small"
                  intent="secondary"
                  onClick={handleSendLoginUrl}
                  isLoading={isGeneratingUrl}
                />
              )}
            </div>
          </SettingsSection>
        )}

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
