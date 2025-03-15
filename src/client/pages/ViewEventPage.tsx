import { addToast, Button, Code } from "@heroui/react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { deleteEvent, fetchEvent } from "../lib/data";
import SlotsPreview from "../components/SlotsPreview";
import PageTitle from "../components/PageTitle";
import EventPreview from "../components/EventPreview";
import AttendeesPreview from "../components/AttendeesPreview";

const ViewEventPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [event, setEvent] = useState<EventWithoutId>({
    name: "",
    slots: [],
    attendees: [],
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    if (!id) {
      addToast({ title: "Cannot fetch event: no ID supplied" });
      return;
    }

    const event = await fetchEvent(id);

    if (!event) {
      addToast({ title: "Failed to fetch event" });
      return;
    }

    // @ts-ignore
    delete event._id;
    setEvent(event);
  };

  const onEditPress = () => {
    navigate(`/event/${id}/edit`);
  };

  const onAddAttendeePress = () => {
    navigate(`/event/${id}/attend`);
  };

  const renderAttendees = () => {
    return event.attendees.map((attendee) => {
      return (
        <div key={attendee._id}>
          <h3>{attendee.name}</h3>
          <h4>Slots</h4>
          <SlotsPreview slots={attendee.slots} />
        </div>
      );
    });
  };

  const onDelete = async () => {
    if (!id) {
      addToast({ title: "Cannot delete event: no ID supplied" });
      return;
    }
    const success = await deleteEvent(id);
    if (success) {
      addToast({ title: "Event deleted" });
      navigate(`/`);
    } else {
      addToast({ title: "Failed to delete event. Please try again." });
    }
  };

  return (
    <>
      <div className="flex flex-row align-middle gap-2 items-center justify-between">
        <PageTitle>{event.name}</PageTitle>
        <div className="flex gap-2">
          <Button onPress={onEditPress}>Edit event</Button>
          <Button onPress={onDelete}>Delete event</Button>
        </div>
      </div>

      <EventPreview event={event} />

      <AttendeesPreview attendees={event.attendees} />
      <Button onPress={onAddAttendeePress}>Add new attendee</Button>
    </>
  );
};

export default ViewEventPage;
