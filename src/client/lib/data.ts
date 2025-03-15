export const fetchEvent = async (id: string): Promise<EventWithId | null> => {
  const res = await fetch(`/api/event/${id}`);
  if (res?.ok) {
    return (await res.json()) as EventWithId;
  } else {
    return null;
  }
};

export const fetchEvents = async (): Promise<EventWithId[]> => {
  const res = await fetch(`/api/event/all`);
  if (res?.ok) {
    return (await res.json()) as EventWithId[];
  } else {
    return [] as EventWithId[];
  }
};

export const createEvent = async (
  event: EventWithoutId
): Promise<string | undefined> => {
  const res = await fetch(`/api/event/`, {
    method: "POST",
    body: JSON.stringify(event),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (res?.ok) {
    const id = (await res.json()).id as string;
    return id;
  } else {
    return undefined;
  }
};

export const createAttendee = async (
  eventId: string,
  attendee: AttendeeWithoutId
): Promise<string | undefined> => {
  const res = await fetch(`/api/event/${eventId}/attendee/`, {
    method: "POST",
    body: JSON.stringify(attendee),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (res?.ok) {
    const id = (await res.json()).id as string;
    return id;
  } else {
    return undefined;
  }
};

export const updateEvent = async (
  id: string,
  event: EventWithoutId
): Promise<boolean> => {
  const res = await fetch(`/api/event/${id}`, {
    method: "POST",
    body: JSON.stringify(event),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res?.ok;
};

export const updateAttendee = async (
  eventId: string,
  attendee: AttendeeWithId
): Promise<boolean> => {
  const res = await fetch(`/api/event/${eventId}/${attendee._id}`, {
    method: "POST",
    body: JSON.stringify(attendee),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res?.ok;
};

export const deleteEvent = async (id: string): Promise<boolean> => {
  const res = await fetch(`/api/event/${id}`, {
    method: "DELETE",
  });
  return res?.ok;
};

export const deleteAttendee = async (
  eventId: string,
  attendeeId: string
): Promise<boolean> => {
  const res = await fetch(`/api/event/${eventId}/attendee/${attendeeId}`, {
    method: "DELETE",
  });
  return res?.ok;
};
