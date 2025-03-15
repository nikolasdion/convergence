import { Button, Form, Input } from "@heroui/react";
import { useState } from "react";
import SlotInputs from "../components/SlotInputs";
import { convertToStrSlot, DateTimeSlot } from "../lib/dateTime";
import { useNavigate } from "react-router";

const NewEventPage: React.FC = () => {
  const [name, setName] = useState("");
  const [slots, setSlots] = useState<DateTimeSlot[]>([]);

  const navigate = useNavigate();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newId = await newEvent(name, slots.map(convertToStrSlot));
    console.log(newId);
    if (newId) {
      navigate(`/event/${newId}`);
    }
  };

  const newEvent = async (
    name: string,
    slots: Slot[]
  ): Promise<string | undefined> => {
    const event: EventWithoutId = {
      name,
      slots,
      attendees: [],
    };
    const res = await fetch(`/api/event/`, {
      method: "POST",
      body: JSON.stringify(event),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res?.ok) {
      const id = (await res.json()).id as string;
      return id;
    } else {
      return undefined;
    }
  };

  return (
    <div className="w-full m-auto flex flex-col align-middle justify-center">
      <div className="m-auto">
        <h1 className="text-4xl p-4">New Event</h1>
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
          <label className="pt-4 pl-4">Slots</label>
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
