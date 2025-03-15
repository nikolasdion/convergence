import SlotsPreview from "./SlotsPreview";

interface Props {
  attendees: AttendeeWithId[];
}

const AttendeesPreview: React.FC<Props> = ({ attendees }) => {
  const renderAttendees = () => {
    return attendees.map((attendee) => {
      return (
        <div key={attendee._id}>
          <h3>{attendee.name}</h3>
          <h4>Slots</h4>
          <SlotsPreview slots={attendee.slots} />
        </div>
      );
    });
  };

  return (
    <>
      <h2>Attendees</h2>
      {renderAttendees()}
    </>
  );
};

export default AttendeesPreview;
