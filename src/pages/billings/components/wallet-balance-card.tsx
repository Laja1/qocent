import { Wallet } from "lucide-react";
import { GlassCard } from "./glass-card";
import { WalletBalanceSkeleton } from "./billing-skeletons";
import { formatMoney } from "../utils/format";

type WalletBalanceCardProps = {
  isLoading: boolean;
  balance?: number;
  currency?: string;
  className?: string;
};

export const WalletBalanceCard = ({
  isLoading,
  balance,
  currency = "NGN",
  className,
}: WalletBalanceCardProps) => {
  if (isLoading) {
    return <WalletBalanceSkeleton />;
  }

  return (
    <GlassCard className={className}>
      <div className="flex items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-muted-foreground text-xs uppercase tracking-wider">
            <Wallet className="size-3.5" />
            Wallet Balance
          </div>
          <div className="mt-3">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-semibold text-foreground tracking-tight">
                {formatMoney(balance ?? 0, currency)}
              </span>
              <span className="text-xs text-muted-foreground">available</span>
            </div>
          </div>
        </div>
        <div className="hidden sm:flex size-14 items-center justify-center rounded-md bg-primary/10 border border-primary/15">
          <Wallet className="size-6 text-primary" />
        </div>
      </div>
    </GlassCard>
  );
};
