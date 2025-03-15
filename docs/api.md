# API Design

## Frontend

// New Event - can add name, time slots
/event/new/

// View Event - View event AND Convergence of timing
/event/view/:id/

// Edit Event - can edit namem time slots, delete
/event/edit/:id/

// Add new attendee - can add name, time slots
/event/attend/:id/

// Edit attendance - can edit time slots, name, or delete
/event/attend/:id/edit/:attendee-id

## Backend

```
// MISC

GET /api/event/all


// EVENTS

// CREATE
POST /api/event/

// READ
GET /api/event/:id

// UPDATE
PUT /api/event/:id

// DELETE
DELETE /api/event/:id


// ATTENDEES

// CREATE
POST /api/event/:id/attendee

// READ
GET /api/event/:id/attendee/:att-id

//UPDATE
PUT /api/event/:id/attendee/:att-id

// DELETE
DELETE /api/event/:id/attendee/:att-id

```
