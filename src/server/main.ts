import "dotenv/config";
import express, { RequestHandler } from "express";
import ViteExpress from "vite-express";
import {
  createAttendee,
  createEvent,
  deleteAll,
  deleteAttendee,
  deleteEvent,
  getEvent,
  getEvents,
  updateAttendee,
  updateEvent,
} from "./db/dbConnection.js";
import { mockEvent1 } from "./mockData.js";
import { nanoid } from "nanoid";

const loggerMiddleware: RequestHandler = (req, _res, next) => {
  const url = req.url;
  if (url.startsWith("/api")) {
    console.log(`${req.method} ${url}`);
  }
  next();
};

const app = express();
app.use(express.json());
app.use(loggerMiddleware);

// MISC APIS
app.get("/api/event/all", async (req, res, next) => {
  const events = await getEvents();
  res.send(events);
});

// EVENT API - CRUD
app.post("/api/event/", async (req, res) => {
  const newId = await createEvent(req.body);
  res.send({ id: newId });
});
app.get("/api/event/:id", async (req, res) => {
  const event = await getEvent(req.params.id);
  res.send(event);
});
app.post("/api/event/:id", async (req, res) => {
  await updateEvent(req.params.id, req.body);
  res.send("Updated event");
});
app.delete("/api/event/:id", async (req, res) => {
  await deleteEvent(req.params.id);
  res.send(`Deleted event ${req.params.id}`);
});

// ATTENDEE API - CRUD
app.post("/api/event/:id/attendee", async (req, res) => {
  const newId = await createAttendee(req.params.id, req.body);
  res.send({ id: newId });
});
app.get("/api/event/:id/attendee/:attId", async (req, res) => {
  // TODO IF WE NEED AT ALL
  // const event = await getEvent(req.params.id);
  // res.send(event);
});
app.post("/api/event/:id/attendee/:attId", async (req, res) => {
  await updateAttendee(req.params.id, { ...req.body, _id: req.params.attId });
  res.send(`Updated attendee`);
});
app.delete("/api/event/:id/attendee/:attId", async (req, res) => {
  await deleteAttendee(req.params.id, req.params.attId);
  res.send(`Deleted attendee ${req.params.id}`);
});

// TEST APIS
app.get("/api/test/add", async (req, res, next) => {
  const newIds: string[] = [];
  for (const i of [1, 2, 3, 4, 5]) {
    const event = {
      ...mockEvent1,
      name: `${mockEvent1?.name} ${Math.floor(Math.random() * 100)}`,
    };
    const newId = await createEvent(event);
    await updateEvent(newId, event);
    newIds.push(newId);
  }
  res.send("");
});

app.get("/api/test/all", async (req, res, next) => {
  const newEventId = await createEvent({
    name: "Microscope Session " + Math.floor(Math.random() * 100),
    timezone: "Europe/London",
    slots: [],
    attendees: [],
  });

  if (newEventId === null) {
    console.log("Failed to create new event");
    return;
  }

  const updatedName = "Updated Microscope Session";
  const updatedTimzeone = "Asia/Singapore";
  const updatedEventSlots = [
    {
      start: "2024-02-23T05:00:00Z",
      end: "2024-02-23T17:30:00Z",
    },
  ];

  await updateEvent(newEventId, {
    name: updatedName,
    timezone: updatedTimzeone,
    slots: updatedEventSlots,
    attendees: [],
  });

  const bilboId = await createAttendee(newEventId, {
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
  });

  const thorinId = await createAttendee(newEventId, {
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
  });

  await updateAttendee(newEventId, {
    _id: bilboId,
    name: "Bilbo updated",
    slots: [
      {
        start: "2024-02-23T23:00:00Z",
        end: "2024-02-23T23:30:00Z",
      },
    ],
  });

  await deleteAttendee(newEventId, thorinId);

  const newEvent = await getEvent(newEventId);
  res.send(newEvent);
});

app.get("/api/test/delete-all", async (req, res) => {
  await deleteAll();
  res.send("DELETED ALL EVENTS");
});

ViteExpress.listen(app, 3000, () =>
  console.log("Server is listening on port 3000...")
);
