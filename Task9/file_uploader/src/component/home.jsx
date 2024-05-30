import React, { useState } from "react";
import TextFile from "./TextFile"; 
import PDFFile from "./PDFFile";
import CSVExcelFile from "./CSVExcelFile";
import ImageFile from "./ImageFile";
import VideoFile from "./VideoFile"; 
import AudioFile from "./AudioFile"; 
import "./styles.css"; 

export default function Myfile() {
    const [files, setFiles] = useState([]);
    const [showContent, setShowContent] = useState(false);

    const handleChange = (e) => {
        const selectedFiles = e.target.files;
        
        if (selectedFiles.length > 0) {
            const validFiles = Array.from(selectedFiles).filter(file => {
                const fileType = file.type;
                return (
                    fileType === "text/csv" || 
                    fileType === "application/pdf" || 
                    fileType === "text/plain" || 
                    fileType.startsWith("image/") || 
                    fileType === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
                    fileType.startsWith("video/") ||
                    fileType.startsWith("audio/")
                );
            });
            setFiles(validFiles);
        }
    };

    const handleContent = () => {
        if (files.length === 0) {
            console.log("No files chosen");
            return;
        }

        setShowContent(true);
    };

    return (
        <div className="container">
            <h2>FILE READER</h2>
            <div className="card">
                <div className="file-input">
                    <input onChange={handleChange} type="file" multiple/>
                </div>
                <div>
                    <button className="show-content-button" onClick={handleContent}>Upload</button>
                </div>
            </div>
            {showContent && files.length > 0 && (
                <div className="content-container">
                    {files.map((file, index) => (
                        <div className="card" key={index}>
                            {file.type === "application/pdf" && <PDFFile file={file} />}
                            {(file.type === "text/csv" || file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") && <CSVExcelFile file={file} />}
                            {file.type === "text/plain" && <TextFile file={file} />}
                            {file.type.startsWith("image/") && <ImageFile file={file} />}
                            {file.type.startsWith("video/") && <VideoFile file={file} />}
                            {file.type.startsWith("audio/") && <AudioFile file={file} />}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
