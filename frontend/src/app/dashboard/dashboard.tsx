import { AppSidebar } from "@/components/Sidebar/app-sidebar";
import { Ecgmonitoring } from "@/components/home/Ecgmonitoring";
import * as React from "react";
import { HeartRate } from "@/components/home/HeartRate";
import { Temperature } from "@/components/home/Temperature";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import markerShadowPng from "leaflet/dist/images/marker-shadow.png";
import BloodPressure from "@/components/home/BloodPressure";
import SpO2 from "@/components/home/spo2";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface SensorData {
  [key: string]: any;
}

const markerIcon = new L.Icon({
  iconUrl: markerIconPng,
  shadowUrl: markerShadowPng,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

export default function Dashboard() {
  const [user, setUserData] = React.useState<SensorData>({});
  const [bloodPressureData, setBloodPressureData] = React.useState<SensorData>({});
  const [temperatureData, setTemperatureData] = React.useState<SensorData>({});
  const [hrData, setHrData] = React.useState<SensorData>({});
  const [prData, setPrData] = React.useState<SensorData>({});
  const [rpData, setRpData] = React.useState<SensorData>({});
  const [spo2Data, setSpo2Data] = React.useState<SensorData>({});
  
  // State for manual inputs
  const [manualInputs, setManualInputs] = React.useState({
    temperature: "",
    heartRate: "",
    pulseRate: "",
    systolic: "",
    diastolic: "",
    spo2: "",
    respiratoryRate: ""
  });
  const [isEditing, setIsEditing] = React.useState(false);

  const username = "maaswin";

  const fetchData = async (
    endpoint: string,
    setter: React.Dispatch<React.SetStateAction<SensorData>>
  ) => {
    try {
      const response = await fetch(`http://localhost:8000/${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username }),
      });

      if (!response.ok) throw new Error("Network response was not ok");
      const result = await response.json();
      setter(result[0]);
    } catch (error) {
      console.error(`Error fetching ${endpoint}:`, error);
    }
  };

  const handleManualInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setManualInputs(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmitManualInputs = async () => {
    try {
      // Here you would typically send this data to your backend
      // For now, we'll just update the local state
      if (manualInputs.temperature) {
        setTemperatureData(prev => ({ ...prev, currTemperature: manualInputs.temperature }));
      }
      if (manualInputs.heartRate) {
        setHrData(prev => ({ ...prev, currHeartRate: manualInputs.heartRate }));
      }
      if (manualInputs.pulseRate) {
        setPrData(prev => ({ ...prev, currPulseRate: manualInputs.pulseRate }));
      }
      if (manualInputs.systolic || manualInputs.diastolic) {
        setBloodPressureData(prev => ({
          ...prev,
          currSystolic: manualInputs.systolic || prev.currSystolic,
          currDiastolic: manualInputs.diastolic || prev.currDiastolic
        }));
      }
      if (manualInputs.spo2) {
        setSpo2Data(prev => ({ ...prev, currSpO2: manualInputs.spo2 }));
      }
      if (manualInputs.respiratoryRate) {
        setRpData(prev => ({ ...prev, currRespiratoryRate: manualInputs.respiratoryRate }));
      }
      
      setIsEditing(false);
      // Clear the inputs
      setManualInputs({
        temperature: "",
        heartRate: "",
        pulseRate: "",
        systolic: "",
        diastolic: "",
        spo2: "",
        respiratoryRate: ""
      });
    } catch (error) {
      console.error("Error submitting manual inputs:", error);
    }
  };

  React.useEffect(() => {
    fetchData("api/get/temperature", setTemperatureData);
    fetchData("userinfo", setUserData);
    fetchData("api/get/heartrate", setHrData);
    fetchData("api/get/pulserate", setPrData);
    fetchData("api/get/respiratoryrate", setRpData);
    fetchData("api/get/spo2", setSpo2Data);
    fetchData("api/get/bloodpressure", setBloodPressureData);
  }, [username]);

  const position: [number, number] = [user.latitude ?? 0, user.longitude ?? 0];

  const metrics = [
    {
      title: "SpO2",
      value: `${spo2Data.currSpO2 || "--"}`,
      description: "%",
      updated: "5 min ago",
    },
    {
      title: "Temperature",
      value: `${temperatureData.currTemperature || "--"}`,
      description: "°F",
      updated: "5 min ago",
    },
    {
      title: "Heart Rate",
      value: `${hrData.currHeartRate || "--"}`,
      description: "BPM",
      updated: "5 min ago",
    },
    {
      title: "Pulse Rate",
      value: `${prData.currPulseRate || "--"}`,
      description: "BPM",
      updated: "5 min ago",
    },
    {
      title: "Blood Pressure",
      value: `${bloodPressureData.currSystolic || "--"}/${
        bloodPressureData.currDiastolic || "--"
      }`,
      description: "mmHg",
      updated: "5 min ago",
    },
    {
      title: "Respiratory Rate",
      value: `${rpData.currRespiratoryRate || "--"}`,
      description: "rpm",
      updated: "5 min ago",
    },
  ];

  const formatTime = (timestamp: string) => {
    return timestamp ? new Date(timestamp).toLocaleTimeString() : "Just now";
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        {/* Header */}
        <header className="sticky top-0 z-10 flex h-16 items-center gap-2 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 border-b">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="h-6" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink
                  href="/dashboard"
                  className="text-sm hover:text-primary"
                >
                  Health Services
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-sm font-medium">
                  Dashboard
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>

        <main className="flex-1 space-y-6 p-6 pt-4">
          {/* Manual Input Section */}
          <section className="space-y-3">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Manual Health Data Input</h2>
              {!isEditing ? (
                <Button onClick={() => setIsEditing(true)}>Add Manual Data</Button>
              ) : (
                <div className="space-x-2">
                  <Button variant="outline" onClick={() => setIsEditing(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleSubmitManualInputs}>Submit</Button>
                </div>
              )}
            </div>
            
            {isEditing && (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                <div className="space-y-2">
                  <Label htmlFor="temperature">Temperature (°F)</Label>
                  <Input
                    id="temperature"
                    name="temperature"
                    value={manualInputs.temperature}
                    onChange={handleManualInputChange}
                    placeholder="e.g., 98.6"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="heartRate">Heart Rate (BPM)</Label>
                  <Input
                    id="heartRate"
                    name="heartRate"
                    value={manualInputs.heartRate}
                    onChange={handleManualInputChange}
                    placeholder="e.g., 72"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="pulseRate">Pulse Rate (BPM)</Label>
                  <Input
                    id="pulseRate"
                    name="pulseRate"
                    value={manualInputs.pulseRate}
                    onChange={handleManualInputChange}
                    placeholder="e.g., 72"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="systolic">Blood Pressure (mmHg)</Label>
                  <div className="flex gap-2">
                    <Input
                      id="systolic"
                      name="systolic"
                      value={manualInputs.systolic}
                      onChange={handleManualInputChange}
                      placeholder="Systolic"
                    />
                    <span className="self-center">/</span>
                    <Input
                      id="diastolic"
                      name="diastolic"
                      value={manualInputs.diastolic}
                      onChange={handleManualInputChange}
                      placeholder="Diastolic"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="spo2">SpO2 (%)</Label>
                  <Input
                    id="spo2"
                    name="spo2"
                    value={manualInputs.spo2}
                    onChange={handleManualInputChange}
                    placeholder="e.g., 98"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="respiratoryRate">Respiratory Rate (rpm)</Label>
                  <Input
                    id="respiratoryRate"
                    name="respiratoryRate"
                    value={manualInputs.respiratoryRate}
                    onChange={handleManualInputChange}
                    placeholder="e.g., 16"
                  />
                </div>
              </div>
            )}
          </section>

          {/* ECG Monitoring Section */}
          <section className="space-y-3">
            <h2 className="text-xl font-semibold">ECG Monitoring</h2>
            <Ecgmonitoring />
          </section>

          {/* Rest of your existing code... */}
          {/* Vital Signs Grid */}
          <section className="space-y-3">
            <h2 className="text-xl font-semibold">Vital Signs</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
              <div className="grid gap-4">
                <Temperature />
                <HeartRate />
              </div>
              <div className="grid gap-4">
                <BloodPressure />
                <SpO2 />
              </div>
            </div>
          </section>

          {/* Current Readings Section */}
          <section className="space-y-3">
            <h2 className="text-xl font-semibold">Current Readings</h2>
            <p className="text-sm text-muted-foreground">
              Latest measurements from your health sensors
            </p>
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
              {metrics.map((metric, index) => (
                <Card
                  key={index}
                  className="hover:shadow-md transition-shadow h-full"
                >
                  <CardHeader>
                    <CardDescription className="font-medium text-sm">
                      {metric.title}
                    </CardDescription>
                    <CardTitle className="text-2xl">
                      {metric.value}
                      <span className="text-base">{metric.description}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardFooter>
                    <CardDescription className="text-xs">
                      Updated {metric.updated}
                    </CardDescription>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </section>

          {/* Location Tracking */}
          <section className="space-y-3">
            <h2 className="text-xl font-semibold">Location Tracking</h2>
            <p className="text-sm text-muted-foreground">
              Your current location based on device GPS
            </p>
            <div className="rounded-lg overflow-hidden border h-[400px]">
              {position[0] && position[1] ? (
                <MapContainer
                  center={position}
                  zoom={13}
                  style={{ height: "100%", width: "100%" }}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                  <Marker position={position} icon={markerIcon}>
                    <Popup className="text-sm min-w-[250px]">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <div className="font-semibold text-base">
                            {username}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {formatTime(temperatureData.currTime)}
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div className="flex flex-col">
                            <span className="font-medium">Temperature</span>
                            <span>
                              {temperatureData.currTemperature || "--"}°F
                            </span>
                          </div>
                          <div className="flex flex-col">
                            <span className="font-medium">Pulse</span>
                            <span>{prData.currPulseRate || "--"} BPM</span>
                          </div>
                          <div className="flex flex-col">
                            <span className="font-medium">Heart Rate</span>
                            <span>{hrData.currHeartRate || "--"} BPM</span>
                          </div>
                          <div className="flex flex-col">
                            <span className="font-medium">SpO2</span>
                            <span>{spo2Data.currSpO2 || "--"}%</span>
                          </div>
                          <div className="flex flex-col">
                            <span className="font-medium">BP</span>
                            <span>
                              {bloodPressureData.currSystolic || "--"}/
                              {bloodPressureData.currDiastolic || "--"} mmHg
                            </span>
                          </div>
                          <div className="flex flex-col">
                            <span className="font-medium">Resp. Rate</span>
                            <span>
                              {rpData.currRespiratoryRate || "--"} rpm
                            </span>
                          </div>
                        </div>
                      </div>
                    </Popup>
                  </Marker>
                </MapContainer>
              ) : (
                <div className="flex items-center justify-center h-full bg-muted/50">
                  <p className="text-muted-foreground">
                    Loading location data...
                  </p>
                </div>
              )}
            </div>
          </section>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}