import {  Header, type ColumnDef } from "@/components/shared";
import { DataTable } from "@/components/shared/datatable";
import {
  FileSpreadsheet,
  Download,
  FileText,
  Printer,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";
import { useMemo, useState } from "react";
import { BillingsChart } from "./billings-chart";
import type { billingTableProps } from "./type";
import { billingsData } from "./config";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { MdPending } from "react-icons/md";

export const Billings = () => {
  const [rowId, setRowId] = useState("january");
  const handleExport = (format: "csv" | "pdf" | "excel") => {
    // Mock export functionality
    console.log(`Exporting billing data as ${format}`);

    if (format === "csv") {
      const csvContent = [
        "Month,Amount,Discount,Amount Due,Payment Status,Due Date,Payment Date,Outstanding Amount,Payment Method",
        ...billingsData.map(
          (row) =>
            `${row.month},${row.amount},${row.discount},${row.amountDue},${row.paymentStatus},${row.dueDate},${row.paymentDate},${row.outstandingAmount},${row.paymentMethod}`
        ),
      ].join("\n");

      const blob = new Blob([csvContent], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "billing-data.csv";
      a.click();
      window.URL.revokeObjectURL(url);
    }
  };
  const billingsColumns: ColumnDef<billingTableProps>[] = useMemo(
    () => [
      {
        id: "month",
        header: "Month",
        accessorKey: "month",
        cell: (row) => <span className="">{row.month}</span>,
        sortable: true,
      },
      {
        id: "amount",
        header: "Amount",
        accessorKey: "amount",
        headerClassName: "text-right",
        cell: (row) => (
          <span className="text-right block justify-center text-green-700 line-clamp-1">
            {row.amount}
          </span>
        ),
        sortable: true,
      },
      {
        id: "discount",
        header: "Discount",
        accessorKey: "discount",
        headerClassName: "text-right",
        cell: (row) => (
          <span className="text-right block justify-center text-green-700 line-clamp-1">
            {row.discount}
          </span>
        ),
        sortable: true,
      },
      {
        id: "amountDue",
        header: "Amount Due",
        headerClassName: "text-right",
        accessorKey: "amountDue",
        sortable: true,
        cell: (row) => (
          <span className="text-right block justify-center ny-1 text-green-700 line-clamp-1">
            ${row.amountDue.toLocaleString()}
          </span>
        ),
      },
      {
        id: "paymentStatus",
        header: "Status",
        accessorKey: "paymentStatus",
        cell: (row) => (
          <Badge
            variant="outline"
            className={`text-xs my-1 ${
              row.paymentStatus === "Paid"
                ? "bg-green-50 text-green-700 border-green-500"
                : row.paymentStatus === "Pending"
                ? "bg-yellow-50 text-yellow-700 border-yellow-500"
                : "bg-red-50 text-red-700 border-red-500"
            } `}
          >
            {row.paymentStatus === "Paid" && (
              <CheckCircle className="h-3 w-3 mr-1" />
            )}
            {row.paymentStatus === "Overdue" && (
              <AlertTriangle className="h-3 w-3 mr-1" />
            )}
            {row.paymentStatus === "Pending" && (
              <MdPending className="h-3 w-3 mr-1" />
            )}

            <p className="text-xs">{row.paymentStatus}</p>
          </Badge>
        ),
        sortable: true,
        filterType: "select",
        filterOptions: [
          { label: "Paid", value: "Paid" },
          { label: "Pending", value: "Pending" },
          { label: "Overdue", value: "Overdue" },
        ],
      },
      {
        id: "dueDate",
        header: "Due Date",
        headerClassName: "",
        accessorKey: "dueDate",
        sortable: true,
        cell: (row) => <span className=" block">{row.dueDate}</span>,
      },
      {
        id: "outstandingAmount",
        header: "OUSTANING BILL (USD)",
        accessorKey: "outstandingAmount",
        headerClassName: "text-right",
        cell: (row) => (
          <span className="text-green-700 text-right block ">
            {row.outstandingAmount.toLocaleString("en-US", {
              minimumFractionDigits: 2,
            })}
          </span>
        ),
        sortable: true,
      },
      {
        id: "paymentMethod",
        header: "Payment Method",
        accessorKey: "paymentMethod",
        cell: (row) => (
          <span className="block  ">
            {row.paymentMethod}
           </span>
        ),
        sortable: true,
      },
    ],
    []
  );

  return (
    <div>
      <Header title="Billings" description="Manage your server billings">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="w-full text-xs items-center  flex sm:w-auto bg-white text-black p-2 rounded-xs">
              <Download className="h-4 w-4 mr-1" />
              Export Bill
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="rounded-xs">
            <DropdownMenuItem
              onClick={() => handleExport("csv")}
              className="text-xs"
            >
              <FileSpreadsheet className="h-4 w-4 mr-1 " />
              Export as CSV
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleExport("excel")}
              className="text-xs"
            >
              <FileText className="h-4 w-4 mr-1" />
              Export as Excel
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleExport("pdf")}
              className="text-xs"
            >
              <Printer className="h-4 w-4 mr-1" />
              Export as PDF
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </Header>

      <div className="px-5">
        
        <DataTable
          data={billingsData}
          columns={billingsColumns}
          pageSize={5}
          onRowClick={(row) => setRowId(row.month.toLowerCase())}
          showDownload={false}
          showSearch={false}
          getRowId={(row) => row.month}
          highlightedRowId={rowId}
          initialSorting={{ id: "month", desc: false }}
        />
      </div>
      <BillingsChart rowId={rowId}/>
    </div>
  );
};
