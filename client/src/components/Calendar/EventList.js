import React from "react";
import { format, parseISO } from "date-fns";

const EventList = ({ events, loading }) => {
  const formatDateTime = (dateTimeStr, hasTime = true, fallbackDate = null) => {
    // If no date provided but fallback exists, use fallback
    if (!dateTimeStr && fallbackDate) {
      return formatDateTime(fallbackDate, hasTime);
    }

    // If no date and no fallback, show message
    if (!dateTimeStr) {
      return "Date not available";
    }

    try {
      const date = parseISO(dateTimeStr);

      // Check if the date string includes a time component
      const includesTime = dateTimeStr.includes("T");

      // Format based on whether time is included
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

    // Check if dates include time component
    const hasTime = startDateTime?.includes("T") || endDateTime?.includes("T");

    return {
      start: formatDateTime(startDateTime, hasTime),
      // Use start date as fallback for end date if missing
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

  if (!events?.length) {
    return (
      <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6 text-center text-gray-500">
        No events found
      </div>
    );
  }

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Event
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Start Time
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              End Time
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {events.map((event) => {
            const { start, end } = getEventDateTime(event);
            return (
              <tr key={event.id || Math.random().toString()}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {event.summary || "Untitled Event"}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{start}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{end}</div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default EventList;
