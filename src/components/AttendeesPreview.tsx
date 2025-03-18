import SlotsPreview from "./SlotsPreview.js";

interface Props {
  attendees: AttendeeWithId[];
}

const AttendeesPreview: React.FC<Props> = ({ attendees }) => {
  const renderAttendees = () => {
    return attendees.map((attendee) => {
      return (
        <div key={attendee._id}>
          <h3 className="font-bold">{attendee.name}</h3>
          {attendee.comment && (
            <p className="italic text-xs">"{attendee.comment}"</p>
          )}
          <SlotsPreview slots={attendee.slots} />
        </div>
      );
    });
  };

  return (
    <div className="border-solid border-2 border-default-300 rounded-lg p-4 w-full my-2">
      <h2 className="text-lg pb-4">Attendees</h2>
      {renderAttendees()}
    </div>
  );
};

export default AttendeesPreview;
