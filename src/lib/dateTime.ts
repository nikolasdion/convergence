import {
  DateFormatter,
  getLocalTimeZone,
  parseAbsoluteToLocal,
  ZonedDateTime,
} from "@internationalized/date";

export interface DateTimeSlot {
  start: ZonedDateTime;
  end: ZonedDateTime;
}

export const convertToDateTimeSlot = (slotStr: Slot): DateTimeSlot => {
  return {
    start: parseAbsoluteToLocal(slotStr.start),
    end: parseAbsoluteToLocal(slotStr.end),
  };
};

export const convertToStrSlot = (slotStr: DateTimeSlot): Slot => {
  return {
    start: slotStr.start.toAbsoluteString(),
    end: slotStr.end.toAbsoluteString(),
  };
};

const dateFormatter = new DateFormatter("en-GB", {
  weekday: "short",
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  // timeStyle: "short",
  timeZone: getLocalTimeZone(),
});

export const formatDate = (date: ZonedDateTime | string): string => {
  if (date instanceof ZonedDateTime) {
    return dateFormatter.format(date.toDate());
  } else {
    return dateFormatter.format(new Date(date));
  }
};
