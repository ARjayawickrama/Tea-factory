import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

const generateRawPDF = (materials) => {
  const doc = new jsPDF();
  
  autoTable(doc, {
    head: [['Material Name', 'Stocked Date', 'Weight(kg)', 'Supplier Manager', 'Supplier Email']],
    body: materials.map(material => [
      material.materialName,
      material.stockedDate,
      material.weight,
      material.supplier,
      material.supplierEmail,
    ]),
  });
  
  doc.save('raw-materials-report.pdf');
};

// Ensure this is the default export
export default generateRawPDF;