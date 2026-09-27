import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Profile.css";

function Profile() {
  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("safeherUser")
  );

  if (!user) {
    return (
      <div style={styles.loginPage}>
        <h2>Please login first</h2>
        <button
          style={styles.loginButton}
          onClick={() => navigate("/login")}
        >
          Go to Login
        </button>
      </div>
    );
  }

  const handleLogout = () => {
    localStorage.removeItem("safeherUser");
    navigate("/login");
  };

  return (
    <div className="profile-page">

      {/* Sidebar */}
      <aside className="profile-sidebar">

        <div className="profile-logo">
          <span>🛡️</span>
          <h2>SafeHer</h2>
        </div>

        <nav className="profile-nav">

          <Link to="/dashboard">
            🏠 <span>Home</span>
          </Link>

          <Link to="/sos">
            🚨 <span>SOS</span>
          </Link>

          <Link to="/map">
            📍 <span>Safety Map</span>
          </Link>

          <Link to="/emergency-contacts">
            👥 <span>Emergency Contacts</span>
          </Link>

          <Link to="/safety-tips">
            💡 <span>Safety Tips</span>
          </Link>

          <Link to="/chatbot">
            🤖 <span>SafeHer Assistant</span>
          </Link>

          <div className="profile-divider"></div>

          <Link to="/profile" className="active">
            👤 <span>Profile</span>
          </Link>

          <Link to="/settings">
            ⚙️ <span>Settings</span>
          </Link>

        </nav>

        <button
          className="profile-logout"
          onClick={handleLogout}
        >
          🚪 Logout
        </button>

      </aside>

      {/* Main Content */}
      <main className="profile-main">

        <div className="profile-header">
          <div>
            <h1>My Profile</h1>
            <p>
              View your SafeHer account information.
            </p>
          </div>
        </div>

        {/* Profile Card */}
        <section className="profile-card">

          <div className="profile-avatar">
            {user.name
              ? user.name.charAt(0).toUpperCase()
              : "U"}
          </div>

          <div className="profile-basic">
            <h2>{user.name}</h2>
            <p>{user.email}</p>
          </div>

        </section>

        {/* Account Information */}
        <section className="information-card">

          <div className="card-heading">
            <div className="heading-icon">
              👤
            </div>

            <div>
              <h2>Account Information</h2>
              <p>Your registered SafeHer account details</p>
            </div>
          </div>

          <div className="info-grid">

            <div className="info-item">
              <label>Full Name</label>
              <div className="info-value">
                {user.name}
              </div>
            </div>

            <div className="info-item">
              <label>Email Address</label>
              <div className="info-value">
                {user.email}
              </div>
            </div>

            <div className="info-item">
              <label>Account ID</label>
              <div className="info-value">
                {user.id}
              </div>
            </div>

            <div className="info-item">
              <label>Account Status</label>
              <div className="status-value">
                <span className="status-dot"></span>
                Active
              </div>
            </div>

          </div>

        </section>

        {/* Safety Account Section */}
        <section className="safety-card">

          <div className="safety-icon">
            🛡️
          </div>

          <div className="safety-content">
            <h2>Your Safety Matters</h2>
            <p>
              Keep your emergency contacts updated and use
              the SafeHer safety tools whenever you need them.
            </p>

            <div className="safety-actions">

              <Link
                to="/emergency-contacts"
                className="primary-action"
              >
                Manage Emergency Contacts
              </Link>

              <Link
                to="/settings"
                className="secondary-action"
              >
                Open Settings
              </Link>

            </div>
          </div>

        </section>

      </main>

    </div>
  );
}

const styles = {
  loginPage: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "15px",
    fontFamily: "Arial, sans-serif",
  },

  loginButton: {
    padding: "12px 25px",
    border: "none",
    borderRadius: "8px",
    background: "#e91e63",
    color: "#fff",
    cursor: "pointer",
    fontSize: "15px",
  },
};

export default Profile;