import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import {
  Building2,
  Cloud,
  CreditCard,
  Mail,
  Shield,
  User,
  Zap,
} from "lucide-react";

import { Header } from "@/components/shared";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import type { RootState } from "@/store";
import {
  useGetMyOrganizationsQuery,
  useGetUserAccountsByProviderQuery,
} from "@/service/organizationApi";
import { useGetMySubscriptionQuery } from "@/service/subscriptionApi";
import { Profile } from "./profile";
import { Security } from "./secuirty";
import { Subscription } from "./subscription";

type SettingsTab = "profile" | "security" | "subscription";

const tabs: { id: SettingsTab; label: string; icon: typeof User }[] = [
  { id: "profile", label: "Profile", icon: User },
  { id: "security", label: "Security", icon: Shield },
  { id: "subscription", label: "Subscription", icon: CreditCard },
];

const avatarPalette = [
  "bg-blue-500",
  "bg-emerald-500",
  "bg-purple-500",
  "bg-rose-500",
  "bg-amber-500",
  "bg-cyan-500",
];

const colorFromString = (s: string) => {
  let hash = 0;
  for (let i = 0; i < s.length; i++) hash = (hash * 31 + s.charCodeAt(i)) | 0;
  return avatarPalette[Math.abs(hash) % avatarPalette.length];
};

export const Settings = () => {
  const [activeTab, setActiveTab] = useState<SettingsTab>("profile");

  const auth = useSelector((state: RootState) => state.auth);
  const account = useSelector((state: RootState) => state.account);
  const dashboard = useSelector((state: RootState) => state.dashboard);

  const { data: orgData } = useGetMyOrganizationsQuery();
  const { data: sitesData } = useGetUserAccountsByProviderQuery({
    provider: String(dashboard?.provider) || "",
  });
  const { data: subscriptionData } = useGetMySubscriptionQuery();

  const fullName =
    `${auth.userFirstName ?? ""} ${auth.userLastName ?? ""}`.trim() || "User";
  const initials = `${auth.userFirstName?.[0] ?? ""}${auth.userLastName?.[0] ?? ""}`.toUpperCase() || "U";
  const avatarColor = colorFromString(auth.userEmail || fullName);

  const siteCount = sitesData?.data?.accounts?.length ?? 0;
  const subscription = subscriptionData?.data?.[0];
  const orgName = orgData?.data?.org_name;

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
        return dashboard.provider?.toUpperCase() || "No workspace";
    }
  }, [dashboard.provider]);

  const subscriptionLabel = subscription
    ? subscription.subscription_is_trial
      ? "Trial"
      : subscription.subscription_status
    : "No plan";

  const tabContent = {
    profile: <Profile />,
    security: <Security />,
    subscription: <Subscription />,
  }[activeTab];

  const activeTabMeta = tabs.find((t) => t.id === activeTab)!;

  return (
    <div className="min-h-screen pb-16">
      <Header
        title="Settings"
        description="Manage your account, security, and subscription"
      />

      <div className="px-5 max-w-6xl mx-auto mt-2">
        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-6 items-start">
          {/* User summary sidebar */}
          <Card className="rounded-md border border-gray-200 bg-white shadow-none overflow-hidden lg:sticky lg:top-24">
            <div className="h-20 bg-black" />
            <div className="px-5 pb-5 -mt-10">
              <div
                className={`size-16 bg-black rounded-md ${avatarColor} text-white flex items-center justify-center text-xl font-bold shadow-lg ring-4 ring-white`}
              >
                {initials}
              </div>

              <div className="mt-4">
                <h2 className="font-brfirma text-lg font-bold text-gray-950 tracking-tight">
                  {fullName}
                </h2>
                <p className="text-sm text-gray-500 flex items-center gap-1.5 mt-1 truncate">
                  <Mail className="size-3.5 flex-shrink-0" />
                  <span className="truncate">{auth.userEmail}</span>
                </p>
              </div>

              <div className="flex flex-wrap gap-2 mt-4">
                <Badge
                  variant="outline"
                  className="bg-gray-50 border-gray-200 text-gray-700 text-[11px]"
                >
                  <Cloud className="size-3 mr-1" />
                  {providerLabel}
                </Badge>
                {account.type && (
                  <Badge
                    variant="outline"
                    className="bg-blue-50 border-blue-200 text-blue-700 text-[11px]"
                  >
                    {account.type}
                  </Badge>
                )}
                <Badge
                  variant="outline"
                  className={
                    subscription
                      ? "bg-emerald-50 border-emerald-200 text-emerald-700 text-[11px]"
                      : "bg-gray-50 border-gray-200 text-gray-600 text-[11px]"
                  }
                >
                  <Zap className="size-3 mr-1" />
                  {subscriptionLabel}
                </Badge>
              </div>

              <div className="mt-5 pt-5 border-t border-gray-100 space-y-3">
                {orgName && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500 flex items-center gap-1.5">
                      <Building2 className="size-3.5" />
                      Organization
                    </span>
                    <span className="font-medium text-gray-900 truncate max-w-[140px]">
                      {orgName}
                    </span>
                  </div>
                )}
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Server sites</span>
                  <span className="font-medium text-gray-900">{siteCount}</span>
                </div>
                {auth.userId && (
                  <div className="flex items-center justify-between text-sm gap-2">
                    <span className="text-gray-500 flex-shrink-0">User ID</span>
                    <span className="font-mono text-[10px] text-gray-600 truncate max-w-[140px]">
                      {auth.userId}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </Card>

          {/* Main settings panel */}
          <div className="space-y-4">
            <Card className="rounded-md border border-gray-200 bg-white shadow-none p-2">
              <nav className="flex flex-wrap gap-1">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-2 rounded-md px-4 py-2.5 text-sm font-medium transition-all ${
                        isActive
                          ? "bg-primary text-primary-foreground shadow-sm"
                          : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                      }`}
                    >
                      <Icon className="size-4" />
                      {tab.label}
                    </button>
                  );
                })}
              </nav>
            </Card>

            <Card className="rounded-md border border-gray-200 bg-white shadow-none p-6">
              <div className="mb-6 pb-5 border-b border-gray-100">
                <h3 className="font-brfirma text-base font-bold text-gray-950 tracking-tight">
                  {activeTabMeta.label}
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  {activeTab === "profile" &&
                    "Your account details and workspace information"}
                  {activeTab === "security" &&
                    "Update your password and keep your account secure"}
                  {activeTab === "subscription" &&
                    "View and manage your subscription plan"}
                </p>
              </div>

              {tabContent}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
