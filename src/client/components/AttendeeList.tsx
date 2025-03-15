import { Accordion, AccordionItem, Button } from "@heroui/react";
import AttendeeEdit from "./AttendeeEdit";

interface Props {
  attendees: Attendee[];
  onAttendeesChange: (attendees: Attendee[]) => void;
}

const AttendeeList: React.FC<Props> = ({ attendees, onAttendeesChange }) => {
  const addAttendee = () => {
    attendees.push({
      _id: self.crypto.randomUUID(),
      name: "",
      slots: [],
    });
    onAttendeesChange(attendees);
  };
  return (
    <>
      <Accordion isCompact variant="splitted">
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
            <AccordionItem key={index} title={attendee.name}>
              <AttendeeEdit
                attendee={attendee}
                onAttendeeChange={onAttendeeChange}
              />
            </AccordionItem>
          );
        })}
      </Accordion>
      <Button onPress={addAttendee}>Add new attendee</Button>
    </>
  );
};

export default AttendeeList;
