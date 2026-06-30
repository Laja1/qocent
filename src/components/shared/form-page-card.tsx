import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type FormPageCardProps = {
  title: string;
  subtitle?: string;
  icon?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
  className?: string;
};

export function FormPageCard({
  title,
  subtitle,
  icon,
  children,
  footer,
  className,
}: FormPageCardProps) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-lg border border-border bg-card shadow-sm",
        className
      )}
    >
      <div className="flex items-start justify-between gap-4 border-b border-border px-5 py-4">
        <div className="min-w-0">
          <h2 className="text-sm font-semibold text-foreground">{title}</h2>
          {subtitle && (
            <p className="mt-0.5 text-xs text-muted-foreground">{subtitle}</p>
          )}
        </div>
        {icon && (
          <div className="shrink-0 text-muted-foreground">{icon}</div>
        )}
      </div>

      <div className="p-5">{children}</div>

      {footer && (
        <div className="flex justify-end border-t border-border px-5 py-4">
          {footer}
        </div>
      )}
    </div>
  );
}
