
import React from "react";

const VideoFile = ({ file }) => {
  return (
    <div>
      <h3>Video Preview</h3>
      <video controls>
        <source src={URL.createObjectURL(file)} type={file.type} />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoFile;
