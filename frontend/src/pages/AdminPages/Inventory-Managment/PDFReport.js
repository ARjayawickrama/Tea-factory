import jsPDF from 'jspdf';
import 'jspdf-autotable';
import logo from "../../../assets/PdfImage.jpg";

export const generatePDF = (products) => {
  const doc = new jsPDF("portrait", "pt", "a4");

  const imgWidth = 595;
  const imgHeight = 168.4;

  // Add logo (banner)
  doc.addImage(logo, "PNG", 0, 20, imgWidth, imgHeight);

  // Add title with extra space below the banner
  doc.setFontSize(18);
  const titleYPosition = imgHeight + 80; // 80pt space below the logo
  doc.text('Product Inventory Report', 50, titleYPosition);

  // Set table columns and data
  const tableColumns = [
    { header: 'ProductId', dataKey: 'productId' },
    { header: 'Product', dataKey: 'product' },
    { header: 'Manufacture Date', dataKey: 'manufactureDate' },
    { header: 'Expire Date', dataKey: 'expireDate' },
    { header: 'Weight', dataKey: 'weight' },
    { header: 'Items', dataKey: 'items' },
    { header: 'Description', dataKey: 'description' },
  ];

  const tableData = products.map(product => ({
    productId: product.productId,
    product: product.product,
    manufactureDate: product.manufactureDate,
    expireDate: product.expireDate,
    weight: product.weight,
    items: product.items,
    description: product.description,
  }));

  // Add table to PDF with space below the title
  doc.autoTable({
    columns: tableColumns,
    body: tableData,
    startY: titleYPosition + 40, // 40pt space below the title
    headStyles: {
      fillColor: [0, 128, 0],
      textColor: [255, 255, 255], 
      fontSize: 12,
      fontStyle: 'bold',
    },
    styles: {
      cellPadding: 2,
      overflow: 'linebreak',  // Allow word wrapping
      minCellHeight: 20,      // Set minimum cell height
      fontSize: 10,           // Adjust font size for readability
    },
    // Enable auto width for columns
    columnStyles: {
      productId: { cellWidth: 'auto' },
      product: { cellWidth: 'auto' },
      manufactureDate: { cellWidth: 'auto' },
      expireDate: { cellWidth: 'auto' },
      weight: { cellWidth: 'auto' },
      items: { cellWidth: 'auto' },
      description: { cellWidth: 'auto' },
    },
    didParseCell: (data) => {
      // Wrap text in cells if needed
      if (data.cell.section === 'body' && data.column.dataKey === 'description') {
        const maxLines = 3; // Limit number of lines for the description
        const text = data.cell.text.join(' '); // Get text
        const lines = doc.splitTextToSize(text, 150); // Adjust width as needed
        data.cell.text = lines.slice(0, maxLines); // Only keep limited lines
      }
    },
  });

  // Save the PDF
  doc.save('Inventory_Report.pdf');
};
