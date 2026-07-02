/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { showCustomToast } from "@/components/shared/toast";
import { ErrorHandler } from "@/service/httpClient/errorHandler";
import { Loader2, Building2, CheckCircle } from "lucide-react";
import { useRequestJoinBusinessMutation } from "@/service/businessInviteApi";
import type { BusinessInviteResponse } from "@/models/response/businessInviteResponse";
import type { RootState } from "@/store";
import { canRequestJoinBusiness } from "@/utilities/contextPermissions";

export default function JoinBusiness() {
  const activeContext = useSelector(
    (state: RootState) => state.context?.activeContext
  );
  const canRequestJoin = canRequestJoinBusiness(activeContext);
  const [slug, setSlug] = useState("");
  const [message, setMessage] = useState("");
  const [result, setResult] = useState<BusinessInviteResponse | null>(null);

  const [requestJoin, { isLoading }] = useRequestJoinBusinessMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!slug.trim() || !canRequestJoin) return;
    try {
      const res = await requestJoin({
        business_slug_or_name: slug.trim(),
        ...(message.trim() ? { message: message.trim() } : {}),
      }).unwrap();
      setResult(res);
      showCustomToast("Join request sent successfully!", { toastOptions: { type: "success" } });
    } catch (error: any) {
      showCustomToast(ErrorHandler.extractMessage(error), { toastOptions: { type: "error" } });
    }
  };

  const handleReset = () => {
    setResult(null);
    setSlug("");
    setMessage("");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
            <Building2 className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Join a Business</h1>
          <p className="text-sm text-gray-500 mt-1">
            Request to join an existing business from your personal account.
          </p>
        </div>

        <Card className="border border-gray-200 shadow-sm">
          <CardContent className="p-6">
            {!canRequestJoin ? (
              <div className="rounded-md border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
                Join requests can only be sent from a personal user account.
                Business accounts invite users instead — switch to your personal
                workspace or use Invite Management as a business owner.
              </div>
            ) : result ? (
              <div className="text-center space-y-4">
                <CheckCircle className="w-12 h-12 text-green-500 mx-auto" />
                <div>
                  <h3 className="text-base font-semibold text-gray-900">Request Sent!</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Your join request has been submitted and is pending review.
                  </p>
                </div>
                <div className="bg-gray-50 rounded-md p-3 text-left space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500">Status</span>
                    <span className="font-medium text-yellow-700 bg-yellow-100 px-2 py-0.5 rounded-full">
                      {result.status}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500">Proposed Role</span>
                    <span className="font-medium text-gray-800">{result.proposed_role}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500">Invite ID</span>
                    <span className="font-mono text-gray-600 truncate ml-2">{result.invite_id}</span>
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="w-full h-8 text-sm"
                  onClick={handleReset}
                >
                  Request Another
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Business Name or Slug <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    placeholder="e.g. acme-corp or Acme Corporation"
                    required
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <p className="text-xs text-gray-400 mt-1">Enter the exact business name or URL slug.</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Message <span className="text-gray-400 font-normal">(optional)</span>
                  </label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Introduce yourself or explain why you'd like to join..."
                    rows={3}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-black hover:bg-gray-800 text-white h-9 text-sm font-medium"
                  disabled={isLoading || !slug.trim() || !canRequestJoin}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                      Sending Request...
                    </>
                  ) : (
                    "Send Join Request"
                  )}
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
