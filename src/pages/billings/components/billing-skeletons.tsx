import { Skeleton } from "@/components/ui/skeleton";
import { GlassCard } from "./glass-card";

export function WalletBalanceSkeleton() {
  return (
    <GlassCard>
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1 space-y-3">
          <Skeleton className="h-3 w-28" />
          <Skeleton className="h-9 w-44" />
        </div>
        <Skeleton className="hidden size-14 rounded-md sm:block" />
      </div>
    </GlassCard>
  );
}

export function FundWalletSkeleton() {
  return (
    <GlassCard
      title="Fund Wallet"
      subtitle="Enter the dollar value you want to add; Rubies payment is made in Naira"
    >
      <div className="space-y-4">
        <Skeleton className="h-10 w-full" />
        <div className="flex flex-wrap gap-1.5">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} className="h-7 w-14 rounded-full" />
          ))}
        </div>
        <div className="rounded-md border border-primary/15 bg-primary/5 p-3 space-y-3">
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-2 flex-1">
              <Skeleton className="h-3 w-32" />
              <Skeleton className="h-7 w-36" />
            </div>
            <Skeleton className="h-7 w-20 rounded-full" />
          </div>
          <div className="rounded-md border border-black/5 bg-white/60 px-3 py-2 space-y-2">
            <Skeleton className="h-3 w-28" />
            <Skeleton className="h-3 w-40" />
          </div>
        </div>
        <Skeleton className="h-10 w-full" />
      </div>
    </GlassCard>
  );
}

export function SpendReportSkeleton() {
  return (
    <GlassCard title="Spend Report" subtitle="Aggregated cloud spend">
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <Skeleton className="h-16 w-full rounded-md" />
          <Skeleton className="h-16 w-full rounded-md" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-3 w-24" />
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton key={index} className="h-10 w-full rounded-md" />
          ))}
        </div>
      </div>
    </GlassCard>
  );
}
