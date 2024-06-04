import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import './Message.css'; // Assuming you have a separate CSS file for styling

export default function Message() {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const handleToastClick = () => {
    setToastMessage("You clicked me");
    setShowToast(true);
  };

  const handleCloseToast = () => {
    setShowToast(false);
  };

  return (
    <div className="toast-container">
      <h1 className="title">Toast Messenger</h1>
      <button className="toast-button" onClick={handleToastClick}>Click me</button>
      {showToast && (
        <div className="toast">
          <span className="toast-message">{toastMessage}</span>
          <FontAwesomeIcon icon={faTimes} onClick={handleCloseToast} className="close-icon" />
        </div>
      )}
    </div>
  );
}
