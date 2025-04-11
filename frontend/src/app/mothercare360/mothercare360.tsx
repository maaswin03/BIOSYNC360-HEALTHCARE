import { AppSidebar } from "@/components/Sidebar/app-sidebar";
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

export default function Mothercare360() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="sticky top-0 z-10 flex h-16 items-center gap-2 bg-black/95 backdrop-blur supports-[backdrop-filter]:bg-black/60 px-4 border-b border-gray-800">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1 text-white" />
            <Separator
              orientation="vertical"
              className="mr-2 h-4 bg-gray-700"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink
                    href="/mothercare360"
                    className="hover:text-primary text-white"
                  >
                    Ai & Assistance
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block text-gray-500" />
                <BreadcrumbItem>
                  <BreadcrumbPage className="font-semibold text-white">
                    Mother Care 360
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>

        <main className="w-full flex-1 p-6 mx-auto bg-black text-white">
          {/* 1. Mother’s Dashboard */}
          <section className="mb-12">
            <h2 className="text-xl font-medium mb-6 tracking-wide uppercase">
              Mother's Dashboard
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* Basic Info */}
              <div className="p-5 border border-white/10 rounded-sm">
                <h3 className="text-sm font-medium mb-4 tracking-wider opacity-80">
                  BASIC INFORMATION
                </h3>
                <div className="space-y-3 text-sm">
                  <InfoRow label="Name" value="Jane Doe" />
                  <InfoRow label="Age" value="28" />
                  <InfoRow label="Pregnancy Week" value="24" />
                  <InfoRow label="Health ID" value="MC360-XXXXXX" />
                </div>
              </div>

              {/* Trimester Tracker */}
              <div className="p-5 border border-white/10 rounded-sm">
                <h3 className="text-sm font-medium mb-4 tracking-wider opacity-80">
                  TRIMESTER
                </h3>
                <div className="mb-2">
                  <div className="w-full bg-white/10 h-[2px] mb-1">
                    <div
                      className="bg-white h-[2px]"
                      style={{ width: "66%" }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs opacity-60">
                    <span>1st</span>
                    <span>2nd</span>
                    <span>3rd</span>
                  </div>
                </div>
                <p className="text-sm">Week 24 of 40</p>
              </div>

              {/* Vital Stats */}
              <div className="p-5 border border-white/10 rounded-sm">
                <h3 className="text-sm font-medium mb-4 tracking-wider opacity-80">
                  VITAL STATS
                </h3>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <CompactStat label="HR" value="82" unit="bpm" />
                  <CompactStat label="BP" value="120/80" unit="mmHg" />
                  <CompactStat label="Movement" value="12" unit="/hr" />
                  <CompactStat label="SpO₂" value="98" unit="%" />
                  <CompactStat label="Temp" value="36.5" unit="°C" />
                  <CompactStat label="Weight" value="+8" unit="kg" />
                </div>
              </div>
            </div>
          </section>

          {/* 2. Pregnancy Progress */}
          <section className="mb-12">
            <h2 className="text-xl font-medium mb-6 tracking-wide uppercase">
              Pregnancy Progress
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              {/* Weekly Update */}
              <div className="lg:col-span-2 p-5 border border-white/10 rounded-sm">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-sm font-medium tracking-wider opacity-80">
                    WEEK 24
                  </h3>
                  <span className="text-xs opacity-60">Day 168</span>
                </div>
                <p className="mb-4 leading-relaxed">
                  Your baby now measures approximately 30cm crown-to-rump and
                  weighs about 600 grams.
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 border border-white/20 rounded-sm flex items-center justify-center">
                    <span className="text-lg">🍎</span>
                  </div>
                  <p className="text-sm opacity-90">"Size of a grapefruit"</p>
                </div>
              </div>

              {/* Checklist */}
              <div className="p-5 border border-white/10 rounded-sm">
                <h3 className="text-sm font-medium mb-4 tracking-wider opacity-80">
                  TODAY
                </h3>
                <ul className="space-y-3">
                  <MinimalCheckItem
                    label="Prenatal vitamins"
                    time="08:00"
                    completed
                  />
                  <MinimalCheckItem label="2L water" time="--:--" />
                  <MinimalCheckItem label="30min walk" time="--:--" />
                  <MinimalCheckItem label="Kick count" time="20:00" />
                </ul>
              </div>
            </div>
          </section>

          {/* 3. Safety */}
          <section className="mb-12">
            <h2 className="text-xl font-medium mb-6 tracking-wide uppercase">
              Safety
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="p-5 border border-white/10 rounded-sm">
                <h3 className="text-sm font-medium mb-4 tracking-wider opacity-80">
                  RISK MONITOR
                </h3>
                <ul className="space-y-3">
                  <StatusIndicator label="Blood Pressure" status="normal" />
                  <StatusIndicator label="Glucose" status="elevated" />
                  <StatusIndicator label="Fetal Movement" status="normal" />
                </ul>
              </div>

              <div className="p-5 border border-white/10 rounded-sm">
                <h3 className="text-sm font-medium mb-4 tracking-wider opacity-80">
                  NEAREST FACILITIES
                </h3>
                <ul className="space-y-3 text-sm">
                  <li className="flex justify-between">
                    <span>City General</span>
                    <span className="opacity-60">3.2km</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Women's Clinic</span>
                    <span className="opacity-60">5.7km</span>
                  </li>
                </ul>
                <button className="mt-4 w-full py-2 text-xs border border-white/20 hover:bg-white/5 transition-colors">
                  EMERGENCY CONTACT
                </button>
              </div>
            </div>
          </section>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}



export function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between border-b border-white/5 pb-2">
      <span className="opacity-60">{label}</span>
      <span>{value}</span>
    </div>
  );
}


export function CompactStat({ label, value, unit }: { 
  label: string; 
  value: string; 
  unit: string 
}) {
  return (
    <div className="border border-white/10 p-2 rounded-sm">
      <div className="flex justify-between items-baseline">
        <span className="opacity-60 text-xs">{label}</span>
        <span className="text-sm">{value}</span>
      </div>
      <div className="text-right text-xs opacity-40">{unit}</div>
    </div>
  );
}


export function MinimalCheckItem({ 
  label, 
  time, 
  completed = false 
}: { 
  label: string; 
  time: string;
  completed?: boolean 
}) {
  return (
    <li className="flex justify-between items-center text-sm">
      <div className="flex items-center gap-3">
        <div className={`w-3 h-3 border ${completed ? 'bg-white' : 'border-white/30'}`}></div>
        <span className={completed ? 'opacity-40' : ''}>{label}</span>
      </div>
      <span className={`text-xs ${time === '--:--' ? 'opacity-20' : 'opacity-60'}`}>
        {time}
      </span>
    </li>
  );
}

export function StatusIndicator({ 
  label, 
  status 
}: { 
  label: string; 
  status: 'normal' | 'elevated' | 'critical' 
}) {
  const statusMap = {
    normal: { char: '✓', class: 'opacity-80' },
    elevated: { char: '⚠', class: 'text-yellow-300' },
    critical: { char: '✗', class: 'text-red-400' }
  };
  
  return (
    <div className="flex items-center gap-3">
      <span className={`w-4 text-center ${statusMap[status].class}`}>
        {statusMap[status].char}
      </span>
      <span className="opacity-90">{label}</span>
    </div>
  );
}