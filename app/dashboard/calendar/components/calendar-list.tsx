'use client'

import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronRight, Plus, Settings, Users } from 'lucide-react';
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { SheetTitle } from '@/components/ui/sheet';
import { getCalendarsList } from '@/utils/actions/get-calendars';

interface Calendar {
  id: string;
  title: string;
  color: string;
}

export default function CalendarList({ my_plans }: {my_plans: Calendar[]}) {
  const [isMyPlansOpen, setIsMyPlansOpen] = useState(true);
  const [myPlans, setMyPlans] = useState<Calendar[]>(my_plans);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const friendsCalendars: Calendar[] = [
    { id: '5', title: 'Ania', color: 'bg-yellow-500' },
    { id: '6', title: 'Weronika', color: 'bg-indigo-500' },
    { id: '7', title: 'Aleksander', color: 'bg-pink-500' },
  ];

  const renderCalendar = (calendar: Calendar) => (
    <div key={calendar.id} className="flex items-center justify-between py-2">
      <div className="flex items-center space-x-3">
        <div className={`w-5 h-5 rounded-sm ${calendar.color}`} style={{ backgroundColor: calendar.color }} />
        <Label htmlFor={`calendar-switch-${calendar.id}`} className="font-medium text-sm cursor-pointer">
          {calendar.title}
        </Label>
      </div>
      <div className="flex items-center space-x-2">
        <Switch id={`calendar-switch-${calendar.id}`} />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu for {calendar.title}</span>
              <Settings className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[200px]">
            <DropdownMenuLabel>Calendar Options</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Edit Calendar</DropdownMenuItem>
            <DropdownMenuItem>Share Calendar</DropdownMenuItem>
            <DropdownMenuItem>Calendar Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600">Delete Calendar</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <SheetTitle>Calendars</SheetTitle>
      </div>
      
      <div className="relative">
        <Input
          type="text"
          placeholder="Search calendars..."
          className="pl-10"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      <ScrollArea className="h-[400px] pr-4">
        <Collapsible
          open={isMyPlansOpen}
          onOpenChange={setIsMyPlansOpen}
          className="space-y-2"
        >
          <CollapsibleTrigger asChild>
            <div className="flex items-center justify-between py-2 px-1 hover:bg-accent hover:text-accent-foreground rounded-md cursor-pointer">
              <div className="flex items-center space-x-2">
                {isMyPlansOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                <span className="font-semibold text-sm">My Plans</span>
              </div>
              <Button variant="ghost" size="sm">
                {/* Add any additional button content if needed */}
              </Button>
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-2 ml-4">
            {isLoading && <p>Loading calendars...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {!isLoading && !error && myPlans.length === 0 && (
              <p>No calendars found. Create a new calendar to get started.</p>
            )}
            {!isLoading && !error && myPlans.map(renderCalendar)}
          </CollapsibleContent>
        </Collapsible>
        
        <div className="mt-6 space-y-2">
          <div className="flex items-center justify-between py-2 px-1">
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4" />
              <span className="font-semibold text-sm">Friends Calendars</span>
            </div>
          </div>
          <div className="ml-4 space-y-2">
            {friendsCalendars.map(renderCalendar)}
          </div>
        </div>
      </ScrollArea>

      <div className="pt-4 border-t flex gap-4">
        <Button variant="outline" className="w-full">
          <Plus className="h-4 w-4 mr-2" />
          New Calendar
        </Button>
        <Button className="w-full">Submit</Button>
      </div>
    </div>
  );
}

