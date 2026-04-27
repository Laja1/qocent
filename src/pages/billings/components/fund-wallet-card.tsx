import { Plus } from "lucide-react";
import { ClipLoader } from "react-spinners";
import { GlassCard } from "./glass-card";

type FundWalletCardProps = {
  amount: string;
  isFunding: boolean;
  onAmountChange: (amount: string) => void;
  onFund: () => void;
};

const QUICK_AMOUNTS = [1000, 5000, 10000, 25000];

export const FundWalletCard = ({
  amount,
  isFunding,
  onAmountChange,
  onFund,
}: FundWalletCardProps) => {
  return (
    <GlassCard title="Fund Wallet" subtitle="Generate a funding account">
      <div className="space-y-3">
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
            NGN
          </span>
          <input
            type="text"
            inputMode="decimal"
            value={amount}
            onChange={(e) => onAmountChange(e.target.value)}
            placeholder="0.00"
            className="w-full pl-12 pr-3 py-2.5 rounded-xl bg-white/70 border border-black/10 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
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
              ₦{preset.toLocaleString()}
            </button>
          ))}
        </div>

        <button
          onClick={onFund}
          disabled={isFunding || !amount}
          className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed transition"
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
