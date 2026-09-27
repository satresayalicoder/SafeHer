import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Complaint.css";

function Complaint() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    location: "",
    date: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [complaintId, setComplaintId] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");
    setSubmitted(false);

    try {
      // Get logged-in user
      const savedUser = localStorage.getItem("safeherUser");

      if (!savedUser) {
        setError("Please login before submitting a complaint.");
        setLoading(false);
        return;
      }

      const user = JSON.parse(savedUser);

      // Send complaint to Django backend
      const response = await axios.post(
        "http://127.0.0.1:8000/api/sos/complaints/create/",
        {
          user_id: user.id,
          title: formData.title,
          category: formData.category,
          description: formData.description,
          location: formData.location,
          date: formData.date || null,
        }
      );

      console.log("Complaint API Response:", response.data);

      // Store complaint ID
      setComplaintId(response.data.complaint.id);

      // Show success message
      setSubmitted(true);

      // CLEAR FORM AFTER SUCCESSFUL SUBMISSION
      setFormData({
        title: "",
        category: "",
        description: "",
        location: "",
        date: "",
      });

    } catch (error) {
      console.error("Complaint API Error:", error);

      if (error.response) {
        setError(
          error.response.data.message ||
          "Unable to submit complaint."
        );
      } else {
        setError(
          "Unable to connect to the SafeHer server."
        );
      }

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="complaint-page">

      {/* ================= SIDEBAR ================= */}

      <aside className="complaint-sidebar">

        <div className="sidebar-logo">
          <div className="logo-icon">S</div>

          <div>
            <h2>SafeHer</h2>
            <span>Safety & Support</span>
          </div>
        </div>

        <nav className="sidebar-nav">

          <Link to="/dashboard">
            <span>⌂</span>
            Home
          </Link>

          <Link to="/sos">
            <span>🚨</span>
            SOS
          </Link>

          <Link to="/map">
            <span>📍</span>
            Safety Map
          </Link>

          <Link to="/emergency-contacts">
            <span>☎</span>
            Emergency Contacts
          </Link>

          <Link to="/safety-tips">
            <span>🛡</span>
            Safety Tips
          </Link>

          <Link to="/chatbot">
            <span>💬</span>
            SafeHer Assistant
          </Link>

          <div className="sidebar-divider"></div>

          <Link
            to="/complaint"
            className="active"
          >
            <span>📝</span>
            File Complaint
          </Link>

          <Link to="/profile">
            <span>👤</span>
            Profile
          </Link>

          <Link to="/settings">
            <span>⚙</span>
            Settings
          </Link>

        </nav>

        <button
          className="sidebar-logout"
          onClick={() => navigate("/login")}
        >
          <span>↪</span>
          Logout
        </button>

      </aside>


      {/* ================= MAIN ================= */}

      <main className="complaint-main">

        <header className="complaint-header">

          <div>
            <p className="page-small-title">
              SAFEHER SUPPORT
            </p>

            <h1>File a Complaint</h1>

            <p>
              Report an incident and share the details securely
              with SafeHer.
            </p>
          </div>

          <Link
            to="/dashboard"
            className="back-dashboard"
          >
            ← Dashboard
          </Link>

        </header>


        <section className="complaint-content">

          {/* ================= INFO CARD ================= */}

          <div className="complaint-info-card">

            <div className="info-icon">
              🛡
            </div>

            <h2>Your safety matters</h2>

            <p>
              Use this form to report a safety-related incident.
              Provide accurate information so it can be reviewed
              properly.
            </p>

            <div className="info-item">
              <span>✓</span>

              <div>
                <strong>Secure Report</strong>

                <p>
                  Your complaint is submitted securely.
                </p>
              </div>
            </div>

            <div className="info-item">
              <span>✓</span>

              <div>
                <strong>Admin Review</strong>

                <p>
                  The SafeHer admin can review your complaint.
                </p>
              </div>
            </div>

            <div className="info-item">
              <span>✓</span>

              <div>
                <strong>Complaint ID</strong>

                <p>
                  You will receive a complaint ID after submission.
                </p>
              </div>
            </div>

          </div>


          {/* ================= FORM ================= */}

          <div className="complaint-form-card">

            <div className="form-heading">

              <h2>Complaint Details</h2>

              <p>
                Please provide the information below.
              </p>

            </div>


            <form onSubmit={handleSubmit}>

              {/* TITLE */}

              <div className="form-group">

                <label>
                  Complaint Title
                  <span>*</span>
                </label>

                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter complaint title"
                  required
                />

              </div>


              {/* CATEGORY */}

              <div className="form-group">

                <label>
                  Complaint Category
                  <span>*</span>
                </label>

                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                >

                  <option value="">
                    Select complaint category
                  </option>

                  <option value="Harassment">
                    Harassment
                  </option>

                  <option value="Stalking">
                    Stalking
                  </option>

                  <option value="Threat">
                    Threat
                  </option>

                  <option value="Domestic Violence">
                    Domestic Violence
                  </option>

                  <option value="Online Safety">
                    Online Safety
                  </option>

                  <option value="Public Safety">
                    Public Safety
                  </option>

                  <option value="Other">
                    Other
                  </option>

                </select>

              </div>


              {/* DESCRIPTION */}

              <div className="form-group">

                <label>
                  Complaint Description
                  <span>*</span>
                </label>

                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe what happened..."
                  rows="6"
                  required
                />

              </div>


              {/* LOCATION + DATE */}

              <div className="form-row">

                <div className="form-group">

                  <label>
                    Incident Location
                  </label>

                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="Enter incident location"
                  />

                </div>


                <div className="form-group">

                  <label>
                    Incident Date
                  </label>

                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                  />

                </div>

              </div>


              {/* NOTICE */}

              <div className="complaint-notice">

                <span>ℹ</span>

                <p>
                  Please provide truthful and accurate information.
                  False information may affect the review of your
                  complaint.
                </p>

              </div>


              {/* SUCCESS */}

              {submitted && (

                <div className="complaint-success">

                  <span>✓</span>

                  <div>

                    <strong>
                      Complaint submitted successfully!
                    </strong>

                    <p>
                      Complaint ID: #{complaintId}
                    </p>

                  </div>

                </div>

              )}


              {/* ERROR */}

              {error && (

                <div
                  className="complaint-error"
                  style={{
                    marginTop: "15px",
                    padding: "12px",
                    borderRadius: "8px",
                    background: "#ffe5e5",
                    color: "#c62828",
                  }}
                >
                  {error}
                </div>

              )}


              {/* BUTTONS */}

              <div className="form-actions">

                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => navigate("/dashboard")}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="submit-complaint-btn"
                  disabled={loading}
                >

                  {loading
                    ? "Submitting..."
                    : "Submit Complaint"}

                  {!loading && <span>→</span>}

                </button>

              </div>

            </form>

          </div>

        </section>


        <footer className="complaint-footer">

          <strong>SafeHer</strong>

          <span>
            Your safety. Your voice. Your support.
          </span>

        </footer>

      </main>

    </div>
  );
}

export default Complaint;