interface DbEvent {
  id: string;
  name: string;
  timezone: string;
}

interface DbEventSlot {
  event_id: string;
  slot: string;
}

interface DbAttendee {
  id: string;
  name: string;
  timezone: string;
}

interface DbAttendeeSlot {
  attendee_id: string;
  event_id: string;
  slot: string;
}

interface IEvent {
  id: string;
  name: string;
  timezone: string;
  slots: string[];
  attendees: Attendee[];
}

interface Attendee {
  id: string;
  name: string;
  slots: string[];
  timezone: string;
}
