import { Button, Calendar } from "@heroui/react";
import {
  parseAbsoluteToLocal,
  getLocalTimeZone,
} from "@internationalized/date";
import { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router";

const EventPage: React.FC = () => {
  const { id } = useParams();
  const [event, setEvent] = useState<IEvent>();
  const navigate = useNavigate();

  useEffect(() => {
    fetchEvent();
  }, []);

  const fetchEvent = async () => {
    const res = await fetch(`/api/event/${id}`);
    if (res?.ok) {
      setEvent((await res.json()) as IEvent);
    }
  };

  const onPressDelete = async () => {
    await fetch(`/api/event/${id}`, { method: "DELETE" });
    navigate(`/`);
  };

  const renderSlots = (slots: string[]) => {
    return slots.map((slot) => {
      return (
        <div>
          <p>{slot}</p>
          <Calendar isReadOnly value={parseAbsoluteToLocal(slot)} />
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
      {JSON.stringify(event)}
      {renderSlots(event?.slots ?? [])}
    </div>
  );
};

export default EventPage;
