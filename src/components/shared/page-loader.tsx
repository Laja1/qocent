import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

type PageLoaderProps = {
  label?: string;
  className?: string;
};

export function PageLoader({ label = "Loading", className }: PageLoaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center py-20 text-center",
        className
      )}
    >
      <Loader2 className="size-6 animate-spin text-muted-foreground" />
      <p className="mt-3 text-xs text-muted-foreground">{label}</p>
    </div>
  );
}

export function SubscriptionPlansSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          key={index}
          className="flex h-full flex-col rounded-lg border border-border bg-card p-6"
        >
          <div className="mb-5 space-y-2">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-4/5" />
          </div>
          <div className="mb-5 border-b border-border pb-5">
            <Skeleton className="h-10 w-24" />
          </div>
          <div className="mb-6 flex-1 space-y-2.5">
            {Array.from({ length: 4 }).map((__, row) => (
              <div key={row} className="flex items-center gap-2.5">
                <Skeleton className="size-4 rounded-full" />
                <Skeleton className="h-3 flex-1" />
              </div>
            ))}
          </div>
          <div className="mt-auto space-y-2">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function TableRowsSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: rows }).map((_, index) => (
        <div
          key={index}
          className="flex animate-pulse items-center gap-4 rounded-lg border border-border bg-card px-4 py-3"
        >
          <div className="size-9 rounded-full bg-muted" />
          <div className="flex-1 space-y-2">
            <div className="h-3 w-1/3 rounded bg-muted" />
            <div className="h-3 w-1/2 rounded bg-muted" />
          </div>
          <div className="h-6 w-16 rounded bg-muted" />
        </div>
      ))}
    </div>
  );
}
