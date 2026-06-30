import { useMemo } from "react";
import { DataTable, type ColumnDef } from "@/components/shared/datatable";
import { StatusBadge } from "@/components/shared/status-badge";
import { formatDate, formatMoney } from "../utils/format";
import type { Bill, MyBillsResponse } from "@/models/response/walletBillingResponse";

type BillsListProps = {
  isLoading: boolean;
  data?: MyBillsResponse;
};

export const BillsList = ({ isLoading, data }: BillsListProps) => {
  const bills: Bill[] = data?.bills ?? [];

  const columns = useMemo<ColumnDef<Bill>[]>(
    () => [
      {
        id: "description",
        header: "Description",
        accessorKey: (row) =>
          row.description ?? row.bill_id ?? "—",
        sortable: true,
      },
      {
        id: "status",
        header: "Status",
        accessorKey: (row) => row.status ?? "",
        sortable: true,
        cell: (row) =>
          row.status ? <StatusBadge status={row.status} /> : "—",
      },
      {
        id: "due_date",
        header: "Due date",
        accessorKey: (row) => row.due_date ?? row.created_at ?? "",
        sortable: true,
        cell: (row) => {
          const date = row.due_date ?? row.created_at;
          return date ? formatDate(date) : "—";
        },
      },
      {
        id: "amount",
        header: "Amount",
        accessorKey: (row) => row.amount ?? "",
        sortable: true,
        headerClassName: "text-right",
        cell: (row) =>
          row.amount !== undefined ? (
            <span className="font-medium">
              {formatMoney(row.amount, row.currency ?? "USD")}
            </span>
          ) : (
            "—"
          ),
      },
    ],
    []
  );

  return (
    <DataTable
      data={bills}
      columns={columns}
      title="My Bills"
      description="Outstanding and recent invoices"
      searchPlaceholder="Search bills..."
      isLoading={isLoading}
      getRowId={(row, index) => row.bill_id ?? String(index)}
      showDownload
      exportOptions={{ filename: "my-bills" }}
      emptyComponent={
        <tr>
          <td colSpan={columns.length} className="h-24 text-center text-xs text-muted-foreground">
            You don&apos;t have any bills yet
          </td>
        </tr>
      }
    />
  );
};
