import { parseAbsoluteToLocal, ZonedDateTime } from "@internationalized/date";

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
