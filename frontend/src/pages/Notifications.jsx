import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Notifications.css";

function Notifications() {
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =========================
  // LOAD NOTIFICATIONS
  // =========================

  useEffect(() => {
    const savedUser = localStorage.getItem("safeherUser");

    if (!savedUser) {
      navigate("/login");
      return;
    }

    try {
      const loggedInUser = JSON.parse(savedUser);

      if (!loggedInUser.id) {
        localStorage.removeItem("safeherUser");
        navigate("/login");
        return;
      }

      axios
        .get(
          `http://127.0.0.1:8000/api/notifications/${loggedInUser.id}/`
        )
        .then((response) => {
          console.log(
            "Notifications API Response:",
            response.data
          );

          setNotifications(
            response.data.notifications || []
          );
        })
        .catch((error) => {
          console.error(
            "Notifications API Error:",
            error
          );

          setError(
            "Unable to load notifications."
          );
        })
        .finally(() => {
          setLoading(false);
        });

    } catch (error) {
      console.error(
        "User data error:",
        error
      );

      localStorage.removeItem("safeherUser");
      navigate("/login");
    }
  }, [navigate]);

  // =========================
  // MARK ONE AS READ
  // =========================

  const markAsRead = async (notificationId) => {
    try {
      await axios.patch(
        `http://127.0.0.1:8000/api/notifications/${notificationId}/read/`
      );

      setNotifications((previous) =>
        previous.map((notification) =>
          notification.id === notificationId
            ? {
                ...notification,
                is_read: true,
              }
            : notification
        )
      );

    } catch (error) {
      console.error(
        "Mark notification read error:",
        error
      );
    }
  };

  // =========================
  // MARK ALL AS READ
  // =========================

  const markAllAsRead = async () => {
    const savedUser =
      localStorage.getItem("safeherUser");

    if (!savedUser) {
      navigate("/login");
      return;
    }

    try {
      const loggedInUser =
        JSON.parse(savedUser);

      await axios.patch(
        `http://127.0.0.1:8000/api/notifications/${loggedInUser.id}/read-all/`
      );

      setNotifications((previous) =>
        previous.map((notification) => ({
          ...notification,
          is_read: true,
        }))
      );

    } catch (error) {
      console.error(
        "Mark all notifications error:",
        error
      );
    }
  };

  // =========================
  // DATE FORMAT
  // =========================

  const formatDate = (date) => {
    if (!date) {
      return "";
    }

    return new Date(date).toLocaleString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }
    );
  };

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <div className="notifications-loading">

        <div className="notifications-loading-box">

          <div className="notifications-loading-icon">
            🔔
          </div>

          <h2>
            Loading Notifications...
          </h2>

          <p>
            Please wait
          </p>

        </div>

      </div>
    );
  }

  // =========================
  // PAGE
  // =========================

  return (
    <div className="notifications-page">

      {/* HEADER */}

      <header className="notifications-header">

        <button
          className="notification-back-button"
          onClick={() => navigate("/dashboard")}
        >
          ← Back
        </button>

        <div className="notifications-title">

          <div className="notifications-title-icon">
            🔔
          </div>

          <div>

            <span>
              SAFEHER
            </span>

            <h1>
              Notifications
            </h1>

          </div>

        </div>

        <button
          className="mark-all-button"
          onClick={markAllAsRead}
        >
          Mark all as read
        </button>

      </header>


      {/* ERROR */}

      {error && (
        <div className="notifications-error">
          {error}
        </div>
      )}


      {/* CONTENT */}

      <main className="notifications-content">

        <div className="notifications-top">

          <div>

            <span>
              YOUR UPDATES
            </span>

            <h2>
              Recent Notifications
            </h2>

          </div>

          <div className="notification-count">

            {notifications.length}{" "}
            {notifications.length === 1
              ? "Notification"
              : "Notifications"}

          </div>

        </div>


        {/* EMPTY */}

        {notifications.length === 0 ? (

          <div className="no-notifications">

            <div className="empty-notification-icon">
              🔔
            </div>

            <h2>
              No notifications yet
            </h2>

            <p>
              You will see important SafeHer
              updates here.
            </p>

            <button
              onClick={() => navigate("/dashboard")}
            >
              Back to Dashboard
            </button>

          </div>

        ) : (

          <div className="notifications-list">

            {notifications.map(
              (notification) => (

                <div
                  key={notification.id}
                  className={`notification-card ${
                    notification.is_read
                      ? "notification-read"
                      : "notification-unread"
                  }`}
                >

                  {/* ICON */}

                  <div className="notification-card-icon">

                    {notification.notification_type ===
                    "COMPLAINT"
                      ? "📝"
                      : notification.notification_type ===
                        "SOS"
                      ? "🚨"
                      : notification.notification_type ===
                        "CONTACT"
                      ? "👥"
                      : "🔔"}

                  </div>


                  {/* CONTENT */}

                  <div className="notification-card-content">

                    <div className="notification-card-top">

                      <h3>
                        {notification.title}
                      </h3>

                      {!notification.is_read && (
                        <span className="unread-dot">
                          New
                        </span>
                      )}

                    </div>


                    <p>
                      {notification.message}
                    </p>


                    <small>
                      {formatDate(
                        notification.created_at
                      )}
                    </small>


                    {/* COMPLAINT STATUS */}

                    {notification.notification_type ===
                      "COMPLAINT" && (
                      <div className="notification-status">
                        Complaint Update
                      </div>
                    )}


                    {!notification.is_read && (
                      <button
                        className="read-button"
                        onClick={() =>
                          markAsRead(
                            notification.id
                          )
                        }
                      >
                        Mark as read
                      </button>
                    )}

                  </div>

                </div>

              )
            )}

          </div>

        )}

      </main>

    </div>
  );
}

export default Notifications;