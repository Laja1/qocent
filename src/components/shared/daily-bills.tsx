"use client";
import { CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { useGetQueryDailyBillQuery } from "@/service/python/costApi";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar, DollarSign, Package } from "lucide-react";

type DailyBillingProps = {
  service_type_code: string;
  bill_cycle?: string;
};

export default function DailyBillingView({
  bill_cycle = "2025-08",
}: DailyBillingProps) {
  // const normalizedServiceType = service_type_code
  //   ?.trim()
  //   .toLowerCase()
  //   .replace(/\s+/g, "_");
  const fullServiceCode = `hws.service.type.obs`;

  const { data, isLoading, isError } = useGetQueryDailyBillQuery({
    bill_cycle,
    service_type_code: fullServiceCode,
  });

  const aggregated = data?.data?.aggregated_data ?? [];

  // 🌀 Loading state
  if (isLoading) {
    return (
      <div className="space-y-6 p-6">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <DollarSign className="h-5 w-5 text-primary" />
          </div>
          <h2 className="text-2xl font-bold">Daily Billing Overview</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-64 w-full rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  // ⚠️ Error or Empty state
  if (isError || aggregated.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-6">
        <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-4">
          <DollarSign className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold mb-2">
          No billing data available
        </h3>
        <p className="text-sm text-muted-foreground text-center max-w-md">
          There's no billing information for this period. Please check back
          later or select a different billing cycle.
        </p>
      </div>
    );
  }

  // Calculate total for the period
  const periodTotal = aggregated.reduce(
    (sum, day) => sum + (day.total_amount ?? 0),
    0
  );

  return (
    <div className="space-y-6 p-6">
      {/* Header with summary */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <DollarSign className="h-4 w-4 text-primary" />
          </div>
          <div>
            <h2 className="text-sm font-bold">Daily Billing Overview</h2>
            <p className="text-xs text-muted-foreground">
              Billing cycle: {bill_cycle}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-primary/5 rounded-xs border border-primary/20">
          <span className="text-xs font-medium text-muted-foreground">
            Period Total:
          </span>
          <span className="text-xs font-bold text-primary">
            ${periodTotal.toFixed(2)}
          </span>
        </div>
      </div>

      {/* Daily cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {aggregated.map((day, index) => (
          <div
            key={index}
            className="border py-5  hover:shadow-md transition-shadow duration-200"
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <CardTitle className="text-base font-semibold">
                    {new Date(day.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </CardTitle>
                </div>
              </div>
            </CardHeader>

            <CardContent className="pt-0 px-4">
              <Accordion type="single" collapsible className="w-full">
                {day.services?.map((service, i) => (
                  <AccordionItem
                    key={i}
                    value={`item-${index}-${i}`}
                    className="border-b-0"
                  >
                    <AccordionTrigger className="py-3 hover:no-underline  px-3 -mx-3 rounded-md">
                      <div className="flex items-center gap-2 text-left">
                        <Package className="h-3.5 w-3.5 text-muted-foreground flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">
                            {service.service_name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {service.resource_count ?? 0} resource
                            {(service.resource_count ?? 0) !== 1 ? "s" : ""}
                          </p>
                        </div>
                      </div>
                    </AccordionTrigger>

                    <AccordionContent className="pb-0">
                      <div className="mt-2 rounded-md border overflow-hidden">
                        <Table>
                          <TableHeader>
                            <TableRow className="bg-muted/50">
                              <TableHead className="text-xs font-semibold">
                                Resource ID
                              </TableHead>
                              <TableHead className="text-xs font-semibold">
                                Type
                              </TableHead>
                              <TableHead className="text-xs font-semibold text-right">
                                Amount
                              </TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {service.resources?.map((res, j) => (
                              <TableRow
                                key={j}
                                className="text-xs hover:bg-muted/30"
                              >
                                <TableCell className="font-mono text-xs">
                                  {res.resource_id}
                                </TableCell>
                                <TableCell className="text-muted-foreground">
                                  {res.resource_type}
                                </TableCell>
                                <TableCell className="text-right font-semibold">
                                  ${res.amount?.toFixed(4) ?? "0.0000"}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </div>
        ))}
      </div>
    </div>
  );
}
