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
            <button onClick={handleContent}>Show Image content</button>
            <div>
                <img src={fileContent} alt="" />
            </div>
        </div>
    );
}
