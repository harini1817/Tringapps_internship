import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./styles.css"; // Import the styles
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

export default function Alarm() {
    const [reminderName, setReminderName] = useState("");
    const [selectedDate, setSelectedDate] = useState(null);
    const [toastMessage, setToastMessage] = useState("");
    const [showToast, setShowToast] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [showStoredData, setShowStoredData] = useState(false);

    const handleSetReminder = () => {
        
        const formattedDate = selectedDate ? selectedDate.toLocaleString() : '';
        
        const message = `Reminder to ${reminderName} at ${formattedDate}`;
        setNotifications(prevNotifications => [...prevNotifications, message]);
        setToastMessage(message);
        setShowToast(true);
        setReminderName(""); 
    };

    const handleCloseToast = () => {
        setShowToast(false);
    };

    const handleClearNotifications = () => {
        setNotifications([]);
    };

    const handleShowStoredData = () => {
        setShowStoredData(true);
    };

    const handleCloseStoredData = () => {
        setShowStoredData(false);
    };

    return (
        <>
            <div className="container-wrapper">
                <div className="card-wrapper">
                    <div className="card">
                        <div className="card-body">
                            <h2 className="card-title">
                                REMINDER
                                <FontAwesomeIcon icon={faBell} className="notification-icon" onClick={handleShowStoredData} />
                            </h2>
                            <div className="form-group">
                                <input
                                    type="text"
                                    id="reminderName"
                                    value={reminderName}
                                    onChange={(e) => setReminderName(e.target.value)}
                                    className="form-control"
                                    placeholder="Reminder for"
                                    style={{ marginBottom: '50px' }} />
                            </div>
                            <div className="form-group">
                                <DatePicker
                                    selected={selectedDate}
                                    onChange={date => setSelectedDate(date)}
                                    showTimeSelect
                                    timeFormat="HH:mm"
                                    timeIntervals={15}
                                    dateFormat="MMMM d, yyyy h:mm aa"
                                    inline />
                            </div>
                            <button className="btn btn-primary" onClick={handleSetReminder} style={{ marginTop: '50px' }}>Set Reminder</button>
                        </div>
                    </div>
                </div>
            </div>

            {showToast && (
                <div className="toast">
                    <span className="toast-message">{toastMessage}</span>
                    <FontAwesomeIcon icon={faTimes} onClick={handleCloseToast} className="close-icon" />
                </div>
            )}

            {showStoredData && (
                <div className="stored-data">
                    <div className="card" style={{ position: 'absolute', top: '0', right: '0' }}>
                        <div className="card-body">
                            <h2 className="card-title">
                                Notifications  
                                <FontAwesomeIcon icon={faTimes} onClick={handleCloseStoredData} className="close-icon" />
                            </h2>
                            <ul>
                                {notifications.map((notification, index) => (
                                    <li key={index}>{notification}</li>
                                ))}
                            </ul>
                            <button className="btn btn-danger" onClick={handleClearNotifications}>Clear Notifications</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
