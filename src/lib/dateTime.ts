import {
  DateFormatter,
  fromAbsolute,
  getLocalTimeZone,
  maxDate,
  minDate,
  parseAbsoluteToLocal,
  parseTime,
  ZonedDateTime,
} from "@internationalized/date";

export interface ZonedDateTimeSlot {
  start: ZonedDateTime;
  end: ZonedDateTime;
}

export const convertToZonedDateTimeSlot = (
  slotStr: Slot
): ZonedDateTimeSlot => {
  return {
    start: parseAbsoluteToLocal(slotStr.start),
    end: parseAbsoluteToLocal(slotStr.end),
  };
};

export const convertToStrSlot = (slotStr: ZonedDateTimeSlot): Slot => {
  return {
    start: slotStr.start.toAbsoluteString(),
    end: slotStr.end.toAbsoluteString(),
  };
};

const dateFormatter = new DateFormatter("en-GB", {
  weekday: "long",
  year: "numeric",
  month: "short",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
});

export const formatDate = (date: ZonedDateTime | string): string => {
  if (date instanceof ZonedDateTime) {
    return dateFormatter.format(date.toDate());
  } else {
    return dateFormatter.format(parseAbsoluteToLocal(date).toDate());
  }
};

export const formatDateRange = (slot: Slot): string => {
  return dateFormatter.formatRange(
    parseAbsoluteToLocal(slot.start).toDate(),
    parseAbsoluteToLocal(slot.end).toDate()
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
