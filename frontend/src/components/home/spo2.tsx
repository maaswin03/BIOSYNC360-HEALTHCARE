"use client";

import { TrendingUp } from "lucide-react";
import * as React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface SensorData {
  [key: string]: any;
}

const chartConfig = {
  spo2: {
    label: "SpO2 (%)",
    color: "#3b82f6", // Keeping the blue color
  },
  label: {
    color: "hsl(var(--background))",
  },
} satisfies ChartConfig;

export default function SpO2() {
  const [data, setData] = React.useState<SensorData>({});
  const username = "maaswin";

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/api/get/spo2",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ username: username }),
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const result = await response.json();
        setData(result[0]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [username]);

  const chartData = [
    { hour: new Date(data.currTime).toLocaleString('en-US', { hour: 'numeric', hour12: true }), spo2: data.currSpO2 },
    { hour: new Date(data.prev1Time).toLocaleString('en-US', { hour: 'numeric', hour12: true }), spo2: data.prev1SpO2 },
    { hour: new Date(data.prev2Time).toLocaleString('en-US', { hour: 'numeric', hour12: true }), spo2: data.prev2SpO2 },
    { hour: new Date(data.prev3Time).toLocaleString('en-US', { hour: 'numeric', hour12: true }), spo2: data.prev3SpO2 },
    { hour: new Date(data.prev4Time).toLocaleString('en-US', { hour: 'numeric', hour12: true }), spo2: data.prev4SpO2 },
    { hour: new Date(data.prev5Time).toLocaleString('en-US', { hour: 'numeric', hour12: true }), spo2: data.prev5SpO2 },
    { hour: new Date(data.prev6Time).toLocaleString('en-US', { hour: 'numeric', hour12: true }), spo2: data.prev6SpO2 },
  ];
  
  const totalSpO2 = chartData.reduce(
    (sum, data) => sum + data.spo2,
    0
  );
  const averageSpO2 = (totalSpO2 / chartData.length).toFixed(1);

  return (
    <Card>
      <CardHeader>
        <CardTitle>SpO2 - Last 7 Hours</CardTitle>
        <CardDescription>
          Real-time blood oxygen saturation readings (%)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              right: 16,
            }}
          >
            <CartesianGrid horizontal={false} />
            <YAxis
              dataKey="hour"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <XAxis
              dataKey="spo2"
              type="number"
              domain={[85, 100]} // Adjusted range for SpO2
              tickCount={6}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Bar
              dataKey="spo2"
              layout="vertical"
              fill="#3b82f6"
              radius={4}
            >
              <LabelList
                dataKey="hour"
                position="insideLeft"
                offset={8}
                className="fill-[--color-label]"
                fontSize={12}
              />
              <LabelList
                dataKey="spo2"
                position="right"
                offset={8}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Average blood oxygen level : {averageSpO2}%{" "}
          <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing SpO2 variations over the last 7 hours
        </div>
      </CardFooter>
    </Card>
  );
}