import React, { useState } from "react";
import PDFFile from "./PDFFile";
import CSVExcelFile from "./CSVExcelFile";
import ImageFile from "./ImageFile";
import "./styles.css"; // Import the CSS file

export default function Myfile() {
    const [file, setFile] = useState(null);
    const [showContent, setShowContent] = useState(false);

    const handleChange = (e) => {
        const selectedFile = e.target.files[0];
        
        if (selectedFile) {
            const fileType = selectedFile.type;
            if (fileType === "text/csv" || 
                fileType === "application/pdf" || 
                fileType === "text/plain" || 
                fileType.startsWith("image/") || 
                fileType === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
                setFile(selectedFile);
            } else {
                console.log("Please select a CSV, PDF, Excel, image, or text file.");
            }
        }
    };

    const handleContent = () => {
        if (!file) {
            console.log("No file chosen");
            return;
        }

        const reader = new FileReader();
        reader.onload = (event) => {
            setShowContent(true);
        };

        if (file.type.startsWith("image/")) {
            reader.readAsDataURL(file);
        } else if (file.type === "text/csv" || file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" || file.type === "text/plain") {
            reader.readAsText(file);
        } else if (file.name.endsWith(".pdf")) {
            reader.readAsDataURL(file);
        } else {
            reader.readAsText(file);
        }
    };

    return (
        <div className="container">
            <h2>File reader</h2>
            <div className="file-input">
                <input onChange={handleChange} type="file"/>
            </div>
            <div>
                <button className="show-content-button" onClick={handleContent}>Show content</button>
            </div>
            {showContent && file && (
                <>
                    {file.type === "application/pdf" && <PDFFile file={file} />}
                    {(file.type === "text/csv" || file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" || file.type === "text/plain") && <CSVExcelFile file={file} />}
                    {file.type.startsWith("image/") && <ImageFile file={file} />}
                </>
            )}
        </div>
    );
}
