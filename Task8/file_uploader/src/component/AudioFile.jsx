import React, { useState } from "react";

const AudioFile = ({ file }) => {
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
      <button onClick={handleContent} style={{ marginBottom: "20px" }}>
        Show Audio content
      </button>
      <div className="audio-container">
        {fileContent && (
          <audio controls>
            <source src={fileContent} type={file.type} />
            Your browser does not support the audio tag.
          </audio>
        )}
      </div>
    </div>
  );
};

export default AudioFile;
