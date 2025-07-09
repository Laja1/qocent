/* eslint-disable @typescript-eslint/no-explicit-any */
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import {
  CardContent,
} from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import type { level1CostTableType } from "./type";

export const description = "A line chart for cost analysis";

// Dynamic chart config based on data
const generateChartConfig = (data: level1CostTableType[]) => {
  const config: ChartConfig = {
    cost: {
      label: "Total Cost",
      color: "var(--chart-1)",
    },
  };

  data.forEach((item, index) => {
    config[item.type] = {
      label: item.type,
      color: `var(--chart-${index + 2})`, // Use different colors for each type
    };
  });

  return config;
};

export function CostTabChart({ chartDataSource }: { chartDataSource: level1CostTableType[] }) {
  console.log(chartDataSource);
  
  const chartConfig = generateChartConfig(chartDataSource);

  const chartData = (() => {
    const monthsSet = new Set<string>();

    chartDataSource.forEach((item) => {
      Object.keys(item.costs).forEach((month) => monthsSet.add(month));
    });

    const monthOrder = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    
    // Map full month names to short names
    const monthMapping: Record<string, string> = {
      January: "Jan", February: "Feb", March: "Mar", April: "Apr",
      May: "May", June: "Jun", July: "Jul", August: "Aug",
      September: "Sep", October: "Oct", November: "Nov", December: "Dec"
    };
    
    const sortedMonths = Array.from(monthsSet).sort(
      (a, b) => monthOrder.indexOf(monthMapping[a] || a) - monthOrder.indexOf(monthMapping[b] || b)
    );

    return sortedMonths.map((month) => {
      const dataPoint: any = { 
        month: monthMapping[month] || month,
        fullMonth: month
      };
      
      // Add total cost
      const totalCost = chartDataSource.reduce((sum, item) => {
        return sum + (item.costs[month] || 0);
      }, 0);
      dataPoint.cost = totalCost;
      
      // Add individual costs for each type
      chartDataSource.forEach((item) => {
        dataPoint[item.type] = item.costs[month] || 0;
      });
      
      return dataPoint;
    });
  })();

  return (
    <div className="">

      <CardContent>
        <ChartContainer config={chartConfig}className="h-60 w-full">
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: -20,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => value}
                />
              }
            />
            
            {/* Render individual lines for each type */}
            {chartDataSource.map((item, index) => (
              <Line
                key={item.type}
                dataKey={item.type}
                type="monotone"
                stroke={`var(--chart-${index + 2})`}
                strokeWidth={2}
                dot={false}
                name={item.type}
              />
            ))}
            <YAxis />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </div>
  );
}