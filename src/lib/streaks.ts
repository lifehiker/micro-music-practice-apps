import { eachDayOfInterval, format, isSameDay, subDays } from "date-fns";

export function buildSevenDayHistory(completedDates: Date[]) {
  const start = subDays(new Date(), 6);
  const days = eachDayOfInterval({ start, end: new Date() });

  return days.map((day) => ({
    label: format(day, "EEE"),
    dateKey: format(day, "yyyy-MM-dd"),
    complete: completedDates.some((completed) => isSameDay(completed, day)),
  }));
}

export function getCurrentStreak(completedDates: Date[]) {
  const sorted = [...completedDates].sort((a, b) => b.getTime() - a.getTime());
  let streak = 0;
  let cursor = new Date();

  for (const completed of sorted) {
    if (isSameDay(completed, cursor)) {
      streak += 1;
      cursor = subDays(cursor, 1);
      continue;
    }

    if (streak === 0 && isSameDay(completed, subDays(cursor, 1))) {
      streak += 1;
      cursor = subDays(cursor, 2);
      continue;
    }

    break;
  }

  return streak;
}
