import { PlusIcon } from "@heroicons/react/24/outline";
import { Button } from "@heroui/react";

import SlotInput from "./SlotInput";

interface Props {
  slots: Slot[];
  onSlotsChange: (slots: Slot[]) => void;
}

const SlotInputs: React.FC<Props> = ({ slots, onSlotsChange }) => {
  const addNewSlot = () => {
    // TODO do something clever with the default start value, maybe take the
    // start of the event?
    if (slots[-1]) {
      // Duplicate the last slot
      onSlotsChange([...slots, slots[-1]]);
    } else {
      // 1 hour slot starting from current time
      const timeNow = Date.now();
      const newSlot = {
        start: new Date(timeNow).toISOString(),
        end: new Date(timeNow + 60 * 60 * 1000).toISOString(),
      };
      onSlotsChange([...slots, newSlot]);
    }
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
        onPress={addNewSlot}
        startContent={<PlusIcon className="size-5" />}
      >
        Add new slot
      </Button>
    </div>
  );
};
export default SlotInputs;
