import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import logo from '../assets/logo.png'; // Import your logo image

// This function generates a PDF report of raw materials using jsPDF and autoTable
const generateRawPDF = (materials) => {
  // Create a new PDF document in portrait mode, A4 size
  const doc = new jsPDF("portrait", "pt", "a4");
  
  // Set image dimensions and add the logo image
  const imgWidth = 595;
  const imgHeight = 168.4;
  doc.addImage(logo, "PNG", 0, 20, imgWidth, imgHeight); 
  
  // Add report title after leaving space below the image
  doc.setFontSize(18);
  const titleYPosition = imgHeight + 60; // Add space between banner and title
  doc.text('Raw Materials Report', 50, titleYPosition);
  
  // Table columns for raw materials report
  const tableColumns = ['Material Name', 'Stocked Date', 'Weight (kg)', 'Supplier Manager', 'Supplier Email'];
  
  // Map materials data to table format
  const tableData = materials.map(material => [
    material.materialName,
    material.stockedDate,
    material.weight,
    material.supplier,
    material.supplierEmail,
  ]);

  // Add a table with headers and data to the PDF
  autoTable(doc, {
    head: [tableColumns],
    body: tableData,
    startY: titleYPosition + 20, // Add space between title and table
    headStyles: {
      fillColor: [0, 128, 0], // Green header background
      textColor: [255, 255, 255], // White text color
      fontSize: 12,
      fontStyle: 'bold', // Bold text in header
    },
    styles: {
      cellPadding: 2, // Space between cell borders and content
    },
  });

  // Save the generated PDF as raw-materials-report.pdf
  doc.save('raw-materials-report.pdf');
};

export default generateRawPDF;
