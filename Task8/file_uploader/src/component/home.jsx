import React, { useState } from "react";
import TextFile from "./TextFile"; // Import the TextFile component
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

        setShowContent(true);
    };

    return (
        <div className="container">
            <h2  style={{ color:"white" }}>FILE READER</h2>
            <div className="card">
                <div className="file-input">
                    <input onChange={handleChange} type="file" multiple/>
                </div>
                <div>
                    <button className="show-content-button" onClick={handleContent}>Upload</button>
                </div>
            </div>
            {showContent && file && (
                <div className="content-container">
                    {file.type === "application/pdf" && (
                        <div className="card">
                            <PDFFile file={file} />
                        </div>
                    )}
                    {(file.type === "text/csv" || file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") && (
                        <div className="card">
                            <CSVExcelFile file={file} />
                        </div>
                    )}
                    {file.type === "text/plain" && (
                        <div className="card">
                            <TextFile file={file} />
                        </div>
                    )}
                    {file.type.startsWith("image/") && (
                        <div className="card">
                            <ImageFile file={file} />
                        </div>
                    )}
                    {file.type.startsWith("video/") && (
                        <div className="card">
                            <VideoFile file={file} />
                        </div>
                    )}
                    {file.type.startsWith("audio/") && (
                        <div className="card">
                            <AudioFile file={file} />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
