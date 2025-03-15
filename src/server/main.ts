import "dotenv/config";
import express, { RequestHandler } from "express";
import { ObjectId } from "mongodb";
import ViteExpress from "vite-express";
import {
  createEvent,
  deleteEvent,
  getEvent,
  getEvents,
  updateEvent,
} from "./db/dbConnection.js";
import { mockEvent1 } from "./mockData.js";

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
  // await deleteEvent(req.params.id);
  res.send(`Deleted event ${req.params.id}`);
});
app.get("/api/event/:id/attendee/:attId", async (req, res) => {
  // await deleteEvent(req.params.id);
  res.send(`Deleted event ${req.params.id}`);
});
app.post("/api/event/:id/attendee/:attId", async (req, res) => {
  // await deleteEvent(req.params.id);
  res.send(`Deleted event ${req.params.id}`);
});
app.delete("/api/event/:id/attendee/:attId", async (req, res) => {
  // await deleteEvent(req.params.id);
  res.send(`Deleted event ${req.params.id}`);
});

// TEST APIS
app.get("/api/test/add", async (req, res, next) => {
  const newIds: string[] = [];
  for (const i of [1, 2, 3, 4, 5]) {
    const event = {
      ...mockEvent1,
      name: `${mockEvent1?.name} ${Math.random()}`,
    };
    const newId = await createEvent(event);
    await updateEvent(newId, event);
    newIds.push(newId);
  }
  res.send("");
});

app.get("/api/test/all", async (req, res, next) => {
  const newEventId = await createEvent({
    name: "Microscope Session " + Math.random(),
    timezone: "Europe/London",
    slots: [],
    attendees: [],
  });

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
