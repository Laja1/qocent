import { Check, Clock, Copy, RefreshCw, XCircle } from "lucide-react";
import { GlassCard } from "./glass-card";
import { InlineLoader } from "./inline-loader";
import { formatDate, formatMoney } from "../utils/format";
import type { WalletFundingStatusResponse } from "@/models/response/walletBillingResponse";
import { useState } from "react";

type FundingStatusCardProps = {
  isUninitialized: boolean;
  isLoading: boolean;
  data?: WalletFundingStatusResponse;
  onRefresh?: () => void;
};

const STATUS_STYLES: Record<string, string> = {
  PENDING: "bg-amber-500/10 text-amber-700 border-amber-500/30",
  PAID: "bg-emerald-500/10 text-emerald-700 border-emerald-500/30",
  FAILED: "bg-red-500/10 text-red-700 border-red-500/30",
  EXPIRED: "bg-gray-500/10 text-gray-700 border-gray-500/30",
};

const STATUS_ICONS: Record<string, typeof Clock> = {
  PENDING: Clock,
  PAID: Check,
  FAILED: XCircle,
  EXPIRED: XCircle,
};

export const FundingStatusCard = ({
  isUninitialized,
  isLoading,
  data,
  onRefresh,
}: FundingStatusCardProps) => {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleCopy = async (label: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedField(label);
      setTimeout(() => setCopiedField(null), 1500);
    } catch {
      // ignore
    }
  };

  const status = data?.status ?? "PENDING";
  const StatusIcon = STATUS_ICONS[status] ?? Clock;
  const statusClass = STATUS_STYLES[status] ?? STATUS_STYLES.PENDING;

  return (
    <GlassCard
      title="Funding Status"
      subtitle="Track your most recent wallet funding"
      action={
        !isUninitialized && onRefresh ? (
          <button
            onClick={onRefresh}
            className="inline-flex items-center gap-1.5 text-[11px] text-foreground/80 px-2.5 py-1 rounded-full border border-black/10 bg-white/60 hover:bg-white transition"
          >
            <RefreshCw className={`size-3 ${isLoading ? "animate-spin" : ""}`} />
            Refresh
          </button>
        ) : undefined
      }
    >
      {isUninitialized ? (
        <p className="text-xs text-muted-foreground">
          Generate a funding account to track payment confirmation here.
        </p>
      ) : isLoading && !data ? (
        <InlineLoader label="Checking status" />
      ) : data ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-semibold text-foreground">
                {formatMoney(data.amount, data.currency)}
              </span>
              <span className="text-[11px] text-muted-foreground uppercase tracking-wider">
                {data.method}
              </span>
            </div>
            <span
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[11px] font-medium ${statusClass}`}
            >
              <StatusIcon className="size-3" />
              {status}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Field
              label="Reference"
              value={data.reference}
              onCopy={() => handleCopy("Reference", data.reference)}
              copied={copiedField === "Reference"}
            />
            <Field
              label="Payment ID"
              value={data.payment_id}
              onCopy={() => handleCopy("Payment ID", data.payment_id)}
              copied={copiedField === "Payment ID"}
              truncate
            />
            <Field label="Created" value={formatDate(data.created_at)} />
            <Field label="Updated" value={formatDate(data.updated_at)} />
          </div>
        </div>
      ) : (
        <p className="text-xs text-muted-foreground">
          No funding status available.
        </p>
      )}
    </GlassCard>
  );
};

type FieldProps = {
  label: string;
  value: string;
  onCopy?: () => void;
  copied?: boolean;
  truncate?: boolean;
};

const Field = ({ label, value, onCopy, copied, truncate }: FieldProps) => (
  <div className="rounded-xl border border-black/5 bg-white/50 px-3 py-2.5">
    <div className="flex items-center justify-between gap-2">
      <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
        {label}
      </p>
      {onCopy && (
        <button
          onClick={onCopy}
          className="text-muted-foreground hover:text-foreground transition"
          aria-label={`Copy ${label}`}
        >
          {copied ? <Check className="size-3" /> : <Copy className="size-3" />}
        </button>
      )}
    </div>
    <p
      className={`text-xs text-foreground mt-1 ${
        truncate ? "truncate" : "break-all"
      }`}
      title={value}
    >
      {value}
    </p>
  </div>
);
