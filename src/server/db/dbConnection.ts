import { nanoid } from "nanoid";
import client from "./mongodb.js";

const DB_NAME = "convergence_db";
const COLLECTION_NAME = "events";

function newId() {
  return nanoid(8);
}

export async function getEvents(): Promise<EventWithId[]> {
  try {
    const mongoClient = await client.connect();
    const cursor = mongoClient.db(DB_NAME).collection(COLLECTION_NAME).find();
    const result = await cursor.toArray();
    return result as any as EventWithId[];
  } finally {
    await client.close();
  }
}

export async function getEvent(id: string): Promise<EventWithId> {
  try {
    const mongoClient = await client.connect();
    const result = await mongoClient
      .db(DB_NAME)
      .collection(COLLECTION_NAME)
      .findOne({ _id: id });
    // TODO define schema
    return result as unknown as EventWithId;
  } finally {
    await client.close();
  }
}

export async function createEvent(event: EventWithoutId): Promise<string> {
  try {
    const id = newId();
    const newEvent = { ...event, _id: id };
    const mongoClient = await client.connect();
    const result = await mongoClient
      .db(DB_NAME)
      .collection(COLLECTION_NAME)
      .insertOne(newEvent);

    return id;
  } finally {
    await client.close();
  }
}

export async function updateEvent(
  id: string,
  event: EventWithoutId
): Promise<void> {
  console.log(event);
  try {
    const mongoClient = await client.connect();
    const result = await mongoClient
      .db(DB_NAME)
      .collection(COLLECTION_NAME)
      .updateOne(
        { _id: id },
        {
          $set: {
            ...event,
          },
        }
      );
    if (result.acknowledged) {
      return;
    } else {
      throw new Error(`Failed to update event with id ${id}`);
    }
  } finally {
    await client.close();
  }
}

export async function deleteEvent(id: string): Promise<void> {
  try {
    const mongoClient = await client.connect();
    const result = await mongoClient
      .db(DB_NAME)
      .collection(COLLECTION_NAME)
      .deleteOne({ _id: id });
    if (result.acknowledged) {
      return;
    } else {
      throw new Error(`Failed to delete event with id ${id}`);
    }
  } finally {
    await client.close();
  }
}

export async function createAttendee(
  eventId: string,
  attendee: AttendeeWithoutId
): Promise<string> {
  try {
    const attId = newId();
    const newAttendee = { ...attendee, _id: attId };

    const mongoClient = await client.connect();
    const result = await mongoClient
      .db(DB_NAME)
      .collection(COLLECTION_NAME)
      .updateOne(
        { _id: eventId },
        {
          $push: {
            attendees: newAttendee,
          },
        }
      );

    if (result.acknowledged) {
      return attId;
    } else {
      throw new Error("Failed to add attendee");
    }
  } finally {
    await client.close();
  }
}

// TODO DOESN"T WORK!!
export async function updateAttendee(
  eventId: string,
  attendee: AttendeeWithId
): Promise<void> {
  try {
    const mongoClient = await client.connect();
    const result = await mongoClient
      .db(DB_NAME)
      .collection(COLLECTION_NAME)
      .updateOne(
        { _id: eventId },
        {
          $set: {
            "attendees.$[element]": attendee,
          },
        },
        {
          arrayFilters: [{ element: { _id: attendee._id } }],
        }
      );
    if (result.acknowledged) {
      return;
    } else {
      throw new Error(`Failed to update attendee with id ${attendee._id}`);
    }
  } finally {
    await client.close();
  }
}

export async function deleteAttendee(
  eventId: string,
  attendeeId: string
): Promise<void> {
  try {
    const mongoClient = await client.connect();
    const result = await mongoClient
      .db(DB_NAME)
      .collection(COLLECTION_NAME)
      .updateOne(
        { _id: eventId },
        {
          $pull: {
            attendees: { _id: attendeeId },
          },
        }
      );
    if (result.acknowledged) {
      return;
    } else {
      throw new Error(`Failed to delete attendee with id ${attendeeId}`);
    }
  } finally {
    await client.close();
  }
}

export async function deleteAll(): Promise<void> {
  try {
    const mongoClient = await client.connect();
    const result = await mongoClient
      .db(DB_NAME)
      .collection(COLLECTION_NAME)
      .deleteMany();
    if (result.acknowledged) {
      return;
    } else {
      throw new Error(`Failed to delete all events`);
    }
  } finally {
    await client.close();
  }
}
