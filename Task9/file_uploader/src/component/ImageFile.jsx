import React, { useState } from "react";

export default function ImageFile({ file }) {
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
        reader.readAsDataURL(file);
    };

    return (
        <div>
            <button onClick={handleContent} style={{ marginBottom: "20px" }}>Show Image content</button>
            <div className="image-container">
                {fileContent && <img src={fileContent} alt="" className="image-preview" width='500px' height='200px' />}
            </div>
        </div>
    );
}
