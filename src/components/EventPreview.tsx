import { findAllIntersections } from "../lib/intersection";
import SlotsPreview from "./SlotsPreview";

interface Props {
  event: EventWithoutId;
}

const EventPreview: React.FC<Props> = ({ event }) => {
  return (
    <div className="border-solid border-2 border-default-300 rounded-lg p-4 w-full my-2">
      <div className="flex flex-row">
        <div className="flex-grow">
          <p className="italic text-medium">{event.description}</p>
        </div>
        <div>
          <h3>Overlaps</h3>
          <SlotsPreview
            slots={findAllIntersections(event.attendees)}
          ></SlotsPreview>
        </div>
        {/* <div className="flex-grow">
          <h3 className="font-bold">Slots</h3>
          <SlotsPreview slots={event.slots} />
        </div> */}
      </div>
    </div>
  );
};

export default EventPreview;
