import sql from "mssql";

const config: sql.config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER || "",
  port: parseInt(process.env.DB_PORT || "1443"),
  database: process.env.DB_NAME,
  // @ts-ignore
  authentication: {
    type: "default",
  },
  options: {
    encrypt: true,
  },
};

async function query<T>(query: string): Promise<T[]> {
  try {
    const poolConnection = await sql.connect(config);
    const result = await poolConnection.request().query(query);
    poolConnection.close();
    return result.recordset as T[];
  } catch (err: any) {
    console.error(err.message);
    return [];
  }
}

async function getEventSlots(event_id: string) {
  return await query<DbEventSlot>(
    `SELECT * from event_slot WHERE event_id='${event_id}'`
  );
}

export async function getEvents(): Promise<IEvent[]> {
  const dbEvents = await query<DbEvent>(`SELECT * from event`);
  const events = await Promise.all(
    dbEvents.map((e) => {
      return { ...e, slots: [] as string[], attendees: [] as Attendee[] };
    })
  );
  return events;
}

export async function getEvent(event_id: string): Promise<IEvent | null> {
  const dbEvents = await query<DbEvent>(
    `SELECT * from event WHERE id='${event_id}'`
  );

  if (!dbEvents[0]) {
    console.log(`Event not found with id ${event_id}`);
    return null;
  }

  const dbEventSlots = await getEventSlots(event_id);
  const slots = dbEventSlots.map((e) => e.slot);

  const dbAttendees = await getAttendees(event_id);
  const attendees = await Promise.all(
    dbAttendees.map(async (dbAttendee): Promise<Attendee> => {
      const dbAttendeeSlots = await getAttendeeSlots(event_id, dbAttendee.id);
      return {
        ...dbAttendee,
        slots: dbAttendeeSlots.map((s) => s.slot),
      };
    })
  );

  return { ...dbEvents[0], slots, attendees };
}

async function getAttendees(event_id: string) {
  return await query<DbAttendee>(
    `SELECT * FROM attendee WHERE event_id='${event_id}'`
  );
}

async function getAttendeeSlots(event_id: string, attendee_id: string) {
  return await query<DbAttendeeSlot>(
    `SELECT * FROM attendee_slot WHERE event_id='${event_id}' AND attendee_id='${attendee_id}'`
  );
}

export async function addAttendee(
  event_id: string,
  name: string,
  timezone: string
): Promise<string | null> {
  const queryString = `
    DECLARE @TempTable TABLE(id UNIQUEIDENTIFIER);
        INSERT INTO attendee (name, timezone, event_id)
    OUTPUT INSERTED.id INTO @TempTable
    VALUES ('${name}', '${timezone}', '${event_id}')

    SELECT id FROM @TempTable;
    `;
  const returnedTable = await query<{ id: string }[]>(queryString);

  if (returnedTable.length === 0) return null;

  //@ts-ignore TS being weird
  return returnedTable[0].id;
}

export async function addEvent(
  name: string,
  timezone: string
): Promise<string | null> {
  const queryString = `
    DECLARE @TempTable TABLE(id UNIQUEIDENTIFIER);
        INSERT INTO event (name, timezone)
    OUTPUT INSERTED.id INTO @TempTable
    VALUES ('${name}', '${timezone}')

    SELECT id FROM @TempTable;
    `;

  const returnedTable = await query<{ id: string }[]>(queryString);

  if (returnedTable.length === 0) return null;

  //@ts-ignore TS being weird
  return returnedTable[0];
}

export async function addEventSlots(event_id: string, slots: string[]) {
  const queryStrings = slots.map(
    (slot) => `
        INSERT INTO event_slot (event_id, slot)
        VALUES ('${event_id}', '${slot}')`
  );
  await query<any>(queryStrings.join("\n"));
}

export async function addAttendeeSlots(
  event_id: string,
  attendee_id: string,
  slots: string[]
) {
  const queryStrings = slots.map(
    (slot) => `
        INSERT INTO attendee_slot (event_id, attendee_id, slot)
        VALUES ('${event_id}', '${attendee_id}', '${slot}')`
  );
  await query<any>(queryStrings.join(`\n`));
}
