import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import EventList from "./EventList";
import EventFilter from "./EventFilter";
import { fetchEvents } from "../../services/api";

const CalendarView = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dateFilter, setDateFilter] = useState({
    startDate: null,
    endDate: null,
  });

  useEffect(() => {
    loadEvents();
  }, [dateFilter]);

  const loadEvents = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (dateFilter.startDate) {
        params.append("timeMin", dateFilter.startDate.toISOString());
      }
      if (dateFilter.endDate) {
        params.append("timeMax", dateFilter.endDate.toISOString());
      }

      const data = await fetchEvents(params);
      setEvents(data);
    } catch (error) {
      console.error("Error loading events:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Your Calendar Events</h1>
      <EventFilter onFilterChange={setDateFilter} />
      <EventList events={events} loading={loading} />
    </div>
  );
};

export default CalendarView;
