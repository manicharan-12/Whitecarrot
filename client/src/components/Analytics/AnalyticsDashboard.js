import React from "react";
import { LineChart, BarChart } from "recharts";
import {
  groupEventsByDate,
  analyzeEventPatterns,
} from "../../utils/analyticsUtils";

const AnalyticsDashboard = ({ events }) => {
  const eventsByDate = groupEventsByDate(events);
  const patterns = analyzeEventPatterns(events);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-white rounded-lg shadow">
      <div>
        <h3 className="text-lg font-semibold mb-4">Events Over Time</h3>
        <LineChart width={500} height={300} data={eventsByDate}>
          {/* Chart components */}
        </LineChart>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Event Patterns</h3>
        <BarChart width={500} height={300} data={patterns}>
          {/* Chart components */}
        </BarChart>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
