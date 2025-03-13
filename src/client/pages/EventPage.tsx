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

  const renderJson = () => (
    <Code className="text-wrap text-gray-600 text-xs mt-3 absolute bottom-5 ">{`${JSON.stringify(
      event,
      undefined,
      2
    )}`}</Code>
  );

  return (
    <div className="w-auto max-w-5xl m-auto flex flex-col">
      <h1 className="text-3xl">{event?.name}</h1>
      <div>Timezone: {getLocalTimeZone()}</div>
      <Button color="danger" variant="ghost" onPress={onPressDelete}>
        Delete Event
      </Button>
      {renderSlots()}
      {renderJson()}
    </div>
  );
};

export default EventPage;
