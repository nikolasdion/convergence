import { useEffect, useState } from "react";
import { addToast, Button, Listbox, ListboxItem } from "@heroui/react";
import { fetchAllEvents } from "../lib/data";
import LoadingSpinner from "../components/LoadingSpinner";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router";

const HomePage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [events, setEvents] = useState<EventWithId[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAllEvents()
      .then((events) => {
        setEvents(events);
      })
      .catch(() => {
        addToast({ title: "Failed to fetch events, please refresh" });
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const renderEvents = () => {
    return events.map((event, index) => (
      <ListboxItem
        key={index}
        href={`/event/${event._id}/view/`}
        className="text-xs"
      >
        {event.name} <span className="text-xs opacity-35">({event._id})</span>
      </ListboxItem>
    ));
  };

  return (
    <div className="flex flex-col gap-9 py-24 items-center">
      <h1 className="text-5xl text-center">Convergence</h1>
      <Button
        onPress={() => navigate("/event/new")}
        size="lg"
        startContent={<PlusIcon className="size-32" />}
        className="max-w-96 text-xl w-80"
        color="primary"
      >
        Create new event
      </Button>

      <div className="w-full max-w-96 min-w-52 border-small px-1 py-2 rounded-small border-default-200 dark:border-default-100 flex flex-row justify-center">
        {isLoading ? <LoadingSpinner /> : <Listbox>{renderEvents()}</Listbox>}
      </div>
    </div>
  );
};

export default HomePage;
