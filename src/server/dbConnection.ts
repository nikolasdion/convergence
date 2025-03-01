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

async function singleQuery<T>(query: string): Promise<T[]> {
  try {
    const poolConnection = await sql.connect(config);
    const result = await poolConnection.request().query(query);
    poolConnection.close();
    return result.recordset as T[];
  } catch (err: any) {
    console.error(`Query ${query} failed with message: ${err.message}`);
    throw err;
  }
}

async function multiQuery<T>(queries: string[]): Promise<T[][]> {
  try {
    const poolConnection = await sql.connect(config);
    const results = await Promise.all(
      queries.map(async (query): Promise<T[]> => {
        const result = await poolConnection.request().query(query);
        return result.recordset as T[];
      })
    );
    poolConnection.close();
    return results;
  } catch (err: any) {
    console.error(`Queries ${queries} failed with message: ${err.message}`);
    throw err;
  }
}

async function getEventSlots(event_id: string) {
  return await singleQuery<DbEventSlot>(
    `SELECT * from event_slot WHERE event_id='${event_id}'`
  );
}

export async function getEvents(): Promise<IEvent[]> {
  const dbEvents = await singleQuery<DbEvent>(`SELECT * from event`);
  const events = await Promise.all(
    dbEvents.map((e) => {
      return { ...e, slots: [] as string[], attendees: [] as Attendee[] };
    })
  );
  return events;
}

export async function getEvent(event_id: string): Promise<IEvent> {
  const poolConnection = await sql.connect(config);

  const { recordset: dbEvents } = await poolConnection
    .request()
    .query(`SELECT * from event WHERE id='${event_id}'`);

  if (!dbEvents[0]) {
    console.log(`Event not found with id ${event_id}`);
    throw new Error(`Event not found with id ${event_id}`);
  }

  const { recordset: dbEventSlots } = await poolConnection
    .request()
    .query(`SELECT * from event_slot WHERE event_id='${event_id}'`);

  const { recordset: dbAttendees } = await poolConnection
    .request()
    .query(`SELECT * FROM attendee WHERE event_id='${event_id}'`);

  const attendees = await Promise.all(
    dbAttendees.map(async (dbAttendee): Promise<Attendee> => {
      const { recordset: dbAttendeeSlots } = await poolConnection
        .request()
        .query(
          `SELECT * FROM attendee_slot WHERE event_id='${event_id}' AND attendee_id='${dbAttendee.id}'`
        );

      return {
        ...dbAttendee,
        slots: dbAttendeeSlots.map((s) => s.slot),
      };
    })
  );

  poolConnection.close();

  return { ...dbEvents[0], slots: dbEventSlots.map((e) => e.slot), attendees };
}

async function getAttendees(event_id: string) {
  return await singleQuery<DbAttendee>(
    `SELECT * FROM attendee WHERE event_id='${event_id}'`
  );
}

async function getAttendeeSlots(event_id: string, attendee_id: string) {
  return await singleQuery<DbAttendeeSlot>(
    `SELECT * FROM attendee_slot WHERE event_id='${event_id}' AND attendee_id='${attendee_id}'`
  );
}

export async function addAttendee(
  event_id: string,
  name: string,
  timezone: string
): Promise<{ id: string }> {
  const queryString = `
    DECLARE @TempTable TABLE(id UNIQUEIDENTIFIER);
        INSERT INTO attendee (name, timezone, event_id)
    OUTPUT INSERTED.id INTO @TempTable
    VALUES ('${name}', '${timezone}', '${event_id}')

    SELECT id FROM @TempTable;
    `;
  const returnedTable = await singleQuery<{ id: string }>(queryString);

  if (returnedTable.length === 0) {
    console.log(
      `New attendee '${name}' for ${event_id} possibly not created, server doesn't return an ID`
    );
    throw new Error(
      `New attendee '${name}' for ${event_id} possibly not created, server doesn't return an ID`
    );
  }

  return returnedTable[0];
}

export async function addEvent(
  name: string,
  timezone: string
): Promise<{ id: string }> {
  const queryString = `
    DECLARE @TempTable TABLE(id UNIQUEIDENTIFIER);
        INSERT INTO event (name, timezone)
    OUTPUT INSERTED.id INTO @TempTable
    VALUES ('${name}', '${timezone}')

    SELECT id FROM @TempTable;
    `;

  const returnedTable = await singleQuery<{ id: string }>(queryString);

  if (returnedTable.length === 0) {
    console.log(
      `New event '${name}' possibly not created, server doesn't return an ID`
    );
    throw new Error(
      `New event '${name}' possibly not created, server doesn't return an ID`
    );
  }

  return returnedTable[0];
}

export async function addEventSlots(event_id: string, slots: string[]) {
  const queryStrings = slots.map(
    (slot) => `
        INSERT INTO event_slot (event_id, slot)
        VALUES ('${event_id}', '${slot}')`
  );
  await singleQuery<any>(queryStrings.join("\n"));
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
  await singleQuery<any>(queryStrings.join(`\n`));
}

export async function deleteEvent(event_id: string) {
  const queryStrings = [
    `DELETE FROM event WHERE id='${event_id}'`,
    `DELETE FROM event_slot WHERE event_id='${event_id}'`,
    `DELETE FROM attendee WHERE event_id='${event_id}'`,
    `DELETE FROM attendee_slot WHERE event_id='${event_id}'`,
  ];
  multiQuery(queryStrings);
}
