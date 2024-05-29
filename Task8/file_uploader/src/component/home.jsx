import React, { useState } from "react";
import PDFFile from "./PDFFile";
import CSVExcelFile from "./CSVExcelFile";
import ImageFile from "./ImageFile";
import VideoFile from "./VideoFile"; 
import AudioFile from "./AudioFile"; 
import "./styles.css"; 

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
                fileType === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
                fileType.startsWith("video/") ||
                fileType.startsWith("audio/")) { 
                setFile(selectedFile);
            } else {
                console.log("Please select a supported file type.");
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
        } else if (file.type.startsWith("video/")) {
            reader.readAsDataURL(file); 
        } else if (file.type.startsWith("audio/")) {
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
            <h2>FILE READER</h2>
            <div className="file-input">
                <input onChange={handleChange} type="file" multiple/>
            </div>
            <div>
                <button className="show-content-button" onClick={handleContent}>Upload</button>
            </div>
            {showContent && file && (
                <>
                    {file.type === "application/pdf" && <PDFFile file={file} />}
                    {(file.type === "text/csv" || file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" || file.type === "text/plain") && <CSVExcelFile file={file} />}
                    {file.type.startsWith("image/") && <ImageFile file={file} />}
                    {file.type.startsWith("video/") && <VideoFile file={file} />} 
                    {file.type.startsWith("audio/") && <AudioFile file={file} />} 
                </>
            )}
        </div>
    );
}
