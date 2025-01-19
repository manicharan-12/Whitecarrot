import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const EventFilter = ({ onFilterChange }) => {
  const [startDate, setStartDate] = React.useState(null);
  const [endDate, setEndDate] = React.useState(null);

  const handleStartDateChange = (date) => {
    setStartDate(date);
    onFilterChange({ startDate: date, endDate });
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
    onFilterChange({ startDate, endDate: date });
  };

  const handleReset = () => {
    setStartDate(null);
    setEndDate(null);
    onFilterChange({ startDate: null, endDate: null });
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-700">Filter Events</h2>
        {(startDate || endDate) && (
          <button
            onClick={handleReset}
            className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
          >
            Reset Filters
          </button>
        )}
      </div>
      <div className="flex space-x-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Start Date
          </label>
          <DatePicker
            selected={startDate}
            onChange={handleStartDateChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholderText="Select start date"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            End Date
          </label>
          <DatePicker
            selected={endDate}
            onChange={handleEndDateChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholderText="Select end date"
            minDate={startDate}
          />
        </div>
      </div>
    </div>
  );
};

export default EventFilter;
