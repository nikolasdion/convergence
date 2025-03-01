import { useEffect, useState } from "react";
import { Button, Listbox, ListboxItem } from "@heroui/react";
import { Link } from "react-router";
import DarkModeSwitch from "../DarkModeSwitch";

const HomePage: React.FC = () => {
  const [events, setEvents] = useState<IEvent[]>([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    const res = await fetch("/api/events");
    if (res !== null && res.status === 200) {
      setEvents((await res.json()) as IEvent[]);
    }
  };

  const renderEvents = () => {
    return events.map((event, index) => {
      const onPressDelete = (e) => {
        // e.preventDefault();
        fetch(`/api/event/${event.id}`, { method: "DELETE" }).then(
          async (res) => {
            fetchEvents();
          }
        );
      };
      return (
        <ListboxItem
          key={index}
          description={event.id}
          href={`/event/${event.id}`}
        >
          {event.name}
          {/* <Button size="sm" onPress={onPressDelete}>
            Delete
          </Button> */}
        </ListboxItem>
      );
    });
  };

  return (
    <div className="w-fit m-auto">
      <div className="my-4">
        <h1 className="text-xl">Events list</h1>
      </div>
      <div className="w-full max-w-[260px] border-small px-1 py-2 rounded-small border-default-200 dark:border-default-100">
        <Listbox aria-label="Actions">{renderEvents()}</Listbox>
      </div>
    </div>
  );
};

export default HomePage;
