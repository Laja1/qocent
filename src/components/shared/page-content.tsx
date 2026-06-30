import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type PageContentProps = {
  children: ReactNode;
  className?: string;
};

export function PageContent({ children, className }: PageContentProps) {
  return (
    <div className={cn("space-y-5 px-5 pt-5 pb-10", className)}>{children}</div>
  );
}
