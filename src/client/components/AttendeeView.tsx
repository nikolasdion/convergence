import { XMarkIcon } from "@heroicons/react/24/outline";
import { Button, Input } from "@heroui/react";
import { useState } from "react";
import SlotInputs from "./SlotInputs";
import { on } from "events";
import {
  convertToDateTimeSlot,
  convertToStrSlot,
  DateTimeSlot,
} from "../lib/dateTime";

interface Props {
  attendee: Attendee;
  onAttendeeChange: (attendee: Attendee | null) => void;
}

const AttendeeView: React.FC<Props> = ({ attendee, onAttendeeChange }) => {
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
      <Input
        type="text"
        label="Name"
        value={attendee.name}
        onChange={onNameChange}
      />
      <SlotInputs
        slots={attendee.slots.map(convertToDateTimeSlot)}
        onSlotsChange={onSlotsChange}
      />
      <Button isIconOnly color="danger" onPress={onPressDelete}>
        <XMarkIcon />
      </Button>
    </div>
  );
};

export default AttendeeView;
