import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import EventList from "./EventList";
import EventFilter from "./EventFilter";
import { fetchEvents } from "../../services/api";
import CalendarAnalytics from "../Analytics/CalendarAnalytics";
import ExportButton from "../Export/ExportButton";
const CalendarView = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dateFilter, setDateFilter] = useState({
    startDate: null,
    endDate: null,
  });
  const [showAnalytics, setShowAnalytics] = useState(false);

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
      setEvents(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error loading events:", error);
      setEvents([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">
          Your Calendar Events
        </h1>
        <div className="flex items-center space-x-4">
          <ExportButton events={events} />
          <button
            onClick={() => setShowAnalytics(!showAnalytics)}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            {showAnalytics ? "Hide Analytics" : "Show Analytics"}
          </button>
        </div>
      </div>

      <EventFilter onFilterChange={setDateFilter} />

      {showAnalytics && <CalendarAnalytics events={events} />}

      <EventList events={events} loading={loading} />
    </div>
  );
};

export default CalendarView;
