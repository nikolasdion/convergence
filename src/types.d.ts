interface EventWithoutId {
  name: string;
  description?: string;
  timezone?: string;
  slots: Slot[];
  attendees: AttendeeWithId[];
}

interface EventWithId extends EventWithoutId {
  _id: string;
}

interface AttendeeWithoutId {
  name: string;
  slots: Slot[];
  timezone?: string;
  comment?: string;
}

interface AttendeeWithId extends AttendeeWithoutId {
  _id: string;
}

interface Slot {
  start: string;
  end: string;
}

interface CreateResult {
  id: string;
}
