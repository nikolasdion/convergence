import { addToast, Button, Code } from "@heroui/react";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
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
    } else {
      addToast({
        title: "Failed to fetch event, please reload",
        color: "danger",
      });
    }
  };

  const onPressDelete = async () => {
    const res = await fetch(`/api/events/${id}`, { method: "DELETE" });
    if (res?.ok) {
      addToast({ title: "Successfully deleted event", color: "success" });
      navigate(`/`);
    } else {
      addToast({ title: "Failed to delete event", color: "danger" });
    }
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

  const updateEvent = async (event: EventWithId): Promise<boolean> => {
    const id = event._id;
    const eventWithoutId: EventWithoutId = { ...event };
    // @ts-ignore
    delete eventWithoutId._id;
    console.log(eventWithoutId);

    const res = await fetch(`/api/events/${id}`, {
      method: "POST",
      body: JSON.stringify(eventWithoutId),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res?.ok;
  };

  const onPressSave = async () => {
    if (!event) return;
    const success = await updateEvent(event);
    console.log(success);
    if (success) {
      addToast({
        title: "Successfully saved event",
        color: "success",
      });
      navigate(`/event/${id}`);
    } else {
      addToast({
        title: "Failed to save event",
        color: "danger",
      });
    }
  };

  return (
    <div className="w-auto max-w-5xl m-auto flex flex-col">
      <h1 className="text-3xl">{event?.name}</h1>
      <div>Timezone: {getLocalTimeZone()}</div>
      <div className="grid grid-cols-2">
        <Button
          color="success"
          variant="ghost"
          onPress={onPressSave}
          startContent={<CheckIcon />}
        >
          Save Event
        </Button>
        <Button
          color="danger"
          variant="ghost"
          onPress={onPressDelete}
          startContent={<XMarkIcon />}
        >
          Delete Event
        </Button>
      </div>

      {renderSlots()}
      {renderJson()}
    </div>
  );
};

export default EventPage;
