import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RouteConstant } from "@/router/routes";
import { Building2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function JoinBusiness() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
            <Building2 className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Join a Business</h1>
          <p className="text-sm text-gray-500 mt-1">
            Access to organization cloud accounts is invitation-only.
          </p>
        </div>

        <Card className="border border-gray-200 shadow-sm">
          <CardContent className="p-6 space-y-4 text-sm text-gray-600">
            <p>
              Businesses invite individuals to specific cloud accounts. If you
              were invited, check your invite inbox and accept the invitation
              there.
            </p>
            <Button
              className="w-full"
              onClick={() => navigate(RouteConstant.dashboard.inviteInbox.path)}
            >
              Open Invite Inbox
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
