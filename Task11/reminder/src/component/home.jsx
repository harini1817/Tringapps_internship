import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./styles.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import CloseIcon from '@mui/icons-material/Close';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';

export default function Alarm() {
    const [reminderName, setReminderName] = useState("");
    const [selectedDate, setSelectedDate] = useState(null);
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0); // State to keep track of unread notifications
    const [showNotifications, setShowNotifications] = useState(false);

    const handleSetReminder = () => {
        const formattedDate = selectedDate ? selectedDate.toLocaleString() : '';
        const message = `Reminder set for ${reminderName} at ${formattedDate}`;
        setNotifications(prevNotifications => [...prevNotifications, { message, visible: true }]);
        setReminderName(""); 
        toast.success(message);
        setUnreadCount(prevCount => prevCount + 1); // Increment unread count
    };

    const toggleNotifications = () => {
        setShowNotifications(prevState => !prevState);
        if (unreadCount > 0) {
            setUnreadCount(0); // Mark all notifications as read when opening notification panel
        }
    };

    const handleCancelNotification = (index) => {
        const updatedNotifications = [...notifications]; // Create a copy of the notifications array
        updatedNotifications.splice(index, 1); // Remove the notification at the specified index
        setNotifications(updatedNotifications); // Update the state with the modified array
    
        // Decrement unread count only if the notification was visible
        if (notifications[index].visible) {
            setUnreadCount(prevCount => Math.max(0, prevCount - 1));
        }
    };
    
    return (
        
        <><div className="dashboard">
            <h1 className="heading">REMINDER SETTER</h1>
            Check for upcoming reminders
            <IconButton onClick={toggleNotifications} className="notification-icon">
                                <Badge badgeContent={unreadCount} color="error">
                                    <NotificationsNoneIcon />
                                </Badge>
                            </IconButton>
            
            </div><div className="container-wrapper">


            {/* Alarm Form */}
            <div className="card-wrapper">
                <div className="card">
                    <div className="card-body">
                        <h2 className="card-title">
                        SCHEDULE

                            
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

            {/* Notifications */}
            {showNotifications && notifications.length > 0 && (
  <div className="notification-container">
    {notifications.slice(0).reverse().map((notification, index) => (
      <div className={`notification-card ${notification.visible ? '' : 'hidden'}`} key={index}>
        <div className="card">
          <div className="card-body">
            <h2 className="card-title">
              Notification
              <div className="cancel-icon-wrapper"><IconButton onClick={() => handleCancelNotification(index)} style={{ marginLeft: '10px', marginBottom: '15px' }}>
                <CloseIcon />
              </IconButton></div>
              
            </h2>
            <p>{notification.message}</p>
          </div>
        </div>
      </div>
    ))}
  </div>
)}

            <ToastContainer
                position="bottom-right"
                newestOnTop={true} hideProgressBar={true}/>
        </div></>
    );
}
