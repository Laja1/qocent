import { TrendingUp, Users, PieChart } from "lucide-react";
import { GlassCard } from "./glass-card";
import { InlineLoader } from "./inline-loader";
import { formatMoney } from "../utils/format";
import type { SpendReportResponse } from "@/models/response/walletBillingResponse";

type SpendReportCardProps = {
  isLoading: boolean;
  data?: SpendReportResponse;
};

export const SpendReportCard = ({ isLoading, data }: SpendReportCardProps) => {
  const spendEntries = Object.entries(data?.spend ?? {});
  const grandTotal = data?.grand_total ?? 0;
  const currency = data?.currency ?? "USD";
  const totalUsers = data?.total_users_with_spend ?? 0;

  return (
    <GlassCard title="Spend Report" subtitle="Aggregated cloud spend">
      {isLoading ? (
        <InlineLoader label="Loading spend report" />
      ) : (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <Stat
              icon={<TrendingUp className="size-3.5" />}
              label="Grand Total"
              value={formatMoney(grandTotal, currency)}
            />
            <Stat
              icon={<Users className="size-3.5" />}
              label="Active Users"
              value={String(totalUsers)}
            />
          </div>

          <div>
            <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground uppercase tracking-wider mb-2">
              <PieChart className="size-3" />
              Breakdown
            </div>
            {spendEntries.length === 0 ? (
              <p className="text-xs text-muted-foreground">
                No spend recorded yet.
              </p>
            ) : (
              <div className="space-y-1.5">
                {spendEntries.map(([key, value]) => (
                  <div
                    key={key}
                    className="flex items-center justify-between text-xs px-3 py-2 rounded-md bg-white/60 border border-black/[0.06]"
                  >
                    <span className="text-foreground/80 capitalize">
                      {key.replace(/_/g, " ")}
                    </span>
                    <span className="text-foreground font-medium">
                      {formatMoney(value, currency)}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </GlassCard>
  );
};

type StatProps = {
  icon: React.ReactNode;
  label: string;
  value: string;
};

const Stat = ({ icon, label, value }: StatProps) => (
  <div className="rounded-md border border-black/5 bg-white/50 px-3 py-3">
    <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-muted-foreground">
      {icon}
      {label}
    </div>
    <p className="text-base font-semibold text-foreground mt-1.5">{value}</p>
  </div>
);
