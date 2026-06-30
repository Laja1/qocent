import { useState } from "react";
import { CreditCard, Shield, User } from "lucide-react";

import { Header, PageContent } from "@/components/shared";
import { cn } from "@/lib/utils";
import { Profile } from "./profile";
import { Security } from "./secuirty";
import { Subscription } from "./subscription";

type SettingsTab = "profile" | "security" | "subscription";

const tabs: { id: SettingsTab; label: string; icon: typeof User }[] = [
  { id: "profile", label: "General", icon: User },
  { id: "security", label: "Security", icon: Shield },
  { id: "subscription", label: "Subscription", icon: CreditCard },
];

const tabDescriptions: Record<SettingsTab, string> = {
  profile: "Your account details and workspace information.",
  security: "Update your password and keep your account secure.",
  subscription: "View and manage your subscription plan.",
};

export const Settings = () => {
  const [activeTab, setActiveTab] = useState<SettingsTab>("profile");

  const tabContent = {
    profile: <Profile />,
    security: <Security />,
    subscription: <Subscription />,
  }[activeTab];

  return (
    <div className="min-h-screen pb-16">
      <Header
        title="Settings"
        description="Manage your account, security, and subscription"
      />

      <PageContent className="mx-auto max-w-3xl">
        <nav className="mb-6 flex gap-6 border-b border-border">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "-mb-px flex items-center gap-2 border-b-2 pb-3 text-sm font-medium transition-colors",
                  isActive
                    ? "border-foreground text-foreground"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                )}
              >
                <Icon className="size-4" />
                {tab.label}
              </button>
            );
          })}
        </nav>

        <div className="mb-6">
          <h2 className="text-sm font-semibold text-foreground">
            {tabs.find((tab) => tab.id === activeTab)?.label}
          </h2>
          <p className="mt-1 text-xs text-muted-foreground">
            {tabDescriptions[activeTab]}
          </p>
        </div>

        {tabContent}
      </PageContent>
    </div>
  );
};
