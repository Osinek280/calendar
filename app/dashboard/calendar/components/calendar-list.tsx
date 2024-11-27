import React from 'react';
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
import { SheetClose, SheetTitle } from '@/components/ui/sheet';

interface Calendar {
  id: string;
  name: string;
  color: string;
}

interface CalendarGroup {
  name: string;
  calendars: Calendar[];
}

export default function CalendarList() {
  const [isMyPlansOpen, setIsMyPlansOpen] = React.useState(true);

  const myPlans: CalendarGroup = {
    name: "My Plans",
    calendars: [
      { id: '1', name: 'Personal', color: 'bg-blue-500' },
      { id: '2', name: 'Work', color: 'bg-green-500' },
      { id: '3', name: 'Family', color: 'bg-red-500' },
      { id: '4', name: 'Projects', color: 'bg-purple-500' },
    ]
  };

  const friendsCalendars: Calendar[] = [
    { id: '5', name: 'Ania', color: 'bg-yellow-500' },
    { id: '6', name: 'Weronika', color: 'bg-indigo-500' },
    { id: '7', name: 'Aleksander', color: 'bg-pink-500' },
    { id: '8', name: 'Weronika', color: 'bg-indigo-500' },
    { id: '9', name: 'Aleksander', color: 'bg-pink-500' },
    { id: '10', name: 'Weronika', color: 'bg-indigo-500' },
    { id: '11', name: 'Aleksander', color: 'bg-pink-500' },
    { id: '12', name: 'Weronika', color: 'bg-indigo-500' },
    { id: '13', name: 'Aleksander', color: 'bg-pink-500' },
    { id: '14', name: 'Weronika', color: 'bg-indigo-500' },
    { id: '15', name: 'Aleksander', color: 'bg-pink-500' },
  ];

  const renderCalendar = (calendar: Calendar) => (
    <div key={calendar.id} className="flex items-center justify-between py-2">
      <div className="flex items-center space-x-3">
        <div className={`w-3 h-3 rounded-full ${calendar.color}`} />
        <Label htmlFor={`calendar-switch-${calendar.id}`} className="font-medium text-sm text-gray-700 cursor-pointer">
          {calendar.name}
        </Label>
      </div>
      <div className="flex items-center space-x-2">
        <Switch id={`calendar-switch-${calendar.id}`} />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu for {calendar.name}</span>
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
          className="pl-8"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 absolute left-2.5 top-2.5 text-gray-400"
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
            <div className="flex items-center justify-between py-2 px-1 hover:bg-gray-100 rounded-md cursor-pointer">
              <div className="flex items-center space-x-2">
                {isMyPlansOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                <span className="font-semibold text-sm">{myPlans.name}</span>
              </div>
              <Button variant="ghost" size="sm">
              </Button>
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-2 ml-4">
            {myPlans.calendars.map(renderCalendar)}
          </CollapsibleContent>
        </Collapsible>
        
        <div className="mt-6 space-y-2">
          <div className="flex items-center justify-between py-2 px-1">
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4" />
              <span className="font-semibold text-sm">Friends' Calendars</span>
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
        {/* <SheetClose asChild> */}
          <Button className="w-full">Submit</Button>
        {/* </SheetClose> */}
      </div>
    </div>
  );
}

