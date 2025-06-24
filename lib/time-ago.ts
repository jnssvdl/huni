import {
  differenceInSeconds,
  differenceInMinutes,
  differenceInHours,
  differenceInDays,
  differenceInWeeks,
  differenceInMonths,
  differenceInYears,
} from "date-fns";

export function timeAgo(date: string | Date): string {
  const now = new Date();
  const input = new Date(date);

  const seconds = differenceInSeconds(now, input);
  if (seconds < 60) return "just now";

  const minutes = differenceInMinutes(now, input);
  if (minutes < 60) return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;

  const hours = differenceInHours(now, input);
  if (hours < 24) return `${hours} hour${hours !== 1 ? "s" : ""} ago`;

  const days = differenceInDays(now, input);
  if (days < 7) return `${days} day${days !== 1 ? "s" : ""} ago`;

  const weeks = differenceInWeeks(now, input);
  if (weeks < 5) return `${weeks} week${weeks !== 1 ? "s" : ""} ago`;

  const months = differenceInMonths(now, input);
  if (months < 12) return `${months} month${months !== 1 ? "s" : ""} ago`;

  const years = differenceInYears(now, input);
  return `${years} year${years !== 1 ? "s" : ""} ago`;
}
