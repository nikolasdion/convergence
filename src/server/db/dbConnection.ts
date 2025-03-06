import { ObjectId } from "mongodb";
import client from "./mongodb.js";

const DB_NAME = "convergence_db";
const COLLECTION_NAME = "events";

export async function getEvents(): Promise<EventWithId[]> {
  const mongoClient = await client.connect();
  const cursor = mongoClient.db(DB_NAME).collection(COLLECTION_NAME).find();
  const result = await cursor.toArray();
  return result as any as EventWithId[];
}

export async function getEvent(id: string): Promise<EventWithId> {
  const mongoClient = await client.connect();
  const result = await mongoClient
    .db(DB_NAME)
    .collection(COLLECTION_NAME)
    .findOne({ _id: new ObjectId(id) });
  // TODO define schema
  return result as unknown as EventWithId;
}

export async function createEvent(
  name: string,
  timezone?: string
): Promise<string> {
  const newEvent = {
    name,
    timezone,
    slots: [],
    attendees: [],
  };
  const mongoClient = await client.connect();
  const result = await mongoClient
    .db(DB_NAME)
    .collection(COLLECTION_NAME)
    .insertOne(newEvent);

  return result.insertedId.toHexString();
}

export async function updateEvent(
  id: string,
  event: EventWithoutId
): Promise<void> {
  const mongoClient = await client.connect();
  const result = await mongoClient
    .db(DB_NAME)
    .collection(COLLECTION_NAME)
    .updateOne(
      { _id: new ObjectId(id) },
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
}

export async function deleteEvent(id: string): Promise<void> {
  const mongoClient = await client.connect();
  const result = await mongoClient
    .db(DB_NAME)
    .collection(COLLECTION_NAME)
    .deleteOne({ _id: new ObjectId(id) });
  if (result.acknowledged) {
    return;
  } else {
    throw new Error(`Failed to delete event with id ${id}`);
  }
}
