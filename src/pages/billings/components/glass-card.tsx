import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type GlassCardProps = {
  children: ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
  action?: ReactNode;
};

export const GlassCard = ({
  children,
  className,
  title,
  subtitle,
  action,
}: GlassCardProps) => {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-black/5",
        "bg-white/60 backdrop-blur-xl",
        "shadow-[0_8px_32px_rgba(15,23,42,0.06)]",
        "before:pointer-events-none before:absolute before:inset-0 before:rounded-2xl",
        "before:bg-gradient-to-br before:from-white/60 before:via-transparent before:to-white/20",
        className
      )}
    >
      {(title || action) && (
        <div className="relative flex items-start justify-between gap-3 px-5 pt-5">
          <div className="min-w-0">
            {title && (
              <h3 className="text-sm font-semibold text-foreground tracking-tight">
                {title}
              </h3>
            )}
            {subtitle && (
              <p className="text-[11px] text-muted-foreground mt-0.5">
                {subtitle}
              </p>
            )}
          </div>
          {action && <div className="flex-shrink-0">{action}</div>}
        </div>
      )}
      <div className="relative p-5">{children}</div>
    </div>
  );
};
