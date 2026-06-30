import { useMemo } from "react";
import { DataTable, type ColumnDef } from "@/components/shared/datatable";
import { formatDate, formatMoney } from "../utils/format";
import type { WalletTransactionResponse } from "@/models/response/walletBillingResponse";

type TransactionsListProps = {
  isLoading: boolean;
  transactions: WalletTransactionResponse[];
};

const isCredit = (type: string) =>
  ["CREDIT", "FUNDING", "TOPUP", "REFUND"].some((kw) =>
    type.toUpperCase().includes(kw)
  );

export const TransactionsList = ({
  isLoading,
  transactions,
}: TransactionsListProps) => {
  const columns = useMemo<ColumnDef<WalletTransactionResponse>[]>(
    () => [
      {
        id: "transaction_type",
        header: "Type",
        accessorKey: (row) => row.transaction_type,
        sortable: true,
        cell: (row) => (
          <span className="capitalize">
            {row.transaction_type.toLowerCase().replace(/_/g, " ")}
          </span>
        ),
      },
      {
        id: "description",
        header: "Description",
        accessorKey: (row) => row.description ?? row.created_at,
        sortable: true,
        cell: (row) => row.description ?? formatDate(row.created_at),
      },
      {
        id: "direction",
        header: "Direction",
        accessorKey: (row) => row.transaction_type,
        cell: (row) => {
          const credit = isCredit(row.transaction_type);
          return (
            <span
              className={`inline-flex items-center rounded-sm px-2.5 py-0.5 text-xs font-medium ${
                credit
                  ? "bg-[#CAF8D2] text-[#1A6B47]"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {credit ? "Credit" : "Debit"}
            </span>
          );
        },
      },
      {
        id: "amount",
        header: "Amount",
        accessorKey: (row) => row.amount,
        sortable: true,
        headerClassName: "text-right",
        cell: (row) => {
          const credit = isCredit(row.transaction_type);
          return (
            <span
              className={`font-medium ${credit ? "text-[#1A6B47]" : "text-foreground"}`}
            >
              {credit ? "+" : "-"}
              {formatMoney(row.amount, row.currency ?? "NGN")}
            </span>
          );
        },
      },
      {
        id: "balance_after",
        header: "Balance after",
        accessorKey: (row) => row.balance_after,
        sortable: true,
        headerClassName: "text-right",
        cell: (row) =>
          formatMoney(row.balance_after, row.currency ?? "NGN"),
      },
      {
        id: "created_at",
        header: "Date",
        accessorKey: (row) => row.created_at,
        sortable: true,
        cell: (row) => formatDate(row.created_at),
      },
    ],
    []
  );

  return (
    <DataTable
      data={transactions}
      columns={columns}
      title="Latest Transactions"
      description="Recent wallet activity"
      searchPlaceholder="Search transactions..."
      isLoading={isLoading}
      getRowId={(row) => row.entry_id}
      showDownload
      exportOptions={{ filename: "wallet-transactions" }}
      emptyComponent={
        <tr>
          <td
            colSpan={columns.length}
            className="h-24 text-center text-xs text-muted-foreground"
          >
            No transactions yet
          </td>
        </tr>
      }
    />
  );
};
