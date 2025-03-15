import { nanoid } from "nanoid";

export const mockEvent1: EventWithoutId = {
  name: "The Fellowship",
  timezone: "Europe/London",
  slots: [
    {
      start: "2025-05-23T18:00:00Z",
      end: "2025-05-27T18:00:00Z",
    },
  ],
  attendees: [
    {
      _id: nanoid(8),
      name: "Aragorn",
      slots: [
        {
          start: "2025-05-23T18:00:00Z",
          end: "2025-05-23T21:00:00Z",
        },
        {
          start: "2025-05-24T18:00:00Z",
          end: "2025-05-24T21:00:00Z",
        },
        {
          start: "2025-05-26T09:00:00Z",
          end: "2025-05-26T12:00:00Z",
        },
        {
          start: "2025-05-26T14:00:00Z",
          end: "2025-05-26T16:00:00Z",
        },
      ],
    },
    {
      _id: nanoid(8),
      name: "Gandalf",
      slots: [
        {
          start: "2025-05-23T18:00:00Z",
          end: "2025-05-23T23:00:00Z",
        },
        {
          start: "2025-05-24T18:00:00Z",
          end: "2025-05-24T23:00:00Z",
        },
        {
          start: "2025-05-26T14:00:00Z",
          end: "2025-05-26T20:00:00Z",
        },
      ],
      comment:
        "A wizard is never late. Nor is he early; he arrives precisely when he means to.",
    },
    {
      _id: nanoid(8),
      name: "Galadriel",
      timezone: "Europe/Paris",
      comment: "Can't make it, busy turning photonegative",
      slots: [],
    },
  ],
};
