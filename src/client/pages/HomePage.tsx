import { useEffect, useState } from "react";
import { addToast, Listbox, ListboxItem, Spinner } from "@heroui/react";
import PageTitle from "../components/PageTitle";
import { fetchAllEvents } from "../lib/data";
import LoadingSpinner from "../components/LoadingSpinner";

const HomePage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [events, setEvents] = useState<EventWithId[]>([]);

  useEffect(() => {
    fetchAllEvents()
      .then((events) => {
        setEvents(events);
        setIsLoading(false);
      })
      .catch(() => {
        addToast({ title: "Failed to fetch events, please refresh" });
      });
  }, []);

  const renderEvents = () => {
    return events.map((event, index) => {
      return (
        <ListboxItem
          key={index}
          description={event._id}
          href={`/event/${event._id}/view/`}
        >
          {event.name}
        </ListboxItem>
      );
    });
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className=" max-w-7xl m-auto">
      <PageTitle>Events list</PageTitle>
      <div className="w-full max-w-96 min-w-52 border-small px-1 py-2 rounded-small border-default-200 dark:border-default-100 flex flex-row justify-center">
        <Listbox>
          <ListboxItem href={`/event/new`}>Create New Event</ListboxItem>
          <>{renderEvents()}</>
        </Listbox>
      </div>
    </div>
  );
};

export default HomePage;
