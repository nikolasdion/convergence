import SlotsPreview from "./SlotsPreview.js";

interface Props {
  event: EventWithoutId;
}

const EventPreview: React.FC<Props> = ({ event }) => {
  return (
    <div className="bg-foreground-900 bg-opacity-10 rounded-lg p-4 w-full my-2 flex flex-row gap-5">
      <div className="flex-grow">
        <p className="italic text-medium">{event.description}</p>
      </div>
      <div className="flex-grow">
        <h2>Slots</h2>
        <SlotsPreview slots={event.slots} />
      </div>
    </div>
  );
};

export default EventPreview;
