/* eslint-disable @typescript-eslint/no-explicit-any */
import { imgLinks } from "@/assets/assetLink";
import { showCustomToast } from "@/components/shared/toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { RouteConstant } from "@/router/routes";
import { ErrorHandler } from "@/service/httpClient/errorHandler";
import { useAcceptInviteMutation } from "@/service/kotlin/authApi";
import {
  Check,
  X,
  Users,
  Mail,
  Building2,
  Loader2,
  ArrowLeft,
  Shield,
  Star,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

export default function AcceptInvite() {
  const navigate = useNavigate();
  const [acceptInvite, { isLoading: isAccepting }] = useAcceptInviteMutation();
  const [isProcessing, setIsProcessing] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);

  const { siteCode, email } = useParams<{
    siteCode: string;
    email: string;
  }>();
  console.log(siteCode, email);
  // Animation effect on mount
  useEffect(() => {
    const timer = setTimeout(() => setShowAnimation(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleAccept = async () => {
    if (isAccepting || isProcessing) return;

    setIsProcessing(true);

    try {
      const res = await acceptInvite({
        userEmail: email || "",
        siteCode: siteCode || "",
        userFirstName: "",
        userLastName: "",
        userRoleId: 0,
      }).unwrap();

      showCustomToast(res.responseMessage, {
        toastOptions: { type: "success", autoClose: 5000 },
      });

      // Add slight delay for better UX
      setTimeout(() => {
        navigate(RouteConstant.dashboard.console.path);
      }, 1500);
    } catch (error: any) {
      console.log(error, "error");
      const message = ErrorHandler.extractMessage(error);
      showCustomToast(message, {
        toastOptions: { type: "error", autoClose: 5000 },
      });
      setIsProcessing(false);
    }
  };

  const handleDecline = () => {
    if (isProcessing) return;

    showCustomToast("Invitation declined", {
      toastOptions: { type: "info", autoClose: 3000 },
    });
    navigate("/console");
  };

  const handleGoBack = () => {
    navigate("/console");
  };

  if (isAccepting) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex flex-col items-center justify-center p-4">
        <div className="animate-pulse space-y-4">
          <div className="w-20 h-10 bg-gray-200 rounded"></div>
          <div className="w-80 h-96 bg-white rounded-xl shadow-lg"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-gradient-to-br from-blue-200/30 to-purple-200/30 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-gradient-to-br from-green-200/30 to-blue-200/30 blur-3xl"></div>
      </div>

      {/* Back Button */}
      <button
        onClick={handleGoBack}
        className="absolute top-8 left-8 flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        <span className="text-sm font-medium">Back to Console</span>
      </button>

      {/* Logo */}
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

      {/* Main Card */}
      <Card
        className={`w-full max-w-lg bg-white/80 backdrop-blur-sm border-0 shadow-2xl transition-all duration-700 ${
          showAnimation
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 translate-y-8 scale-95"
        }`}
      >
        <CardContent className="p-0">
          {/* Header Section */}
          <div className="bg-black p-2 text-center text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative z-10">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 border border-white/30">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-lg lg:text-2xl font-bold mb-2">
                You're Invited!
              </h1>
              <p className="text-blue-100 text-sm">
                Join an amazing team workspace
              </p>
            </div>
            {/* Decorative stars */}
            <Star className="absolute top-4 right-4 w-4 h-4 text-white/30" />
            <Star className="absolute bottom-4 left-4 w-3 h-3 text-white/20" />
          </div>

          {/* Content Section */}
          <div className="p-8 space-y-6">
            {/* Invitation Details */}

            <div className="items-center flex-row flex w-full space-x-5 ">
              <div className="bg-gradient-to-r w-full from-blue-50 to-indigo-50 rounded-xs p-2 border border-blue-100">
                <div className="flex items-center gap-3 mb-2">
                  <Building2 className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-medium text-gray-600">
                    Organization
                  </span>
                </div>
                <p className="font-semibold text-gray-900 text-xs">
                  {siteCode || "Loading..."}
                </p>
              </div>

              <div className="bg-gradient-to-r w-full from-gray-50 to-slate-50 rounded-xs p-2 border border-gray-100">
                <div className="flex items-center gap-3 mb-2">
                  <Mail className="w-5 h-5 text-gray-600" />
                  <span className="text-sm font-medium text-gray-600">
                    Invited Email
                  </span>
                </div>
                <p className="font-medium text-gray-900 text-xs">{email}</p>
              </div>
            </div>

            {/* Benefits Section */}
            <div className="bg-green-50 rounded-xs p-4 border border-green-100">
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

            {/* Action Buttons */}
            <div className="flex gap-3 pt-2">
              <Button
                className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-200 h-8 text-sm font-semibold"
                onClick={handleAccept}
                disabled={isAccepting || isProcessing}
              >
                {isAccepting || isProcessing ? (
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
                disabled={isProcessing}
              >
                <X className="w-5 h-5 mr-2" />
                Decline
              </Button>
            </div>

            {/* Footer Note */}
            <div className="text-center pt-4 border-t border-gray-100">
              <p className="text-xs text-gray-500 leading-relaxed">
                By accepting, you agree to join this workspace and gain access
                to shared resources.
                <br />
                You can leave the workspace at any time from your settings.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Success Animation Overlay */}
      {(isAccepting || isProcessing) && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-xs p-6 shadow-2xl">
            <div className="flex flex-col items-center gap-4">
              <Loader2 className="w-8 h-8 animate-spin text-red-600" />
              <p className="text-gray-700 font-medium text-sm">
                Processing your invitation...
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
