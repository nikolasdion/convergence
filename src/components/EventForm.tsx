import { Button, Form, Input, Textarea } from "@heroui/react";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";

import SlotInputs from "./SlotInputs.js";
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
      <div className="border-solid border-2 border-default-300 rounded-lg p-4 w-full my-2">
        <Input
          className="pb-3"
          isRequired
          errorMessage=""
          label="Name"
          size="lg"
          placeholder="Enter the event name"
          labelPlacement="outside"
          type="text"
          value={event.name}
          onChange={(e) => onEventChange({ ...event, name: e.target.value })}
        />
        <Textarea
          errorMessage=""
          label="Description (Optional)"
          size="lg"
          placeholder="Enter event description"
          value={event.description}
          labelPlacement="outside"
          onChange={(e) =>
            onEventChange({ ...event, description: e.target.value })
          }
        />
      </div>

      <div className="border-solid border-2 border-default-300 rounded-lg p-4 w-full my-2">
        <h2 className="pb-4">What are the possible time slots?</h2>
        <SlotInputs
          slots={event.slots}
          onSlotsChange={(slots) => onEventChange({ ...event, slots })}
        />
      </div>

      <div className="flex gap-5 w-full justify-center">
        <Button
          type="submit"
          startContent={<CheckIcon className="size-6" />}
          color="primary"
        >
          Save
        </Button>
        <Button
          type="button"
          onPress={onCancel}
          startContent={<XMarkIcon className="size-6" />}
          color="default"
        >
          Cancel
        </Button>
      </div>
    </Form>
  );
};

export default EventForm;
