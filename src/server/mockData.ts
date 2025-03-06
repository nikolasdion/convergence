import { ObjectId } from "mongodb";

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
      _id: new ObjectId().toHexString(),
      name: "Aragorn",
      timezone: "Asia/Jakarta",
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
      _id: new ObjectId().toHexString(),
      name: "Gandalf",
      timezone: "Asia/Singapore",
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
    },
    {
      _id: new ObjectId().toHexString(),
      name: "Galadriel",
      timezone: "Europe/Paris",
      slots: [],
    },
  ],
};
