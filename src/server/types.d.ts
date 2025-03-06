interface EventWithoutId {
  name?: string;
  timezone?: string;
  slots: Slot[];
  attendees: Attendee[];
}

interface EventWithId extends EventWithoutId {
  _id: string;
}

interface Attendee {
  _id: string;
  name?: string;
  slots: Slot[];
  timezone?: string;
}

interface Slot {
  start: string;
  end: string;
}

interface CreateResult {
  id: string;
}
