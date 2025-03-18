import { Button, DatePicker } from "@heroui/react";
import { formatDate } from "../lib/dateTime";
import { parseAbsoluteToLocal, ZonedDateTime } from "@internationalized/date";
import { XMarkIcon } from "@heroicons/react/24/outline";

interface Props {
  slot: Slot;
  onSlotChange: (slot?: Slot) => void;
  readOnly?: boolean;
}

const SlotInput: React.FC<Props> = ({
  slot,
  onSlotChange,
  readOnly = false,
}) => {
  const start = parseAbsoluteToLocal(slot.start);
  const end = parseAbsoluteToLocal(slot.end);

  const onStartChange = (value: ZonedDateTime | null) => {
    if (value) {
      onSlotChange({ ...slot, start: value.toAbsoluteString() });
    }
  };
  const onEndChange = (value: ZonedDateTime | null) => {
    if (value) {
      onSlotChange({ ...slot, end: value.toAbsoluteString() });
    }
  };
  const onRemoveButtonClick = () => {
    onSlotChange();
  };

  return (
    <div className="flex flex-row gap-x-2 my-2 px-2 py-1">
      {readOnly ? (
        <span>
          From {formatDate(slot.start)} to {formatDate(slot.end)}
        </span>
      ) : (
        <>
          <DatePicker
            isReadOnly={readOnly}
            hideTimeZone
            showMonthAndYearPickers
            value={start}
            onChange={onStartChange}
            label="From"
            labelPlacement="outside-left"
            description={formatDate(start)}
          />
          <DatePicker
            isReadOnly={readOnly}
            hideTimeZone
            showMonthAndYearPickers
            value={end}
            onChange={onEndChange}
            label="To"
            labelPlacement="outside-left"
            description={formatDate(end)}
            minValue={start}
          />
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
        </>
      )}
    </div>
  );
};

export default SlotInput;
