const exportToPDF = () => {
  const doc = new jsPDF();
  const tableColumn = ['Name', 'Email', 'Review', 'Rating', 'Image'];
  const tableRows = [];

  // Add feedback data to the PDF table
  feedbacks.forEach(feedback => {
    const feedbackData = [
      feedback.name,
      feedback.email,
      feedback.review,
      feedback.rating,
      Array.isArray(feedback.image) ? feedback.image.join(', ') : feedback.image || 'No image' // Handle undefined or non-array image
    ];
    tableRows.push(feedbackData);
  });

  // Load the image from the public folder
  const imageUrl = `${window.location.origin}/PdfImage.png`; // Path to the image in the public folder
  const img = new Image();
  img.src = imageUrl;

  img.onload = () => {
    const pdfWidth = doc.internal.pageSize.getWidth(); // Get the PDF width
    const imgWidth = pdfWidth - 28; // 14 on each side for margins
    const imgHeight = (img.height * imgWidth) / img.width; // Maintain aspect ratio

    doc.addImage(img, 'PNG', 0, 0, 210, 60); // Add image to PDF (x, y, width, height)

    // Center the title
    const title = 'Feedback Report';
    const titleWidth = doc.getTextWidth(title);
    const titleX = (pdfWidth - titleWidth) / 2; // Calculate X position for center alignment

    // Set font to bold and add the title
    doc.setFont("helvetica", "bold");
    doc.text(title, titleX, 70); // Position title below the image

    // Set font back to normal for the table
    doc.setFont("helvetica", "normal");

    // Generate table with custom colors
    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 30 + imgHeight, // Start the table after the image and title
      theme: 'grid',
      headStyles: {
        fillColor: [35, 197, 94], // Change header background color
        textColor: [255, 255, 255], // Change header text color (white)
        fontStyle: 'bold', // Make header text bold
      },
      bodyStyles: {
        fillColor: [240, 240, 240], // Change body background color (light gray)
        textColor: [0, 0, 0], // Change body text color (black)
      },
      alternateRowStyles: {
        fillColor: [255, 255, 255], // Alternate row color (white)
      },
    });

    doc.save('feedback_report.pdf'); // Save and download the PDF
  };
};
