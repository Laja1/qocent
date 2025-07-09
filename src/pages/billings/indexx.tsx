
import { TrendingUp } from "lucide-react"
import { CartesianGrid, Line, LineChart, XAxis } from "recharts"

import {
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "A multiple line chart"

const chartData = [
  { date: "2024-06-30", desktop: 448, mobile: 490 },
  { date: "2024-07-30", desktop: 149, mobile: 200 },
  { date: "2024-08-30", desktop: 103, mobile: 160 },
  { date: "2024-09-30", desktop: 446, mobile: 400 },
  { date: "2024-10-30", desktop: 314, mobile: 210 },
  { date: "2024-11-30", desktop: 230, mobile: 150 },
]

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
  mobile: {
    label: "Mobile",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig

export function ChartLineMultiple() {
  return (
    <div>
      <CardHeader>
        <CardTitle>Line Chart - Multiple</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) =>
                new Intl.DateTimeFormat("en-US", {
                  month: "short",
                  day: "numeric",
                }).format(new Date(value))
              }
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Line
              dataKey="desktop"
              type="monotone"
              stroke="var(--color-desktop)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="mobile"
              type="monotone"
              stroke="var(--color-mobile)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 leading-none font-medium">
              Trending up by 5.2% this week <TrendingUp className="h-4 w-4" />
            </div>
            <div className="text-muted-foreground flex items-center gap-2 leading-none">
              Showing total visitors for the last 6 days
            </div>
          </div>
        </div>
      </CardFooter>
    </div>
  )
}
