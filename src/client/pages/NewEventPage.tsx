import { Button, DatePicker, Form, Input } from "@heroui/react";
import { getLocalTimeZone, now } from "@internationalized/date";
import { useState } from "react";
import SlotInputs from "../components/SlotInputs";
import { DateTimeSlot } from "../lib/dateTime";

const NewEventPage: React.FC = () => {
  const [name, setName] = useState("");
  const [timezone, setTimezone] = useState("");
  const [slots, setSlots] = useState<DateTimeSlot[]>([]);

  const onSubmit = () => {
    window.alert("Submit clicked");
  };

  return (
    <div className="w-full m-auto flex flex-col align-middle justify-center">
      <div className="m-auto ">
        <h1 className="text-4xl">New Event</h1>
        <Form className="w-fit max-w-xs" onSubmit={onSubmit}>
          <Input
            isRequired
            errorMessage=""
            label="Event name"
            name="name"
            placeholder="Enter the event name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <SlotInputs
            slots={slots}
            onSlotsChange={(newSlots) => setSlots(newSlots)}
          />
          <Button type="submit" variant="bordered">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default NewEventPage;
