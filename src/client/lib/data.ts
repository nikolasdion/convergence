export const fetchEvent = async (id: string): Promise<EventWithId> => {
  const res = await fetch(`/api/event/${id}`);
  if (res?.ok) {
    return (await res.json()) as EventWithId;
  } else {
    throw new Error("Failed to fetch event");
  }
};

export const fetchAllEvents = async (): Promise<EventWithId[]> => {
  const res = await fetch(`/api/event/all`);
  if (res?.ok) {
    return (await res.json()) as EventWithId[];
  } else {
    throw new Error("Failed to fetch events");
  }
};

export const createEvent = async (event: EventWithoutId): Promise<string> => {
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
    throw new Error("Failed to create event");
  }
};

export const createAttendee = async (
  eventId: string,
  attendee: AttendeeWithoutId
): Promise<string> => {
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
    throw new Error("Failed to create attendee");
  }
};

export const updateEvent = async (
  id: string,
  event: EventWithoutId
): Promise<void> => {
  const res = await fetch(`/api/event/${id}`, {
    method: "POST",
    body: JSON.stringify(event),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (res?.ok) {
    return;
  } else {
    throw new Error("Failed to update event");
  }
};

export const updateAttendee = async (
  eventId: string,
  attendee: AttendeeWithId
): Promise<void> => {
  const res = await fetch(`/api/event/${eventId}/${attendee._id}`, {
    method: "POST",
    body: JSON.stringify(attendee),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (res?.ok) {
    return;
  } else {
    throw new Error("Failed to update event");
  }
};

export const deleteEvent = async (id: string): Promise<void> => {
  const res = await fetch(`/api/event/${id}`, {
    method: "DELETE",
  });
  if (res?.ok) {
    return;
  } else {
    throw new Error("Failed to update event");
  }
};

export const deleteAttendee = async (
  eventId: string,
  attendeeId: string
): Promise<void> => {
  const res = await fetch(`/api/event/${eventId}/attendee/${attendeeId}`, {
    method: "DELETE",
  });
  if (res?.ok) {
    return;
  } else {
    throw new Error("Failed to update event");
  }
};
