import { saveAs } from "file-saver";
import ExcelJS from "exceljs";

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
    worksheet.addRow({
      summary: event.summary,
      start: new Date(event.start.dateTime).toLocaleString(),
      end: new Date(event.end.dateTime).toLocaleString(),
      duration: (
        (new Date(event.end.dateTime) - new Date(event.start.dateTime)) /
        (1000 * 60 * 60)
      ).toFixed(2),
      category: event.summary.toLowerCase().includes("meeting")
        ? "Meeting"
        : "Other",
    });
  });

  const buffer = await workbook.xlsx.writeBuffer();
  saveAs(new Blob([buffer]), "calendar-events.xlsx");
};
