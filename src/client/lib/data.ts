export const fetchEvent = async (id: string): Promise<EventWithId | null> => {
  const res = await fetch(`/api/event/${id}`);
  if (res?.ok) {
    return (await res.json()) as EventWithId;
  } else {
    return null;
  }
};

export const fetchEvents = async (): Promise<EventWithId[]> => {
  const res = await fetch(`/api/event/`);
  if (res?.ok) {
    return (await res.json()) as EventWithId[];
  } else {
    return [] as EventWithId[];
  }
};
