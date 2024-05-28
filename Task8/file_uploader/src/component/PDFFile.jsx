import React, { useState } from "react";
import { getDocument } from "pdfjs-dist/legacy/build/pdf";


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

            // Use the default worker provided by PDF.js
            const pdf = await getDocument({ data: arrayBuffer, worker: null });

            const content = await extractTextFromPDF(pdf);

            setPdfContent(content);
        };
        reader.readAsArrayBuffer(file);
    };

    const extractTextFromPDF = async (pdf) => {
        const numPages = pdf.numPages;
        let content = "";

        for (let i = 1; i <= numPages; i++) {
            const page = await pdf.getPage(i);
            const textContent = await page.getTextContent();
            const textItems = textContent.items;
            textItems.forEach((item) => {
                content += item.str + " ";
            });
        }

        return content;
    };

    return (
        <div>
            <button onClick={handleContent}>Show PDF content</button>
            <div>
                <pre>{pdfContent}</pre>
            </div>
        </div>
    );
}
