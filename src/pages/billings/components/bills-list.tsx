import { useMemo } from "react";
import { DataTable, type ColumnDef } from "@/components/shared/datatable";
import { StatusBadge } from "@/components/shared/status-badge";
import { formatDate, formatMoney } from "../utils/format";
import type {
  BillResponse,
  MyBillsResponse,
} from "@/models/response/walletBillingResponse";

type BillsListProps = {
  isLoading: boolean;
  data?: MyBillsResponse;
};

export const BillsList = ({ isLoading, data }: BillsListProps) => {
  const bills: BillResponse[] = Array.isArray(data) ? data : [];

  const columns = useMemo<ColumnDef<BillResponse>[]>(
    () => [
      {
        id: "hyperscaler",
        header: "Provider",
        accessorKey: (row) => row.hyperscaler,
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
        accessorKey: (row) => row.total_amount ?? "",
        sortable: true,
        headerClassName: "text-right",
        cell: (row) =>
          row.total_amount !== undefined ? (
            <span className="font-medium">
              {formatMoney(row.total_amount, row.currency ?? "USD")}
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
