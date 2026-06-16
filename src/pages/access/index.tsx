/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import {
  Edit,
  Loader2,
  Mail,
  Search,
  Shield,
  Trash2,
  UserPlus,
  Users,
  Calendar,
} from "lucide-react";
import NiceModal from "@ebay/nice-modal-react";

import { Button, Header } from "@/components/shared";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { ModalConstant } from "@/components/shared/modal/register";
import { showCustomToast } from "@/components/shared/toast";
import { ErrorHandler } from "@/service/httpClient/errorHandler";

import { useGetUserAccountsByProviderQuery } from "@/service/python/organizationApi";
import {
  useGetAccountMembersQuery,
  useRemoveAccountMemberMutation,
} from "@/service/python/accountsApi";
import type { Account } from "@/models/response/organizationResponse";
import type { AccountMemberResponse } from "@/models/response/accountResponse";
import type { RootState } from "@/store";

const roleStyles: Record<string, string> = {
  Admin: "bg-blue-50 text-blue-700 border-blue-200",
  Owner: "bg-purple-50 text-purple-700 border-purple-200",
  Member: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Viewer: "bg-gray-100 text-gray-700 border-gray-200",
};

const getInitials = (first?: string, last?: string, email?: string) => {
  const f = (first || "").trim();
  const l = (last || "").trim();
  if (f || l) return `${f.charAt(0)}${l.charAt(0)}`.toUpperCase() || "?";
  return (email?.charAt(0) || "?").toUpperCase();
};

const avatarPalette = [
  "bg-blue-500",
  "bg-emerald-500",
  "bg-purple-500",
  "bg-pink-500",
  "bg-amber-500",
  "bg-cyan-500",
  "bg-rose-500",
  "bg-indigo-500",
];

const colorFromString = (s: string) => {
  let hash = 0;
  for (let i = 0; i < s.length; i++) hash = (hash * 31 + s.charCodeAt(i)) | 0;
  return avatarPalette[Math.abs(hash) % avatarPalette.length];
};

