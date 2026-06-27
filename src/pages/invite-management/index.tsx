/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/shared";
import { showCustomToast } from "@/components/shared/toast";
import { ErrorHandler } from "@/service/httpClient/errorHandler";
import { Loader2, UserPlus, X, Check, Users, Inbox } from "lucide-react";
import {
  useGetBusinessInvitesQuery,
  useInviteUserMutation,
  useCancelInviteMutation,
  useBusinessRespondToRequestMutation,
} from "@/service/businessInviteApi";
import type { BusinessInviteResponse, Csp, ProposedRole } from "@/models/response/businessInviteResponse";
import type { RootState } from "@/store";

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

interface RespondModalProps {
  invite: BusinessInviteResponse;
  onConfirm: (proposedRole: ProposedRole, csp?: Csp) => void;
  onCancel: () => void;
  isLoading: boolean;
}

function RespondModal({ invite, onConfirm, onCancel, isLoading }: RespondModalProps) {
  const [role, setRole] = useState<ProposedRole>("VIEWER");
  const [csp, setCsp] = useState<Csp>("aws");

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl p-6 w-full max-w-sm">
        <h3 className="text-base font-semibold text-gray-900 mb-2">Accept Join Request</h3>
        <p className="text-sm text-gray-500 mb-4">
          Assign a role for <span className="font-medium">{invite.user_id}</span> before accepting.
        </p>
        {invite.message && (
          <p className="text-xs text-gray-500 mb-4 italic">&ldquo;{invite.message}&rdquo;</p>
        )}
        <div className="mb-3">
          <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value as ProposedRole)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="VIEWER">VIEWER</option>
            <option value="MEMBER">MEMBER</option>
          </select>
        </div>
        {role === "MEMBER" && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Cloud Provider</label>
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
            onClick={() => onConfirm(role, role === "MEMBER" ? csp : undefined)}
            disabled={isLoading}
          >
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin mr-1" /> : <Check className="w-4 h-4 mr-1" />}
            Accept
          </Button>
          <Button variant="outline" className="flex-1 h-8 text-sm" onClick={onCancel} disabled={isLoading}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}

