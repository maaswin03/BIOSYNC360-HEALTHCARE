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
  temperature: {
    label: "Temperature (°F)",
    color: "#3b82f6",
  },
  label: {
    color: "hsl(var(--background))",
  },
} satisfies ChartConfig;

export function Temperature() {
  const [temperatureData, setTemperatureData] = React.useState<SensorData>({});
  const username = "maaswin";

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/api/get/temperature",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ username }),
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const result = await response.json();
        setTemperatureData(result[0]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [username]);

  const chartData = React.useMemo(() => {
    if (!temperatureData.currTime) return [];

    return [0, 1, 2, 3, 4, 5, 6].map((i) => {
      const prefix = i === 0 ? "curr" : `prev${i}`;
      return {
        hour: new Date(temperatureData[`${prefix}Time`]).toLocaleString('en-US', { 
          hour: 'numeric', 
          hour12: true 
        }),
        temperature: temperatureData[`${prefix}Temperature`],
      };
    });
  }, [temperatureData]);

  const averageTemperature = React.useMemo(() => {
    if (chartData.length === 0) return "0.0";
    const total = chartData.reduce((sum, data) => sum + (data.temperature || 0), 0);
    return (total / chartData.length).toFixed(1);
  }, [chartData]);

  if (chartData.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Temperature</CardTitle>
          <CardDescription>Loading data...</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Temperature - Last 7 Hours</CardTitle>
        <CardDescription>
          Real-time human body temperature readings (°F)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{ right: 16 }}
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
              dataKey="temperature"
              type="number"
              domain={[90, 105]}
              tickCount={6}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Bar
              dataKey="temperature"
              layout="vertical"
              fill="hsl(340, 70%, 50%)"
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
                dataKey="temperature"
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
          Average body temperature : {averageTemperature}°F{" "}
          <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing body temperature variations over the last 7 hours
        </div>
      </CardFooter>
    </Card>
  );
}