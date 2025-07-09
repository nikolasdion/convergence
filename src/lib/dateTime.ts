import {
  DateFormatter,
  parseAbsolute,
  ZonedDateTime,
} from "@internationalized/date";

export { zones as timezones } from "./timezone.json";

export interface ZonedDateTimeSlot {
  start: ZonedDateTime;
  end: ZonedDateTime;
}

export const formatDate = (date: string, timezone: string): string => {
  const dateFormatter = new DateFormatter("en-GB", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    timeZone: timezone,
  });
  return dateFormatter.format(new Date(date));
};

export const formatDateRange = (slot: Slot, timezone: string): string => {
  const dateFormatter = new DateFormatter("en-GB", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    timeZone: timezone,
  });
  return dateFormatter.formatRange(
    parseAbsolute(slot.start, timezone).toDate(),
    parseAbsolute(slot.end, timezone).toDate()
  );
};
