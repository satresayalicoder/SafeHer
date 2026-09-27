import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./SOS.css";

function SOS() {
  const navigate = useNavigate();

  // =====================================================
  // USER
  // =====================================================

  const [user, setUser] = useState(null);

  // =====================================================
  // EMERGENCY CONTACTS
  // =====================================================

  const [contacts, setContacts] = useState([]);

  // =====================================================
  // SOS STATES
  // =====================================================

  const [showConfirm, setShowConfirm] = useState(false);

  const [sosActive, setSosActive] = useState(false);

  const [sosTime, setSosTime] = useState(null);

  const [sosId, setSosId] = useState(null);

  const [sosLoading, setSosLoading] = useState(false);

  const [sosError, setSosError] = useState("");

  // =====================================================
  // LOCATION
  // =====================================================

  const [location, setLocation] = useState(null);

  const [locationError, setLocationError] = useState("");

  const [locationLoading, setLocationLoading] = useState(false);

  // =====================================================
  // LOAD USER + CONTACTS
  // =====================================================

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

      setUser(loggedInUser);

      // ---------------------------------------------
      // LOAD EMERGENCY CONTACTS
      // ---------------------------------------------

      axios
        .get(
          `http://127.0.0.1:8000/api/emergency/${loggedInUser.id}/`
        )
        .then((response) => {
          setContacts(response.data.contacts || []);
        })
        .catch((error) => {
          console.error(
            "Emergency contacts error:",
            error
          );

          setContacts([]);
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

  // =====================================================
  // GET CURRENT LOCATION
  // =====================================================

  const getCurrentLocation = () => {
    setLocationError("");

    setLocationLoading(true);

    if (!navigator.geolocation) {
      setLocationError(
        "Location is not supported by this browser."
      );

      setLocationLoading(false);

      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const currentLocation = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };

        setLocation(currentLocation);

        setLocationLoading(false);
      },

      (error) => {
        console.error(
          "Location error:",
          error
        );

        setLocationError(
          "Unable to get your location. Please allow location access."
        );

        setLocationLoading(false);
      },

      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  // =====================================================
  // SEND SOS
  // =====================================================

  const handleSOS = () => {
    setShowConfirm(false);

    setLocationError("");

    setSosError("");

    // -------------------------------------------------
    // CHECK USER
    // -------------------------------------------------

    if (!user || !user.id) {
      setSosError(
        "User information not found. Please login again."
      );

      return;
    }

    // -------------------------------------------------
    // CHECK GEOLOCATION
    // -------------------------------------------------

    if (!navigator.geolocation) {
      setLocationError(
        "Location is not supported by this browser."
      );

      return;
    }

    setLocationLoading(true);

    setSosLoading(true);

    // -------------------------------------------------
    // GET CURRENT LOCATION
    // -------------------------------------------------

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const currentLocation = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };

        // Save location in React
        setLocation(currentLocation);

        try {
          // =================================================
          // SEND SOS TO DJANGO BACKEND
          // =================================================

          const response = await axios.post(
            "http://127.0.0.1:8000/api/sos/create/",
            {
              user_id: user.id,

              latitude: currentLocation.latitude,

              longitude: currentLocation.longitude,
            }
          );

          console.log(
            "SOS API response:",
            response.data
          );

          // =================================================
          // GET CREATED SOS DATA
          // =================================================

          if (
            response.data &&
            response.data.sos
          ) {
            setSosId(
              response.data.sos.id
            );

            setSosTime(
              response.data.sos.created_at
                ? new Date(
                    response.data.sos.created_at
                  )
                : new Date()
            );
          } else {
            setSosTime(new Date());
          }

          // =================================================
          // SHOW ACTIVE SOS SCREEN
          // =================================================

          setSosActive(true);

        } catch (error) {
          console.error(
            "SOS API error:",
            error
          );

          // ---------------------------------------------
          // BACKEND ERROR MESSAGE
          // ---------------------------------------------

          if (
            error.response &&
            error.response.data &&
            error.response.data.message
          ) {
            setSosError(
              error.response.data.message
            );
          } else {
            setSosError(
              "SOS could not be saved. Please check that the backend server is running."
            );
          }

        } finally {
          setLocationLoading(false);

          setSosLoading(false);
        }
      },

      (error) => {
        console.error(
          "SOS location error:",
          error
        );

        setLocationLoading(false);

        setSosLoading(false);

        setLocationError(
          "SOS could not start because your location could not be detected. Please allow location access and try again."
        );
      },

      {
        enableHighAccuracy: true,

        timeout: 10000,

        maximumAge: 0,
      }
    );
  };

  // =====================================================
  // RESOLVE SOS
  // =====================================================

  const handleResolveSOS = async () => {
    if (!sosId) {
      setSosActive(false);

      setSosTime(null);

      setLocation(null);

      return;
    }

    try {
      await axios.patch(
        `http://127.0.0.1:8000/api/sos/${sosId}/status/`,
        {
          status: "RESOLVED",
        }
      );

      console.log(
        "SOS resolved successfully"
      );

    } catch (error) {
      console.error(
        "Resolve SOS error:",
        error
      );

      alert(
        "SOS could not be resolved on the server."
      );

      return;
    }

    setSosActive(false);

    setSosTime(null);

    setLocation(null);

    setSosId(null);

    setSosError("");
  };

  // =====================================================
  // OPEN LOCATION IN GOOGLE MAPS
  // =====================================================

  const openLocation = () => {
    if (!location) {
      return;
    }

    const mapUrl =
      `https://www.google.com/maps?q=${location.latitude},${location.longitude}`;

    window.open(
      mapUrl,
      "_blank"
    );
  };

  // =====================================================
  // FORMAT TIME
  // =====================================================

  const formatTime = (date) => {
    if (!date) {
      return "";
    }

    const parsedDate =
      date instanceof Date
        ? date
        : new Date(date);

    return parsedDate.toLocaleTimeString(
      [],
      {
        hour: "2-digit",
        minute: "2-digit",
      }
    );
  };

  // =====================================================
  // ACTIVE SOS SCREEN
  // =====================================================

  if (sosActive) {
    return (
      <div className="sos-page">

        {/* HEADER */}

        <header className="sos-header">

          <div className="sos-brand">

            <div className="sos-logo">
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

          <Link
            to="/dashboard"
            className="back-dashboard"
          >
            ← Dashboard
          </Link>

        </header>


        {/* ACTIVE SOS MAIN */}

        <main className="sos-main">

          <div className="sos-title">

            <span>
              EMERGENCY ALERT
            </span>

            <h1>
              SOS Active
            </h1>

            <p>
              Your SafeHer emergency alert is active.
            </p>

          </div>


          <section className="sos-main-card">

            {/* ACTIVE STATUS */}

            <div
              className="sos-status"
              style={{
                color: "#c62828",
              }}
            >

              <span className="status-dot"></span>

              SOS ACTIVE

            </div>


            {/* SOS ICON */}

            <div className="sos-circle-wrapper">

              <div
                className="big-sos-button"
                style={{
                  cursor: "default",
                }}
              >

                <strong>
                  SOS
                </strong>

                <span>
                  ACTIVE
                </span>

              </div>

            </div>


            <h2>
              Emergency alert started
            </h2>


            <p className="sos-description">

              Your SOS alert has been saved and your
              current location has been recorded.

            </p>


            {/* SOS ID */}

            {sosId && (

              <div
                style={{
                  marginTop: "15px",
                  padding: "12px",
                  borderRadius: "10px",
                  background: "#f8f8f8",
                  fontSize: "14px",
                }}
              >

                <strong>
                  SOS ID:
                </strong>{" "}
                #{sosId}

              </div>

            )}


            {/* LOCATION */}

            <div
              style={{
                marginTop: "20px",
                padding: "18px",
                borderRadius: "12px",
                background: "#fff5f5",
                textAlign: "left",
              }}
            >

              <strong>
                📍 Current Location
              </strong>


              {location ? (

                <p>

                  Latitude:{" "}
                  {location.latitude.toFixed(6)}

                  <br />

                  Longitude:{" "}
                  {location.longitude.toFixed(6)}

                </p>

              ) : (

                <p>
                  Location unavailable.
                </p>

              )}


              {location && (

                <button
                  onClick={openLocation}
                  style={{
                    border: "none",
                    background: "#e91e63",
                    color: "white",
                    padding: "10px 16px",
                    borderRadius: "8px",
                    cursor: "pointer",
                  }}
                >

                  Open My Location

                </button>

              )}

            </div>


            {/* TIME */}

            <div
              style={{
                marginTop: "15px",
                padding: "15px",
                borderRadius: "12px",
                background: "#f8f8f8",
                textAlign: "left",
              }}
            >

              <strong>
                🕐 SOS Started
              </strong>

              <p>
                {formatTime(sosTime)}
              </p>

            </div>


            {/* WARNING */}

            <div className="sos-warning">

              ⚠️ Stay somewhere safe and contact
              emergency services if necessary.

            </div>


            {/* RESOLVE */}

            <button
              onClick={handleResolveSOS}
              style={{
                marginTop: "20px",
                width: "100%",
                padding: "14px",
                border: "none",
                borderRadius: "10px",
                background: "#333",
                color: "#fff",
                fontSize: "15px",
                fontWeight: "600",
                cursor: "pointer",
              }}
            >

              Resolve SOS

            </button>

          </section>


          {/* USER */}

          {user && (

            <div className="sos-user-info">

              SOS user:{" "}

              <strong>
                {user.name}
              </strong>

              {" "}({user.email})

            </div>

          )}

        </main>

      </div>
    );
  }


  // =====================================================
  // NORMAL SOS PAGE
  // =====================================================

  return (

    <div className="sos-page">

      {/* HEADER */}

      <header className="sos-header">

        <div className="sos-brand">

          <div className="sos-logo">
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


        <Link
          to="/dashboard"
          className="back-dashboard"
        >
          ← Dashboard
        </Link>

      </header>


      {/* MAIN */}

      <main className="sos-main">

        {/* TITLE */}

        <div className="sos-title">

          <span>
            EMERGENCY ASSISTANCE
          </span>

          <h1>
            Emergency SOS
          </h1>

          <p>

            If you are in immediate danger, use the SOS
            button to start an emergency alert.

          </p>

        </div>


        {/* SOS CARD */}

        <section className="sos-main-card">

          <div className="sos-status">

            <span className="status-dot"></span>

            SafeHer SOS is Ready

          </div>


          {/* BIG SOS BUTTON */}

          <div className="sos-circle-wrapper">

            <button
              className="big-sos-button"
              onClick={() => setShowConfirm(true)}
            >

              <strong>
                SOS
              </strong>

              <span>
                GET HELP
              </span>

            </button>

          </div>


          <h2>
            Need immediate help?
          </h2>


          <p className="sos-description">

            Press the SOS button only when you need
            emergency assistance. Your emergency
            contacts can be notified through SafeHer.

          </p>


          <div className="sos-warning">

            ⚠️ Use this button only during an emergency.

          </div>

        </section>


        {/* LOCATION */}

        <section className="sos-info-card">

          <div className="info-icon">
            📍
          </div>


          <div className="info-content">

            <h3>
              Your Current Location
            </h3>


            {location ? (

              <p>

                Latitude:{" "}
                {location.latitude.toFixed(6)}

                <br />

                Longitude:{" "}
                {location.longitude.toFixed(6)}

              </p>

            ) : (

              <p>

                Location will be requested when an SOS
                alert is started.

              </p>

            )}


            {locationError && (

              <small className="location-error">

                {locationError}

              </small>

            )}


            {sosError && (

              <small
                className="location-error"
                style={{
                  display: "block",
                  marginTop: "8px",
                }}
              >

                {sosError}

              </small>

            )}

          </div>


          <button
            className="location-button"
            onClick={getCurrentLocation}
            disabled={locationLoading}
          >

            {locationLoading
              ? "Getting..."
              : "Get Location"}

          </button>

        </section>


        {/* CONTACTS */}

        <section className="sos-contacts-card">

          <div className="section-heading">

            <div>

              <span>
                SAFETY NETWORK
              </span>

              <h2>
                Emergency Contacts
              </h2>

            </div>


            <Link
              to="/emergency-contacts"
            >
              Manage
            </Link>

          </div>


          {contacts.length === 0 ? (

            <div className="no-contacts">

              <p>
                No emergency contacts added yet.
              </p>

              <Link
                to="/emergency-contacts"
              >
                + Add Emergency Contact
              </Link>

            </div>

          ) : (

            <div className="sos-contact-list">

              {contacts.map((contact) => (

                <div
                  className="sos-contact"
                  key={contact.id}
                >

                  <div className="contact-avatar">

                    {contact.name
                      ? contact.name
                          .charAt(0)
                          .toUpperCase()
                      : "C"}

                  </div>


                  <div className="contact-details">

                    <strong>
                      {contact.name}
                    </strong>

                    <span>
                      {contact.relation}
                    </span>

                    <small>
                      {contact.phone}
                    </small>

                  </div>


                  <a
                    href={`tel:${contact.phone}`}
                    className="call-contact"
                  >
                    ☎ Call
                  </a>

                </div>

              ))}

            </div>

          )}

        </section>


        {/* USER */}

        {user && (

          <div className="sos-user-info">

            Logged in as{" "}

            <strong>
              {user.name}
            </strong>

          </div>

        )}

      </main>


      {/* CONFIRMATION MODAL */}

      {showConfirm && (

        <div className="sos-modal-overlay">

          <div className="sos-modal">

            <div className="modal-icon">
              ⚠️
            </div>


            <h2>
              Send Emergency SOS?
            </h2>


            <p>

              This will create an emergency alert,
              record your current location and show
              the alert to the SafeHer Admin.

            </p>


            <div className="modal-buttons">

              <button
                className="cancel-sos"
                onClick={() =>
                  setShowConfirm(false)
                }
              >
                Cancel
              </button>


              <button
                className="confirm-sos"
                onClick={handleSOS}
                disabled={sosLoading}
              >

                {sosLoading
                  ? "Sending SOS..."
                  : "Yes, Send SOS"}

              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default SOS;