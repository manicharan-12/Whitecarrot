import React from "react";
import { Download } from "lucide-react";
import { exportToExcel } from "../../utils/exportUtils";
import { toast } from "react-toastify";

const ExportButton = ({ events }) => {
  const handleExport = async () => {
    try {
      await exportToExcel(events);
    } catch (error) {
      console.error("Export failed:", error);
      toast.error("Error downloading event, Try Again Later!");
    }
  };

  return (
    <button
      onClick={handleExport}
      className="flex items-center px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
    >
      <Download className="w-4 h-4 mr-2" />
      Export Events
    </button>
  );
};

export default ExportButton;
