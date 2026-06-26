import { useSelector } from "react-redux";
import {
  Building2,
  Calendar,
  Cloud,
  Fingerprint,
  Mail,
  MapPin,
  User,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import type { RootState } from "@/store";
import { useGetMyOrganizationsQuery } from "@/service/organizationApi";

type InfoRowProps = {
  icon: typeof User;
  label: string;
  value: string;
  mono?: boolean;
};

const InfoRow = ({ icon: Icon, label, value, mono }: InfoRowProps) => (
  <div className="flex items-start gap-3 py-3 border-b border-gray-100 last:border-0">
    <div className="size-9 rounded-lg bg-gray-50 flex items-center justify-center flex-shrink-0">
      <Icon className="size-4 text-gray-500" />
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-[11px] font-medium uppercase tracking-wider text-gray-400">
        {label}
      </p>
      <p
        className={`text-sm text-gray-900 mt-0.5 break-all ${
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
    <div className="space-y-6">
      <div className="rounded-xl border border-gray-200 bg-gray-50/50 p-4">
        <p className="text-sm text-gray-600 leading-relaxed">
          This is your Qocent account profile. Account details are managed
          through your registration. Contact support if you need to update your
          email or personal information.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">
            Personal Information
          </p>
          <div className="rounded-xl border border-gray-200 bg-white px-4">
            <InfoRow icon={User} label="Full name" value={fullName} />
            <InfoRow icon={Mail} label="Email address" value={auth.userEmail ?? ""} />
            <InfoRow
              icon={Fingerprint}
              label="User ID"
              value={auth.userId ?? ""}
              mono
            />
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">
            Workspace & Account
          </p>
          <div className="rounded-xl border border-gray-200 bg-white px-4">
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
        </div>
      </div>

      <div className="flex flex-wrap gap-2 pt-2">
        {account.memberStatus && (
          <Badge variant="outline" className="bg-white border-gray-200">
            Member: {account.memberStatus}
          </Badge>
        )}
        {account.accountStatus && (
          <Badge variant="outline" className="bg-white border-gray-200">
            Account: {account.accountStatus}
          </Badge>
        )}
        {orgData?.data?.org_status && (
          <Badge
            variant="outline"
            className={
              orgData.data.org_status === "Active"
                ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                : "bg-gray-50 border-gray-200 text-gray-600"
            }
          >
            Org: {orgData.data.org_status}
          </Badge>
        )}
        {orgData?.data?.org_created_at && (
          <Badge variant="outline" className="bg-white border-gray-200 text-gray-600">
            <Calendar className="size-3 mr-1" />
            Joined {new Date(orgData.data.org_created_at).toLocaleDateString()}
          </Badge>
        )}
      </div>
    </div>
  );
};
