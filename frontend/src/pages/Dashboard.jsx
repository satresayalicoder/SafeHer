import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();

  // =========================
  // USER
  // =========================

  const [user, setUser] = useState(null);

  // =========================
  // REAL DASHBOARD DATA
  // =========================

  const [stats, setStats] = useState({
    emergency_contacts: 0,
    safety_checkins: 0,
    saved_safe_places: 0,
    safety_score: 0,
  });

  const [contacts, setContacts] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  // =========================
  // NOTIFICATIONS
  // =========================

  const [unreadNotifications, setUnreadNotifications] = useState(0);

  // =========================
  // LOGOUT POPUP
  // =========================

  const [showLogoutPopup, setShowLogoutPopup] = useState(false);

  // =========================
  // LOAD REAL DATA
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

      // =========================
      // LOAD USER DATA
      // =========================

      axios
        .get(
          `http://127.0.0.1:8000/api/auth/dashboard/${loggedInUser.id}/`
        )
        .then((response) => {
          console.log("User API Response:", response.data);

          setUser(response.data.user);
        })
        .catch((error) => {
          console.error("User API Error:", error);

          if (error.response?.status === 404) {
            setError("User not found.");
          } else {
            setError("Unable to load user information.");
          }
        });

      // =========================
      // LOAD EMERGENCY CONTACTS
      // =========================

      axios
        .get(
          `http://127.0.0.1:8000/api/emergency/${loggedInUser.id}/`
        )
        .then((response) => {
          console.log(
            "Emergency Contacts API Response:",
            response.data
          );

          const realContacts = response.data.contacts || [];

          setContacts(realContacts);

          setStats((previous) => ({
            ...previous,
            emergency_contacts:
              response.data.count ||
              response.data.total_contacts ||
              realContacts.length ||
              0,
          }));
        })
        .catch((error) => {
          console.error(
            "Emergency Contacts API Error:",
            error
          );

          setContacts([]);

          setStats((previous) => ({
            ...previous,
            emergency_contacts: 0,
          }));
        })
        .finally(() => {
          setLoading(false);
        });

      // =========================
      // LOAD UNREAD NOTIFICATIONS
      // =========================

      axios
        .get(
          `http://127.0.0.1:8000/api/notifications/${loggedInUser.id}/unread-count/`
        )
        .then((response) => {
          console.log(
            "Unread Notifications API Response:",
            response.data
          );

          setUnreadNotifications(
            response.data.unread_count || 0
          );
        })
        .catch((error) => {
          console.error(
            "Notifications API Error:",
            error
          );

          setUnreadNotifications(0);
        });

    } catch (error) {
      console.error("User data error:", error);

      localStorage.removeItem("safeherUser");

      navigate("/login");
    }
  }, [navigate]);

  // =========================
  // LOGOUT
  // =========================

  const handleLogout = () => {
    localStorage.removeItem("safeherUser");

    setShowLogoutPopup(false);

    navigate("/login");
  };

  // =========================
  // LOADING SCREEN
  // =========================

  if (loading) {
    return (
      <div className="dashboard-loading">

        <div className="loading-box">

          <div className="loading-logo">
            S
          </div>

          <h2>
            Loading SafeHer...
          </h2>

          <p>
            Preparing your safety dashboard
          </p>

        </div>

      </div>
    );
  }

  // =========================
  // DASHBOARD
  // =========================

  return (
    <div className="dashboard-page">

      {/* ===================================== */}
      {/* SIDEBAR */}
      {/* ===================================== */}

      <aside className="dashboard-sidebar">

        {/* LOGO */}

        <div className="sidebar-logo">

          <div className="logo-box">
            S
          </div>

          <div>

            <h2>
              SafeHer
            </h2>

            <span>
              WOMEN'S SAFETY
            </span>

          </div>

        </div>


        {/* MAIN MENU */}

        <p className="sidebar-title">
          MAIN MENU
        </p>


        <nav className="sidebar-nav">

          <Link
            to="/dashboard"
            className="sidebar-link active"
          >
            <span>⌂</span>
            Home
          </Link>


          <Link
            to="/sos"
            className="sidebar-link"
          >
            <span>◉</span>
            SOS
          </Link>


          <Link
            to="/map"
            className="sidebar-link"
          >
            <span>⌖</span>
            Safety Map
          </Link>


          <Link
            to="/emergency-contacts"
            className="sidebar-link"
          >
            <span>♧</span>
            Emergency Contacts
          </Link>


          <Link
            to="/safety-tips"
            className="sidebar-link"
          >
            <span>✦</span>
            Safety Tips
          </Link>


          <Link
            to="/chatbot"
            className="sidebar-link"
          >
            <span>◌</span>
            SafeHer Assistant
          </Link>


          {/* FILE COMPLAINT */}

          <Link
            to="/complaint"
            className="sidebar-link"
          >
            <span>📝</span>
            File Complaint
          </Link>

        </nav>


        {/* DIVIDER */}

        <div className="sidebar-divider"></div>


        {/* ACCOUNT */}

        <p className="sidebar-title">
          ACCOUNT
        </p>


        <nav className="sidebar-nav">

          <Link
            to="/profile"
            className="sidebar-link"
          >
            <span>○</span>
            Profile
          </Link>


          <Link
            to="/settings"
            className="sidebar-link"
          >
            <span>⚙</span>
            Settings
          </Link>

        </nav>


        <div className="sidebar-space"></div>


        {/* LOGOUT */}

        <button
          className="logout-button"
          onClick={() =>
            setShowLogoutPopup(true)
          }
        >
          <span>↪</span>
          Logout
        </button>

      </aside>


      {/* ===================================== */}
      {/* MAIN CONTENT */}
      {/* ===================================== */}

      <main className="dashboard-main">

        {/* ================================= */}
        {/* HEADER */}
        {/* ================================= */}

        <header className="dashboard-header">

          <div>

            <p className="welcome-small">
              Welcome, {user?.name || "User"}
            </p>


            <h1>
              Your safety is always within reach.
            </h1>

          </div>


          <div className="header-user">

            {/* SAFETY STATUS */}

            <div className="safe-status">

              <span></span>

              Safety Active

            </div>


            {/* ============================= */}
            {/* NOTIFICATION BELL */}
            {/* ============================= */}

            <button
              className="notification-button"
              type="button"
              onClick={() => navigate("/notifications")}
              title="Notifications"
              style={{
                position: "relative",
                cursor: "pointer",
              }}
            >

              🔔

              {unreadNotifications > 0 && (
                <span
                  style={{
                    position: "absolute",
                    top: "-5px",
                    right: "-5px",
                    minWidth: "20px",
                    height: "20px",
                    padding: "0 5px",
                    borderRadius: "50%",
                    background: "#e91e63",
                    color: "#ffffff",
                    fontSize: "11px",
                    fontWeight: "700",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "2px solid #ffffff",
                    boxSizing: "border-box",
                  }}
                >
                  {unreadNotifications}
                </span>
              )}

            </button>


            {/* USER AVATAR */}

            <div className="user-avatar">

              {user?.name
                ? user.name.charAt(0).toUpperCase()
                : "U"}

            </div>


            {/* USER NAME */}

            <div className="user-name">

              <strong>
                {user?.name || "User"}
              </strong>

              <small>
                {user?.email || "SafeHer User"}
              </small>

            </div>

          </div>

        </header>


        {/* ================================= */}
        {/* ERROR */}
        {/* ================================= */}

        {error && (
          <div
            style={{
              padding: "12px 16px",
              marginBottom: "20px",
              borderRadius: "10px",
              background: "#fff1f1",
              color: "#c62828",
            }}
          >
            {error}
          </div>
        )}


        {/* ================================= */}
        {/* TOP GRID */}
        {/* ================================= */}

        <section className="top-grid">


          {/* WELCOME CARD */}

          <div className="welcome-card">

            <div className="welcome-text">

              <span className="pink-label">
                SAFETY FIRST
              </span>


              <h2>
                You're in control
                <br />
                of your safety.
              </h2>


              <p>
                Access emergency tools, monitor your
                surroundings and stay connected with
                people you trust.
              </p>


              <button
                className="check-button"
                type="button"
                onClick={() => navigate("/sos")}
              >
                ✓ Safety Check-in
              </button>


              <small>
                Check-in history will appear here once
                the check-in feature is connected.
              </small>

            </div>


            <div className="simple-image">

              <img
                src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=700&q=85"
                alt="Woman using phone"
              />

            </div>

          </div>


          {/* SOS CARD */}

          <div className="sos-card">

            <div className="sos-heading">

              <div>

                <span>
                  EMERGENCY
                </span>

                <h2>
                  Emergency SOS
                </h2>

              </div>


              <b>
                ● READY
              </b>

            </div>


            <p>
              Need immediate help? Send an emergency
              alert to your trusted contacts.
            </p>


            <button
              className="sos-button"
              onClick={() => navigate("/sos")}
            >

              <strong>
                SOS
              </strong>

              <small>
                Get Help Now
              </small>

            </button>


            <div className="sos-note">
              ! Press only in an emergency.
            </div>


            <div className="contact-connected">

              ✓ {stats.emergency_contacts} emergency contacts connected

            </div>

          </div>

        </section>


        {/* ================================= */}
        {/* QUICK ACTIONS */}
        {/* ================================= */}

        <section className="dashboard-section">

          <div className="section-header">

            <div>

              <span>
                QUICK ACCESS
              </span>

              <h2>
                Quick Actions
              </h2>

            </div>

          </div>


          <div className="quick-grid">


            {/* LIVE LOCATION */}

            <Link
              to="/map"
              className="feature-card"
            >

              <div className="feature-icon pink">
                ⌖
              </div>


              <h3>
                Live Location
              </h3>


              <p>
                Share your current location with
                trusted contacts.
              </p>


              <span>
                View Location →
              </span>

            </Link>


            {/* SAFETY MAP */}

            <Link
              to="/map"
              className="feature-card"
            >

              <div className="feature-icon purple">
                ▣
              </div>


              <h3>
                Safety Map
              </h3>


              <p>
                Explore nearby safe places and
                important locations.
              </p>


              <span>
                Open Map →
              </span>

            </Link>


            {/* CONTACTS */}

            <Link
              to="/emergency-contacts"
              className="feature-card"
            >

              <div className="feature-icon green">
                ♧
              </div>


              <h3>
                Emergency Contacts
              </h3>


              <p>
                Manage people you can contact
                during an emergency.
              </p>


              <span>
                {stats.emergency_contacts} contacts →
              </span>

            </Link>


            {/* SAFETY TIPS */}

            <Link
              to="/safety-tips"
              className="feature-card"
            >

              <div className="feature-icon orange">
                ✦
              </div>


              <h3>
                Safety Tips
              </h3>


              <p>
                Get practical guidance for
                everyday safety.
              </p>


              <span>
                View Tips →
              </span>

            </Link>


            {/* FILE COMPLAINT */}

            <Link
              to="/complaint"
              className="feature-card"
            >

              <div className="feature-icon pink">
                📝
              </div>


              <h3>
                File a Complaint
              </h3>


              <p>
                Report a safety incident and
                submit it for review.
              </p>


              <span>
                File Complaint →
              </span>

            </Link>


          </div>

        </section>


        {/* ================================= */}
        {/* OVERVIEW */}
        {/* ================================= */}

        <section className="overview-grid">


          {/* EMERGENCY CONTACTS */}

          <div className="overview-card">

            <div className="overview-icon pink">
              ♧
            </div>


            <div>

              <span>
                Emergency Contacts
              </span>


              <strong>
                {stats.emergency_contacts} Active
              </strong>

            </div>

          </div>


          {/* CHECK INS */}

          <div className="overview-card">

            <div className="overview-icon blue">
              ✓
            </div>


            <div>

              <span>
                Safety Check-ins
              </span>


              <strong>
                {stats.safety_checkins}
              </strong>

            </div>

          </div>


          {/* SAFE PLACES */}

          <div className="overview-card">

            <div className="overview-icon purple">
              ♡
            </div>


            <div>

              <span>
                Saved Safe Places
              </span>


              <strong>
                {stats.saved_safe_places}
              </strong>

            </div>

          </div>


          {/* SAFETY SCORE */}

          <div className="overview-card">

            <div className="score">
              {stats.safety_score}
            </div>


            <div>

              <span>
                Safety Score
              </span>


              <strong>
                Not calculated yet
              </strong>

            </div>

          </div>

        </section>


        {/* ================================= */}
        {/* MAP + CONTACTS */}
        {/* ================================= */}

        <section className="two-column">


          {/* MAP */}

          <div className="content-card">

            <div className="card-header">

              <div>

                <span>
                  LOCATION AWARENESS
                </span>


                <h2>
                  Nearby Safety Map
                </h2>

              </div>


              <b className="live-badge">
                MAP
              </b>

            </div>


            <div className="map-box">

              <div className="map-road road1"></div>

              <div className="map-road road2"></div>

              <div className="map-road road3"></div>


              <div className="map-you">
                ●
              </div>


              <div className="map-place police">
                🚓
              </div>


              <div className="map-place hospital">
                +
              </div>


              <div className="map-place pharmacy">
                +
              </div>


              <span className="map-text">
                Map preview
              </span>

            </div>


            <Link
              to="/map"
              className="view-link"
            >
              View Full Map →
            </Link>

          </div>


          {/* REAL TRUSTED CONTACTS */}

          <div className="content-card">

            <div className="card-header">

              <div>

                <span>
                  YOUR SAFETY NETWORK
                </span>


                <h2>
                  Trusted Contacts
                </h2>

              </div>


              <Link to="/emergency-contacts">
                Manage
              </Link>

            </div>


            <div className="contact-list">

              {contacts.length === 0 ? (

                <div
                  style={{
                    padding: "20px 5px",
                    color: "#777",
                    textAlign: "center",
                  }}
                >

                  <p>
                    No emergency contacts added yet.
                  </p>


                  <Link to="/emergency-contacts">
                    Add your first emergency contact →
                  </Link>

                </div>

              ) : (

                contacts.map((contact) => (

                  <div
                    className="contact-item"
                    key={contact.id}
                  >

                    <div className="contact-avatar pink-avatar">

                      {contact.name
                        ? contact.name.charAt(0).toUpperCase()
                        : "C"}

                    </div>


                    <div className="contact-info">

                      <strong>
                        {contact.name}
                      </strong>


                      <small>
                        {contact.relation}
                      </small>


                      <small>
                        {contact.phone}
                      </small>

                    </div>


                    <a
                      href={`tel:${contact.phone}`}
                      className="contact-call-button"
                    >
                      ☎
                    </a>

                  </div>

                ))

              )}

            </div>


            <Link
              to="/emergency-contacts"
              className="manage-button"
            >
              + Add / Manage Contacts
            </Link>

          </div>

        </section>


        {/* ================================= */}
        {/* TIPS + ACTIVITY */}
        {/* ================================= */}

        <section className="two-column">


          {/* SAFETY TIPS */}

          <div className="content-card">

            <div className="card-header">

              <div>

                <span>
                  STAY PREPARED
                </span>


                <h2>
                  Safety Tips
                </h2>

              </div>


              <Link to="/safety-tips">
                View All
              </Link>

            </div>


            <div className="tips-grid">


              <div className="tip-box">

                <div>
                  👁
                </div>


                <h3>
                  Stay Aware
                </h3>


                <p>
                  Keep your surroundings in view,
                  especially while travelling.
                </p>

              </div>


              <div className="tip-box">

                <div>
                  📍
                </div>


                <h3>
                  Share Location
                </h3>


                <p>
                  Let someone you trust know where
                  you are.
                </p>

              </div>


              <div className="tip-box">

                <div>
                  ☎
                </div>


                <h3>
                  Emergency Numbers
                </h3>


                <p>
                  Keep important emergency contacts
                  ready.
                </p>

              </div>


            </div>

          </div>


          {/* ACTIVITY */}

          <div className="content-card">

            <div className="card-header">

              <div>

                <span>
                  YOUR ACTIVITY
                </span>


                <h2>
                  Recent Activity
                </h2>

              </div>

            </div>


            <div className="activity-list">

              <div
                style={{
                  padding: "25px 5px",
                  textAlign: "center",
                  color: "#777",
                }}
              >

                <p>
                  No recent activity available.
                </p>


                <small>
                  Activity will appear here as you use
                  SafeHer features.
                </small>

              </div>

            </div>

          </div>

        </section>


        {/* ================================= */}
        {/* SAFEHER ASSISTANT */}
        {/* ================================= */}

        <section className="assistant-card">

          <div className="assistant-logo">
            ✦
          </div>


          <div className="assistant-text">

            <span>
              SAFEHER ASSISTANT
            </span>


            <h2>
              Need safety guidance?
            </h2>


            <p>
              Ask SafeHer Assistant for quick
              safety guidance and support.
            </p>

          </div>


          <button
            onClick={() => navigate("/chatbot")}
          >
            Ask SafeHer →
          </button>

        </section>


        {/* ================================= */}
        {/* BOTTOM CARD */}
        {/* ================================= */}

        <section className="bottom-card">

          <div>

            <h2>
              Your safety comes first.
            </h2>


            <p>
              Keep your emergency contacts updated
              and stay prepared.
            </p>

          </div>


          <div className="bottom-buttons">

            <Link to="/settings">
              Review Settings
            </Link>


            <Link to="/emergency-contacts">
              Emergency Contacts
            </Link>

          </div>

        </section>


        {/* ================================= */}
        {/* FOOTER */}
        {/* ================================= */}

        <footer className="dashboard-footer">

          <div>

            <strong>
              SafeHer
            </strong>


            <span>
              Stay aware. Stay connected. Stay safe.
            </span>

          </div>


          <div className="footer-links">

            <span>
              Privacy
            </span>


            <span>
              Terms
            </span>


            <span>
              Help & Support
            </span>

          </div>

        </footer>


      </main>


      {/* ===================================================== */}
      {/* LOGOUT POPUP - SAME AS ADMIN DASHBOARD */}
      {/* ===================================================== */}

      {showLogoutPopup && (

        <div
          className="logout-overlay"
          onClick={() =>
            setShowLogoutPopup(false)
          }
        >

          <div
            className="logout-popup"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <div className="logout-popup-icon">
              ↪
            </div>


            <h2>
              Logout?
            </h2>


            <p>
              Are you sure you want to logout from
              your SafeHer account?
            </p>


            <div className="logout-popup-buttons">

              <button
                className="cancel-logout"
                onClick={() =>
                  setShowLogoutPopup(false)
                }
              >
                Cancel
              </button>


              <button
                className="confirm-logout"
                onClick={handleLogout}
              >
                Logout
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default Dashboard;