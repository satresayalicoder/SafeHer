import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Settings.css";

function Settings() {
  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("safeherUser")
  );

  const [notifications, setNotifications] = useState(
    localStorage.getItem("safeherNotifications") !== "false"
  );

  const [locationAccess, setLocationAccess] = useState(
    localStorage.getItem("safeherLocation") !== "false"
  );

  const [message, setMessage] = useState("");

  const [showLogoutModal, setShowLogoutModal] = useState(false);

  // Show small success message
  const showMessage = (text) => {
    setMessage(text);

    setTimeout(() => {
      setMessage("");
    }, 2500);
  };

  // Notification setting
  const handleNotificationChange = () => {
    const newValue = !notifications;

    setNotifications(newValue);

    localStorage.setItem(
      "safeherNotifications",
      newValue
    );

    showMessage("Notification settings updated.");
  };

  // Location setting
  const handleLocationChange = () => {
    const newValue = !locationAccess;

    setLocationAccess(newValue);

    localStorage.setItem(
      "safeherLocation",
      newValue
    );

    showMessage("Location settings updated.");
  };

  // Restore default settings
  const handleClearSettings = () => {
    localStorage.removeItem("safeherNotifications");
    localStorage.removeItem("safeherLocation");

    setNotifications(true);
    setLocationAccess(true);

    showMessage("Settings restored to default.");
  };

  // Actual logout
  const handleLogout = () => {
    localStorage.removeItem("safeherUser");

    setShowLogoutModal(false);

    navigate("/login");
  };

  return (
    <div className="settings-page">

      {/* =====================================
          SIDEBAR
      ====================================== */}

      <aside className="settings-sidebar">

        {/* Logo */}
        <div className="settings-logo">
          <span>🛡️</span>
          <h2>SafeHer</h2>
        </div>

        {/* Navigation */}
        <nav className="settings-nav">

          <Link to="/dashboard">
            🏠
            <span>Home</span>
          </Link>

          <Link to="/sos">
            🚨
            <span>SOS</span>
          </Link>

          <Link to="/map">
            📍
            <span>Safety Map</span>
          </Link>

          <Link to="/emergency-contacts">
            👥
            <span>Emergency Contacts</span>
          </Link>

          <Link to="/safety-tips">
            💡
            <span>Safety Tips</span>
          </Link>

          <Link to="/chatbot">
            🤖
            <span>SafeHer Assistant</span>
          </Link>

          <div className="settings-divider"></div>

          <Link to="/profile">
            👤
            <span>Profile</span>
          </Link>

          <Link
            to="/settings"
            className="active"
          >
            ⚙️
            <span>Settings</span>
          </Link>

        </nav>

        {/* Sidebar Logout */}
        <button
          className="settings-logout"
          onClick={() => setShowLogoutModal(true)}
        >
          🚪 Logout
        </button>

      </aside>


      {/* =====================================
          MAIN CONTENT
      ====================================== */}

      <main className="settings-main">

        {/* Header */}
        <div className="settings-header">

          <h1>Settings</h1>

          <p>
            Manage your SafeHer preferences and safety settings.
          </p>

        </div>


        {/* Success Message */}
        {message && (
          <div className="settings-message">
            ✓ {message}
          </div>
        )}


        {/* =====================================
            ACCOUNT
        ====================================== */}

        <section className="settings-card">

          <div className="settings-card-header">

            <div className="settings-icon">
              👤
            </div>

            <div>
              <h2>Account</h2>

              <p>
                Your SafeHer account information
              </p>
            </div>

          </div>


          <div className="account-info">

            <div>
              <span>Name</span>

              <strong>
                {user?.name || "User"}
              </strong>
            </div>


            <div>
              <span>Email</span>

              <strong>
                {user?.email || "Not available"}
              </strong>
            </div>

          </div>


          <Link
            to="/profile"
            className="settings-action"
          >
            View Profile
          </Link>

        </section>


        {/* =====================================
            NOTIFICATIONS
        ====================================== */}

        <section className="settings-card">

          <div className="settings-card-header">

            <div className="settings-icon">
              🔔
            </div>

            <div>
              <h2>Notifications</h2>

              <p>
                Control SafeHer notification preferences
              </p>
            </div>

          </div>


          <div className="setting-row">

            <div className="setting-text">

              <h3>
                Safety Notifications
              </h3>

              <p>
                Receive important safety-related notifications.
              </p>

            </div>


            <label className="switch">

              <input
                type="checkbox"
                checked={notifications}
                onChange={handleNotificationChange}
              />

              <span className="slider"></span>

            </label>

          </div>

        </section>


        {/* =====================================
            LOCATION
        ====================================== */}

        <section className="settings-card">

          <div className="settings-card-header">

            <div className="settings-icon">
              📍
            </div>

            <div>
              <h2>Location</h2>

              <p>
                Manage location access for safety features
              </p>
            </div>

          </div>


          <div className="setting-row">

            <div className="setting-text">

              <h3>
                Location Access
              </h3>

              <p>
                Allow SafeHer to use your device location
                for the Safety Map and emergency features.
              </p>

            </div>


            <label className="switch">

              <input
                type="checkbox"
                checked={locationAccess}
                onChange={handleLocationChange}
              />

              <span className="slider"></span>

            </label>

          </div>

        </section>


        {/* =====================================
            SAFETY
        ====================================== */}

        <section className="settings-card">

          <div className="settings-card-header">

            <div className="settings-icon">
              🛡️
            </div>

            <div>
              <h2>Safety</h2>

              <p>
                Quickly access your important safety tools
              </p>
            </div>

          </div>


          <div className="safety-links">

            {/* Emergency Contacts */}

            <Link to="/emergency-contacts">

              <span>
                👥
              </span>

              <div>

                <strong>
                  Emergency Contacts
                </strong>

                <small>
                  Manage people you can contact during an emergency.
                </small>

              </div>

              <span>
                ›
              </span>

            </Link>


            {/* SOS */}

            <Link to="/sos">

              <span>
                🚨
              </span>

              <div>

                <strong>
                  Emergency SOS
                </strong>

                <small>
                  Access the SafeHer emergency assistance feature.
                </small>

              </div>

              <span>
                ›
              </span>

            </Link>


            {/* Safety Map */}

            <Link to="/map">

              <span>
                📍
              </span>

              <div>

                <strong>
                  Safety Map
                </strong>

                <small>
                  View nearby safety indicators and locations.
                </small>

              </div>

              <span>
                ›
              </span>

            </Link>

          </div>

        </section>


        {/* =====================================
            PREFERENCES
        ====================================== */}

        <section className="settings-card">

          <div className="settings-card-header">

            <div className="settings-icon">
              ⚙️
            </div>

            <div>
              <h2>Preferences</h2>

              <p>
                Manage your SafeHer preferences
              </p>
            </div>

          </div>


          <button
            className="reset-button"
            onClick={handleClearSettings}
          >
            Restore Default Settings
          </button>

        </section>


        {/* =====================================
            LOGOUT CARD
        ====================================== */}

        <section className="logout-card">

          <div>

            <h2>
              Logout
            </h2>

            <p>
              Sign out of your SafeHer account on this device.
            </p>

          </div>


          <button
            className="logout-button"
            onClick={() => setShowLogoutModal(true)}
          >
            Logout
          </button>

        </section>


        {/* Footer */}

        <footer className="settings-footer">

          <p>
            SafeHer • Your safety, your control.
          </p>

        </footer>

      </main>


      {/* =====================================
          CUSTOM LOGOUT POPUP
      ====================================== */}

      {showLogoutModal && (

        <div
          className="logout-overlay"
          onClick={() => setShowLogoutModal(false)}
        >

          <div
            className="logout-modal"
            onClick={(e) => e.stopPropagation()}
          >

            {/* Icon */}

            <div className="logout-modal-icon">
              🚪
            </div>


            {/* Title */}

            <h2>
              Are you sure you want to exit?
            </h2>


            {/* Description */}

            <p>
              You will be logged out of your SafeHer account.
            </p>


            {/* Buttons */}

            <div className="logout-modal-buttons">

              <button
                className="cancel-logout"
                onClick={() => setShowLogoutModal(false)}
              >
                Cancel
              </button>


              <button
                className="confirm-logout"
                onClick={handleLogout}
              >
                Yes, Logout
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default Settings;