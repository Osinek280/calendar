import React from 'react';
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, CalendarIcon, Plus } from 'lucide-react';
import { format, startOfWeek, endOfWeek } from 'date-fns';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Separator } from '@/components/ui/separator';


interface CalendarHeaderProps {
  currentDate: Date;
  onPrevPeriod: () => void;
  onNextPeriod: () => void;
  onViewChange: (view: 'week' | 'month') => void;
  currentView: 'week' | 'month';
}

export const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  currentDate,
  onPrevPeriod,
  onNextPeriod,
  onViewChange,
  currentView,
}) => {
  const formatDate = () => {
    if (currentView === 'month') {
      return format(currentDate, 'MMMM yyyy');
    } else {
      const start = startOfWeek(currentDate, { weekStartsOn: 0 });
      const end = endOfWeek(currentDate, { weekStartsOn: 0 });
      return `${format(start, 'd MMM')} - ${format(end, 'd MMM')}`;
    }
  };

  return (
    <div className="flex justify-between items-center mb-4">
      <div className="flex items-center gap-2">
        <h2 className="text-lg font-semibold">{formatDate()}</h2>
      </div>
      <div className="flex items-center gap-2">
        <Sheet>
          <SheetTrigger>
            <Button variant="outline" size="sm" className='items-center gap-1'>
              <Plus className='h- w-4' />
              <p>Add</p>
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Are you absolutely sure?</SheetTitle>
              <SheetDescription>
                This action cannot be undone. This will permanently delete your account and remove your data from our servers.
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
        <div className='flex border border-input rounded-md overflow-hidden h-9'>
          <div 
            className='hover:bg-accent hover:text-accent-foreground h-9 px-3 flex justify-center items-center' 
            onClick={onPrevPeriod} >
            <ChevronLeft className="h-4 w-4" />
          </div>
          <div className='hidden sm:flex hover:bg-accent hover:text-accent-foreground h-9 px-3 justify-center items-center'>
            Today
          </div>
          <div 
            className='hover:bg-accent hover:text-accent-foreground h-9 px-3 flex justify-center items-center border-l sm:border-none' 
            onClick={onNextPeriod}>
            <ChevronRight className="h-4 w-4" />
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant="outline" size="sm" className='w-[70px]'>
              {currentView}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => onViewChange('week')} >Week</DropdownMenuItem>
            <DropdownMenuItem onClick={() => onViewChange('month')}>Month</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};
