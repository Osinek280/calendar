export function getDaysInMonth(year: number, month: number): Date[] {
  const date = new Date(year, month, 1);
  const days: Date[] = [];
  while (date.getMonth() === month) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  return days;
}

export function getMonthName(month: number): string {
  return new Date(0, month).toLocaleString('default', { month: 'long' });
}

export function getWeekDays(locale: string = 'en-US'): string[] {
  const baseDate = new Date(Date.UTC(2017, 0, 2)); // Just a Monday
  const weekDays = [];
  for (let i = 0; i < 7; i++) {
    weekDays.push(baseDate.toLocaleDateString(locale, { weekday: 'short' }));
    baseDate.setDate(baseDate.getDate() + 1);
  }
  return weekDays;
}

