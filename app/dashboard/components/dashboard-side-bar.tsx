"use client";

import { Separator } from "@/components/ui/separator";
import { NAV_ITEMS } from "@/utils/constants";
import clsx from "clsx";
import { Folder, HomeIcon, Settings, Users } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DashboardSideBar() {
  const pathname = usePathname();

  return (
    <div className="lg:block hidden border-r h-full">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center justify-between border-b px-3 w-full">
          <Link className="flex items-center gap-2 font-semibold ml-1" href="/">
            <span className="">Nextjs Starter Kit</span>
          </Link>
        </div>
        <div className="flex-1 overflow-auto py-2">
          <nav className="grid items-start px-4 text-sm font-medium">
            {NAV_ITEMS.map((item, index) =>
              "separator" in item ? (
                <Separator key={`separator-${index}`} className="my-3" />
              ) : (
                <Link
                  key={item.href}
                  className={clsx(
                    "flex items-center gap-2 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50",
                    {
                      "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50":
                        pathname === item.href,
                    }
                  )}
                  href={item.href}
                >
                  <div className="border rounded-lg dark:bg-black dark:border-gray-800 border-gray-400 p-1 bg-white">
                    <item.icon className="h-3 w-3" />
                  </div>
                  {item.label}
                </Link>
              )
            )}
          </nav>
        </div>
      </div>
    </div>
  );
}
