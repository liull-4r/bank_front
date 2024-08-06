import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";

const UserNotifications = () => {
  const Token = localStorage.getItem("Token");
  const user = Token ? jwtDecode(Token) : null;
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://bank-system-back.onrender.com/detection/principaltousernotification/?recipient_id=${user?.user_id}`
        );
        setNotifications(response.data);
      } catch (error) {
        toast.error("an error has occurred. Please try again later.");
      }
    };

    fetchData();
  }, []);

  const removeIdFromMessage = (message) => {
    return message.replace(/\(ID: \d+\)/, "").trim();
  };
  const extractAppointmentId = (message) => {
    const match = message.match(/\(ID: (\d+)\)/);
    return match ? match[1] : "";
  };

  const extractMRIScanId = (message) => {
    const match = message.match(/\(ID: (\d+)\)/);
    return match ? match[1] : "";
  };

  const markAsRead = async (notificationId) => {
    try {
      await axios.patch(
        `https://bank-system-back.onrender.com/detection/principaltousernotification/${notificationId}/`,
        {
          read: true,
        }
      );
      setNotifications(
        notifications.map((notification) =>
          notification.id === notificationId
            ? { ...notification, read: true }
            : notification
        )
      );
    } catch (error) {
      toast.error("an error has occurred. Please try again later.");
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Notifications {notifications.length}</h2>
      {notifications.length === 0 ? (
        <p>No notifications Availabe</p>
      ) : (
        <div style={styles.notificationContainer}>
          {notifications.map((notification) => (
            <div key={notification.id} style={styles.notification}>
              {notification.message.startsWith("New Message") ? (
                <Link
                  to={`/userdetail/${extractAppointmentId(
                    notification.message
                  )}`}
                >
                  <p> {removeIdFromMessage(notification.message)}</p>
                  <p>{formatDate(notification.created_at)}</p>
                </Link>
              ) : notification.message.startsWith("New Response") ? (
                <Link
                  to={`/principalresponsedetail/${extractMRIScanId(
                    notification.message
                  )}`}
                >
                  <p>{notification.message}</p>
                </Link>
              ) : (
                <p>{removeIdFromMessage(notification.message)}</p>
              )}
              {!notification.read && (
                <button
                  style={{ backgroundColor: "#D02149" }}
                  onClick={() => markAsRead(notification.id)}
                >
                  Mark as Read
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "600px",
    margin: " 100px auto",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "5px",
  },
  heading: {
    fontSize: "24px",
    marginBottom: "20px",
  },
  notificationContainer: {
    display: "flex",
    flexDirection: "column",
  },
  notification: {
    backgroundColor: "#f4f4f4",
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default UserNotifications;
