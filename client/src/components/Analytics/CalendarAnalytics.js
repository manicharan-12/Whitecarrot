import React, { useMemo } from "react";
import {
  PieChart,
  Pie,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

const CalendarAnalytics = ({ events }) => {
  const analytics = useMemo(() => {
    if (!events?.length) return null;

    return events.reduce(
      (acc, event) => {
        // Calculate event duration
        const start = new Date(event.start.dateTime || event.start.date);
        const end = new Date(event.end.dateTime || event.end.date);
        const duration = (end - start) / (1000 * 60 * 60); // hours

        // Get day of week (0-6)
        const dayOfWeek = start.getDay();
        acc.byDayOfWeek[dayOfWeek] = (acc.byDayOfWeek[dayOfWeek] || 0) + 1;

        // Categorize events based on keywords
        let category = "Other";
        if (event.summary) {
          const summary = event.summary.toLowerCase();
          if (summary.includes("meeting")) category = "Meetings";
          else if (summary.includes("call")) category = "Calls";
          else if (summary.includes("lunch") || summary.includes("break"))
            category = "Breaks";
          else if (summary.includes("review")) category = "Reviews";
        }
        acc.categories[category] = (acc.categories[category] || 0) + 1;

        // Track duration
        acc.totalDuration += duration;

        // Track time of day distribution
        const hour = start.getHours();
        acc.timeOfDay[hour] = (acc.timeOfDay[hour] || 0) + 1;

        // Track event duration distribution
        const durationCategory =
          duration <= 0.5
            ? "30 mins or less"
            : duration <= 1
            ? "1 hour"
            : duration <= 2
            ? "2 hours"
            : "More than 2 hours";
        acc.durationDistribution[durationCategory] =
          (acc.durationDistribution[durationCategory] || 0) + 1;

        return acc;
      },
      {
        categories: {},
        timeOfDay: {},
        byDayOfWeek: {},
        durationDistribution: {},
        totalDuration: 0,
      }
    );
  }, [events]);

  if (!analytics) {
    return (
      <div className="text-center p-6">
        <p className="text-gray-500">No events data available</p>
      </div>
    );
  }

  // Prepare data for charts
  const categoryData = Object.entries(analytics.categories).map(
    ([name, value]) => ({
      name,
      value,
    })
  );

  const timeData = Array.from({ length: 24 }, (_, hour) => ({
    hour: `${hour}:00`,
    events: analytics.timeOfDay[hour] || 0,
  }));

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const dayData = daysOfWeek.map((day, index) => ({
    day,
    events: analytics.byDayOfWeek[index] || 0,
  }));

  const durationData = Object.entries(analytics.durationDistribution).map(
    ([name, value]) => ({
      name,
      value,
    })
  );

  const avgEventsPerDay = events.length / 7;

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg space-y-8">
      <h2 className="text-2xl font-bold">Calendar Analytics</h2>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
          <p className="text-2xl font-bold">{avgEventsPerDay.toFixed(1)}</p>
        </div>
        <div className="bg-yellow-50 p-4 rounded">
          <h4 className="text-sm text-yellow-600">Avg Hours/Event</h4>
          <p className="text-2xl font-bold">
            {(analytics.totalDuration / events.length).toFixed(1)}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Event Categories */}
        <div className="h-[400px]">
          <h3 className="text-lg font-semibold mb-4">Event Categories</h3>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={categoryData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={150}
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
              >
                {categoryData.map((entry, index) => (
                  <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Time Distribution */}
        <div className="h-[400px]">
          <h3 className="text-lg font-semibold mb-4">
            Time of Day Distribution
          </h3>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={timeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="hour" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="events" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Day of Week Distribution */}
        <div className="h-[400px]">
          <h3 className="text-lg font-semibold mb-4">Events by Day of Week</h3>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={dayData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="events" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Duration Distribution */}
        <div className="h-[400px]">
          <h3 className="text-lg font-semibold mb-4">
            Event Duration Distribution
          </h3>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={durationData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={150}
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
              >
                {durationData.map((entry, index) => (
                  <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default CalendarAnalytics;