export const InviteManagement = () => {
  const activeContext = useSelector((state: RootState) => (state as any).context?.activeContext);
  const businessId: string = activeContext?.context_type === "business" ? activeContext.entity_id : "";
  const [showInviteForm, setShowInviteForm] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState<ProposedRole>("VIEWER");
  const [inviteMessage, setInviteMessage] = useState("");
  const [respondTarget, setRespondTarget] = useState<BusinessInviteResponse | null>(null);

  const { data, isLoading, isFetching } = useGetBusinessInvitesQuery({
    business_id: businessId,
    status: "PENDING",
  });

  const [inviteUser, { isLoading: isInviting }] = useInviteUserMutation();
  const [cancelInvite, { isLoading: isCancelling }] = useCancelInviteMutation();
  const [businessRespond, { isLoading: isResponding }] = useBusinessRespondToRequestMutation();

  const allInvites = data?.data ?? [];
  const sentInvites = allInvites.filter((i) => i.initiated_by === "BUSINESS");
  const joinRequests = allInvites.filter((i) => i.initiated_by === "USER");

  const handleInviteSubmit = async () => {
    if (!inviteEmail.trim()) return;
    try {
      const res = await inviteUser({
        business_id: businessId,
        body: {
          user_email: inviteEmail.trim(),
          proposed_role: inviteRole,
          ...(inviteMessage.trim() ? { message: inviteMessage.trim() } : {}),
        },
      }).unwrap();
      showCustomToast(`Invitation sent to ${res.user_id}`, { toastOptions: { type: "success" } });
      setShowInviteForm(false);
      setInviteEmail("");
      setInviteMessage("");
      setInviteRole("VIEWER");
    } catch (error: any) {
      showCustomToast(ErrorHandler.extractMessage(error), { toastOptions: { type: "error" } });
    }
  };

  const handleCancelInvite = async (invite: BusinessInviteResponse) => {
    try {
      const res = await cancelInvite({ invite_id: invite.invite_id }).unwrap();
      showCustomToast(res.message, { toastOptions: { type: "info" } });
    } catch (error: any) {
      showCustomToast(ErrorHandler.extractMessage(error), { toastOptions: { type: "error" } });
    }
  };

  const handleRejectRequest = async (invite: BusinessInviteResponse) => {
    try {
      const res = await businessRespond({
        invite_id: invite.invite_id,
        body: { action: "REJECT" },
      }).unwrap();
      showCustomToast(res.message, { toastOptions: { type: "info" } });
    } catch (error: any) {
      showCustomToast(ErrorHandler.extractMessage(error), { toastOptions: { type: "error" } });
    }
  };

  const handleRespondConfirm = async (proposedRole: ProposedRole, csp?: Csp) => {
    if (!respondTarget) return;
    try {
      const res = await businessRespond({
        invite_id: respondTarget.invite_id,
        body: {
          action: "ACCEPT",
          proposed_role: proposedRole,
          ...(csp ? { csp } : {}),
        },
      }).unwrap();
      showCustomToast(res.message, { toastOptions: { type: "success" } });
      setRespondTarget(null);
    } catch (error: any) {
      showCustomToast(ErrorHandler.extractMessage(error), { toastOptions: { type: "error" } });
      setRespondTarget(null);
    }
  };

  const loading = isLoading || isFetching;

  return (
    <div className="h-full">
      <Header
        title="Invite Management"
        description="Manage invitations for your business."
      >
        <Button
          className="bg-black hover:bg-gray-800 text-white h-8 text-sm"
          onClick={() => setShowInviteForm((v) => !v)}
        >
          <UserPlus className="w-4 h-4 mr-1" />
          Invite User
        </Button>
      </Header>

      <div className="flex gap-4 mb-10 lg:mb-20 flex-col overflow-y-hidden h-full px-5">
        <Card className="px-5 py-5 rounded-2xl border border-border shadow-none bg-card">
        {/* Invite Form */}
        {showInviteForm && (
          <Card className="mb-6 border border-gray-200">
            <CardContent className="p-4 space-y-3">
              <h3 className="text-sm font-semibold text-gray-900">Invite a User</h3>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Email address</label>
                <input
                  type="email"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  placeholder="user@example.com"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Role</label>
                <select
                  value={inviteRole}
                  onChange={(e) => setInviteRole(e.target.value as ProposedRole)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="VIEWER">VIEWER</option>
                  <option value="MEMBER">MEMBER</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Message (optional)</label>
                <textarea
                  value={inviteMessage}
                  onChange={(e) => setInviteMessage(e.target.value)}
                  placeholder="Add a personal note..."
                  rows={2}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  className="bg-black hover:bg-gray-800 text-white h-8 text-sm"
                  onClick={handleInviteSubmit}
                  disabled={isInviting || !inviteEmail.trim()}
                >
                  {isInviting ? <Loader2 className="w-4 h-4 animate-spin mr-1" /> : null}
                  Send Invite
                </Button>
                <Button
                  variant="outline"
                  className="h-8 text-sm"
                  onClick={() => setShowInviteForm(false)}
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {loading && (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
          </div>
        )}

        {/* Business Invites Sent */}
        {!loading && (
          <section className="mb-8">
            <div className="flex items-center gap-2 mb-3">
              <Users className="w-4 h-4 text-gray-500" />
              <h2 className="text-sm font-semibold text-gray-700">Business Invites Sent</h2>
              <span className="text-xs text-gray-400">({sentInvites.length})</span>
            </div>
            {sentInvites.length === 0 ? (
              <div className="text-center py-8 text-gray-400 border border-dashed border-gray-200 rounded-lg">
                <p className="text-sm">No pending invites sent.</p>
              </div>
            ) : (
              <div className="space-y-2">
                {sentInvites.map((invite) => (
                  <Card key={invite.invite_id} className="border border-gray-200 shadow-sm">
                    <CardContent className="p-4 flex items-center justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <span className="text-sm font-medium text-gray-900 truncate">
                            User: {invite.user_id}
                          </span>
                          <Badge
                            className={`text-xs border ${statusBadgeClass[invite.status]}`}
                            variant="outline"
                          >
                            {invite.status}
                          </Badge>
                          <Badge variant="outline" className="text-xs border-blue-200 text-blue-700 bg-blue-50">
                            {invite.proposed_role}
                          </Badge>
                        </div>
                        <p className="text-xs text-gray-400">{formatDate(invite.created_at)}</p>
                      </div>
                      {invite.status === "PENDING" && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-7 text-xs text-gray-600"
                          onClick={() => handleCancelInvite(invite)}
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
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </section>
        )}

        {/* Join Requests Received */}
        {!loading && (
          <section>
            <div className="flex items-center gap-2 mb-3">
              <Inbox className="w-4 h-4 text-gray-500" />
              <h2 className="text-sm font-semibold text-gray-700">Join Requests Received</h2>
              <span className="text-xs text-gray-400">({joinRequests.length})</span>
            </div>
            {joinRequests.length === 0 ? (
              <div className="text-center py-8 text-gray-400 border border-dashed border-gray-200 rounded-lg">
                <p className="text-sm">No pending join requests.</p>
              </div>
            ) : (
              <div className="space-y-2">
                {joinRequests.map((invite) => (
                  <Card key={invite.invite_id} className="border border-gray-200 shadow-sm">
                    <CardContent className="p-4 flex items-center justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <span className="text-sm font-medium text-gray-900 truncate">
                            User: {invite.user_id}
                          </span>
                          <Badge
                            className={`text-xs border ${statusBadgeClass[invite.status]}`}
                            variant="outline"
                          >
                            {invite.status}
                          </Badge>
                        </div>
                        <p className="text-xs text-gray-400">{formatDate(invite.created_at)}</p>
                        {invite.message && (
                          <p className="text-xs text-gray-500 mt-1 italic">"{invite.message}"</p>
                        )}
                      </div>
                      {invite.status === "PENDING" && (
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            className="bg-green-600 hover:bg-green-700 text-white h-7 text-xs"
                            onClick={() => setRespondTarget(invite)}
                            disabled={isResponding}
                          >
                            <Check className="w-3 h-3 mr-1" />
                            Accept
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-7 text-xs text-red-600 border-red-200 hover:bg-red-50"
                            onClick={() => handleRejectRequest(invite)}
                            disabled={isResponding}
                          >
                            <X className="w-3 h-3 mr-1" />
                            Reject
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </section>
        )}
        </Card>
      </div>

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
