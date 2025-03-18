import { Button, DatePicker } from "@heroui/react";
import { formatDate } from "../lib/dateTime";
import { parseAbsolute, ZonedDateTime } from "@internationalized/date";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useContext } from "react";
import { TimezoneContext } from "../TimeZoneContext";

interface Props {
  slot: Slot;
  onSlotChange: (slot?: Slot) => void;
}

const SlotInput: React.FC<Props> = ({ slot, onSlotChange }) => {
  const timezone = useContext(TimezoneContext);
  console.log(timezone);
  const start = parseAbsolute(slot.start, timezone);
  const end = parseAbsolute(slot.end, timezone);

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
      <>
        <DatePicker
          hideTimeZone
          showMonthAndYearPickers
          value={start}
          onChange={onStartChange}
          label="From"
          labelPlacement="outside-left"
          description={formatDate(slot.start, timezone)}
        />
        <DatePicker
          hideTimeZone
          showMonthAndYearPickers
          value={end}
          onChange={onEndChange}
          label="To"
          labelPlacement="outside-left"
          description={formatDate(slot.end, timezone)}
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
    </div>
  );
};

export default SlotInput;
