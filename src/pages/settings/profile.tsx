import { useSelector } from "react-redux";
import {
  Building2,
  Cloud,
  Fingerprint,
  Mail,
  MapPin,
  User,
} from "lucide-react";

import type { RootState } from "@/store";
import { useGetMyOrganizationsQuery } from "@/service/organizationApi";
import { SettingsSection } from "@/components/shared/settings-section";

type InfoRowProps = {
  icon: typeof User;
  label: string;
  value: string;
  mono?: boolean;
};

const InfoRow = ({ icon: Icon, label, value, mono }: InfoRowProps) => (
  <div className="flex items-start gap-3 border-b border-border py-3 last:border-0">
    <div className="flex size-9 shrink-0 items-center justify-center rounded-md bg-muted">
      <Icon className="size-4 text-muted-foreground" />
    </div>
    <div className="min-w-0 flex-1">
      <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </p>
      <p
        className={`mt-0.5 break-all text-sm text-foreground ${
          mono ? "font-mono text-xs" : "font-medium"
        }`}
      >
        {value || "—"}
      </p>
    </div>
  </div>
);

export const Profile = () => {
  const auth = useSelector((state: RootState) => state.auth);
  const account = useSelector((state: RootState) => state.account);
  const dashboard = useSelector((state: RootState) => state.dashboard);

  const { data: orgData, isLoading: isOrgLoading } = useGetMyOrganizationsQuery();

  const fullName =
    `${auth.userFirstName ?? ""} ${auth.userLastName ?? ""}`.trim() || "—";

  const providerLabel = (() => {
    switch (dashboard.provider?.toLowerCase()) {
      case "aws":
        return "Amazon Web Services";
      case "huawei":
        return "Huawei Cloud";
      case "azure":
        return "Microsoft Azure";
      case "gcp":
        return "Google Cloud Platform";
      default:
        return dashboard.provider?.toUpperCase() || "Not selected";
    }
  })();

  return (
    <div className="space-y-5">
      <SettingsSection
        title="Account"
        description="This is your Qocent account profile. Contact support if you need to update your email or personal information."
      >
        <div className="space-y-0">
          <InfoRow icon={User} label="Full name" value={fullName} />
          <InfoRow icon={Mail} label="Email address" value={auth.userEmail ?? ""} />
          <InfoRow
            icon={Fingerprint}
            label="User ID"
            value={auth.userId ?? ""}
            mono
          />
        </div>
      </SettingsSection>

      <SettingsSection
        title="Workspace"
        description="Your active cloud workspace and organization details."
      >
        <div className="space-y-0">
          <InfoRow icon={Cloud} label="Active workspace" value={providerLabel} />
          <InfoRow
            icon={Building2}
            label="Organization"
            value={isOrgLoading ? "Loading..." : orgData?.data?.org_name ?? "—"}
          />
          <InfoRow
            icon={MapPin}
            label="Account type"
            value={account.accountType || account.type || "—"}
          />
        </div>
      </SettingsSection>
    </div>
  );
};
