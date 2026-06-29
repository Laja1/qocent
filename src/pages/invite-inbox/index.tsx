/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/shared";
import { showCustomToast } from "@/components/shared/toast";
import { ErrorHandler } from "@/service/httpClient/errorHandler";
import { Loader2, Inbox, Send, X, Check, Mail } from "lucide-react";
import {
  useGetMyInvitesQuery,
  useUserRespondToInviteMutation,
  useCancelJoinRequestMutation,
  useGenerateCloudLoginUrlMutation,
} from "@/service/businessInviteApi";
import type { BusinessInviteResponse, Csp } from "@/models/response/businessInviteResponse";

type TabType = "received" | "sent";

const statusBadgeClass: Record<string, string> = {
  PENDING: "bg-yellow-100 text-yellow-800 border-yellow-200",
  ACCEPTED: "bg-green-100 text-green-800 border-green-200",
  REJECTED: "bg-red-100 text-red-800 border-red-200",
  CANCELLED: "bg-gray-100 text-gray-700 border-gray-200",
};

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

function AcceptModal({ invite, onConfirm, onCancel, isLoading }: AcceptModalProps) {
  const [csp, setCsp] = useState<Csp>("aws");
  const requiresCsp = invite.proposed_role === "MEMBER";

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-md shadow-2xl p-6 w-full max-w-sm">
        <h3 className="text-base font-semibold text-gray-900 mb-2">Accept Invitation</h3>
        <p className="text-sm text-gray-500 mb-4">
          You are accepting a <span className="font-medium">{invite.proposed_role}</span> role.
        </p>
        {requiresCsp && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select Cloud Provider
            </label>
            <select
              value={csp}
              onChange={(e) => setCsp(e.target.value as Csp)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="aws">AWS</option>
              <option value="huawei">Huawei</option>
            </select>
          </div>
        )}
        <div className="flex gap-3">
          <Button
            className="flex-1 bg-green-600 hover:bg-green-700 text-white h-8 text-sm"
            onClick={() => onConfirm(requiresCsp ? csp : undefined)}
            disabled={isLoading}
          >
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin mr-1" /> : <Check className="w-4 h-4 mr-1" />}
            Confirm
          </Button>
          <Button
            variant="outline"
            className="flex-1 h-8 text-sm"
            onClick={onCancel}
            disabled={isLoading}
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}

