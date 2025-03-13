import { Button, DatePicker } from "@heroui/react";
import { DateTimeSlot } from "../lib/dateTime";
import { ZonedDateTime } from "@internationalized/date";

interface Props {
  slot: DateTimeSlot;
  onSlotChange: (slot?: DateTimeSlot) => void;
  readOnly?: boolean;
}

const SlotInput: React.FC<Props> = ({
  slot,
  onSlotChange,
  readOnly = false,
}) => {
  const onStartChange = (value: ZonedDateTime | null) => {
    if (value) {
      onSlotChange({ ...slot, start: value });
    }
  };
  const onEndChange = (value: ZonedDateTime | null) => {
    if (value) {
      onSlotChange({ ...slot, end: value });
    }
  };
  const onRemoveButtonClick = () => {
    onSlotChange();
  };
  return (
    <div className="flex flex-row gap-x-2 py-2">
      <DatePicker
        isReadOnly={readOnly}
        hideTimeZone
        showMonthAndYearPickers
        value={slot.start}
        onChange={onStartChange}
        label="Start"
      />
      <DatePicker
        isReadOnly={readOnly}
        hideTimeZone
        showMonthAndYearPickers
        value={slot.end}
        onChange={onEndChange}
        label="End"
      />
      <Button
        title="Remove slot"
        className="text-5xl h-auto"
        onPress={onRemoveButtonClick}
      >
        x
      </Button>
    </div>
  );
};

export default SlotInput;
