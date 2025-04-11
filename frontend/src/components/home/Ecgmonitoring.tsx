"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
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

interface SensorData {
  [key: string]: any;
}

const chartConfig = {
  ecg: {
    label: "ECG",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function Ecgmonitoring() {
  const [timeRange, setTimeRange] = React.useState("24");
  const [Data, setData] = React.useState<SensorData>({});
  const username = "maaswin";

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/api/get/ecgvalue",
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

        const data = await response.json();

        setData(data[0]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [username]);

  const chartData = [
    { time: Data.prev23Time || "No data", ecg: Data.prev23ECG || 0 },
    { time: Data.prev22Time || "No data", ecg: Data.prev22ECG || 0 },
    { time: Data.prev21Time || "No data", ecg: Data.prev21ECG || 0 },
    { time: Data.prev20Time || "No data", ecg: Data.prev20ECG || 0 },
    { time: Data.prev19Time || "No data", ecg: Data.prev19ECG || 0 },
    { time: Data.prev18Time || "No data", ecg: Data.prev18ECG || 0 },
    { time: Data.prev17Time || "No data", ecg: Data.prev17ECG || 0 },
    { time: Data.prev16Time || "No data", ecg: Data.prev16ECG || 0 },
    { time: Data.prev15Time || "No data", ecg: Data.prev15ECG || 0 },
    { time: Data.prev14Time || "No data", ecg: Data.prev14ECG || 0 },
    { time: Data.prev13Time || "No data", ecg: Data.prev13ECG || 0 },
    { time: Data.prev12Time || "No data", ecg: Data.prev12ECG || 0 },
    { time: Data.prev11Time || "No data", ecg: Data.prev11ECG || 0 },
    { time: Data.prev10Time || "No data", ecg: Data.prev10ECG || 0 },
    { time: Data.prev9Time || "No data", ecg: Data.prev9ECG || 0 },
    { time: Data.prev8Time || "No data", ecg: Data.prev8ECG || 0 },
    { time: Data.prev7Time || "No data", ecg: Data.prev7ECG || 0 },
    { time: Data.prev6Time || "No data", ecg: Data.prev6ECG || 0 },
    { time: Data.prev5Time || "No data", ecg: Data.prev5ECG || 0 },
    { time: Data.prev4Time || "No data", ecg: Data.prev4ECG || 0 },
    { time: Data.prev3Time || "No data", ecg: Data.prev3ECG || 0 },
    { time: Data.prev2Time || "No data", ecg: Data.prev2ECG| 0 },
    { time: Data.prev1Time || "No data", ecg: Data.prev1ECG || 0 },
    { time: Data.currTime || "No data", ecg: Data.currentecg || 0 },
  ];

  const filteredData = chartData.filter((item) => {
    const time = new Date(item.time);
    const referenceTime = new Date("2025-04-11T17:00:00");
    let hoursToSubtract = 24;
    if (timeRange === "1") {
      hoursToSubtract = 1;
    } else if (timeRange === "7") {
      hoursToSubtract = 7;
    }
    const startTime = new Date(referenceTime);
    startTime.setHours(startTime.getHours() - hoursToSubtract);
    return time >= startTime;
  });

  return (
    <Card>
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>
            ECG Monitor - <span>Last {timeRange} hours</span>
          </CardTitle>
          <CardDescription>
            Showing ECG data for the selected time range
          </CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="w-[160px] rounded-lg sm:ml-auto"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Last 24 hours" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="24" className="rounded-lg">
              Last 24 hours
            </SelectItem>
            <SelectItem value="7" className="rounded-lg">
              Last 7 hours
            </SelectItem>
            <SelectItem value="1" className="rounded-lg">
              Last 1 hour
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillECG" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-ecg)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-ecg)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="time"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                });
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    });
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="ecg"
              type="natural"
              fill="url(#fillECG)"
              stroke="var(--color-ecg)"
              stackId="a"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
