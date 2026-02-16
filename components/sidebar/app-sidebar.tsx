"use client"

import * as React from "react"
import {
  BanknoteArrowDown,
  ChartCandlestick,
  House
} from "lucide-react"

import { NavMain } from "@/components/sidebar/nav-main"
import { NavUser } from "@/components/sidebar/nav-user"
import { SideBarHeading } from "@/components/sidebar/sidebar-heading"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { usePathname } from "next/navigation"
import { useAuth } from "@/context/AuthContext"

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: House
    },
    {
      title: "Expenses",
      url: "/expenses",
      icon: BanknoteArrowDown
    },
    {
      title: "Trading Journal",
      url: "/trading-journal",
      icon: ChartCandlestick
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

  // hooks
  const pathname = usePathname()
  const { user } = useAuth();

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SideBarHeading />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} pathname={pathname} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user.data} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
