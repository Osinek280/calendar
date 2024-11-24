import { Folder, HomeIcon, Settings, Users, Calendar } from "lucide-react";
import { NavItemType } from "./types";
export const TITLE_TAILWIND_CLASS = "text-2xl sm:text-2xl md:text-3xl lg:text-4xl"

export const NAV_ITEMS: NavItemType[] = [
  { label: "Home", href: "/dashboard", icon: HomeIcon },
  { label: "Calendar", href: "/dashboard/calendar", icon: Calendar },
  { label: "Friends", href: "/dashboard/friends", icon: Users },
  { separator: true },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
];