import { useState, useRef, useEffect } from "react";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { Grid } from "@mui/material";
import { EventCard } from "./EventCard";
import obje from "./stuff.json";

function App() {
  const [events, setEvents] = useState([]);
  const listRef = useRef(null);

  const fetchEvents = async () => {
    const response = await fetch("https://api.github.com/events");
    console.log(response);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  };
  console.log(obje);
  const { data, refetch, error } = useQuery({
    queryKey: ["githubEvents"],
    queryFn: fetchEvents,
    refetchInterval: 5000, // Refetch every 10 seconds
    enabled: true, // Start fetching immediately
    onError: (error) => {
      console.error("Error fetching events:", error);
    },
  });

  useEffect(() => {
    if (data) {
      setEvents(data);
    }
  }, [data]);

  return (
    <div>
      <Grid container spacing={3} ref={listRef}>
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </Grid>
    </div>
  );
}

const queryClient = new QueryClient();
const WrappedApp = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  );
};
export default WrappedApp;