export const InviteInbox = () => {
  const [activeTab, setActiveTab] = useState<TabType>("received");
  const [acceptingInvite, setAcceptingInvite] = useState<BusinessInviteResponse | null>(null);
  const [respondedInviteResult, setRespondedInviteResult] = useState<{
    invite_id: string;
    cloud_account_id?: string | null;
    csp?: string | null;
  } | null>(null);

  const { data, isLoading, isFetching } = useGetMyInvitesQuery();
  const [userRespond, { isLoading: isResponding }] = useUserRespondToInviteMutation();
  const [cancelRequest, { isLoading: isCancelling }] = useCancelJoinRequestMutation();
  const [generateLoginUrl, { isLoading: isGeneratingUrl }] = useGenerateCloudLoginUrlMutation();

  const allInvites = data?.data ?? [];
  const received = allInvites.filter((i) => i.initiated_by === "BUSINESS");
  const sent = allInvites.filter((i) => i.initiated_by === "USER");

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
    } catch (error: any) {
      showCustomToast(ErrorHandler.extractMessage(error), { toastOptions: { type: "error" } });
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
    } catch (error: any) {
      showCustomToast(ErrorHandler.extractMessage(error), { toastOptions: { type: "error" } });
    }
  };

  const handleCancelRequest = async (invite: BusinessInviteResponse) => {
    try {
      const res = await cancelRequest({ invite_id: invite.invite_id }).unwrap();
      showCustomToast(res.message, { toastOptions: { type: "info" } });
    } catch (error: any) {
      showCustomToast(ErrorHandler.extractMessage(error), { toastOptions: { type: "error" } });
    }
  };

  const handleSendLoginUrl = async () => {
    if (!respondedInviteResult?.cloud_account_id || !respondedInviteResult.csp) return;
    try {
      const res = await generateLoginUrl({
        account_id: respondedInviteResult.cloud_account_id,
        csp: respondedInviteResult.csp,
      }).unwrap();
      showCustomToast(res.message, { toastOptions: { type: "success" } });
    } catch (error: any) {
      showCustomToast(ErrorHandler.extractMessage(error), { toastOptions: { type: "error" } });
    }
  };

  const displayList = activeTab === "received" ? received : sent;

  return (
    <div className="h-full">
      <Header
        title="Invite Inbox"
        description="Manage your business invitations and join requests."
      />

      <div className="flex gap-4 mb-10 lg:mb-20 flex-col overflow-y-hidden h-full px-5">
        <Card className="px-5 py-5 rounded-md border border-border shadow-none bg-card">
        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-6">
          <button
            onClick={() => setActiveTab("received")}
            className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${
              activeTab === "received"
                ? "border-black text-black"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            <Inbox className="w-4 h-4" />
            Received
            {received.filter((i) => i.status === "PENDING").length > 0 && (
              <span className="bg-yellow-100 text-yellow-800 text-xs font-semibold px-1.5 py-0.5 rounded-full">
                {received.filter((i) => i.status === "PENDING").length}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab("sent")}
            className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${
              activeTab === "sent"
                ? "border-black text-black"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            <Send className="w-4 h-4" />
            Sent
          </button>
        </div>

        {/* Cloud account result banner */}
        {respondedInviteResult?.cloud_account_id && (
          <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-md flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-800">Invitation accepted successfully!</p>
              <p className="text-xs text-green-600 mt-0.5">
                Cloud Account ID: <span className="font-mono">{respondedInviteResult.cloud_account_id}</span>
              </p>
            </div>
            {respondedInviteResult.csp && (
              <Button
                size="sm"
                className="bg-green-600 hover:bg-green-700 text-white h-7 text-xs"
                onClick={handleSendLoginUrl}
                disabled={isGeneratingUrl}
              >
                {isGeneratingUrl ? (
                  <Loader2 className="w-3 h-3 animate-spin mr-1" />
                ) : (
                  <Mail className="w-3 h-3 mr-1" />
                )}
                Send Login URL
              </Button>
            )}
          </div>
        )}

        {/* Loading state */}
        {(isLoading || isFetching) && (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
          </div>
        )}

        {/* Empty state */}
        {!isLoading && !isFetching && displayList.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-gray-400">
            <Inbox className="w-10 h-10 mb-3 opacity-40" />
            <p className="text-sm">No {activeTab === "received" ? "received invitations" : "sent join requests"} yet.</p>
          </div>
        )}

        {/* Invite cards */}
        {!isLoading && (
          <div className="space-y-3">
            {displayList.map((invite) => (
              <Card key={invite.invite_id} className="border border-gray-200 shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span className="text-sm font-semibold text-gray-900 truncate">
                          Business ID: {invite.business_id}
                        </span>
                        <Badge
                          className={`text-xs border ${statusBadgeClass[invite.status] ?? "bg-gray-100 text-gray-700"}`}
                          variant="outline"
                        >
                          {invite.status}
                        </Badge>
                        <Badge variant="outline" className="text-xs border-blue-200 text-blue-700 bg-blue-50">
                          {invite.proposed_role}
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-400">
                        Created: {formatDate(invite.created_at)}
                        {invite.expires_at && (
                          <span className="ml-3">Expires: {formatDate(invite.expires_at)}</span>
                        )}
                      </p>
                      {invite.message && (
                        <p className="text-xs text-gray-500 mt-1 italic">"{invite.message}"</p>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 shrink-0">
                      {activeTab === "received" && invite.status === "PENDING" && (
                        <>
                          <Button
                            size="sm"
                            className="bg-green-600 hover:bg-green-700 text-white h-7 text-xs"
                            onClick={() => setAcceptingInvite(invite)}
                            disabled={isResponding}
                          >
                            <Check className="w-3 h-3 mr-1" />
                            Accept
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-7 text-xs text-red-600 border-red-200 hover:bg-red-50"
                            onClick={() => handleDecline(invite)}
                            disabled={isResponding}
                          >
                            <X className="w-3 h-3 mr-1" />
                            Decline
                          </Button>
                        </>
                      )}
                      {activeTab === "sent" && invite.status === "PENDING" && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-7 text-xs text-gray-600"
                          onClick={() => handleCancelRequest(invite)}
                          disabled={isCancelling}
                        >
                          {isCancelling ? (
                            <Loader2 className="w-3 h-3 animate-spin mr-1" />
                          ) : (
                            <X className="w-3 h-3 mr-1" />
                          )}
                          Cancel
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
        </Card>
      </div>

      {/* Accept modal */}
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
