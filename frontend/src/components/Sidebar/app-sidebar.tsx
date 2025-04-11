import * as React from "react";
import {
  Command,
  Home,
  HeartPulse,
  PackageSearch,
  Globe,
  Brain,
  AlertCircle,
} from "lucide-react";

import { NavMain } from "@/components/Sidebar/nav-main";
import { Link } from "react-router-dom";
import { UserButton, useUser } from "@clerk/clerk-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Home",
      url: "/",
      icon: Home,
    },
    {
      title: "Health Services",
      url: "/HealthTracking",
      isActive: true,
      icon: HeartPulse,
      items: [
        {
          title: "Dashboard",
          url: "/dashboard",
        },
        {
          title: "Wellness Insights",
          url: "/wellnessinsights",
        },
        {
          title: "Doctor Connect",
          url: "/doctorconnect",
        },
      ],
    },
    {
      title: "AI & Assistance",
      url: "/HealthTracking",
      isActive: true,
      icon: Brain,
      items: [
        {
          title: "Core Care Plan",
          url: "/corecareplan",
        },
        {
          title: "Medibot",
          url: "/medibot",
        },
        {
          title: "Mother Care 360",
          url: "/mothercare360",
        },
      ],
    },
    {
      title: "Products",
      url: "/biowear",
      icon: PackageSearch,
      items: [
        {
          title: "Bio Wear",
          url: "/products",
        },
        {
          title: "Sync App",
          url: "/syncapp",
        },
      ],
    },
    {
      title: "Resources",
      url: "/FAQs",
      icon: Globe,
      items: [
        {
          title: "FAQs",
          url: "/faqs",
        },
      ],
    },
    {
      title: "Alerts",
      url: "/alerts",
      icon: AlertCircle,
    }
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { isSignedIn, user } = useUser();
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">BioSync360</span>
                  <span className="truncate text-xs text-muted-foreground">
                    Syncing Health
                  </span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter className="p-4">
        {isSignedIn ? (
          <div className="flex items-center gap-3">
            <UserButton
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  avatarBox: "h-8 w-8",
                  userButtonPopoverCard: "shadow-lg",
                },
              }}
            />
            <div className="overflow-hidden">
              <p className="truncate text-sm font-medium">
                {user.fullName || user.firstName || "User"}
              </p>
              <p className="truncate text-xs text-muted-foreground">
                {user.primaryEmailAddress?.emailAddress}
              </p>
            </div>
          </div>
        ) : (
          <Link to="/authentication" className="w-full">
            <Button className="w-full">Sign In</Button>
          </Link>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}

const Button = ({ className, children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button
    className={`inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-sidebar-primary text-white h-10 py-2 px-4 ${className}`}
    {...props}
  >
    {children}
  </button>
);
