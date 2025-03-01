import { useEffect, useState } from "react";
import { Button } from "@heroui/react";
import { Breadcrumbs, BreadcrumbItem } from "@heroui/react";
import { Link } from "react-router";

const HomePage: React.FC = () => {
  const [events, setEvents] = useState<IEvent[]>([]);

  useEffect(() => {
    fetch("/api/events").then(async (res) => {
      if (res !== null && res.status === 200) {
        setEvents((await res.json()) as IEvent[]);
      }
    });
  }, []);

  const renderEvents = () => {
    return events.map((event) => {
      return (
        <Link to={`/event/${event.id}`}>
          <Button
            className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg"
            radius="full"
          >
            {event.name}
          </Button>
        </Link>
      );
    });
  };

  return (
    <div className="App">
      <Breadcrumbs>
        <BreadcrumbItem>Home</BreadcrumbItem>
        <BreadcrumbItem>Music</BreadcrumbItem>
        <BreadcrumbItem>Artist</BreadcrumbItem>
        <BreadcrumbItem>Album</BreadcrumbItem>
        <BreadcrumbItem>Song</BreadcrumbItem>
      </Breadcrumbs>
      <h1 className="text-sm font-bold underline">Convergence</h1>
      <li> {renderEvents()}</li>
      <div className="flex gap-4 items-center">
        <Button size="sm">Small</Button>
        <Button size="md">Medium</Button>
        <Button size="lg">Large</Button>
      </div>
    </div>
  );
};

export default HomePage;
