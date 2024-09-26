import jsPDF from 'jspdf';
import 'jspdf-autotable';
import logo from '../../../assets/PdfImage.jpg';

const generateOrderPDF = (records) => {
    const doc = new jsPDF("portrait", "pt", "a4");
    const imgWidth = 595;
    const imgHeight = 168.4;

    doc.addImage(logo, "PNG", 0, 20, imgWidth, imgHeight);
    doc.setFontSize(18);
    doc.text("Orders Report", 50, imgHeight + 40);

    const tableColumns = [
        { header: "Name", dataKey: "name" },
        { header: "Contact", dataKey: "contact" },
        { header: "Email", dataKey: "email" },
        { header: "Order Items", dataKey: "orderItems" },
        { header: "Total Price", dataKey: "totalPrice" },
        { header: "Status", dataKey: "status" },
    ];

    // Helper function to format cart items as a string with line breaks
    const formatOrderItems = (items) => {
        return items.map(item => 
            `Product: ${item.productName}\nWeight: ${item.weight}\nQuantity: ${item.quantity}`
        ).join('\n\n'); // Add extra space between each item for better readability
    };

    const tableBody = records.map(order => ({
        name: order.name,
        contact: order.contact,
        email: order.email,
        orderItems: formatOrderItems(order.cartItems), // Format items with line breaks
        totalPrice: `Rs.${order.totalPrice}.00`,
        status: order.status,
    }));

    doc.autoTable({
        columns: tableColumns,
        body: tableBody,
        startY: imgHeight + 60,
        headStyles: {
            fillColor: [0, 128, 0],
            textColor: [255, 255, 255],
            fontSize: 12,
            fontStyle: 'bold',
        },
        styles: {
            cellPadding: 5,
            minCellHeight: 20,
        },
        didParseCell: (data) => {
            // Prevent default text rendering in the "Order Items" column
            if (data.column.dataKey === 'orderItems') {
                data.cell.text = ''; // Clear default text for Order Items column
            }
        },
        didDrawCell: (data) => {
            if (data.column.dataKey === 'orderItems') {
                // Custom rendering for the "Order Items" cell
                const orderItems = tableBody[data.row.index].orderItems.split('\n');
                const cellPosX = data.cell.x + 5; // Slight margin from left
                let cellPosY = data.cell.y + 15; // Start slightly below the top of the cell

                doc.setFontSize(10); // Set font size for order items

                // Adjusting spacing between lines to prevent overlap
                orderItems.forEach((line) => {
                    doc.text(line, cellPosX, cellPosY);
                    cellPosY += 14; // Increase line height to avoid overlap
                });
            }
        },
    });

    doc.save("Orders_Report.pdf");
};

export default generateOrderPDF;
