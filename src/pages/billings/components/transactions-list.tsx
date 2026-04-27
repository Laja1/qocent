import { ArrowDownLeft, ArrowUpRight, History } from "lucide-react";
import { GlassCard } from "./glass-card";
import { InlineLoader } from "./inline-loader";
import { formatDate, formatMoney } from "../utils/format";
import type { WalletTransactionResponse } from "@/models/response/walletBillingResponse";

type TransactionsListProps = {
  isLoading: boolean;
  transactions: WalletTransactionResponse[];
};

const isCredit = (type: string) =>
  ["CREDIT", "FUNDING", "TOPUP", "REFUND"].some((kw) =>
    type.toUpperCase().includes(kw)
  );

export const TransactionsList = ({
  isLoading,
  transactions,
}: TransactionsListProps) => {
  return (
    <GlassCard
      title="Latest Transactions"
      subtitle="Recent wallet activity"
      action={
        <span className="text-[11px] text-muted-foreground px-2.5 py-1 rounded-full border border-black/10 bg-white/60">
          {transactions.length} entries
        </span>
      }
    >
      {isLoading ? (
        <InlineLoader label="Loading transactions" />
      ) : !transactions.length ? (
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <div className="size-10 rounded-full bg-white/60 border border-black/10 flex items-center justify-center mb-2">
            <History className="size-4 text-muted-foreground" />
          </div>
          <p className="text-xs text-muted-foreground">No transactions yet</p>
        </div>
      ) : (
        <div className="divide-y divide-black/[0.06]">
          {transactions.map((tx) => {
            const credit = isCredit(tx.transaction_type);
            const Icon = credit ? ArrowDownLeft : ArrowUpRight;
            return (
              <div
                key={tx.entry_id}
                className="flex items-center justify-between gap-3 py-3 first:pt-0 last:pb-0"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={`size-9 rounded-xl flex items-center justify-center border ${
                      credit
                        ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-700"
                        : "bg-red-500/10 border-red-500/30 text-red-700"
                    }`}
                  >
                    <Icon className="size-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-foreground truncate capitalize">
                      {tx.transaction_type.toLowerCase().replace(/_/g, " ")}
                    </p>
                    <p className="text-[11px] text-muted-foreground truncate">
                      {tx.description ?? formatDate(tx.created_at)}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p
                    className={`text-xs font-medium ${
                      credit ? "text-emerald-700" : "text-foreground"
                    }`}
                  >
                    {credit ? "+" : "-"}
                    {formatMoney(tx.amount, tx.currency ?? "NGN")}
                  </p>
                  <p className="text-[10px] text-muted-foreground">
                    Bal: {formatMoney(tx.balance_after, tx.currency ?? "NGN")}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </GlassCard>
  );
};
