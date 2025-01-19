import { saveAs } from "file-saver";
import ExcelJS from "exceljs";
import { format, parseISO } from "date-fns";

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

export const exportToExcel = async (events) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Calendar Events");

  worksheet.columns = [
    { header: "Event", key: "summary", width: 30 },
    { header: "Start Time", key: "start", width: 20 },
    { header: "End Time", key: "end", width: 20 },
    { header: "Duration (hrs)", key: "duration", width: 15 },
    { header: "Category", key: "category", width: 15 },
  ];

  events.forEach((event) => {
    const { start, end } = getEventDateTime(event);

    let duration = "N/A";
    try {
      if (event.start.dateTime && event.end.dateTime) {
        duration = (
          (new Date(event.end.dateTime) - new Date(event.start.dateTime)) /
          (1000 * 60 * 60)
        ).toFixed(2);
      }
    } catch (error) {
      // If there's an error calculating duration, leave as "N/A"
    }

    worksheet.addRow({
      summary: event.summary || "Untitled Event",
      start,
      end,
      duration,
      category: event.summary?.toLowerCase().includes("meeting")
        ? "Meeting"
        : "Other",
    });
  });

  const buffer = await workbook.xlsx.writeBuffer();
  saveAs(new Blob([buffer]), "calendar-events.xlsx");
};
