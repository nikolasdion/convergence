import { Button } from "@heroui/react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { getLocalTimeZone, now } from "@internationalized/date";

import SlotInput from "./SlotInput.js";

interface Props {
  slots: Slot[];
  onSlotsChange: (slots: Slot[]) => void;
}

const SlotInputs: React.FC<Props> = ({ slots, onSlotsChange }) => {
  const addNewSlot = () => {
    const newSlots = [...slots];
    if (newSlots[-1]) {
      newSlots.push({ ...slots[-1] });
    } else {
      const timeNow = now(getLocalTimeZone());
      newSlots.push({
        start: timeNow.toAbsoluteString(),
        end: timeNow.add({ hours: 1 }).toAbsoluteString(),
      });
    }
    onSlotsChange(newSlots);
  };

  const renderSlots = () => {
    return slots.map((slot, index) => {
      const onChange = (newSlot?: Slot) => {
        const newSlots = [...slots];

        if (!newSlot) {
          // remove slot
          newSlots.splice(index, 1);
          onSlotsChange(newSlots);
        } else {
          // change slot
          newSlots[index] = newSlot;
          onSlotsChange(newSlots);
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
        onPress={addNewSlot}
        startContent={<PlusIcon className="size-5" />}
      >
        Add new slot
      </Button>
    </div>
  );
};
export default SlotInputs;
