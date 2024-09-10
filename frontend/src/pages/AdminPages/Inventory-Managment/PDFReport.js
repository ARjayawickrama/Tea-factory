// src/pages/AdminPages/Inventory-Managment/generatePDF.js
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export const generatePDF = (materials) => {
  const doc = new jsPDF();

  // Define the title and table headers
  doc.setFontSize(18);
  doc.text('Raw Materials Report', 14, 22);

  doc.autoTable({
    startY: 30,
    head: [['Material Name', 'Stocked Date', 'Weight', 'Supplier', 'Supplier Email']],
    body: materials.map(material => [
      material.materialName,
      material.stockedDate,
      material.weight,
      material.supplier,
      material.supplierEmail,
    ]),
    theme: 'striped',
    headStyles: { fillColor: [41, 128, 185] },
    styles: { cellPadding: 5, fontSize: 10 },
  });

  // Save the PDF
  doc.save('raw_materials_report.pdf');
};
