import "dotenv/config";
import express from "express";
import ViteExpress from "vite-express";
import {
  addEvent,
  addEventSlots,
  addAttendee,
  addAttendeeSlots,
  getEvent,
  getEvents,
  deleteEvent,
} from "./dbConnection.js";

const app = express();

app.get("/api/events", async (req, res, next) => {
  console.log("/api/events");
  const events = await getEvents();
  res.send(events);
});

// Create new event
app.post("/api/event", async (req, res) => {
  const newId = await addEvent(req.body.name, req.body.timezone);
  res.send(newId);
});

// get specific event
app.get("/api/event/:id", async (req, res, next) => {
  const event = await getEvent(req.params.id);
  res.send(event);
});

// Update existing event
app.post("/api/event/:id/", async (req, res, next) => {
  // Error handling!
  if (req.body.slots) {
    await addEventSlots(req.params.id, req.body.timezone);
  }
  if (req.body.timezone) {
    // TODO
  }
  if (req.body.name) {
    // TODO
  }
  res.send("OK");
});

app.delete("/api/event/:id", async (req, res, next) => {
  await deleteEvent(req.params.id);
  res.send(`Deleted event ${req.params.id}`);
});

// Create new attendee
app.post("/api/attendee", async (req, res, next) => {
  const newId = await addAttendee(
    req.body.event_id,
    req.body.name,
    req.body.timezone
  );
  res.send(newId);
});

// Update existing attendee
app.post("/api/attendee/:id", async (req, res, next) => {
  if (req.body.slots) {
    await addAttendeeSlots(req.body.event_id, req.params.id, req.body.timezone);
  }
  // TODO updating other parts
  res.send("OK");
});

app.get("/api/test-all", async (req, res, next) => {
  const { id: newEventId } = await addEvent(
    "Microscope Session",
    "Europe/London"
  );

  if (newEventId === null) {
    console.log("Failed to create new event");
    return;
  }

  console.log(newEventId);

  const newEventSlots = ["2024-02-23T05:00:00Z", "2024-02-23T05:30:00Z"];

  await addEventSlots(newEventId, newEventSlots);

  const { id: attendeeOneId } = await addAttendee(
    newEventId,
    "Galadriel",
    "Europe/Paris"
  );
  if (attendeeOneId === null) {
    console.log("Failed to create new attendee");
    return;
  }

  const attendeeOneSlots = ["2024-02-23T05:00:00Z"];
  await addAttendeeSlots(newEventId, attendeeOneId, attendeeOneSlots);

  const { id: attendeeTwoId } = await addAttendee(
    newEventId,
    "Elrond",
    "Europe/Rivendell"
  );
  if (attendeeTwoId === null) {
    console.log("Failed to create new attendee");
    return;
  }

  const attendeeTwoSlots = ["2024-02-23T05:00:00Z"];
  await addAttendeeSlots(newEventId, attendeeTwoId, attendeeTwoSlots);

  const newEvent = await getEvent(newEventId);
  res.send(newEvent);
});

ViteExpress.listen(app, 3000, () =>
  console.log("Server is listening on port 3000...")
);
