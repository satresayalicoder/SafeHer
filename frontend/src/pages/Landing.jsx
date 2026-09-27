import { Link } from "react-router-dom";

function Landing() {
  return (
    <div className="safeher-page">

      {/* ================= NAVBAR ================= */}
      <nav className="navbar">

        <Link to="/" className="logo">
          <span className="logo-mark">S</span>
          <span>SafeHer</span>
        </Link>

        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#helps">How SafeHer Helps</a>
          <a href="#features">Features</a>
          <a href="#how-it-works">How It Works</a>
        </div>

        <div className="nav-actions">

          {/* LOGIN → CHOOSE ROLE */}
          <Link to="/choose-role" className="login-btn">
            Login
          </Link>

          {/* GET STARTED → CHOOSE ROLE */}
          <Link to="/choose-role" className="get-started-btn">
            Get Started
          </Link>

        </div>

      </nav>


      {/* ================= HERO ================= */}
      <section className="hero-section" id="home">

        <div className="hero-content">

          <div className="hero-text">

            <div className="small-label">
              WOMEN SAFETY PLATFORM
            </div>

            <h1>
              Your Safety.
              <br />
              <span>Our Priority.</span>
            </h1>

            <p>
              SafeHer is a smart women-safety platform designed
              to help you stay connected, aware and prepared
              wherever you go.
            </p>

            <div className="hero-buttons">

              {/* GET STARTED → CHOOSE ROLE */}
              <Link
                to="/choose-role"
                className="primary-btn"
              >
                Get Started
              </Link>

              {/* LOGIN → CHOOSE ROLE */}
              <Link
                to="/choose-role"
                className="secondary-btn"
              >
                Login
              </Link>

            </div>

            <div className="trust-line">
              <span>✓</span>
              Stay connected. Stay aware. Stay Safe.
            </div>

          </div>


          {/* ================= HERO IMAGE ================= */}

          <div className="hero-image-area">

            <div className="image-circle-bg"></div>

            <img
              src="https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=900"
              alt="Confident woman"
              className="hero-woman"
            />

            <div className="floating-card sos-card">

              <div className="floating-icon sos-icon">
                SOS
              </div>

              <div>
                <strong>Emergency SOS</strong>
                <small>Quick emergency alert</small>
              </div>

            </div>


            <div className="floating-card location-card">

              <div className="floating-icon location-icon">
                ●
              </div>

              <div>
                <strong>Live Location</strong>
                <small>Location awareness</small>
              </div>

            </div>


            <div className="floating-card contact-card">

              <div className="floating-icon contact-icon">
                +
              </div>

              <div>
                <strong>Trusted Contacts</strong>
                <small>Always connected</small>
              </div>

            </div>

          </div>

        </div>

      </section>


      {/* ================= QUICK FEATURES ================= */}

      <section className="quick-features">

        <div className="quick-card">

          <div className="feature-symbol">
            SOS
          </div>

          <div>
            <h3>Emergency SOS</h3>

            <p>
              Send an emergency alert quickly.
            </p>
          </div>

        </div>


        <div className="quick-card">

          <div className="feature-symbol">
            LOC
          </div>

          <div>
            <h3>Live Location</h3>

            <p>
              Stay aware of your location.
            </p>
          </div>

        </div>


        <div className="quick-card">

          <div className="feature-symbol">
            +
          </div>

          <div>
            <h3>Emergency Contacts</h3>

            <p>
              Keep trusted contacts ready.
            </p>
          </div>

        </div>


        <div className="quick-card">

          <div className="feature-symbol">
            TIP
          </div>

          <div>
            <h3>Safety Tips</h3>

            <p>
              Get useful safety guidance.
            </p>
          </div>

        </div>

      </section>


      {/* ================= HOW SAFEHER HELPS ================= */}

      <section
        className="section helps-section"
        id="helps"
      >

        <div className="section-heading">

          <span>HOW IT HELPS</span>

          <h2>How SafeHer Helps</h2>

          <p>
            Everything you need to feel more prepared,
            connected and aware in everyday situations.
          </p>

        </div>


        <div className="helps-grid">

          <div className="helps-image">

            <img
              src="https://images.pexels.com/photos/3768146/pexels-photo-3768146.jpeg?auto=compress&cs=tinysrgb&w=1000"
              alt="Women using mobile phone"
            />

            <div className="image-caption">

              <strong>
                Safety starts with awareness.
              </strong>

              <span>
                SafeHer keeps essential tools within reach.
              </span>

            </div>

          </div>


          <div className="help-cards">

            <div className="help-card">

              <div className="number">
                01
              </div>

              <div>
                <h3>Emergency SOS</h3>

                <p>
                  Quickly access emergency assistance
                  when you need help.
                </p>
              </div>

            </div>


            <div className="help-card">

              <div className="number">
                02
              </div>

              <div>
                <h3>Live Location</h3>

                <p>
                  Stay aware of your location and share
                  it when required.
                </p>
              </div>

            </div>


            <div className="help-card">

              <div className="number">
                03
              </div>

              <div>
                <h3>Trusted Contacts</h3>

                <p>
                  Keep important people ready to contact
                  during an emergency.
                </p>
              </div>

            </div>


            <div className="help-card">

              <div className="number">
                04
              </div>

              <div>
                <h3>Safety Guidance</h3>

                <p>
                  Access practical tips and guidance
                  for different situations.
                </p>
              </div>

            </div>

          </div>

        </div>

      </section>


      {/* ================= FEATURES ================= */}

      <section
        className="section features-section"
        id="features"
      >

        <div className="section-heading">

          <span>SAFEHER FEATURES</span>

          <h2>
            Everything You Need for Everyday Safety
          </h2>

          <p>
            Powerful safety tools brought together
            in one simple platform.
          </p>

        </div>


        <div className="features-layout">

          <div className="feature-list">

            <div className="big-feature-card active-feature">

              <div className="big-feature-number">
                01
              </div>

              <div>

                <h3>
                  Emergency SOS
                </h3>

                <p>
                  Quickly activate an emergency alert
                  and access important safety actions.
                </p>

              </div>

            </div>


            <div className="big-feature-card">

              <div className="big-feature-number">
                02
              </div>

              <div>

                <h3>
                  Safety Map
                </h3>

                <p>
                  Explore safety-related places and
                  stay aware of your surroundings.
                </p>

              </div>

            </div>


            <div className="big-feature-card">

              <div className="big-feature-number">
                03
              </div>

              <div>

                <h3>
                  Emergency Contacts
                </h3>

                <p>
                  Manage trusted contacts for quick
                  access whenever necessary.
                </p>

              </div>

            </div>


            <div className="big-feature-card">

              <div className="big-feature-number">
                04
              </div>

              <div>

                <h3>
                  SafeHer Assistant
                </h3>

                <p>
                  Get quick safety information and
                  helpful guidance through the assistant.
                </p>

              </div>

            </div>

          </div>


          <div className="features-photo">

            <img
              src="https://images.pexels.com/photos/3184436/pexels-photo-3184436.jpeg?auto=compress&cs=tinysrgb&w=1000"
              alt="Women together"
            />

            <div className="photo-overlay">

              <span>
                SafeHer
              </span>

              <strong>
                Safety that stays with you.
              </strong>

            </div>

          </div>

        </div>

      </section>


      {/* ================= HOW IT WORKS ================= */}

      <section
        className="section workflow-section"
        id="how-it-works"
      >

        <div className="section-heading">

          <span>
            SIMPLE PROCESS
          </span>

          <h2>
            How SafeHer Works
          </h2>

          <p>
            A simple flow designed to keep your essential
            safety tools accessible.
          </p>

        </div>


        <div className="workflow">

          <div className="workflow-card">

            <span>
              01
            </span>

            <div className="workflow-icon">
              +
            </div>

            <h3>
              Create Your Account
            </h3>

            <p>
              Register and create your personal
              SafeHer account.
            </p>

          </div>


          <div className="workflow-line"></div>


          <div className="workflow-card">

            <span>
              02
            </span>

            <div className="workflow-icon">
              USER
            </div>

            <h3>
              Set Up Your Profile
            </h3>

            <p>
              Add important personal and emergency
              information.
            </p>

          </div>


          <div className="workflow-line"></div>


          <div className="workflow-card">

            <span>
              03
            </span>

            <div className="workflow-icon">
              SAFE
            </div>

            <h3>
              Access Safety Tools
            </h3>

            <p>
              Use SOS, maps, contacts and safety guidance.
            </p>

          </div>


          <div className="workflow-line"></div>


          <div className="workflow-card">

            <span>
              04
            </span>

            <div className="workflow-icon">
              SOS
            </div>

            <h3>
              Get Help When Needed
            </h3>

            <p>
              Quickly access the tools you need
              during an emergency.
            </p>

          </div>

        </div>

      </section>


      {/* ================= REAL LIFE ================= */}

      <section className="section real-life-section">

        <div className="section-heading">

          <span>
            REAL-LIFE SAFETY
          </span>

          <h2>
            Designed For Real-Life Situations
          </h2>

          <p>
            SafeHer supports everyday situations where
            awareness and preparation matter.
          </p>

        </div>


        <div className="real-life-grid">

          <div className="real-life-card">

            <div className="real-image">

              <img
                src="https://images.pexels.com/photos/3768131/pexels-photo-3768131.jpeg?auto=compress&cs=tinysrgb&w=700"
                alt="Woman travelling"
              />

            </div>

            <div className="real-content">

              <span>
                01
              </span>

              <h3>
                Travel Safety
              </h3>

              <p>
                Stay aware and keep essential safety
                tools accessible while travelling.
              </p>

            </div>

          </div>


          <div className="real-life-card">

            <div className="real-image">

              <img
                src="https://images.pexels.com/photos/3760854/pexels-photo-3760854.jpeg?auto=compress&cs=tinysrgb&w=700"
                alt="Woman outdoors"
              />

            </div>

            <div className="real-content">

              <span>
                02
              </span>

              <h3>
                Everyday Safety
              </h3>

              <p>
                Get practical tips and information
                for everyday situations.
              </p>

            </div>

          </div>


          <div className="real-life-card emergency-real">

            <div className="real-content">

              <span>
                03
              </span>

              <h3>
                Emergency Situation
              </h3>

              <p>
                Access SOS, location and emergency
                contacts when immediate action is required.
              </p>

              <Link
                to="/choose-role"
                className="small-action"
              >
                Explore Safety Tools →
              </Link>

            </div>

          </div>

        </div>

      </section>


      {/* ================= SIMPLE FAST CONNECTED ================= */}

      <section className="section connected-section">

        <div className="section-heading">

          <span>
            SAFEHER EXPERIENCE
          </span>

          <h2>
            Simple. Fast. Connected.
          </h2>

          <p>
            Designed to keep important safety information
            and actions easy to reach.
          </p>

        </div>


        <div className="connected-grid">

          <div className="connected-card">

            <div>
              01
            </div>

            <h3>
              Simple
            </h3>

            <p>
              Clean and easy-to-understand safety tools.
            </p>

          </div>


          <div className="connected-card highlighted">

            <div>
              02
            </div>

            <h3>
              Fast
            </h3>

            <p>
              Quickly access important emergency actions.
            </p>

          </div>


          <div className="connected-card">

            <div>
              03
            </div>

            <h3>
              Connected
            </h3>

            <p>
              Stay connected with your trusted contacts.
            </p>

          </div>

        </div>

      </section>


      {/* ================= CTA ================= */}

      <section className="final-cta">

        <div className="cta-content">

          <span>
            SAFEHER
          </span>

          <h2>
            Be Prepared.
            <br />
            Stay Connected. Stay Safe.
          </h2>

          <p>
            Get started with SafeHer and keep essential
            safety tools within reach.
          </p>


          <div className="cta-buttons">

            <Link
              to="/choose-role"
              className="primary-btn"
            >
              Get Started
            </Link>

            {/* LOGIN → CHOOSE ROLE */}
            <Link
              to="/choose-role"
              className="secondary-btn"
            >
              Login
            </Link>

          </div>

        </div>

      </section>


      {/* ================= FOOTER ================= */}

      <footer className="footer">

        <div className="footer-main">

          <div className="footer-brand">

            <div className="logo footer-logo">

              <span className="logo-mark">
                S
              </span>

              <span>
                SafeHer
              </span>

            </div>

            <p>
              Your Safety. Our Priority.
            </p>

            <small>
              A smart women-safety platform designed
              for everyday awareness and preparedness.
            </small>

          </div>


          <div className="footer-column">

            <h4>
              Explore
            </h4>

            <a href="#home">
              Home
            </a>

            <a href="#helps">
              How SafeHer Helps
            </a>

            <a href="#features">
              Features
            </a>

            <a href="#how-it-works">
              How It Works
            </a>

          </div>


          <div className="footer-column">

            <h4>
              Account
            </h4>

            {/* LOGIN → CHOOSE ROLE */}
            <Link to="/choose-role">
              Login
            </Link>

            <Link to="/choose-role">
              Get Started
            </Link>

            <Link to="/forgot-password">
              Forgot Password
            </Link>

          </div>

        </div>


        <div className="footer-bottom">

          <span>
            © 2026 SafeHer. All rights reserved.
          </span>

          <div>

            <span>
              Privacy Policy
            </span>

            <span>
              Terms & Conditions
            </span>

          </div>

        </div>

      </footer>

    </div>
  );
}

export default Landing;