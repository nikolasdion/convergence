import { addToast } from "@heroui/react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import AttendeeForm from "../components/AttendeeForm";
import { createAttendee, fetchEvent } from "../lib/data";
import SlotsPreview from "../components/SlotsPreview";
import PageTitle from "../components/PageTitle";

const NewAttendeePage: React.FC = () => {
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

    setEvent({
      name: event.name,
      slots: event.slots,
      description: event.description,
      attendees: [],
    });
  };

  const onSubmit = async () => {
    const newId = await createAttendee(id ?? "", attendee);
    if (newId) {
      addToast({ title: "Added attendee" });
      navigate(`/event/${id}/view`);
    } else {
      addToast({ title: "Failed to add attendee. Please try again." });
    }
  };

  return (
    <>
      <PageTitle>New Attendee for "{event.name}"</PageTitle>
      <div className="bg-default-50 rounded-lg p-2 w-full my-2">
        <h2>Event slots</h2>
        <SlotsPreview slots={event.slots} />
      </div>
      <AttendeeForm
        attendee={attendee}
        onAttendeeChange={setAttendee}
        onSubmit={onSubmit}
      />
    </>
  );
};

export default NewAttendeePage;
