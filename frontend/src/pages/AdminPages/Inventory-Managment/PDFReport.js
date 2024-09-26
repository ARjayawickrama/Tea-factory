import jsPDF from 'jspdf';
import 'jspdf-autotable';
import logo from "../../../assets/PdfImage.jpg";

export const generatePDF = (products) => {
  const doc = new jsPDF();

  const imgWidth = 595;
  const imgHeight = 168.4; 

  // Add logo
  doc.addImage(logo, "PNG", 0, 20, imgWidth, imgHeight); 

  // Add title
  doc.setFontSize(18);
  doc.text('Product Inventory Report', 50, imgHeight + 40); // Adjusted position below the logo

  // Set table columns and data
  const tableColumns = [
    { header: 'Product', dataKey: 'product' },
    { header: 'Manufacture Date', dataKey: 'manufactureDate' },
    { header: 'Expire Date', dataKey: 'expireDate' },
    { header: 'Weight', dataKey: 'weight' },
    { header: 'Items', dataKey: 'items' },
    { header: 'Description', dataKey: 'description' },
  ];

  const tableData = products.map(product => ({
    product: product.product,
    manufactureDate: product.manufactureDate,
    expireDate: product.expireDate,
    weight: product.weight,
    items: product.items,
    description: product.description,
  }));

  // Add table to PDF
  doc.autoTable({
    columns: tableColumns,
    body: tableData,
    startY: imgHeight + 60, // Adjust start position to accommodate the title and logo
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

  // Save the PDF
  doc.save('Inventory_Report.pdf');
};


