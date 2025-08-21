"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const description = "An interactive area chart";

const chartData = [
  { date: "2024-04-01", bill: 222 },
  { date: "2024-04-02", bill: 97 },
  { date: "2024-04-03", bill: 167 },
  { date: "2024-04-04", bill: 242 },
  { date: "2024-04-05", bill: 373 },
  { date: "2024-04-06", bill: 301 },
  { date: "2024-04-07", bill: 245 },
  { date: "2024-04-08", bill: 409 },
  { date: "2024-04-09", bill: 59 },
  { date: "2024-04-10", bill: 261 },
  { date: "2024-04-11", bill: 327 },
  { date: "2024-04-12", bill: 292 },
  { date: "2024-04-13", bill: 342 },
  { date: "2024-04-14", bill: 137 },
  { date: "2024-04-15", bill: 120 },
  { date: "2024-04-16", bill: 138 },
  { date: "2024-04-17", bill: 446 },
  { date: "2024-04-18", bill: 364 },
  { date: "2024-04-19", bill: 243 },
  { date: "2024-04-20", bill: 89 },
  { date: "2024-04-21", bill: 137 },
  { date: "2024-04-22", bill: 224 },
  { date: "2024-04-23", bill: 138 },
  { date: "2024-04-24", bill: 387 },
  { date: "2024-04-25", bill: 215 },
  { date: "2024-04-26", bill: 75 },
  { date: "2024-04-27", bill: 383 },
  { date: "2024-04-28", bill: 122 },
  { date: "2024-04-29", bill: 315 },
  { date: "2024-04-30", bill: 454 },
  { date: "2024-05-01", bill: 165 },
  { date: "2024-05-02", bill: 293 },
  { date: "2024-05-03", bill: 247 },
  { date: "2024-05-04", bill: 385 },
  { date: "2024-05-05", bill: 481 },
  { date: "2024-05-06", bill: 498 },
  { date: "2024-05-07", bill: 388 },
  { date: "2024-05-08", bill: 149 },
  { date: "2024-05-09", bill: 227 },
  { date: "2024-05-10", bill: 293 },
  { date: "2024-05-11", bill: 335 },
  { date: "2024-05-12", bill: 197 },
  { date: "2024-05-13", bill: 197 },
  { date: "2024-05-14", bill: 448 },
  { date: "2024-05-15", bill: 473 },
  { date: "2024-05-16", bill: 338 },
  { date: "2024-05-17", bill: 499 },
  { date: "2024-05-18", bill: 315 },
  { date: "2024-05-19", bill: 235 },
  { date: "2024-05-20", bill: 177 },
  { date: "2024-05-21", bill: 82 },
  { date: "2024-05-22", bill: 81 },
  { date: "2024-05-23", bill: 252 },
  { date: "2024-05-24", bill: 294 },
  { date: "2024-05-25", bill: 201 },
  { date: "2024-05-26", bill: 213 },
  { date: "2024-05-27", bill: 420 },
  { date: "2024-05-28", bill: 233 },
  { date: "2024-05-29", bill: 78 },
  { date: "2024-05-30", bill: 340 },
  { date: "2024-05-31", bill: 178 },
  { date: "2024-06-01", bill: 178 },
  { date: "2024-06-02", bill: 470 },
  { date: "2024-06-03", bill: 103 },
  { date: "2024-06-04", bill: 439 },
  { date: "2024-06-05", bill: 88 },
  { date: "2024-06-06", bill: 294 },
  { date: "2024-06-07", bill: 323 },
  { date: "2024-06-08", bill: 385 },
  { date: "2024-06-09", bill: 438 },
  { date: "2024-06-10", bill: 155 },
  { date: "2024-06-11", bill: 92 },
  { date: "2024-06-12", bill: 492 },
  { date: "2024-06-13", bill: 81 },
  { date: "2024-06-14", bill: 426 },
  { date: "2024-06-15", bill: 307 },
  { date: "2024-06-16", bill: 371 },
  { date: "2024-06-17", bill: 475 },
  { date: "2024-06-18", bill: 107 },
  { date: "2024-06-19", bill: 341 },
  { date: "2024-06-20", bill: 408 },
  { date: "2024-06-21", bill: 169 },
  { date: "2024-06-22", bill: 317 },
  { date: "2024-06-23", bill: 480 },
  { date: "2024-06-24", bill: 132 },
  { date: "2024-06-25", bill: 141 },
  { date: "2024-06-26", bill: 434 },
  { date: "2024-06-27", bill: 448 },
  { date: "2024-06-28", bill: 149 },
  { date: "2024-06-29", bill: 103 },
  { date: "2024-06-30", bill: 446 },
];

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  bill: {
    label: "Cost",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export function ConsoleChart() {
  const [timeRange, setTimeRange] = React.useState("90d");

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date);
    const referenceDate = new Date("2024-06-30");
    let daysToSubtract = 90;
    if (timeRange === "30d") {
      daysToSubtract = 30;
    } else if (timeRange === "7d") {
      daysToSubtract = 7;
    }
    const startDate = new Date(referenceDate);
    startDate.setDate(startDate.getDate() - daysToSubtract);
    return date >= startDate;
  });

  return (
    <div className="pt-0 border">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-2 sm:flex-row">
        <div className="grid flex-1 gap-1">
          <CardTitle className="text-sm">Resource Cost Overview</CardTitle>
          <CardDescription className="text-xs">
            Visualizing total resource costs over the past 3 months
          </CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="hidden w-[160px] text-xs rounded-xs sm:ml-auto sm:flex"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Last 3 months" />
          </SelectTrigger>
          <SelectContent className="rounded-xs text-xs">
            <SelectItem value="90d" className="rounded-sm text-xs">
              Last 3 months
            </SelectItem>
            <SelectItem value="30d" className="rounded-sm text-xs">
              Last 30 days
            </SelectItem>
            <SelectItem value="7d" className="rounded-sm text-xs">
              Last 7 days
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2  sm:px-6 sm:pt-2">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillBill" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="#fa2c37"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="#fa2c37"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    });
                  }}
                  indicator="dot"
                />
              }
            />

            <Area
              dataKey="bill"
              type="natural"
              fill="#fd8688"
              stroke="#fa2c37"
              stackId="a"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </div>
  );
}
