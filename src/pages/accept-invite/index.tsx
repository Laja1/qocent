/* eslint-disable @typescript-eslint/no-explicit-any */
import { imgLinks } from "@/assets/assetLink";
import { showCustomToast } from "@/components/shared/toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { RouteConstant } from "@/router/routes";
import { ErrorHandler } from "@/service/httpClient/errorHandler";
import {
  useAcceptInviteMutation,
  useGetAccountMembersQuery,
} from "@/service/kotlin/authApi";
import { Check, X, Users } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

export default function AcceptInvite() {
  const navigate = useNavigate();
  const [acceptInvite] = useAcceptInviteMutation();
  const { inviteCode, email } = useParams<{
    inviteCode: string;
    email: string;
  }>();

  const { data: accountMembersData } = useGetAccountMembersQuery({
    accountCode: inviteCode || "",
  });

  const handleAccept = async () => {
    try {
      const res = await acceptInvite({
        userEmail: email || "",
        accountCode: inviteCode || "",
      }).unwrap();

      showCustomToast(res.responseMessage, {
        toastOptions: { type: "success", autoClose: 5000 },
      });

      navigate(RouteConstant.dashboard.console.path);
    } catch (error: any) {
      const message = ErrorHandler.extractMessage(error);
      showCustomToast(message, {
        toastOptions: { type: "error", autoClose: 5000 },
      });
    }
  };

  const handleDecline = () => {
    showCustomToast("Invitation declined", {
      toastOptions: { type: "error", autoClose: 5000 },
    });
    navigate("/console");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <img src={imgLinks.logo} alt="Logo" className="mb-4 h-10 w-20" />

      <Card className="w-full max-w-md border-invite-border shadow-md">
        <CardContent className="p-8 space-y-6">
          <div className="flex justify-center">
            <div className="w-12 h-12 bg-invite-subtle rounded-full flex items-center justify-center">
              <Users className="w-6 h-6 text-invite-primary" />
            </div>
          </div>

          <h1 className="text-center text-2xl font-semibold text-foreground">
            You're invited!
          </h1>

          <div className="bg-invite-subtle rounded-lg p-4 text-center">
            <p className="text-sm text-muted-foreground">Invitation from</p>
            <p className="font-medium text-foreground">
              {accountMembersData?.accountName}
            </p>
          </div>

          <div className="flex space-x-3">
            <Button className="flex-1" onClick={handleAccept}>
              <Check className="w-4 h-4 mr-2" />
              Accept
            </Button>
            <Button className="flex-1" onClick={handleDecline}>
              <X className="w-4 h-4 mr-2" />
              Decline
            </Button>
          </div>

          <p className="text-xs text-center text-muted-foreground">
            Accepting gives you access to the team workspace and tools.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
