import { Check, Copy } from "lucide-react";
import { useState } from "react";
import type { FundWalletResponse } from "@/models/response/walletBillingResponse";
import { GlassCard } from "./glass-card";
import { formatDate, formatMoney } from "../utils/format";

type FundingTransferDetailsCardProps = {
  details?: FundWalletResponse | null;
};

export const FundingTransferDetailsCard = ({
  details,
}: FundingTransferDetailsCardProps) => {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  if (!details) return null;

  const handleCopy = async (label: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedField(label);
      setTimeout(() => setCopiedField(null), 1200);
    } catch {
      // no-op
    }
  };

  return (
    <GlassCard
      title="Transfer Details"
      subtitle="Use this account to fund your wallet"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <Field
          label="Account Number"
          value={details.account_number}
          onCopy={() => handleCopy("Account Number", details.account_number)}
          copied={copiedField === "Account Number"}
        />
        <Field label="Bank Name" value={details.bank_name} />
        <Field label="Account Name" value={details.account_name} />
        <Field
          label="Amount"
          value={formatMoney(details.amount, "NGN")}
        />
        <Field label="Valid Until" value={formatDate(details.valid_until)} />
        <Field
          label="Reference"
          value={details.reference}
          onCopy={() => handleCopy("Reference", details.reference)}
          copied={copiedField === "Reference"}
          truncate
        />
      </div>
      <p className="text-xs text-muted-foreground mt-3">
        {details.instructions}
      </p>
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
      className={`text-xs text-foreground mt-1 ${truncate ? "truncate" : "break-all"}`}
      title={value}
    >
      {value}
    </p>
  </div>
);
