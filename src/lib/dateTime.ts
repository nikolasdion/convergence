import {
  DateFormatter,
  fromAbsolute,
  getLocalTimeZone,
  parseAbsoluteToLocal,
  parseAbsolute,
  ZonedDateTime,
} from "@internationalized/date";

import tzdata from "tzdata";

export interface ZonedDateTimeSlot {
  start: ZonedDateTime;
  end: ZonedDateTime;
}

export const timezones = Object.keys(tzdata.zones)
  .filter((t) => t !== null && t !== "null")
  .sort();

export const localTimezone = getLocalTimeZone();

// export const convertToZonedDateTimeSlot = (
//   slotStr: Slot
// ): ZonedDateTimeSlot => {
//   return {
//     start: parseAbsoluteToLocal(slotStr.start),
//     end: parseAbsoluteToLocal(slotStr.end),
//   };
// };

// export const convertToStrSlot = (slotStr: ZonedDateTimeSlot): Slot => {
//   return {
//     start: slotStr.start.toAbsoluteString(),
//     end: slotStr.end.toAbsoluteString(),
//   };
// };

const dateFormatter = new DateFormatter("en-GB", {
  weekday: "long",
  year: "numeric",
  month: "short",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
});

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

const findOverlap = (slot1: Slot, slot2: Slot): Slot | null => {
  try {
    const start1Epoch = parseAbsoluteToLocal(slot1.start).toDate().getTime();
    const start2Epoch = parseAbsoluteToLocal(slot2.start).toDate().getTime();
    const end1Epoch = parseAbsoluteToLocal(slot1.end).toDate().getTime();
    const end2Epoch = parseAbsoluteToLocal(slot2.end).toDate().getTime();

    const overlapStart = Math.max(start1Epoch, start2Epoch);
    const overlapEnd = Math.min(end1Epoch, end2Epoch);

    // TODO does this work?
    if (overlapStart < overlapEnd) {
      return {
        start: fromAbsolute(
          overlapStart,
          getLocalTimeZone()
        ).toAbsoluteString(),
        end: fromAbsolute(overlapEnd, getLocalTimeZone()).toAbsoluteString(),
      };
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
};

const findAllOverlaps = (attendees: AttendeeWithId[]): Slot[] => {
  const overlaps = [];

  for (let index = 0; index < attendees.length; index++) {
    const currentAttendee = attendees[index];
    for (const currentSlot of currentAttendee.slots) {
      for (let indexOther = index + 1; index < attendees.length; index++) {
        const otherAttendee = attendees[indexOther];
        for (const otherSlot of otherAttendee.slots) {
          const overlap = findOverlap(currentSlot, otherSlot);
          if (overlap) {
            overlaps.push(overlap);
          }
        }
      }
    }
  }

  return overlaps;
};
