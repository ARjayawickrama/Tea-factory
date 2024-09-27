import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import logo from '../../../assets/PdfImage.jpg';

const generateRawPDF = (materials) => {
  const doc = new jsPDF("portrait", "pt", "a4");
  const imgWidth = 595;
  const imgHeight = 168.4;

  // Add logo
  doc.addImage(logo, "PNG", 0, 20, imgWidth, imgHeight); 

  // Add title with space after the banner
  doc.setFontSize(18);
  const titleYPosition = imgHeight + 60; // 60 pt space between banner and title
  doc.text('Raw Materials Report', 50, titleYPosition);
  
  // Define table columns
  const tableColumns = ['Material Name', 'Stocked Date', 'Weight (kg)', 'Supplier Manager', 'Supplier Email'];

  // Map materials to table data
  const tableData = materials.map(material => [
    material.materialName,
    material.stockedDate,
    material.weight,
    material.supplier,
    material.supplierEmail,
  ]);

  // Add table with space after the title
  autoTable(doc, {
    head: [tableColumns],
    body: tableData,
    startY: titleYPosition + 20, // 20 pt space between title and table
    headStyles: {
      fillColor: [0, 128, 0],
      textColor: [255, 255, 255], 
      fontSize: 12,
      fontStyle: 'bold',
    },
    styles: {
      cellPadding: 2,
    },
  });

  doc.save('raw-materials-report.pdf');
};

// Ensure this is the default export
export default generateRawPDF;