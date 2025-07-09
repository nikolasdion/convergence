import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

import EventForm from "../components/EventForm";
import { deleteEvent, fetchEvent, updateEvent } from "../lib/data";
import { addToast, Button } from "@heroui/react";
import PageTitle from "../components/PageTitle";
import LoadingSpinner from "../components/LoadingSpinner";

const EditEventPage: React.FC = () => {
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
      addToast({
        title: "Unable to fetch event: no ID supplied",
        color: "danger",
      });
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
        addToast({ title: "Failed to fetch event", color: "danger" });
        return;
      });
  }, []);

  const onSubmit = async () => {
    if (!id) {
      addToast({
        title: "Failed to update event: no ID supplied",
        color: "danger",
      });
      return;
    }

    try {
      await updateEvent(id, event);
      addToast({ title: "Event updated" });
      navigate(`/event/${id}/view`);
    } catch {
      addToast({
        title: "Failed to update event. Please try again.",
        color: "danger",
      });
    }
  };

  const onDelete = async () => {
    if (!id) {
      addToast({
        title: "Failed to delete event: no ID supplied",
        color: "danger",
      });
      return;
    }
    try {
      await deleteEvent(id);
      addToast({ title: "Event deleted", color: "success" });
      navigate(`/`);
    } catch {
      addToast({
        title: "Failed to delete event. Please try again.",
        color: "danger",
      });
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }
  return (
    <>
      <div className="flex flex-row align-middle gap-2 items-center justify-between">
        <PageTitle>Edit Event</PageTitle>
        <div className="flex gap-2">
          <Button
            onPress={onDelete}
            startContent={<ExclamationTriangleIcon className="size-6" />}
            color="danger"
          >
            Delete event
          </Button>
        </div>
      </div>

      <EventForm event={event} onEventChange={setEvent} onSubmit={onSubmit} />
    </>
  );
};

export default EditEventPage;
