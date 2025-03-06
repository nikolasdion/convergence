import { DatePicker } from "@heroui/react";
import { DateTimeSlot } from "../lib/dateTime";

interface Props {
  slot: DateTimeSlot;
  onSlotChange: (slot: DateTimeSlot) => void;
  readOnly?: boolean;
}

const SlotInput: React.FC<Props> = ({
  slot,
  onSlotChange,
  readOnly = false,
}) => {
  return (
    <div className="flex flex-row gap-x-2 p-2">
      <DatePicker
        isReadOnly={readOnly}
        hideTimeZone
        showMonthAndYearPickers
        value={slot.start}
        onChange={(value) => onSlotChange({ ...slot, start: value })}
        label="Start"
      />
      <DatePicker
        isReadOnly={readOnly}
        hideTimeZone
        showMonthAndYearPickers
        value={slot.end}
        onChange={(value) => onSlotChange({ ...slot, end: value })}
        label="End"
      />
    </div>
  );
};

export default SlotInput;
