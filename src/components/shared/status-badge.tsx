import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const statusBadgeVariants = cva(
  "inline-flex items-center rounded-sm px-2.5 py-0.5 text-xs font-medium",
  {
    variants: {
      variant: {
        active: "bg-[#CAF8D2] text-[#1A6B47]",
        success: "bg-[#CAF8D2] text-[#1A6B47]",
        closed: "bg-muted text-muted-foreground",
        paid: "bg-[#CAF8D2] text-[#1A6B47]",
        partial: "bg-[#FFF3CD] text-[#856404]",
        pending: "bg-[#FFF3CD] text-[#856404]",
        unpaid: "bg-[#FDECEA] text-[#9B1C1C]",
        failed: "bg-[#FDECEA] text-[#9B1C1C]",
        overdue: "bg-[#FDECEA] text-[#9B1C1C]",
      },
    },
    defaultVariants: {
      variant: "active",
    },
  }
);

type StatusBadgeProps = {
  status: string;
  className?: string;
} & VariantProps<typeof statusBadgeVariants>;

function mapStatusToVariant(
  status: string
): VariantProps<typeof statusBadgeVariants>["variant"] {
  switch (status.toUpperCase()) {
    case "ACTIVE":
      return "active";
    case "SUCCESS":
    case "COMPLETED":
      return "success";
    case "CLOSED":
      return "closed";
    case "PAID":
      return "paid";
    case "PARTIAL":
      return "partial";
    case "PENDING":
      return "pending";
    case "UNPAID":
      return "unpaid";
    case "FAILED":
      return "failed";
    case "OVERDUE":
      return "overdue";
    default:
      return "closed";
  }
}

function formatStatusLabel(status: string): string {
  return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        statusBadgeVariants({ variant: mapStatusToVariant(status) }),
        className
      )}
    >
      {formatStatusLabel(status)}
    </span>
  );
}
