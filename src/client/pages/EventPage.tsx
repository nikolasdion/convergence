import { Button, Code } from "@heroui/react";
import { getLocalTimeZone } from "@internationalized/date";
import { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router";
import SlotInputs from "../components/SlotInputs";
import {
  convertToDateTimeSlot,
  convertToStrSlot,
  DateTimeSlot,
} from "../lib/dateTime";

const EventPage: React.FC = () => {
  const { id } = useParams();
  const [event, setEvent] = useState<EventWithId>();

  const navigate = useNavigate();

  useEffect(() => {
    fetchEvent();
  }, []);

  const fetchEvent = async () => {
    const res = await fetch(`/api/events/${id}`);
    if (res?.ok) {
      setEvent((await res.json()) as EventWithId);
    }
  };

  const onPressDelete = async () => {
    await fetch(`/api/events/${id}`, { method: "DELETE" });
    navigate(`/`);
  };

  const renderSlots = () => {
    return (
      <SlotInputs
        slots={event ? event.slots.map(convertToDateTimeSlot) : []}
        onSlotsChange={(slots) =>
          setEvent({
            ...event,
            slots: slots.map(convertToStrSlot),
          } as EventWithId)
        }
      />
    );
  };

  return (
    <div className="w-fit m-auto flex flex-col">
      <h1>{event?.name}</h1>
      <div>Timezone: {getLocalTimeZone()}</div>
      <Button color="danger" variant="ghost" onPress={onPressDelete}>
        Delete Event
      </Button>
      <Code>{`${JSON.stringify(event, undefined, 2)}`}</Code>
      {renderSlots()}
    </div>
  );
};

export default EventPage;
