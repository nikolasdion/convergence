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
    const start1Epoch = Date.parse(slot1.start);
    const start2Epoch = Date.parse(slot2.start);
    const end1Epoch = Date.parse(slot1.end);
    const end2Epoch = Date.parse(slot2.end);

    const overlapStart = Math.max(start1Epoch, start2Epoch);
    const overlapEnd = Math.min(end1Epoch, end2Epoch);

    // TODO does this work?
    if (overlapStart < overlapEnd) {
      return {
        start: new Date(slot1.start).toISOString(),
        end: new Date(slot1.start).toISOString(),
      };
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};

// NOT RIGHT!
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
