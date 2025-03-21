import { PlusIcon } from "@heroicons/react/24/outline";
import { Button } from "@heroui/react";

import SlotInput from "./SlotInput";

interface Props {
  slots: Slot[];
  onSlotsChange: (slots: Slot[]) => void;
}

const SlotInputs: React.FC<Props> = ({ slots, onSlotsChange }) => {
  const addNewSlot = () => {
    let start: string;

    if (slots.length > 0) {
      // Start from the end of the last slot
      start = slots[slots.length - 1].end;
    } else {
      // TODO do something clever with the default start value, maybe take the
      // start of the event?
      // 1 hour slot starting from current time
      start = new Date(Date.now()).toISOString();
    }

    const endTimestamp = Date.parse(start) + 60 * 60 * 1000;
    const end = new Date(endTimestamp).toISOString();

    onSlotsChange([...slots, { start, end }]);
  };

  const renderSlots = () => {
    return slots.map((slot, index) => {
      const onChange = (newSlot?: Slot) => {
        if (!newSlot) {
          // remove slot
          onSlotsChange(slots.toSpliced(index, 1));
        } else {
          // change slot
          onSlotsChange(slots.toSpliced(index, 1, newSlot));
        }
      };

      return <SlotInput key={index} slot={slot} onSlotChange={onChange} />;
    });
  };

  return (
    <div className="">
      <> {renderSlots()}</>
      <Button
        variant="ghost"
        onPress={() => addNewSlot()}
        startContent={<PlusIcon className="size-5" />}
      >
        Add new slot
      </Button>
    </div>
  );
};
export default SlotInputs;
