"use client";

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import * as React from "react";

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
  heartRate: {
    label: "Heart Rate (bpm)",
    color: "hsl(340, 70%, 50%)",
  },
  pulseRate: {
    label: "Pulse Rate (bpm)",
    color: "hsl(200, 70%, 50%)",
  },
} satisfies ChartConfig;

export function HeartRate() {
  const [heartRateData, setHeartRateData] = React.useState<SensorData>({});
  const [pulseRateData, setPulseRateData] = React.useState<SensorData>({});
  const username = "maaswin";

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch both datasets in parallel
        const [hrResponse, prResponse] = await Promise.all([
          fetch("http://localhost:8000/api/get/heartrate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username }),
          }),
          fetch("http://localhost:8000/api/get/pulserate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username }),
          }),
        ]);

        if (!hrResponse.ok || !prResponse.ok) {
          throw new Error("Network response was not ok");
        }

        const [hrData, prData] = await Promise.all([
          hrResponse.json(),
          prResponse.json(),
        ]);

        setHeartRateData(hrData[0]);
        setPulseRateData(prData[0]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [username]);

  const chartData = React.useMemo(() => {
    if (!heartRateData.currTime || !pulseRateData.currTime) return [];

    return [0, 1, 2, 3, 4, 5, 6].map((i) => {
      const prefix = i === 0 ? "curr" : `prev${i}`;
      return {
        hour: new Date(heartRateData[`${prefix}Time`] || pulseRateData[`${prefix}Time`]).toLocaleString('en-US', { 
          hour: 'numeric', 
          hour12: true 
        }),
        heartRate: heartRateData[`${prefix}HeartRate`],
        pulseRate: pulseRateData[`${prefix}PulseRate`],
      };
    });
  }, [heartRateData, pulseRateData]);

  const averageHeartRate = React.useMemo(() => {
    if (chartData.length === 0) return "0.0";
    const total = chartData.reduce((sum, data) => sum + (data.heartRate || 0), 0);
    return (total / chartData.length).toFixed(1);
  }, [chartData]);

  const averagePulseRate = React.useMemo(() => {
    if (chartData.length === 0) return "0.0";
    const total = chartData.reduce((sum, data) => sum + (data.pulseRate || 0), 0);
    return (total / chartData.length).toFixed(1);
  }, [chartData]);

  if (chartData.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Heart Rate and Pulse Rate</CardTitle>
          <CardDescription>Loading data...</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Heart Rate and Pulse Rate - Last 7 hours</CardTitle>
        <CardDescription>
          Real-time Heart Rate and Pulse Rate readings (BPM)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            data={chartData}
            margin={{ top: 20, left: -20, right: 12 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="hour"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis domain={[60, 100]} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Line
              dataKey="heartRate"
              type="monotone"
              stroke="var(--color-heartRate)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="pulseRate"
              type="monotone"
              stroke="var(--color-pulseRate)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Average Heart Rate :  {averageHeartRate} bpm and  Pulse Rate : {averagePulseRate} bpm
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              Showing trends for heart rate and pulse rate over the past 7 hours
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}