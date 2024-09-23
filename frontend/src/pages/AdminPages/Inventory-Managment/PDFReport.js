import jsPDF from 'jspdf';
import 'jspdf-autotable';


export const generatePDF = (products) => {
  const doc = new jsPDF();

  // Add title
  doc.setFontSize(18);
  doc.text('Product Inventory Report', 14, 22);

  // Set table columns and data
  const tableColumns = [
    { header: 'Product', dataKey: 'product' },
    { header: 'Manufacture Date', dataKey: 'manufactureDate' },
    { header: 'Expire Date', dataKey: 'expireDate' },
    { header: 'Weight', dataKey: 'weight' },
    { header: 'items', dataKey: 'items' },
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
    startY: 30,
  });

  // Save the PDF
  doc.save('Inventory_Report.pdf');
};