export const Access = () => {
  const dashboard = useSelector((state: RootState) => state.dashboard);

  const { data: organizationAccount, isLoading: isSiteLoading } =
    useGetUserAccountsByProviderQuery({
      provider: String(dashboard?.provider) || "",
    });

  const accounts = useMemo(
    () => organizationAccount?.data?.accounts ?? [],
    [organizationAccount]
  );

  const [selectedAccountId, setSelectedAccountId] = useState<string>("");
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");

  useEffect(() => {
    if (!selectedAccountId && accounts.length > 0) {
      setSelectedAccountId(accounts[0].account_id);
    }
  }, [accounts, selectedAccountId]);

  const selectedSite: Account | undefined = accounts.find(
    (a) => a.account_id === selectedAccountId
  );

  const { data: accountMembersData, isLoading: isMembersLoading } =
    useGetAccountMembersQuery(selectedAccountId, { skip: !selectedAccountId });

  const [removeMember, { isLoading: isRemoving }] =
    useRemoveAccountMemberMutation();

  const members: AccountMemberResponse[] = accountMembersData?.data ?? [];

  const stats = useMemo(() => {
    const total = members.length;
    const admins = members.filter(
      (m) => m.account_member_type === "Admin"
    ).length;
    const others = total - admins;
    return { total, admins, others };
  }, [members]);

  const filteredMembers = useMemo(() => {
    const q = search.trim().toLowerCase();
    return members.filter((m) => {
      const matchesRole =
        roleFilter === "all" || m.account_member_type === roleFilter;
      if (!matchesRole) return false;
      if (!q) return true;
      const name = `${m.user_first_name ?? ""} ${m.user_last_name ?? ""}`
        .trim()
        .toLowerCase();
      return (
        name.includes(q) ||
        (m.user_email ?? "").toLowerCase().includes(q) ||
        (m.account_member_type ?? "").toLowerCase().includes(q)
      );
    });
  }, [members, search, roleFilter]);

  const isAdmin = selectedSite?.member_type === "Owner" ||
    selectedSite?.member_type === "Admin";

  const handleRemove = async (member: AccountMemberResponse) => {
    if (!selectedAccountId) return;
    const confirmed = window.confirm(
      `Remove ${member.user_first_name ?? member.user_email ?? "this member"} from ${selectedSite?.account_name}?`
    );
    if (!confirmed) return;
    try {
      await removeMember({
        account_id: selectedAccountId,
        body: { user_id: member.account_user_id },
      }).unwrap();
      showCustomToast("Member removed successfully", {
        toastOptions: { type: "success", autoClose: 4000 },
      });
    } catch (error: any) {
      showCustomToast(
        ErrorHandler.extractMessage(error) || "Failed to remove member",
        { toastOptions: { type: "error", autoClose: 5000 } }
      );
    }
  };

  return (
    <div className="min-h-screen pb-20">
      <Header
        title="Access"
        description="Manage team members, roles, and access across your sites"
      >
        {isAdmin && selectedSite && (
          <Button
            label="Invite Member"
            prefixIcon={<UserPlus className="size-4" />}
            size="small"
            onClick={() =>
              NiceModal.show(ModalConstant.InviteToWorkspace, selectedSite)
            }
          />
        )}
      </Header>

      <div className="px-5 mt-6 max-w-7xl mx-auto w-full space-y-6">
        {/* Site selector + stats */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          <Card className="lg:col-span-1 p-5 rounded-2xl border border-gray-200 shadow-none bg-white">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-500 mb-2">
              Site
            </p>
            {isSiteLoading ? (
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Loader2 className="size-4 animate-spin" /> Loading sites...
              </div>
            ) : accounts.length === 0 ? (
              <p className="text-sm text-gray-500">No sites available.</p>
            ) : (
              <Select
                value={selectedAccountId}
                onValueChange={setSelectedAccountId}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a site" />
                </SelectTrigger>
                <SelectContent>
                  {accounts.map((site) => (
                    <SelectItem key={site.account_id} value={site.account_id}>
                      {site.account_name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
            {selectedSite && (
              <div className="mt-3 flex flex-wrap items-center gap-2 text-[11px] text-gray-500">
                <Badge
                  variant="outline"
                  className="bg-gray-50 border-gray-200 text-gray-700"
                >
                  {selectedSite.account_provider}
                </Badge>
                {selectedSite.member_type && (
                  <Badge
                    variant="outline"
                    className={
                      roleStyles[selectedSite.member_type] ||
                      "bg-gray-50 text-gray-700 border-gray-200"
                    }
                  >
                    You: {selectedSite.member_type}
                  </Badge>
                )}
              </div>
            )}
          </Card>

          <StatCard
            label="Total Members"
            value={stats.total}
            icon={<Users className="size-4" />}
            tone="default"
            loading={isMembersLoading}
          />
          <StatCard
            label="Admins"
            value={stats.admins}
            icon={<Shield className="size-4" />}
            tone="blue"
            loading={isMembersLoading}
          />
          <StatCard
            label="Members & Viewers"
            value={stats.others}
            icon={<Mail className="size-4" />}
            tone="emerald"
            loading={isMembersLoading}
          />
        </div>

        {/* Members list */}
        <Card className="rounded-2xl border border-gray-200 shadow-none bg-white">
          <div className="p-5 border-b border-gray-100 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div>
              <h3 className="font-brfirma text-base font-bold text-gray-950 tracking-tight">
                {selectedSite ? `${selectedSite.account_name} Members` : "Members"}
              </h3>
              <p className="text-xs text-gray-500 mt-0.5">
                {filteredMembers.length} of {members.length}{" "}
                {members.length === 1 ? "member" : "members"}
              </p>
            </div>
            <div className="flex items-center gap-2 w-full md:w-auto">
              <div className="relative flex-1 md:w-72">
                <Search className="size-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <Input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by name or email"
                  className="pl-9 h-9 text-sm"
                />
              </div>
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger className="h-9 w-36 text-sm">
                  <SelectValue placeholder="All Roles" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="Admin">Admin</SelectItem>
                  <SelectItem value="Member">Member</SelectItem>
                  <SelectItem value="Viewer">Viewer</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="p-5">
            {isMembersLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {Array.from({ length: 6 }).map((_, i) => (
                  <MemberSkeleton key={i} />
                ))}
              </div>
            ) : !selectedAccountId ? (
              <EmptyState
                title="Select a site to begin"
                description="Choose a site from the dropdown to view its members."
              />
            ) : filteredMembers.length === 0 ? (
              <EmptyState
                title={
                  members.length === 0
                    ? "No members yet"
                    : "No members match your filters"
                }
                description={
                  members.length === 0
                    ? "Invite your teammates to start collaborating on this site."
                    : "Try adjusting your search or role filter."
                }
                action={
                  isAdmin && selectedSite && members.length === 0 ? (
                    <Button
                      label="Invite Member"
                      prefixIcon={<UserPlus className="size-4" />}
                      size="small"
                      onClick={() =>
                        NiceModal.show(
                          ModalConstant.InviteToWorkspace,
                          selectedSite
                        )
                      }
                    />
                  ) : null
                }
              />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {filteredMembers.map((member, idx) => (
                  <motion.div
                    key={member.account_user_id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.3,
                      delay: Math.min(idx * 0.04, 0.4),
                    }}
                  >
                    <MemberCard
                      member={member}
                      isAdmin={!!isAdmin}
                      isRemoving={isRemoving}
                      onEdit={() =>
                        NiceModal.show(ModalConstant.EditAccessModal, {
                          member,
                        })
                      }
                      onRemove={() => handleRemove(member)}
                    />
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

type StatTone = "default" | "blue" | "emerald";

const StatCard = ({
  label,
  value,
  icon,
  tone,
  loading,
}: {
  label: string;
  value: number;
  icon: React.ReactNode;
  tone: StatTone;
  loading?: boolean;
}) => {
  const toneClasses: Record<StatTone, string> = {
    default: "bg-gray-100 text-gray-700",
    blue: "bg-blue-50 text-blue-700",
    emerald: "bg-emerald-50 text-emerald-700",
  };
  return (
    <Card className="p-5 rounded-2xl border border-gray-200 shadow-none bg-white">
      <div className="flex items-center justify-between">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-500">
          {label}
        </p>
        <span
          className={`size-7 rounded-lg flex items-center justify-center ${toneClasses[tone]}`}
        >
          {icon}
        </span>
      </div>
      <p className="font-strawford text-3xl font-bold text-gray-950 mt-3 tracking-tight">
        {loading ? (
          <span className="inline-block h-7 w-12 bg-gray-100 rounded animate-pulse" />
        ) : (
          value
        )}
      </p>
    </Card>
  );
};

const MemberCard = ({
  member,
  isAdmin,
  isRemoving,
  onEdit,
  onRemove,
}: {
  member: AccountMemberResponse;
  isAdmin: boolean;
  isRemoving: boolean;
  onEdit: () => void;
  onRemove: () => void;
}) => {
  const fullName =
    `${member.user_first_name ?? ""} ${member.user_last_name ?? ""}`.trim() ||
    member.user_email ||
    "Unknown";
  const initials = getInitials(
    member.user_first_name,
    member.user_last_name,
    member.user_email
  );
  const avatarColor = colorFromString(
    member.account_user_id || member.user_email || fullName
  );

  return (
    <div className="group relative h-full rounded-2xl border border-gray-200 bg-white p-5 hover:border-primary/30 hover:shadow-md transition-all duration-200 flex flex-col">
      <div className="flex items-start gap-3">
        <div
          className={`size-11 rounded-full ${avatarColor} text-white flex items-center justify-center text-sm font-semibold flex-shrink-0 shadow-sm`}
        >
          {initials}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-gray-950 truncate">
            {fullName}
          </p>
          {member.user_email && (
            <p className="text-xs text-gray-500 truncate flex items-center gap-1 mt-0.5">
              <Mail className="size-3" />
              {member.user_email}
            </p>
          )}
        </div>
        <Badge
          variant="outline"
          className={
            roleStyles[member.account_member_type] ||
            "bg-gray-50 text-gray-700 border-gray-200"
          }
        >
          {member.account_member_type}
        </Badge>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
        <span className="text-[11px] text-gray-500 flex items-center gap-1">
          <Calendar className="size-3" />
          Joined{" "}
          {new Date(member.account_member_created_at).toLocaleDateString(
            undefined,
            { month: "short", day: "numeric", year: "numeric" }
          )}
        </span>

        {isAdmin && (
          <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
            <button
              type="button"
              onClick={onEdit}
              className="p-1.5 rounded-md hover:bg-gray-100 text-gray-600 hover:text-gray-900 transition-colors"
              title="Edit role"
            >
              <Edit className="size-3.5" />
            </button>
            <button
              type="button"
              onClick={onRemove}
              disabled={isRemoving}
              className="p-1.5 rounded-md hover:bg-red-50 text-gray-600 hover:text-red-600 transition-colors disabled:opacity-50"
              title="Remove member"
            >
              <Trash2 className="size-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const MemberSkeleton = () => (
  <div className="rounded-2xl border border-gray-200 bg-white p-5 animate-pulse">
    <div className="flex items-start gap-3">
      <div className="size-11 rounded-full bg-gray-100" />
      <div className="flex-1 space-y-2">
        <div className="h-3.5 bg-gray-100 rounded w-2/3" />
        <div className="h-3 bg-gray-100 rounded w-4/5" />
      </div>
      <div className="h-5 w-14 bg-gray-100 rounded-full" />
    </div>
    <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
      <div className="h-3 bg-gray-100 rounded w-24" />
      <div className="h-5 w-16 bg-gray-100 rounded" />
    </div>
  </div>
);

const EmptyState = ({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: React.ReactNode;
}) => (
  <div className="py-14 text-center flex flex-col items-center">
    <div className="size-12 rounded-full bg-gray-100 flex items-center justify-center mb-4">
      <Users className="size-5 text-gray-500" />
    </div>
    <h4 className="text-sm font-semibold text-gray-900">{title}</h4>
    <p className="text-xs text-gray-500 mt-1 max-w-sm">{description}</p>
    {action && <div className="mt-4">{action}</div>}
  </div>
);
