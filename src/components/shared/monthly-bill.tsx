import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type {
  billProps,
  getQueryMonthlyBillResponse,
} from "@/models/response/costResponse";
import { DataTable } from "./datatable";
import { monthlyCostTableColumn } from "@/utilities/constants/colums";
import { useState } from "react";
import NiceModal from "@ebay/nice-modal-react";
import { Eye } from "lucide-react";
import { ModalConstant } from "./modal/register";
import DailyBillingView from "./daily-bills";

interface MonthlyBillProps {
  data: getQueryMonthlyBillResponse;
}

export default function MonthlyBill({ data }: MonthlyBillProps) {
  const summary = data?.data;
  const [selectedRowId, setSelectedRowId] = useState("");
  const [serviceName, setServiceName] = useState("");

  const handleRowClick = async (row: billProps) => {
    setSelectedRowId(row.service_type_name.toString());
    setServiceName(row?.service_type_name);
  };

  const actions = [
    {
      label: "View",
      icon: Eye,
      onClick: (row: billProps) =>
        NiceModal.show(ModalConstant.DrawerModal, row),
    },
  ];
  return (
    <div className="space-y-6">
      {/* Summary Card */}
      <div className="mt-5 border p-2">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            Billing Summary — {summary?.bill_cycle}
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm px-5">
          <div>
            <p className="text-muted-foreground">Currency</p>
            <p className="font-medium">{summary?.currency}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Total Official Amount</p>
            <p className="font-medium">
              ${summary?.total_official_amount.toFixed(2)}
            </p>
          </div>
          <div>
            <p className="text-muted-foreground">Total Debt Amount</p>
            <p className="font-medium">
              ${summary?.total_debt_amount.toFixed(2)}
            </p>
          </div>
          <div>
            <p className="text-muted-foreground">Bills Returned</p>
            <Badge variant="outline">{summary?.bills_returned}</Badge>
          </div>
        </CardContent>
      </div>

      <Card className="p-3 rounded-xs">
        <DataTable
          data={data?.data?.bills || []}
          columns={monthlyCostTableColumn}
          title={"Service Breakdown"}
          // description="Server Site"
          // filterableColumns={["siteStatus"]}
          searchPlaceholder="Search..."
          pageSize={5}
          // isLoading={isSiteLoading}
          exportOptions={{
            filename: "server_sites_export",
            includeHeaders: true,
          }}
          actions={actions}
          skeletonRows={5}
          onRowClick={handleRowClick}
          getRowId={(row) => row.service_type_name.toString()}
          highlightedRowId={selectedRowId}
          initialSorting={{ id: "service_type_name", desc: false }}
        />
      </Card>
      {serviceName && <DailyBillingView service_type_code={serviceName} />}
    </div>
  );
}
