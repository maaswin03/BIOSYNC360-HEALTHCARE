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
  systolic: {
    label: "Systolic (mmHg)",
    color: "hsl(340, 70%, 50%)",
  },
  diastolic: {
    label: "Diastolic (mmHg)",
    color: "hsl(200, 70%, 50%)",
  },
} satisfies ChartConfig;

export default function BloodPressure() {
  const [data, setData] = React.useState<SensorData>({});
  const username = "maaswin";

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/api/get/bloodpressure",
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
    { 
      hour: new Date(data.currTime).toLocaleString('en-US', { hour: 'numeric', hour12: true }), 
      systolic: data.currSystolic, 
      diastolic: data.currDiastolic 
    },
    { 
      hour: new Date(data.prev1Time).toLocaleString('en-US', { hour: 'numeric', hour12: true }), 
      systolic: data.prev1Systolic, 
      diastolic: data.prev1Diastolic  
    },
    { 
      hour: new Date(data.prev2Time).toLocaleString('en-US', { hour: 'numeric', hour12: true }), 
      systolic: data.prev2Systolic, 
      diastolic: data.prev2Diastolic  
    },
    { 
      hour: new Date(data.prev3Time).toLocaleString('en-US', { hour: 'numeric', hour12: true }), 
      systolic: data.prev3Systolic, 
      diastolic: data.prev3Diastolic  
    },
    { 
      hour: new Date(data.prev4Time).toLocaleString('en-US', { hour: 'numeric', hour12: true }), 
      systolic: data.prev4Systolic, 
      diastolic: data.prev4Diastolic  
    },
    { 
      hour: new Date(data.prev5Time).toLocaleString('en-US', { hour: 'numeric', hour12: true }), 
      systolic: data.prev5Systolic, 
      diastolic: data.prev5Diastolic 
    },
    { 
      hour: new Date(data.prev6Time).toLocaleString('en-US', { hour: 'numeric', hour12: true }), 
      systolic: data.prev6Systolic, 
      diastolic: data.prev6Diastolic 
    }
  ];

  const totalSystolic = chartData.reduce((sum, data) => sum + data.systolic, 0);
  const averageSystolic = (totalSystolic / chartData.length).toFixed(1);
  const totalDiastolic = chartData.reduce((sum, data) => sum + data.diastolic, 0);
  const averageDiastolic = (totalDiastolic / chartData.length).toFixed(1);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Blood Pressure - Last 7 hours</CardTitle>
        <CardDescription>
          Real-time Systolic and Diastolic readings (mmHg)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            data={chartData}
            margin={{
              top: 20,
              left: -20,
              right: 12,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="hour"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value}
            />
            <YAxis domain={[60, 180]} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Line
              dataKey="systolic"
              type="monotone"
              stroke="var(--color-systolic)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="diastolic"
              type="monotone"
              stroke="var(--color-diastolic)"
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
              Average blood pressure : {averageSystolic}/{averageDiastolic} mmHg
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              Showing trends for systolic and diastolic pressure over the past 7 hours
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}