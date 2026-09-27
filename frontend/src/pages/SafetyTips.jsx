import React from "react";
import { Link, useNavigate } from "react-router-dom";

import "./SafetyTips.css";

function SafetyTips() {
  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("safeherUser")
  );

  const logout = () => {
    localStorage.removeItem("safeherUser");
    navigate("/login");
  };

  return (
    <div className="safety-tips-page">

      {/* ================= SIDEBAR ================= */}

      <aside className="tips-sidebar">

        <div className="tips-logo">

          <div className="tips-logo-box">
            S
          </div>

          <div>
            <h2>SafeHer</h2>
            <span>WOMEN'S SAFETY</span>
          </div>

        </div>

        <p className="tips-menu-title">
          MAIN MENU
        </p>

        <nav className="tips-nav">

          <Link to="/dashboard">
            <span>⌂</span>
            Home
          </Link>

          <Link to="/sos">
            <span>◉</span>
            SOS
          </Link>

          <Link to="/map">
            <span>⌖</span>
            Safety Map
          </Link>

          <Link to="/emergency-contacts">
            <span>♧</span>
            Emergency Contacts
          </Link>

          <Link
            to="/safety-tips"
            className="tips-active"
          >
            <span>✦</span>
            Safety Tips
          </Link>

          <Link to="/chatbot">
            <span>◌</span>
            SafeHer Assistant
          </Link>

        </nav>

        <div className="tips-divider"></div>

        <p className="tips-menu-title">
          ACCOUNT
        </p>

        <nav className="tips-nav">

          <Link to="/profile">
            <span>○</span>
            Profile
          </Link>

          <Link to="/settings">
            <span>⚙</span>
            Settings
          </Link>

        </nav>

        <div className="tips-sidebar-space"></div>

        <button
          className="tips-logout"
          onClick={logout}
        >
          <span>↪</span>
          Logout
        </button>

      </aside>


      {/* ================= MAIN ================= */}

      <main className="tips-main">

        {/* HEADER */}

        <header className="tips-header">

          <div>

            <p className="tips-label">
              PERSONAL SAFETY GUIDE
            </p>

            <h1>
              Safety Tips
            </h1>

            <p className="tips-description">
              Simple and practical safety guidance
              for everyday situations.
            </p>

          </div>

          <div className="tips-user">

            <div className="tips-user-avatar">
              {user?.name
                ? user.name
                    .charAt(0)
                    .toUpperCase()
                : "U"}
            </div>

            <div>

              <strong>
                {user?.name || "User"}
              </strong>

              <small>
                {user?.email || ""}
              </small>

            </div>

          </div>

        </header>


        {/* ================= IMPORTANT MESSAGE ================= */}

        <section className="tips-important">

          <div className="important-icon">
            !
          </div>

          <div>

            <h3>
              Stay aware of your surroundings
            </h3>

            <p>
              Trust your instincts, stay connected
              with people you trust, and use
              emergency services whenever you
              genuinely need immediate assistance.
            </p>

          </div>

        </section>


        {/* ================= QUICK TIPS ================= */}

        <section className="tips-section">

          <div className="section-heading">

            <span>
              EVERYDAY SAFETY
            </span>

            <h2>
              Everyday Safety Tips
            </h2>

          </div>


          <div className="tips-grid">

            <div className="tip-card">

              <div className="tip-number">
                01
              </div>

              <div className="tip-icon">
                👀
              </div>

              <h3>
                Stay Alert
              </h3>

              <p>
                Be aware of your surroundings,
                especially when walking alone or
                using your phone in public.
              </p>

            </div>


            <div className="tip-card">

              <div className="tip-number">
                02
              </div>

              <div className="tip-icon">
                📱
              </div>

              <h3>
                Keep Your Phone Ready
              </h3>

              <p>
                Keep your phone charged and
                accessible when travelling or
                going to an unfamiliar place.
              </p>

            </div>


            <div className="tip-card">

              <div className="tip-number">
                03
              </div>

              <div className="tip-icon">
                👥
              </div>

              <h3>
                Stay Connected
              </h3>

              <p>
                Let a trusted person know your
                plans when travelling alone or
                meeting someone unfamiliar.
              </p>

            </div>


            <div className="tip-card">

              <div className="tip-number">
                04
              </div>

              <div className="tip-icon">
                📍
              </div>

              <h3>
                Share Your Location
              </h3>

              <p>
                When appropriate, share your
                location or travel details with
                someone you trust.
              </p>

            </div>

          </div>

        </section>


        {/* ================= TRAVEL ================= */}

        <section className="tips-section">

          <div className="section-heading">

            <span>
              TRAVEL SAFETY
            </span>

            <h2>
              When Travelling
            </h2>

          </div>


          <div className="large-tips-grid">

            <div className="large-tip-card">

              <div className="large-tip-icon">
                🚕
              </div>

              <div>

                <h3>
                  Check Your Transport
                </h3>

                <p>
                  Before starting your journey,
                  check the vehicle details and
                  route when using a cab or ride
                  service.
                </p>

              </div>

            </div>


            <div className="large-tip-card">

              <div className="large-tip-icon">
                🗺️
              </div>

              <div>

                <h3>
                  Plan Your Route
                </h3>

                <p>
                  Familiarize yourself with your
                  route and keep navigation
                  available during your journey.
                </p>

              </div>

            </div>


            <div className="large-tip-card">

              <div className="large-tip-icon">
                🏙️
              </div>

              <div>

                <h3>
                  Prefer Public Areas
                </h3>

                <p>
                  When possible, choose well-used
                  public places and avoid unnecessary
                  isolated routes.
                </p>

              </div>

            </div>


            <div className="large-tip-card">

              <div className="large-tip-icon">
                🔋
              </div>

              <div>

                <h3>
                  Keep Your Phone Charged
                </h3>

                <p>
                  Carry a charged phone and,
                  when travelling for longer periods,
                  consider carrying a power bank.
                </p>

              </div>

            </div>

          </div>

        </section>


        {/* ================= NIGHT SAFETY ================= */}

        <section className="night-safety-card">

          <div className="night-icon">
            🌙
          </div>

          <div className="night-content">

            <span>
              NIGHT SAFETY
            </span>

            <h2>
              If You Are Travelling at Night
            </h2>

            <div className="night-points">

              <div>
                <span>✓</span>
                Stay aware of your surroundings.
              </div>

              <div>
                <span>✓</span>
                Prefer active and well-used routes.
              </div>

              <div>
                <span>✓</span>
                Keep emergency contacts accessible.
              </div>

              <div>
                <span>✓</span>
                Avoid unnecessary distractions while
                walking.
              </div>

            </div>

          </div>

        </section>


        {/* ================= DIGITAL SAFETY ================= */}

        <section className="tips-section">

          <div className="section-heading">

            <span>
              DIGITAL SAFETY
            </span>

            <h2>
              Stay Safe Online
            </h2>

          </div>


          <div className="digital-grid">

            <div className="digital-card">

              <div className="digital-icon">
                🔐
              </div>

              <h3>
                Protect Your Passwords
              </h3>

              <p>
                Use strong, unique passwords and
                avoid sharing them with others.
              </p>

            </div>


            <div className="digital-card">

              <div className="digital-icon">
                🎣
              </div>

              <h3>
                Watch for Scams
              </h3>

              <p>
                Be careful with unexpected links,
                messages, calls, and requests for
                personal information.
              </p>

            </div>


            <div className="digital-card">

              <div className="digital-icon">
                📸
              </div>

              <h3>
                Think Before Sharing
              </h3>

              <p>
                Review privacy settings and think
                carefully before sharing personal
                information publicly.
              </p>

            </div>

          </div>

        </section>


        {/* ================= EMERGENCY ================= */}

        <section className="emergency-tip-card">

          <div>

            <span>
              NEED HELP?
            </span>

            <h2>
              If You Feel You Are In Immediate Danger
            </h2>

            <p>
              Move towards a safer public location
              when possible and contact a trusted
              person or appropriate emergency
              service.
            </p>

          </div>

          <Link
            to="/sos"
            className="open-sos-button"
          >
            Open SOS
          </Link>

        </section>


        {/* ================= FOOTER ================= */}

        <footer className="tips-footer">

          <strong>
            SafeHer
          </strong>

          <span>
            Stay aware. Stay connected. Stay safe.
          </span>

        </footer>

      </main>

    </div>
  );
}

export default SafetyTips;