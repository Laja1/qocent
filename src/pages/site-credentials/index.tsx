import { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ExternalLink, KeyRound, Loader2, Mail, Shield } from "lucide-react";

import { Button, Header } from "@/components/shared";
import { Card } from "@/components/ui/card";
import { showCustomToast } from "@/components/shared/toast";
import { RouteConstant } from "@/router/routes";
import { ErrorHandler } from "@/service/httpClient/errorHandler";
import { useGenerateProviderLoginUrlMutation } from "@/service/python/cloudServericesApi";
import type { RootState } from "@/store";

type SiteCredentialsState = {
  accountId?: string;
  accountName?: string;
};

export const SiteCredentials = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dashboard = useSelector((state: RootState) => state.dashboard);
  const userEmail = useSelector((state: RootState) => state.auth.userEmail);

  const state = (location.state ?? {}) as SiteCredentialsState;
  const accountId = state.accountId ?? "";
  const accountName = state.accountName ?? "your site";

  const [generateLoginUrl, { isLoading }] =
    useGenerateProviderLoginUrlMutation();

  const providerLabel = useMemo(() => {
    switch (dashboard.provider?.toLowerCase()) {
      case "aws":
        return "AWS";
      case "huawei":
        return "Huawei Cloud";
      case "azure":
        return "Azure";
      case "gcp":
        return "Google Cloud";
      default:
        return dashboard.provider?.toUpperCase() || "Cloud Provider";
    }
  }, [dashboard.provider]);

  const handleGenerate = async () => {
    if (!accountId) {
      showCustomToast("Missing site information. Open this page from Server Sites.", {
        toastOptions: { type: "error", autoClose: 5000 },
      });
      return;
    }

    try {
      const res = await generateLoginUrl({
        csp: String(dashboard.provider || "huawei"),
        account_id: accountId,
      }).unwrap();

      showCustomToast(
        res.message ||
          "Provider console login link has been sent to your registered email.",
        { toastOptions: { type: "success", autoClose: 6000 } }
      );
    } catch (error) {
      showCustomToast(ErrorHandler.extractMessage(error), {
        toastOptions: { type: "error", autoClose: 5000 },
      });
    }
  };

  if (!accountId) {
    return (
      <div className="min-h-screen pb-20">
        <Header
          title="Site Access Credentials"
          description="Generate provider console login access for a site"
        />
        <div className="px-5 mt-6 max-w-2xl">
          <Card className="p-8 rounded-2xl border border-gray-200 text-center">
            <p className="text-sm text-gray-600 mb-4">
              No site was selected. Choose a site from Server Sites to generate
              access credentials.
            </p>
            <Button
              label="Go to Server Sites"
              onClick={() => navigate(RouteConstant.dashboard.serverSite.path)}
            />
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20">
      <Header
        title="Site Access Credentials"
        description="Get console access for your newly created site"
        navigateBack
      />

      <div className="px-5 mt-6 max-w-3xl mx-auto space-y-6">
        <Card className="rounded-2xl border border-gray-200 bg-white p-6 shadow-none">
          <div className="flex items-start gap-4">
            <div className="size-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
              <KeyRound className="size-5" />
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="font-brfirma text-lg font-bold text-gray-950 tracking-tight">
                {accountName}
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                Your site is ready. To access it on the {providerLabel} console,
                generate a temporary provider login link.
              </p>
            </div>
          </div>
        </Card>

        <Card className="rounded-2xl border border-gray-200 bg-white p-6 shadow-none space-y-5">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Mail className="size-4 text-gray-500 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-900">
                  Login link sent to your email
                </p>
                <p className="text-xs text-gray-500 mt-0.5">
                  We will email the provider console login URL to{" "}
                  <span className="font-medium text-gray-700">
                    {userEmail || "your registered email"}
                  </span>
                  . The link may expire based on provider policy.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Shield className="size-4 text-gray-500 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-900">
                  Secure temporary access
                </p>
                <p className="text-xs text-gray-500 mt-0.5">
                  This does not share long-lived passwords. It generates a
                  provider-managed login session for your account.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <ExternalLink className="size-4 text-gray-500 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-900">
                  Open from your inbox
                </p>
                <p className="text-xs text-gray-500 mt-0.5">
                  After generating, check your email and use the link to open the{" "}
                  {providerLabel} management console for this site.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row gap-3 sm:justify-end">
            <Button
              label="Back to Server Sites"
              intent="secondary"
              onClick={() => navigate(RouteConstant.dashboard.serverSite.path)}
            />
            <Button
              label={isLoading ? "Generating..." : "Generate Access Credentials"}
              prefixIcon={
                isLoading ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <KeyRound className="size-4" />
                )
              }
              onClick={handleGenerate}
              disabled={isLoading}
            />
          </div>
        </Card>
      </div>
    </div>
  );
};
