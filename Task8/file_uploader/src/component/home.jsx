import React, { useState } from "react";

export default function Myfile() {
    const [file, setFile] = useState(null);
    const [fileContent, setFileContent] = useState("");
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
            setFileContent(event.target.result);
            setShowContent(true);
        };

        if (file.type.startsWith("image/")) {
            reader.readAsDataURL(file);
        } else if (file.type === "text/csv" || file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
            reader.readAsText(file);
        } else if (file.name.endsWith(".pdf")) {
            reader.readAsDataURL(file);
        } else {
            reader.readAsText(file);
        }
    };

    return (
        <>
            <div>
                <h2>File reader</h2>
            </div>
            <div>
                <div>
                    <input onChange={handleChange} type="file"/>
                    <button onClick={handleContent}>Show content</button>
                </div>
                {showContent && (
                    <div>
                        <h3>Data:</h3>
                        {file.type.startsWith("image/") ? (
                            <img src={fileContent} alt="" />
                        ) : file.type === "text/csv" ? (
                            <pre>{fileContent}</pre>
                        ) : file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ? (
                            <pre>{fileContent}</pre>
                        ) : file.type === "text/plain" ? (
                            <pre>{fileContent}</pre>
                        ) : file.type === "application/pdf" ? (
                            <embed src={fileContent} width="500" height="500" type={file.type} />
                        ) : (
                            <p>File type not supported</p>
                        )}
                    </div>
                )}
            </div>
        </>
    );
}
