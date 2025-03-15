import { Button, Input } from "@heroui/react";
import SlotInputs from "./SlotInputs.js";
import {
  convertToDateTimeSlot,
  convertToStrSlot,
  DateTimeSlot,
} from "../lib/dateTime.js";
import { useState } from "react";

interface Props {
  attendee: Attendee;
  onAttendeeChange: (attendee: Attendee | null) => void;
}

const AttendeeEdit: React.FC<Props> = ({ attendee, onAttendeeChange }) => {
  const [editing, setEditing] = useState(false);
  const onPressDelete = () => {
    onAttendeeChange(null);
  };

  const onNameChange = (event: React.FormEvent<HTMLInputElement>) => {
    onAttendeeChange({ ...attendee, name: event.currentTarget.value });
  };

  const onSlotsChange = (slots: DateTimeSlot[]) => {
    onAttendeeChange({ ...attendee, slots: slots.map(convertToStrSlot) });
  };

  return (
    <div>
      {editing ? (
        <Button onPress={() => setEditing(false)}>Done</Button>
      ) : (
        <Button onPress={() => setEditing(true)}>Edit</Button>
      )}

      {editing && (
        <div className="grid grid-cols-2">
          <Input
            type="text"
            label="Name"
            value={attendee.name}
            onChange={onNameChange}
          />
          <Button color="danger" onPress={onPressDelete}>
            Remove attendee
          </Button>
        </div>
      )}

      <SlotInputs
        slots={attendee.slots.map(convertToDateTimeSlot)}
        onSlotsChange={onSlotsChange}
        readOnly={!editing}
      />
    </div>
  );
};

export default AttendeeEdit;
