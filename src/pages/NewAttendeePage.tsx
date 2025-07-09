import { addToast } from "@heroui/react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import AttendeeForm from "../components/AttendeeForm";
import { createAttendee, fetchEvent } from "../lib/data";
import PageTitle from "../components/PageTitle";
import EventPreview from "../components/EventPreview";
import LoadingSpinner from "../components/LoadingSpinner";

const NewAttendeePage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();
  const [event, setEvent] = useState<EventWithoutId>({
    name: "",
    slots: [],
    attendees: [],
  });
  const [attendee, setAttendee] = useState<AttendeeWithoutId>({
    name: "",
    slots: [],
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
        title: "Unable to add attendee: no ID supplied",
        color: "danger",
      });
      return;
    }
    try {
      await createAttendee(id ?? "", attendee);
      addToast({ title: "Added attendee" });
      navigate(`/event/${id}/view`);
    } catch {
      addToast({
        title: "Failed to add attendee. Please try again.",
        color: "danger",
      });
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }
  return (
    <>
      <PageTitle>New Attendee for "{event.name}"</PageTitle>
      <EventPreview event={event} />
      <AttendeeForm
        attendee={attendee}
        onAttendeeChange={setAttendee}
        onSubmit={onSubmit}
      />
    </>
  );
};

export default NewAttendeePage;
