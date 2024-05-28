import React, { useState } from "react";

export default function CSVExcelFile({ file }) {
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
        <div>
            <button onClick={handleContent}>Show CSV/Excel/Text content</button>
            <div>
                <pre>{fileContent}</pre>
            </div>
        </div>
    );
}
