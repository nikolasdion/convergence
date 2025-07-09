import { XMarkIcon } from "@heroicons/react/24/outline";
import { Button, DatePicker } from "@heroui/react";
import { parseAbsolute, ZonedDateTime } from "@internationalized/date";
import { useContext } from "react";

import { formatDate } from "../lib/dateTime";
import { TimezoneContext } from "../TimezoneContext";

interface Props {
  slot: Slot;
  onSlotChange: (slot?: Slot) => void;
}

const SlotInput: React.FC<Props> = ({ slot, onSlotChange }) => {
  const timezone = useContext(TimezoneContext);
  console.log(timezone);
  const start = parseAbsolute(slot.start, timezone);
  const end = parseAbsolute(slot.end, timezone);

  const onStartChange = (newStart: ZonedDateTime | null) => {
    if (newStart) {
      // if the new start is later than the current end, change the end value to 5 minutes after the new start
      const newEnd =
        end.compare(newStart) < 0 ? newStart.add({ minutes: 5 }) : end;
      onSlotChange({
        start: newStart.toAbsoluteString(),
        end: newEnd.toAbsoluteString(),
      });
    }
  };

  const onEndChange = (newEnd: ZonedDateTime | null) => {
    if (newEnd) {
      // if the current start is later than the new end, change the start value to 5 minutes before the new end
      const newStart =
        newEnd.compare(start) < 0 ? newEnd.add({ minutes: -5 }) : start;
      onSlotChange({
        start: newStart.toAbsoluteString(),
        end: newEnd.toAbsoluteString(),
      });
    }
  };

  const onRemoveButtonClick = () => {
    onSlotChange();
  };

  // TODO add error when overlapping with the other slots

  return (
    <div className="flex flex-row gap-x-2 my-2 px-2 py-1">
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
    </div>
  );
};

export default SlotInput;
