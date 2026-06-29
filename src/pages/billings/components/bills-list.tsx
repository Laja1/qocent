import { Receipt } from "lucide-react";
import { GlassCard } from "./glass-card";
import { InlineLoader } from "./inline-loader";
import { formatDate, formatMoney } from "../utils/format";
import type { Bill, MyBillsResponse } from "@/models/response/walletBillingResponse";

type BillsListProps = {
  isLoading: boolean;
  data?: MyBillsResponse;
};

const STATUS_STYLES: Record<string, string> = {
  PAID: "bg-emerald-500/10 text-emerald-700 border-emerald-500/30",
  PENDING: "bg-amber-500/10 text-amber-700 border-amber-500/30",
  OVERDUE: "bg-red-500/10 text-red-700 border-red-500/30",
  UNPAID: "bg-red-500/10 text-red-700 border-red-500/30",
};

const StatusPill = ({ status }: { status?: string }) => {
  if (!status) return null;
  const cls =
    STATUS_STYLES[status.toUpperCase()] ??
    "bg-white/60 text-foreground/80 border-black/10";
  return (
    <span
      className={`inline-flex px-2 py-0.5 rounded-full border text-[10px] font-medium ${cls}`}
    >
      {status}
    </span>
  );
};

export const BillsList = ({ isLoading, data }: BillsListProps) => {
  const bills: Bill[] = data?.bills ?? [];

  return (
    <GlassCard
      title="My Bills"
      subtitle="Outstanding and recent invoices"
      action={
        <span className="text-[11px] text-muted-foreground px-2.5 py-1 rounded-full border border-black/10 bg-white/60">
          {bills.length} {bills.length === 1 ? "bill" : "bills"}
        </span>
      }
    >
      {isLoading ? (
        <InlineLoader label="Loading bills" />
      ) : bills.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <div className="size-10 rounded-full bg-white/60 border border-black/10 flex items-center justify-center mb-2">
            <Receipt className="size-4 text-muted-foreground" />
          </div>
          <p className="text-xs text-muted-foreground">
            You don't have any bills yet
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {bills.map((bill, idx) => (
            <div
              key={bill.bill_id ?? idx}
              className="flex items-center justify-between gap-3 px-3 py-2.5 rounded-md bg-white/60 border border-black/[0.06]"
            >
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-xs font-medium text-foreground truncate">
                    {bill.description ?? bill.bill_id ?? `Bill #${idx + 1}`}
                  </p>
                  <StatusPill status={bill.status} />
                </div>
                <p className="text-[11px] text-muted-foreground mt-0.5">
                  {bill.due_date
                    ? `Due ${formatDate(bill.due_date)}`
                    : bill.created_at
                      ? formatDate(bill.created_at)
                      : ""}
                </p>
              </div>
              {bill.amount !== undefined && (
                <p className="text-xs font-medium text-foreground">
                  {formatMoney(bill.amount, bill.currency ?? "USD")}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </GlassCard>
  );
};
