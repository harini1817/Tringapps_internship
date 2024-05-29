import React, { useState } from "react";
import { getDocument } from 'pdfjs-dist/webpack'; // Import specific functionality
import "./styles.css"; // Import your CSS file
// Extract text from PDF function
const extractTextFromPDF = async (pdf) => {
    const numPages = pdf.numPages;
    let extractedContent = ""; // Initialize extracted content

    for (let i = 1; i <= numPages; i++) {
        const page = await pdf.getPage(i); // Get page from PDF
        const textContent = await page.getTextContent(); // Get text content from page
        const textItems = textContent.items; // Get text items from content

        let pageContent = ""; // Initialize page content

        // Iterate through text items using for..of loop to use await safely
        for (const item of textItems) {
            if (item.str) {
                pageContent += item.str.trim(); // Add text item to page content

                if (item.str.trim().endsWith(".")) {
                    extractedContent += pageContent + "\n"; // Add page content to extracted content
                    pageContent = ""; // Reset page content
                }
            }
        }

        // Add any remaining text that doesn't end with a full stop
        if (pageContent !== "") {
            extractedContent += pageContent + "\n"; // Add remaining text to extracted content
            pageContent = ""; // Reset page content
        }
    }

    return extractedContent; // Return extracted content
};

export default function PDFFile({ file }) {
    const [pdfContent, setPdfContent] = useState("");

    const handleContent = async () => {
        if (!file) {
            console.log("No file chosen");
            return;
        }

        const reader = new FileReader();
        reader.onload = async (event) => {
            const arrayBuffer = event.target.result;

            // Load PDF using pdfjs
            try {
                const pdf = await getDocument({ data: arrayBuffer }).promise; // Use getDocument from pdfjs
                console.log("PDF loaded:", pdf);

                const content = await extractTextFromPDF(pdf); // Extract text content from PDF
                console.log("Text extracted:", content);

                setPdfContent(content); // Set extracted text content
            } catch (error) {
                console.error('Error loading PDF:', error);
            }
        };
        reader.readAsArrayBuffer(file); // Read file as array buffer
    };

    return (
        <div>
            <button onClick={handleContent}>Show PDF content</button>
            <div className="pdf-content-box"> {/* Apply the CSS class */}
                <pre>{pdfContent}</pre>
            </div>
        </div>
    );
}
