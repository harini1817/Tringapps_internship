// TextFile.js
import React, { useState } from "react";

const TextFile = ({ file }) => {
    const [fileContent, setFileContent] = useState("");

    const handleContent = () => {
        if (!file) {
            console.log("No file chosen");
            return;
        }

        const reader = new FileReader();
        reader.onload = (event) => {
            setFileContent(event.target.result);
        };
        reader.readAsText(file);
    };

    return (
        <div  className="excel-table-container">
            <button onClick={handleContent} style={{ marginBottom: "20px" }}>Show Text content</button>
            <div className="text-content">
                {fileContent && <pre>{fileContent}</pre>}
            </div>
        </div>
    );
};

export default TextFile;
