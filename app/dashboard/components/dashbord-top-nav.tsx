"use client"

import ModeToggle from '@/components/mode-toggle'
import { Button } from '@/components/ui/button'
import { Dialog, DialogClose } from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { UserProfile } from '@/components/user-profile'
import { NAV_ITEMS } from '@/utils/constants'
import { HamburgerMenuIcon } from '@radix-ui/react-icons'
import Link from 'next/link'
import { ReactNode } from 'react'

export default function DashboardTopNav({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col">
      <header className="flex h-14 items-center gap-4 border-b px-4">
        <Sheet>
          <SheetTrigger asChild className='min-[1024px]:hidden p-2 transition'>
            <div>
            <HamburgerMenuIcon />
            <Link href="/dashboard">
              <span className="sr-only">Home</span>
            </Link>
            </div>
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <Link href='/'>
                <SheetTitle>Nextjs Starter Kit</SheetTitle>
              </Link>
            </SheetHeader>
            <div className="flex flex-col space-y-3 mt-[1rem]">
              {NAV_ITEMS.map((item, index) =>
                "separator" in item ? (
                  <Separator key={`separator-${index}`} className="my-3" />
                ) : (
                  <DialogClose asChild key={item.href}>
                    <Link href={item.href}>
                      <Button variant="outline" className='w-full'>
                        {item.label}
                      </Button>
                    </Link>
                  </DialogClose>
              )
            )}
            </div>
          </SheetContent>
        </Sheet>
        <div className="flex justify-center items-center gap-2 ml-auto">
          <UserProfile />
          <ModeToggle />
        </div>
      </header>
      {children}
    </div>
  )
}