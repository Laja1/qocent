import { Plus } from "lucide-react";
import { ClipLoader } from "react-spinners";
import { GlassCard } from "./glass-card";
import { FundWalletSkeleton } from "./billing-skeletons";
import {
  formatAmountWithCommas,
  formatMoney,
  formatUsdAmount,
  sanitizeAmountInput,
} from "../utils/format";

type FundWalletCardProps = {
  amount: string;
  equivalentAmount: number;
  exchangeRate: number;
  isLoading?: boolean;
  isFunding: boolean;
  onAmountChange: (amount: string) => void;
  onFund: () => void;
};

const QUICK_AMOUNTS = [50, 100, 350, 500];

export const FundWalletCard = ({
  amount,
  equivalentAmount,
  exchangeRate,
  isLoading = false,
  isFunding,
  onAmountChange,
  onFund,
}: FundWalletCardProps) => {
  if (isLoading) {
    return <FundWalletSkeleton />;
  }

  return (
    <GlassCard
      title="Fund Wallet"
      subtitle="Enter the dollar value you want to add; Rubies payment is made in Naira"
    >
      <div className="space-y-4">
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
            USD
          </span>
          <input
            type="text"
            inputMode="decimal"
            value={formatAmountWithCommas(amount)}
            onChange={(e) =>
              onAmountChange(sanitizeAmountInput(e.target.value))
            }
            placeholder="0.00"
            className="w-full pl-12 pr-3 py-2.5 rounded-md bg-white/70 border border-black/10 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>

        <div className="flex flex-wrap gap-1.5">
          {QUICK_AMOUNTS.map((preset) => (
            <button
              key={preset}
              type="button"
              onClick={() => onAmountChange(String(preset))}
              className="px-2.5 py-1 text-[11px] rounded-full bg-white/60 border border-black/10 text-foreground/80 hover:bg-white transition"
            >
              ${preset.toLocaleString()}
            </button>
          ))}
        </div>

        <div className="rounded-md border border-primary/15 bg-primary/5 p-3">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                Rubies/Naira equivalent
              </p>
              <p className="mt-1 text-xl font-semibold text-foreground">
                {formatMoney(equivalentAmount, "NGN")}
              </p>
            </div>
            <span className="rounded-full border border-black/10 bg-white/70 px-2.5 py-1 text-[11px] text-foreground/80">
              ${formatUsdAmount(amount)} USD
            </span>
          </div>

          <div className="mt-3 rounded-md border border-black/5 bg-white/60 px-3 py-2">
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
              Exchange rate applied
            </p>
            <p className="mt-1 text-xs text-foreground">
              1 USD = {formatMoney(exchangeRate, "NGN")}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onFund}
          disabled={isFunding || !amount}
          className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed transition"
        >
          {isFunding ? (
            <>
              <ClipLoader size={14} color="currentColor" />
              Generating...
            </>
          ) : (
            <>
              <Plus className="size-4" />
              Generate Funding Account
            </>
          )}
        </button>
      </div>
    </GlassCard>
  );
};
