import React, { useState } from "react";

export default function Myfile() {
    const [file, setFile] = useState(null);
    const [responseData, setResponseData] = useState(null);
    const [fileContent, setFileContent] = useState("");

    const handleChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        if (selectedFile) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setFileContent(event.target.result);
            };
            reader.readAsText(selectedFile);
        }
    };

    const handleUpload = (e) => {
        if (!file) {
            console.log("No file chosen");
            return;
        }

        fetch('https://httpbin.org/post', {
            method: 'POST',
            body: file,
            headers: {
                'content-type': file.type,
                'content-length': `${file.size}`,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setResponseData(data);
            })
            .catch((err) => console.error(err));
    };

    return (
        <>
            <div>
                <h2>File reader</h2>
            </div>
            <div>
                <div>
                    <input onChange={handleChange} type="file" />
                    <button onClick={handleUpload}>Upload</button>
                </div>
                {responseData && (
                    <div>
                        <h3>Data:</h3>
                        <pre>{fileContent}</pre>
                    </div>
                )}
            </div>
        </>
    );
}
