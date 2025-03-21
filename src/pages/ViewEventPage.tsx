import { addToast, Button } from "@heroui/react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { deleteEvent, fetchEvent } from "../lib/data";
import PageTitle from "../components/PageTitle";
import EventPreview from "../components/EventPreview";
import AttendeesPreview from "../components/AttendeesPreview";
import LoadingSpinner from "../components/LoadingSpinner";
import {
  ExclamationTriangleIcon,
  PencilIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";

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
      addToast({
        title: "Cannot fetch event: no ID supplied",
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

  const onEditPress = () => {
    navigate(`/event/${id}/edit`);
  };

  const onAddAttendeePress = () => {
    navigate(`/event/${id}/attend`);
  };

  const onDelete = async () => {
    if (!id) {
      addToast({
        title: "Cannot delete event: no ID supplied",
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
        <PageTitle>{event.name}</PageTitle>
        <div className="flex gap-2">
          <Button
            startContent={<PlusIcon className="size-6" />}
            onPress={onAddAttendeePress}
            color="secondary"
          >
            New attendee
          </Button>
          <Button
            startContent={<PencilIcon className="size-6" />}
            onPress={onEditPress}
            color="primary"
          >
            Edit event
          </Button>
          <Button
            onPress={onDelete}
            startContent={<ExclamationTriangleIcon className="size-6" />}
            color="danger"
          >
            Delete event
          </Button>
        </div>
      </div>

      <EventPreview event={event} />

      <AttendeesPreview attendees={event.attendees} />
    </>
  );
};

export default ViewEventPage;
