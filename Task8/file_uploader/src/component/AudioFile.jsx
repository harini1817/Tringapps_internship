
import React from "react";

const AudioFile = ({ file }) => {
  return (
    <div>
      <h3>Audio Preview</h3>
      <audio controls>
        <source src={URL.createObjectURL(file)} type={file.type} />
        Your browser does not support the audio tag.
      </audio>
    </div>
  );
};

export default AudioFile;
