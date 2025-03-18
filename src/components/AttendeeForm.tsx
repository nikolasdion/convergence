import { Button, Form, Input, Textarea } from "@heroui/react";
import SlotInputs from "./SlotInputs.js";
import { useNavigate } from "react-router";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";

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
      <div className="border-solid border-2 border-default-300 rounded-lg p-4 w-full my-2">
        <Input
          className="pb-3"
          isRequired
          label="Name"
          size="lg"
          placeholder="Enter the attendee name"
          labelPlacement="outside"
          type="text"
          value={attendee.name}
          onChange={(e) => onEventChange({ ...attendee, name: e.target.value })}
        />
        <Textarea
          label="Comment (optional)"
          size="lg"
          placeholder="Anything to add?"
          value={attendee.comment}
          labelPlacement="outside"
          onChange={(e) =>
            onEventChange({ ...attendee, comment: e.target.value })
          }
        />
      </div>
      <div className="border-solid border-2 border-default-300 rounded-lg p-4 w-full my-2">
        <h2 className="text-lg pb-4">When are you available?</h2>
        <SlotInputs
          slots={attendee.slots}
          onSlotsChange={(slots) =>
            onEventChange({
              ...attendee,
              slots,
            })
          }
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

export default AttendeeForm;
