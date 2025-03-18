import { useContext } from "react";
import { formatDateRange } from "../lib/dateTime";
import { TimezoneContext } from "../TimeZoneContext";

interface Props {
  slots: Slot[];
}

const SlotsPreview: React.FC<Props> = ({ slots }) => {
  const timezone = useContext(TimezoneContext);
  // TODO do something clever here so the timeslots are not cluttered with less useful info, e.g. year
  const renderSlots = () => {
    return slots.map((slot, index) => {
      return <li key={index}>{formatDateRange(slot, timezone)}</li>;
    });
  };

  return (
    <ul className="w-fit flex-row flex-wrap p-2 list-disc">{renderSlots()}</ul>
  );
};

export default SlotsPreview;
