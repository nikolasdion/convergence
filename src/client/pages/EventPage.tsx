import { useEffect, useState } from "react";

import { useParams } from "react-router";

const EventPage: React.FC = () => {
  const { id } = useParams();

  const [event, setEvent] = useState<IEvent>();

  useEffect(() => {
    fetch(`/api/event/${id}`).then(async (res) => {
      if (res !== null && res.status === 200) {
        setEvent((await res.json()) as IEvent);
      }
    });
  }, []);

  return (
    <div className="App">
      <h1>Convergence</h1>
      {JSON.stringify(event)}
    </div>
  );
};

export default EventPage;
