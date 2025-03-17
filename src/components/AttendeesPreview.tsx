import SlotsPreview from "./SlotsPreview.js";

interface Props {
  attendees: AttendeeWithId[];
}

const AttendeesPreview: React.FC<Props> = ({ attendees }) => {
  const renderAttendees = () => {
    return attendees.map((attendee) => {
      return (
        <div key={attendee._id}>
          <h3 className="text-lg">{attendee.name}</h3>
          {attendee.comment && (
            <p className="italic font-serif text-xs">"{attendee.comment}"</p>
          )}
          <h4>Availability:</h4>
          <SlotsPreview slots={attendee.slots} />
        </div>
      );
    });
  };

  return (
    <div className="bg-foreground-900 bg-opacity-10 rounded-lg p-4 w-full my-2">
      <h2>Attendees</h2>
      {renderAttendees()}
    </div>
  );
};

export default AttendeesPreview;
