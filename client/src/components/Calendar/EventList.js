import React from "react";
import { format, parseISO } from "date-fns";

const EventList = ({ events = [], loading }) => {
  const formatDateTime = (dateTimeStr, hasTime = true, fallbackDate = null) => {
    if (!dateTimeStr && fallbackDate) {
      return formatDateTime(fallbackDate, hasTime);
    }

    if (!dateTimeStr) {
      return "Date not available";
    }

    try {
      const date = parseISO(dateTimeStr);
      const includesTime = dateTimeStr.includes("T");

      if (includesTime && hasTime) {
        return format(date, "PPp"); // e.g., "Apr 29, 2023, 9:00 AM"
      } else {
        return format(date, "PP"); // e.g., "Apr 29, 2023"
      }
    } catch (error) {
      return "Date not available";
    }
  };

  const getEventDateTime = (event) => {
    const startDateTime = event?.start?.dateTime || event?.start?.date;
    const endDateTime = event?.end?.dateTime || event?.end?.date;
    const hasTime = startDateTime?.includes("T") || endDateTime?.includes("T");

    return {
      start: formatDateTime(startDateTime, hasTime),
      end: formatDateTime(endDateTime, hasTime, startDateTime),
    };
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const eventsArray = Array.isArray(events) ? events : [];

  if (!eventsArray.length) {
    return (
      <div className="bg-white shadow overflow-hidden rounded-lg p-6 text-center text-gray-500">
        No events found
      </div>
    );
  }

  return (
    <div className="bg-white shadow overflow-hidden rounded-lg">
      {/* Large screens - table view */}
      <div className="hidden md:block">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Event
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Start Time
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                End Time
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {eventsArray.map((event) => {
              const { start, end } = getEventDateTime(event);
              return (
                <tr key={event.id || Math.random().toString()}>
                  <td className="px-4 py-4">
                    <div className="text-sm font-medium text-gray-900">
                      {event.summary || "Untitled Event"}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-sm text-gray-500">{start}</div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-sm text-gray-500">{end}</div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile view - card layout */}
      <div className="md:hidden">
        <div className="divide-y divide-gray-200">
          {eventsArray.map((event) => {
            const { start, end } = getEventDateTime(event);
            return (
              <div
                key={event.id || Math.random().toString()}
                className="p-4 space-y-2"
              >
                <div className="text-sm font-medium text-gray-900">
                  {event.summary || "Untitled Event"}
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm text-gray-500">
                  <div>
                    <span className="font-medium">Start:</span> {start}
                  </div>
                  <div>
                    <span className="font-medium">End:</span> {end}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default EventList;
