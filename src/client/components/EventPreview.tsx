import SlotsPreview from "./SlotsPreview";

interface Props {
  event: EventWithoutId;
}

const EventPreview: React.FC<Props> = ({ event }) => {
  return (
    <div className="bg-default-50 rounded-lg p-2 w-full my-2 flex flex-row gap-5">
      <div className="flex-grow">
        <p>{event.description}</p>
      </div>
      <div className="flex-grow">
        <h2>Slots</h2>
        <SlotsPreview slots={event.slots} />
      </div>
    </div>
  );
};

export default EventPreview;
