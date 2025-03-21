import { useState } from "react";
import { useNavigate } from "react-router";
import EventForm from "../components/EventForm";
import { createEvent } from "../lib/data";
import { addToast } from "@heroui/react";
import PageTitle from "../components/PageTitle";

const NewEventPage: React.FC = () => {
  const [event, setEvent] = useState<EventWithoutId>({
    name: "",
    slots: [],
    attendees: [],
  });

  const navigate = useNavigate();

  const onSubmit = async () => {
    const newId = await createEvent(event);
    console.log(newId);
    if (newId) {
      addToast({ title: "Event created", color: "success" });
      navigate(`/event/${newId}/view`);
    } else {
      addToast({
        title: "Failed to create event. Please try again.",
        color: "danger",
      });
    }
  };

  return (
    <>
      <PageTitle>Create new event</PageTitle>
      <EventForm event={event} onEventChange={setEvent} onSubmit={onSubmit} />
    </>
  );
};

export default NewEventPage;
