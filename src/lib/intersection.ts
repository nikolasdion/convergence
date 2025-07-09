export const findIntersection = (slot1: Slot, slot2: Slot): Slot | null => {
  try {
    const start1Epoch = Date.parse(slot1.start);
    const start2Epoch = Date.parse(slot2.start);
    const end1Epoch = Date.parse(slot1.end);
    const end2Epoch = Date.parse(slot2.end);

    const overlapStart = Math.max(start1Epoch, start2Epoch);
    const overlapEnd = Math.min(end1Epoch, end2Epoch);

    if (overlapStart < overlapEnd) {
      return {
        start: new Date(overlapStart).toISOString(),
        end: new Date(overlapEnd).toISOString(),
      };
    } else {
      return null;
    }
  } catch (error) {
    // TODO Handle better!
    console.error(error);
    return null;
  }
};

// Helper function to find intersections between two SORTED arrays of slots
export const findIntersectionsSorted = (
  slots1: Slot[],
  slots2: Slot[]
): Slot[] => {
  const result: Slot[] = [];
  let i1 = 0;
  let i2 = 0;

  while (i1 < slots1.length && i2 < slots2.length) {
    const intersection = findIntersection(slots1[i1], slots2[i2]);

    if (intersection) {
      result.push(intersection);
    }

    // Move the pointer of the range that ends earlier
    if (slots1[i1].end <= slots2[i2].end) {
      i1++;
    } else {
      i2++;
    }
  }

  return result;
};

export const findAllIntersections = (attendees: AttendeeWithId[]): Slot[] => {
  if (attendees.length === 0) {
    return [];
  }

  // Sort each person's ranges by start time, if required
  const sortedAttendees = attendees.map((attendee) => {
    return {
      ...attendee,
      slots: attendee.slots.sort(
        (a, b) => Date.parse(a.start) - Date.parse(b.start)
      ),
    };
  });

  if (sortedAttendees.length === 1) {
    return sortedAttendees[0].slots;
  }

  // Start with the first person's availability
  let result = sortedAttendees[0].slots;

  // Find intersections with each subsequent person
  for (let i = 1; i < sortedAttendees.length; i++) {
    result = findIntersectionsSorted(result, sortedAttendees[i].slots);

    // If no overlaps found, return empty array
    if (result.length === 0) {
      return [];
    }
  }

  return result;
};
