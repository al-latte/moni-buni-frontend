"use client"
 
import { Line, LineChart } from "recharts"
 
import { ChartConfig, ChartContainer } from "@/components/ui/chart"
 
const chartData = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73},
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
]
 
const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#2563eb",
  },
} satisfies ChartConfig

export const Chart = () => {
  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full bg-black rounded-3xl p-4 my-4">
      <LineChart accessibilityLayer data={chartData}>
        <Line type="monotone" dataKey="desktop" stroke="#fff" dot={false} strokeWidth={2}/>
      </LineChart>
    </ChartContainer>
  )
}