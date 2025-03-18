import { formatDateRange } from "../lib/dateTime";

interface Props {
  slots: Slot[];
}

const SlotsPreview: React.FC<Props> = ({ slots }) => {
  // TODO do something clever here so the timeslots are not cluttered with less useful info, e.g. year
  const renderSlots = () => {
    return slots.map((slot, index) => {
      return <li key={index}>{formatDateRange(slot)}</li>;
    });
  };

  return <ul className="w-fit flex-row flex-wrap p-2">{renderSlots()}</ul>;
};

export default SlotsPreview;
