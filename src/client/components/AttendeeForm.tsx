import { Button, Form, Input, Textarea } from "@heroui/react";
import SlotInputs from "../components/SlotInputs";
import { convertToDateTimeSlot, convertToStrSlot } from "../lib/dateTime";
import { useNavigate } from "react-router";

interface Props {
  attendee: AttendeeWithoutId;
  onAttendeeChange: (event: AttendeeWithoutId) => void;
  onSubmit: () => void;
}

const AttendeeForm: React.FC<Props> = ({
  attendee,
  onAttendeeChange: onEventChange,
  onSubmit,
}) => {
  const navigate = useNavigate();
  const onFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit();
  };

  const onCancel = async () => {
    // go back to previous page
    await navigate(-1);
  };

  return (
    <Form className="" onSubmit={onFormSubmit}>
      <div className="bg-default-50 rounded-lg p-2 w-full my-2">
        <Input
          isRequired
          label="Name"
          placeholder="Enter the attendee name"
          type="text"
          value={attendee.name}
          onChange={(e) => onEventChange({ ...attendee, name: e.target.value })}
        />
        <Textarea
          label="Comment (optional)"
          placeholder="Anything to add?"
          value={attendee.comment}
          onChange={(e) =>
            onEventChange({ ...attendee, comment: e.target.value })
          }
        />
      </div>
      <div className="bg-default-50 rounded-lg p-2 w-full my-2">
        <label className="">Attendee Availability</label>
        <SlotInputs
          slots={attendee.slots.map(convertToDateTimeSlot)}
          onSlotsChange={(newSlots) =>
            onEventChange({
              ...attendee,
              slots: newSlots.map(convertToStrSlot),
            })
          }
        />
      </div>
      <div>
        <Button type="submit" variant="bordered">
          Save
        </Button>
        <Button type="button" variant="bordered" onPress={onCancel}>
          Cancel
        </Button>
      </div>
    </Form>
  );
};

export default AttendeeForm;
