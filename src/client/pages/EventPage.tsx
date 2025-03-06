import { Button, Calendar } from "@heroui/react";
import {
  parseAbsoluteToLocal,
  getLocalTimeZone,
} from "@internationalized/date";
import { parse } from "path";
import { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router";

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

  const renderSlots = (slots: Slot[]) => {
    return slots.map((slot) => {
      return (
        <div>
          <p>Start: {slot.start}</p>
          <p>End: {slot.end}</p>
          <Calendar isReadOnly value={parseAbsoluteToLocal(slot.start)} />
        </div>
      );
    });
  };

  return (
    <div className="w-fit m-auto flex flex-col">
      <div>Timezone: {getLocalTimeZone()}</div>
      <Button color="danger" variant="ghost" onPress={onPressDelete}>
        Delete Event
      </Button>
      {JSON.stringify(event, undefined, 2)}
      {renderSlots(event?.slots ?? [])}
    </div>
  );
};

export default EventPage;
