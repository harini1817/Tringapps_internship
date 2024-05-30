import React, { useState } from "react";

const VideoFile = ({ file }) => {
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
      <button onClick={handleContent} >
        Show Video content
      </button>
      <div >
        {fileContent && (
          <video controls width='400px' className="video-container" >
            <source src={fileContent} type={file.type} />
          </video>
        )}
      </div>
    </div>
  );
};

export default VideoFile;
