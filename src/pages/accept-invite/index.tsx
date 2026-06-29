/* eslint-disable @typescript-eslint/no-explicit-any */
import { imgLinks } from "@/assets/assetLink";
import { showCustomToast } from "@/components/shared/toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { RouteConstant } from "@/router/routes";
import { ErrorHandler } from "@/service/httpClient/errorHandler";
import {
  useGetMyInvitesQuery,
  useUserRespondToInviteMutation,
} from "@/service/businessInviteApi";
import type { Csp } from "@/models/response/businessInviteResponse";
import {
  Check,
  X,
  Users,
  Loader2,
  ArrowLeft,
  Shield,
  Star,
} from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";

export default function AcceptInvite() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const inviteId = searchParams.get("invite_id");

  const { data, isLoading: isLoadingInvites } = useGetMyInvitesQuery();
  const [userRespond, { isLoading: isResponding }] =
    useUserRespondToInviteMutation();

  const [isProcessing, setIsProcessing] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);
  const [selectedCsp, setSelectedCsp] = useState<Csp>("aws");
  const [showCspPicker, setShowCspPicker] = useState(false);

  const invite = useMemo(
    () => data?.data?.find((item) => item.invite_id === inviteId),
    [data?.data, inviteId]
  );

  useEffect(() => {
    const timer = setTimeout(() => setShowAnimation(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const respond = async (
    action: "ACCEPT" | "REJECT",
    csp?: Csp
  ) => {
    if (!inviteId || isResponding || isProcessing) return;

    setIsProcessing(true);
    try {
      const res = await userRespond({
        invite_id: inviteId,
        body: { action, ...(csp ? { csp } : {}) },
        ...(csp ? { csp } : {}),
      }).unwrap();

      showCustomToast(res.message, {
        toastOptions: {
          type: action === "ACCEPT" ? "success" : "info",
          autoClose: 5000,
        },
      });

      setTimeout(() => {
        navigate(
          action === "ACCEPT"
            ? RouteConstant.dashboard.console.path
            : "/console"
        );
      }, 1200);
    } catch (error: any) {
      showCustomToast(ErrorHandler.extractMessage(error), {
        toastOptions: { type: "error", autoClose: 5000 },
      });
      setIsProcessing(false);
      setShowCspPicker(false);
    }
  };

  const handleAccept = () => {
    if (invite?.proposed_role === "MEMBER") {
      setShowCspPicker(true);
      return;
    }
    respond("ACCEPT");
  };

  const handleDecline = () => {
    respond("REJECT");
  };

  const handleGoBack = () => {
    navigate("/console");
  };

  if (isLoadingInvites) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex flex-col items-center justify-center p-4">
        <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
      </div>
    );
  }

  if (!inviteId || (!isLoadingInvites && !invite)) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="max-w-md w-full p-6 text-center">
          <p className="text-sm text-gray-600 mb-4">
            This invitation is invalid or no longer available.
          </p>
          <Button onClick={handleGoBack}>Back to Console</Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-gradient-to-br from-blue-200/30 to-purple-200/30 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-gradient-to-br from-green-200/30 to-blue-200/30 blur-3xl"></div>
      </div>

      <button
        onClick={handleGoBack}
        className="absolute top-8 left-8 flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        <span className="text-sm font-medium">Back to Console</span>
      </button>

      <div
        className={`mb-8 transition-all duration-700 ${
          showAnimation
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-4"
        }`}
      >
        <img
          src={imgLinks.logo}
          alt="Logo"
          className="h-12 w-24 object-contain drop-shadow-sm"
        />
      </div>

      <Card
        className={`w-full max-w-lg bg-white/80 backdrop-blur-sm border-0 shadow-2xl transition-all duration-700 ${
          showAnimation
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 translate-y-8 scale-95"
        }`}
      >
        <CardContent className="p-0">
          <div className="bg-black p-2 text-center text-white relative overflow-hidden">
            <div className="relative z-10">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 border border-white/30">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-lg lg:text-2xl font-bold mb-2">
                You're Invited!
              </h1>
              <p className="text-blue-100 text-sm">
                {invite?.proposed_role
                  ? `Join as ${invite.proposed_role}`
                  : "Join a business workspace"}
              </p>
            </div>
            <Star className="absolute top-4 right-4 w-4 h-4 text-white/30" />
          </div>

          <div className="p-8 space-y-6">
            <div className="bg-green-50 rounded-md p-4 border border-green-100">
              <div className="flex items-center gap-2 mb-3">
                <Shield className="w-5 h-5 text-green-600" />
                <span className="font-medium text-green-800">
                  What you'll get access to:
                </span>
              </div>
              <ul className="space-y-2 text-sm text-green-700">
                <li className="flex items-center gap-2 text-xs">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                  Team workspace and collaboration tools
                </li>
                <li className="flex items-center gap-2 text-xs">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                  Cloud infrastructure management
                </li>
                <li className="flex items-center gap-2 text-xs">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                  Real-time monitoring and analytics
                </li>
              </ul>
            </div>

            <div className="flex gap-3 pt-2">
              <Button
                className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-200 h-8 text-sm font-semibold"
                onClick={handleAccept}
                disabled={isResponding || isProcessing}
              >
                {isResponding || isProcessing ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Accepting...
                  </>
                ) : (
                  <>
                    <Check className="w-5 h-5 mr-2" />
                    Accept Invitation
                  </>
                )}
              </Button>

              <Button
                variant="outline"
                className="flex-1 border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-50 text-gray-700 h-8 text-sm font-semibold transition-all duration-200"
                onClick={handleDecline}
                disabled={isProcessing || isResponding}
              >
                <X className="w-5 h-5 mr-2" />
                Decline
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {showCspPicker && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-md shadow-2xl p-6 w-full max-w-sm">
            <h3 className="text-base font-semibold text-gray-900 mb-2">
              Select Cloud Provider
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              Member access requires a cloud provider.
            </p>
            <select
              value={selectedCsp}
              onChange={(e) => setSelectedCsp(e.target.value as Csp)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm mb-4"
            >
              <option value="aws">AWS</option>
              <option value="huawei">Huawei</option>
            </select>
            <div className="flex gap-3">
              <Button
                className="flex-1"
                onClick={() => respond("ACCEPT", selectedCsp)}
                disabled={isResponding || isProcessing}
              >
                Confirm
              </Button>
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setShowCspPicker(false)}
                disabled={isResponding || isProcessing}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
