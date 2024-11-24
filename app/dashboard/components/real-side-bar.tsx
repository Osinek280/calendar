"use client"

import * as React from "react"
import { ChevronRight } from 'lucide-react'

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"

// This is sample data that matches the screenshot
const navigation = [
  {
    title: "Getting Started",
    items: [
      { title: "Installation", href: "#" },
      { title: "Project Structure", href: "#" },
    ],
  },
  {
    title: "Building Your Application",
    href: "#",
    hasSubmenu: true,
  },
  {
    title: "API Reference",
    href: "#",
    hasSubmenu: true,
  },
  {
    title: "Architecture",
    href: "#",
    hasSubmenu: true,
  },
]

export function DashboardSidebar() {
  return (
    <Sidebar className="bg-red-400">
      <SidebarContent>
        <SidebarMenu>
          {navigation.map((item) => (
            <SidebarMenuItem key={item.title}>
              {item.items ? (
                <Collapsible>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton className="w-full justify-between hover:bg-white/10">
                      {item.title}
                      <ChevronRight className="size-4 shrink-0 transition-transform duration-200 group-data-[state=open]:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.items.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton
                            asChild
                            className="hover:bg-white/10"
                          >
                            <a href={subItem.href}>{subItem.title}</a>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </Collapsible>
              ) : (
                <SidebarMenuButton
                  asChild
                  className="justify-between hover:bg-white/10"
                >
                  <a href={item.href}>
                    {item.title}
                    {item.hasSubmenu && (
                      <ChevronRight className="size-4 shrink-0" />
                    )}
                  </a>
                </SidebarMenuButton>
              )}
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  )
}

