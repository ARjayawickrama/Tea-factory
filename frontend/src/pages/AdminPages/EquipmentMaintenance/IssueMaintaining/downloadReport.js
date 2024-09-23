import jsPDF from 'jspdf';
import 'jspdf-autotable';

// ... other imports

const downloadReport = () => {
  const doc = new jsPDF();
  doc.text("Supervise Report", 14, 16);

  const tableData = filteredData.map(item => [
    item.name,
    item.MachineId,
    item.Area,
    item.deat,
    item.Note,
    item.MachineStatus
  ]);

  doc.autoTable({
    head: [['Name', 'Machine ID', 'Area', 'Date', 'Note', 'Status']],
    body: tableData,
    startY: 20,
  });

  doc.save("supervise_report.pdf");
};
