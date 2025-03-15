import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import EventForm from "../components/EventForm";
import { deleteEvent, fetchEvent, updateEvent } from "../lib/data";
import { addToast, Button } from "@heroui/react";
import PageTitle from "../components/PageTitle";

const EditEventPage: React.FC = () => {
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

  const onSubmit = async () => {
    if (!id) {
      addToast({ title: "Cannot update event: no ID supplied" });
      return;
    }

    const success = await updateEvent(id, event);
    if (success) {
      addToast({ title: "Event updated" });
      navigate(`/event/${id}/view`);
    } else {
      addToast({ title: "Failed to update event. Please try again." });
    }
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
      <PageTitle>Edit Event</PageTitle>
      <EventForm event={event} onEventChange={setEvent} onSubmit={onSubmit} />
      <Button onPress={onDelete}>Delete event</Button>
    </>
  );
};

export default EditEventPage;
