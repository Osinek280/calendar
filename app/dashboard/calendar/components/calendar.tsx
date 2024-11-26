"use client"

import React, { useState } from 'react';
import { CalendarHeader } from '@/app/dashboard/calendar/components/calendar-header';
import { DayCell } from '@/app/dashboard/calendar/components/day-cell';
import { WeekView } from '@/app/dashboard/calendar/components/week-view';
import { getDaysInMonth, getWeekDays } from '@/utils/dateUtils';
import { addDays, startOfWeek, endOfWeek } from 'date-fns';
import { Tabs, TabsContent } from '@/components/ui/tabs';

interface Event {
  id: string;
  title: string;
  start: Date;
  end: Date;
  color?: string;
}

export const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2024, 0, 1)); // January 2024
  const [currentView, setCurrentView] = useState<'week' | 'month'>('month');

  const prevPeriod = () => {
    if (currentView === 'month') {
      setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    } else {
      setCurrentDate(addDays(currentDate, -7));
    }
  };

  const nextPeriod = () => {
    if (currentView === 'month') {
      setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    } else {
      setCurrentDate(addDays(currentDate, 7));
    }
  };

  const getCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentDate.getFullYear(), currentDate.getMonth());
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
    const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDay();

    const previousMonthDays = Array(firstDayOfMonth).fill(null).map((_, index) => {
      const day = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0 - index);
      return { date: day, isCurrentMonth: false };
    }).reverse();

    const currentMonthDays = daysInMonth.map(date => ({ date, isCurrentMonth: true }));

    const nextMonthDays = Array(6 - lastDayOfMonth).fill(null).map((_, index) => {
      const day = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, index + 1);
      return { date: day, isCurrentMonth: false };
    });

    return [...previousMonthDays, ...currentMonthDays, ...nextMonthDays];
  };

  const today = new Date();

  const events: Event[] = [
    // { id: '1', title: 'Team Meeting', start: new Date(2024, 0, 3, 10, 0), end: new Date(2024, 0, 3, 11, 0), color: 'blue' },
    // { id: '2', title: 'Project Kickoff', start: new Date(2024, 0, 3, 14, 0), end: new Date(2024, 0, 3, 16, 0), color: 'green' },
    // { id: '3', title: 'Conference', start: new Date(2024, 0, 5, 2, 0), end: new Date(2024, 0, 7), color: 'purple' },
    // { id: '4', title: 'Vacation', start: new Date(2024, 0, 15), end: new Date(2024, 0, 20), color: 'orange' },
    // { id: '5', title: 'Deadline', start: new Date(2024, 0, 10, 9, 0), end: new Date(2024, 0, 10, 17, 0), color: 'red' },
    // { id: '6', title: 'Workshop', start: new Date(2024, 0, 22, 13, 0), end: new Date(2024, 0, 24, 17, 0), color: 'indigo' },
    // { id: '7', title: 'Review', start: new Date(2024, 0, 28, 10, 0), end: new Date(2024, 0, 28, 11, 30), color: 'pink' },
    // { id: '8', title: 'Presentation', start: new Date(2024, 0, 28, 14, 0), end: new Date(2024, 0, 28, 15, 30), color: 'cyan' },
  ];

  const getEventsForDate = (date: Date) => {
    return events.filter(event => 
      date >= new Date(event.start.setHours(0, 0, 0, 0)) &&
      date <= new Date(event.end.setHours(23, 59, 59, 999))
    );
  };

  const getEventsForWeek = () => {
    const start = startOfWeek(currentDate);
    const end = endOfWeek(currentDate);
    return events.filter(event => 
      (event.start >= start && event.start <= end) ||
      (event.end >= start && event.end <= end) ||
      (event.start <= start && event.end >= end)
    );
  };

  return (
    <div className="h-full flex flex-col p-4">
      <CalendarHeader
        currentDate={currentDate}
        onPrevPeriod={prevPeriod}
        onNextPeriod={nextPeriod}
        onViewChange={setCurrentView}
        currentView={currentView}
      />
      <div className="flex-grow">
        {currentView === 'month' ? (
          <div className="h-full border rounded-lg overflow-hidden">
            <div className="grid grid-cols-7">
              {getWeekDays().map((day) => (
                <div key={day} className="p-2 text-center text-xs font-medium">
                  {day}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 h-[calc(100%-2rem)]">
              {getCalendarDays().map(({ date, isCurrentMonth }) => (
                <DayCell
                  key={date.toISOString()}
                  date={date}
                  isCurrentMonth={isCurrentMonth}
                  isToday={date.toDateString() === today.toDateString()}
                  events={getEventsForDate(date)}
                />
              ))}
            </div>
          </div>
        ) : (
          <WeekView currentDate={currentDate} events={getEventsForWeek()} />
        )}
      </div>
    </div>
  );
};

