import { Button, DatePicker } from "@heroui/react";
import { DateTimeSlot } from "../lib/dateTime";
import { ZonedDateTime } from "@internationalized/date";
import { XMarkIcon } from "@heroicons/react/24/outline";

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
    <div className="flex flex-row gap-x-2 my-2 px-2 py-1 rounded-md bg-default-300 bg-opacity-50">
      <DatePicker
        isReadOnly={readOnly}
        hideTimeZone
        showMonthAndYearPickers
        value={slot.start}
        onChange={onStartChange}
        label="From"
        labelPlacement="outside-left"
      />
      <DatePicker
        isReadOnly={readOnly}
        hideTimeZone
        showMonthAndYearPickers
        value={slot.end}
        onChange={onEndChange}
        label="To"
        labelPlacement="outside-left"
      />
      {!readOnly ? (
        <Button
          title="Remove slot"
          onPress={onRemoveButtonClick}
          isIconOnly
          // color="danger"
          variant="light"
          className="p-2"
        >
          <XMarkIcon />
        </Button>
      ) : (
        <></>
      )}
    </div>
  );
};

export default SlotInput;
