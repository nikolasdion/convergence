import { Button, Form, Input, Textarea } from "@heroui/react";
import SlotInputs from "./SlotInputs.js";
import { convertToDateTimeSlot, convertToStrSlot } from "../lib/dateTime";
import { useNavigate } from "react-router";

interface Props {
  event: EventWithoutId;
  onEventChange: (event: EventWithoutId) => void;
  onSubmit: () => void;
}

const EventForm: React.FC<Props> = ({ event, onEventChange, onSubmit }) => {
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
          errorMessage=""
          label="Name"
          name="name"
          placeholder="Enter the event name"
          labelPlacement="outside"
          type="text"
          value={event.name}
          onChange={(e) => onEventChange({ ...event, name: e.target.value })}
        />
        <Textarea
          errorMessage=""
          label="Description"
          name="name"
          placeholder="(Optional) Enter event description"
          value={event.description}
          labelPlacement="outside"
          onChange={(e) =>
            onEventChange({ ...event, description: e.target.value })
          }
        />
      </div>

      <div className="bg-default-50 rounded-lg p-2 w-full my-2">
        <label className="">Event Slots</label>
        <SlotInputs
          slots={event.slots.map(convertToDateTimeSlot)}
          onSlotsChange={(newSlots) =>
            onEventChange({ ...event, slots: newSlots.map(convertToStrSlot) })
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

export default EventForm;
