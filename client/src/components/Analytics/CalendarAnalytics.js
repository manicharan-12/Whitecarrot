import React, { useMemo } from "react";
import { PieChart, BarChart } from "recharts";

const CalendarAnalytics = ({ events }) => {
  const analytics = useMemo(() => {
    return events.reduce(
      (acc, event) => {
        // Calculate event duration
        const start = new Date(event.start.dateTime);
        const end = new Date(event.end.dateTime);
        const duration = (end - start) / (1000 * 60 * 60); // hours

        // Categorize events
        const category = event.summary.toLowerCase().includes("meeting")
          ? "Meetings"
          : event.summary.toLowerCase().includes("call")
          ? "Calls"
          : "Other";

        acc.categories[category] = (acc.categories[category] || 0) + 1;
        acc.totalDuration += duration;
        acc.timeOfDay[start.getHours()] =
          (acc.timeOfDay[start.getHours()] || 0) + 1;

        return acc;
      },
      { categories: {}, totalDuration: 0, timeOfDay: {} }
    );
  }, [events]);

  const categoryData = Object.entries(analytics.categories).map(
    ([name, value]) => ({
      name,
      value,
    })
  );

  const timeData = Object.entries(analytics.timeOfDay).map(([hour, count]) => ({
    hour: `${hour}:00`,
    events: count,
  }));

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Calendar Analytics</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Event Categories */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Event Categories</h3>
          <PieChart width={300} height={300} data={categoryData}>
            {/* Add PieChart components */}
          </PieChart>
        </div>

        {/* Time Distribution */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Time Distribution</h3>
          <BarChart width={300} height={300} data={timeData}>
            {/* Add BarChart components */}
          </BarChart>
        </div>

        {/* Summary Stats */}
        <div className="col-span-2">
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded">
              <h4 className="text-sm text-blue-600">Total Events</h4>
              <p className="text-2xl font-bold">{events.length}</p>
            </div>
            <div className="bg-green-50 p-4 rounded">
              <h4 className="text-sm text-green-600">Total Hours</h4>
              <p className="text-2xl font-bold">
                {analytics.totalDuration.toFixed(1)}
              </p>
            </div>
            <div className="bg-purple-50 p-4 rounded">
              <h4 className="text-sm text-purple-600">Avg Events/Day</h4>
              <p className="text-2xl font-bold">
                {(events.length / 7).toFixed(1)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarAnalytics;
