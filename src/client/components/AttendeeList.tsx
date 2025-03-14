import AttendeeView from "./AttendeeView";

interface Props {
  attendees: Attendee[];
  onAttendeesChange: (attendees: Attendee[]) => void;
}

const AttendeeList: React.FC<Props> = ({ attendees, onAttendeesChange }) => {
  return (
    <>
      {attendees.map((attendee, index) => {
        const onAttendeeChange = (updatedAttendee: Attendee | null) => {
          const newAttendees = [...attendees];
          if (updatedAttendee) {
            newAttendees[index] = updatedAttendee;
          } else {
            newAttendees.splice(index, 1);
          }
          onAttendeesChange(newAttendees);
        };
        return (
          <AttendeeView
            attendee={attendee}
            onAttendeeChange={onAttendeeChange}
          />
        );
      })}
    </>
  );
};

export default AttendeeList;
