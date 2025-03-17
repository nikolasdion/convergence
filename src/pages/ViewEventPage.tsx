import { addToast, Button, Code } from "@heroui/react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { deleteEvent, fetchEvent } from "../lib/data";
import PageTitle from "../components/PageTitle";
import EventPreview from "../components/EventPreview";
import AttendeesPreview from "../components/AttendeesPreview";
import LoadingSpinner from "../components/LoadingSpinner";

const ViewEventPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();
  const { id } = useParams();

  const [event, setEvent] = useState<EventWithoutId>({
    name: "",
    slots: [],
    attendees: [],
  });

  useEffect(() => {
    if (!id) {
      addToast({ title: "Cannot fetch event: no ID supplied" });
      return;
    }

    fetchEvent(id)
      .then(async (event) => {
        // @ts-ignore
        delete event._id;
        setEvent(event);
        setIsLoading(false);
      })
      .catch(() => {
        addToast({ title: "Failed to fetch event" });
        return;
      });
  }, []);

  const onEditPress = () => {
    navigate(`/event/${id}/edit`);
  };

  const onAddAttendeePress = () => {
    navigate(`/event/${id}/attend`);
  };

  const onDelete = async () => {
    if (!id) {
      addToast({ title: "Cannot delete event: no ID supplied" });
      return;
    }
    try {
      await deleteEvent(id);
      addToast({ title: "Event deleted" });
      navigate(`/`);
    } catch {
      addToast({ title: "Failed to delete event. Please try again." });
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }
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
