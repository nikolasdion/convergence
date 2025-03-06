import "dotenv/config";
import express from "express";
import ViteExpress from "vite-express";
import {
  getEvent,
  getEvents,
  createEvent,
  deleteEvent,
  updateEvent,
} from "./db/dbConnection.js";
import { ObjectId } from "mongodb";
import { i } from "framer-motion/client";
import { mockEvent1 } from "./mockData.js";

const app = express();

app.get("/api/events", async (req, res, next) => {
  console.log("GET /api/events");
  const events = await getEvents();
  res.send(events);
});

// Create new event
app.post("/api/events/new", async (req, res) => {
  console.log("POST /api/events/new");

  const newId = await createEvent(req.body.name, req.body.timezone);
  res.send({ id: newId });
});

// Read specific event
app.get("/api/events/:id", async (req, res, next) => {
  console.log("GET /api/events/" + req.params.id);
  const event = await getEvent(req.params.id);
  res.send(event);
});

// Update existing event
app.post("/api/events/:id", async (req, res, next) => {
  console.log("POST /api/events/" + req.params.id);
  await updateEvent(req.params.id, req.body);
  res.send("Updated event");
});

// Delete existing event
app.delete("/api/events/:id", async (req, res, next) => {
  console.log("DELETE /api/events/" + req.params.id);
  await deleteEvent(req.params.id);
  res.send(`Deleted event ${req.params.id}`);
});

app.get("/api/test/add", async (req, res, next) => {
  console.log("GET /api/test/add");
  const newIds: string[] = [];
  for (const i of [1, 2, 3, 4, 5]) {
    const event = {
      ...mockEvent1,
      name: `${mockEvent1?.name} + ${Math.random()}`,
    };
    const newId = await createEvent(event.name, event.timezone);
    await updateEvent(newId, event);
    newIds.push(newId);
  }
  res.send("");
});

app.get("/api/test/all", async (req, res, next) => {
  console.log("GET /api/test/all");

  const newEventId = await createEvent(
    "Microscope Session " + Math.random(),
    "Europe/London"
  );

  if (newEventId === null) {
    console.log("Failed to create new event");
    return;
  }

  console.log(newEventId);

  const updatedEventSlots = [
    {
      start: "2024-02-23T05:00:00Z",
      end: "2024-02-23T17:30:00Z",
    },
  ];

  const updatedAttendees: Attendee[] = [
    {
      _id: new ObjectId().toHexString(),
      slots: [
        {
          start: "2024-02-23T05:00:00Z",
          end: "2024-02-23T05:30:00Z",
        },
        {
          start: "2024-02-23T17:00:00Z",
          end: "2024-02-23T17:30:00Z",
        },
      ],
      name: "Bilbo",
    },
    {
      _id: new ObjectId().toHexString(),
      slots: [
        {
          start: "2024-02-23T06:00:00Z",
          end: "2024-02-23T06:30:00Z",
        },
        {
          start: "2024-02-23T17:00:00Z",
          end: "2024-02-23T17:30:00Z",
        },
      ],
      name: "Thorin",
    },
  ];

  const updatedName = "Updated Microscope Session";
  const updatedTimzeone = "Asia/Singapore";

  await updateEvent(newEventId, {
    name: updatedName,
    timezone: updatedTimzeone,
    slots: updatedEventSlots,
    attendees: updatedAttendees,
  });

  const newEvent = await getEvent(newEventId);
  res.send(newEvent);
});

ViteExpress.listen(app, 3000, () =>
  console.log("Server is listening on port 3000...")
);
