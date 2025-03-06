import { useEffect, useState } from "react";
import { Listbox, ListboxItem, Spinner } from "@heroui/react";

const HomePage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [events, setEvents] = useState<EventWithId[]>([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    setIsLoading(true);
    const res = await fetch("/api/events");
    if (res?.ok) {
      setEvents((await res.json()) as EventWithId[]);
    } else {
      throw new Error(JSON.stringify(res));
    }
    setIsLoading(false);
  };

  const renderEvents = () => {
    return events.map((event, index) => {
      return (
        <ListboxItem
          key={index}
          description={event._id}
          href={`/event/${event._id}`}
        >
          {event.name}
        </ListboxItem>
      );
    });
  };

  return (
    <div className=" max-w-7xl m-auto">
      <div className="my-4">
        <h1 className="text-xl">Events list</h1>
      </div>
      <div className="w-full max-w-96 min-w-52 border-small px-1 py-2 rounded-small border-default-200 dark:border-default-100 flex flex-row justify-center">
        {isLoading ? (
          <Spinner />
        ) : (
          <Listbox>
            <ListboxItem href={`/event/new`}>Create New Event</ListboxItem>
            <>{renderEvents()}</>
          </Listbox>
        )}
      </div>
    </div>
  );
};

export default HomePage;
