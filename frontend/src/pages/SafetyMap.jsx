import React, {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Circle,
  CircleMarker,
  useMap,
} from "react-leaflet";

import L from "leaflet";

import "leaflet/dist/leaflet.css";

import "./SafetyMap.css";


// ==================================================
// SAFEHER USER LOCATION ICON
// ==================================================

const userIcon = L.divIcon({
  className: "safeher-user-marker",

  html: `
    <div class="user-location-marker">
      <div class="user-location-pulse"></div>
      <div class="user-location-dot"></div>
    </div>
  `,

  iconSize: [40, 40],

  iconAnchor: [20, 20],
});


// ==================================================
// MAP RECENTER
// ==================================================

function MapRecenter({ location }) {

  const map = useMap();

  useEffect(() => {

    if (!location) {
      return;
    }

    map.flyTo(
      [
        location.latitude,
        location.longitude,
      ],
      15,
      {
        duration: 1.2,
      }
    );

  }, [location, map]);

  return null;
}


// ==================================================
// DISTANCE CALCULATION
// ==================================================

function distanceInMeters(
  lat1,
  lon1,
  lat2,
  lon2
) {

  const R = 6371000;

  const dLat =
    ((lat2 - lat1) * Math.PI) / 180;

  const dLon =
    ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) *
      Math.sin(dLat / 2) +

    Math.cos(
      (lat1 * Math.PI) / 180
    ) *

    Math.cos(
      (lat2 * Math.PI) / 180
    ) *

    Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c =
    2 *
    Math.atan2(
      Math.sqrt(a),
      Math.sqrt(1 - a)
    );

  return R * c;
}


// ==================================================
// CLASSIFY OSM PLACE
// ==================================================

function classifyPlace(tags = {}) {

  const amenity =
    tags.amenity || "";

  const shop =
    tags.shop || "";

  const highway =
    tags.highway || "";

  const railway =
    tags.railway || "";

  const publicTransport =
    tags.public_transport || "";

  const tourism =
    tags.tourism || "";

  const leisure =
    tags.leisure || "";


  // ------------------------------------------------
  // STRONG SAFETY SUPPORT
  // ------------------------------------------------

  if (
    amenity === "hospital" ||
    amenity === "clinic" ||
    amenity === "police" ||
    amenity === "fire_station"
  ) {

    return {

      type: "safe",

      label: "Safety Support",

      reason:
        "Emergency or public safety facility",

    };

  }


  // ------------------------------------------------
  // PUBLIC PLACES
  // ------------------------------------------------

  if (

    railway === "station" ||

    railway === "halt" ||

    publicTransport === "station" ||

    amenity === "bus_station" ||

    amenity === "school" ||

    amenity === "college" ||

    amenity === "university"

  ) {

    return {

      type: "safe",

      label: "Public Place",

      reason:
        "Important public or transport facility",

    };

  }


  // ------------------------------------------------
  // PUBLIC / COMMERCIAL ACTIVITY
  // ------------------------------------------------

  if (

    shop ||

    amenity === "restaurant" ||

    amenity === "cafe" ||

    amenity === "fast_food" ||

    amenity === "marketplace" ||

    amenity === "bank" ||

    tourism ||

    leisure === "sports_centre" ||

    leisure === "stadium"

  ) {

    return {

      type: "safe",

      label: "Public Activity",

      reason:
        "Public or commercial activity nearby",

    };

  }


  // ------------------------------------------------
  // MAJOR ROAD
  // ------------------------------------------------

  if (

    highway === "motorway" ||

    highway === "trunk" ||

    highway === "primary" ||

    highway === "secondary"

  ) {

    return {

      type: "safe",

      label: "Major Road",

      reason:
        "Major mapped road",

    };

  }


  // ------------------------------------------------
  // DANGER / CAUTION SIGNALS
  // ------------------------------------------------

  if (

    amenity === "bar" ||

    amenity === "pub" ||

    shop === "alcohol"

  ) {

    return {

      type: "danger",

      label: "Safety Alert",

      reason:
        "Alcohol-related venue nearby; use extra caution",

    };

  }


  // ------------------------------------------------
  // LIMITED ACCESS AREAS
  // ------------------------------------------------

  if (

    highway === "track" ||

    highway === "path" ||

    highway === "footway" ||

    highway === "service"

  ) {

    return {

      type: "danger",

      label: "Caution Area",

      reason:
        "Limited-access mapped area; stay alert",

    };

  }


  // ------------------------------------------------
  // UNKNOWN
  // ------------------------------------------------

  return {

    type: "unknown",

    label: "Unknown",

    reason:
      "Not enough mapped safety information",

  };

}


// ==================================================
// MAIN COMPONENT
// ==================================================

function SafetyMap() {

  const navigate =
    useNavigate();


  // ------------------------------------------------
  // STATES
  // ------------------------------------------------

  const [user, setUser] =
    useState(null);


  const [location, setLocation] =
    useState(null);


  const [places, setPlaces] =
    useState([]);


  const [loadingLocation, setLoadingLocation] =
    useState(true);


  const [loadingPlaces, setLoadingPlaces] =
    useState(false);


  const [locationError, setLocationError] =
    useState("");


  const [placesError, setPlacesError] =
    useState("");


  const [radius, setRadius] =
    useState(3000);


  // ==================================================
  // LOGIN CHECK
  // ==================================================

  useEffect(() => {

    const savedUser =
      localStorage.getItem(
        "safeherUser"
      );


    if (!savedUser) {

      navigate("/login");

      return;

    }


    try {

      setUser(
        JSON.parse(savedUser)
      );

    } catch (error) {

      console.error(
        "User data error:",
        error
      );

      localStorage.removeItem(
        "safeherUser"
      );

      navigate("/login");

    }

  }, [navigate]);


  // ==================================================
  // GET CURRENT LOCATION
  // ==================================================

  const getLocation = () => {

    setLoadingLocation(true);

    setLocationError("");


    if (!navigator.geolocation) {

      setLocationError(
        "Your browser does not support location."
      );

      setLoadingLocation(false);

      return;

    }


    navigator.geolocation.getCurrentPosition(

      (position) => {

        const latitude =
          position.coords.latitude;

        const longitude =
          position.coords.longitude;

        const accuracy =
          position.coords.accuracy;


        console.log(
          "SafeHer Current Location:",
          latitude,
          longitude,
          accuracy
        );


        setLocation({

          latitude,

          longitude,

          accuracy,

        });


        setLoadingLocation(false);

      },


      (error) => {

        console.error(
          "Location error:",
          error
        );


        let message =
          "Unable to detect your location.";


        if (
          error.code ===
          error.PERMISSION_DENIED
        ) {

          message =
            "Location permission denied. Please allow location access.";

        }

        else if (
          error.code ===
          error.POSITION_UNAVAILABLE
        ) {

          message =
            "Your location is currently unavailable.";

        }

        else if (
          error.code ===
          error.TIMEOUT
        ) {

          message =
            "Location request timed out. Please try again.";

        }


        setLocationError(
          message
        );


        setLoadingLocation(false);

      },


      {

        enableHighAccuracy: true,

        timeout: 20000,

        maximumAge: 0,

      }

    );

  };


  // ==================================================
  // INITIAL LOCATION
  // ==================================================

  useEffect(() => {

    getLocation();

  }, []);


  // ==================================================
  // FETCH NEARBY PLACES
  // ==================================================

  useEffect(() => {

    if (!location) {
      return;
    }


    fetchNearbyPlaces(

      location.latitude,

      location.longitude,

      radius

    );

  }, [location, radius]);


  // ==================================================
  // FETCH OSM
  // ==================================================

  const fetchNearbyPlaces =
    async (
      latitude,
      longitude,
      searchRadius
    ) => {

      setLoadingPlaces(true);

      setPlacesError("");


      const query = `

[out:json][timeout:30];

(

  nwr(
    around:${searchRadius},
    ${latitude},
    ${longitude}
  )["amenity"];

  nwr(
    around:${searchRadius},
    ${latitude},
    ${longitude}
  )["shop"];

  nwr(
    around:${searchRadius},
    ${latitude},
    ${longitude}
  )["highway"];

  nwr(
    around:${searchRadius},
    ${latitude},
    ${longitude}
  )["railway"];

  nwr(
    around:${searchRadius},
    ${latitude},
    ${longitude}
  )["public_transport"];

  nwr(
    around:${searchRadius},
    ${latitude},
    ${longitude}
  )["tourism"];

  nwr(
    around:${searchRadius},
    ${latitude},
    ${longitude}
  )["leisure"];

);

out center tags;

`;


      try {

        const response =
          await fetch(

            "https://overpass-api.de/api/interpreter",

            {

              method: "POST",

              headers: {

                "Content-Type":
                  "application/x-www-form-urlencoded",

              },

              body:
                "data=" +
                encodeURIComponent(
                  query
                ),

            }

          );


        if (!response.ok) {

          throw new Error(
            "Unable to load map data"
          );

        }


        const data =
          await response.json();


        const processed =

          (data.elements || [])

            .map((item) => {

              const lat =
                item.lat ??
                item.center?.lat;


              const lon =
                item.lon ??
                item.center?.lon;


              if (

                lat === undefined ||

                lon === undefined

              ) {

                return null;

              }


              const classification =
                classifyPlace(
                  item.tags || {}
                );


              const distance =
                distanceInMeters(

                  latitude,

                  longitude,

                  lat,

                  lon

                );


              return {

                id:
                  `${item.type}-${item.id}`,

                latitude:
                  lat,

                longitude:
                  lon,

                name:
                  item.tags?.name ||
                  classification.label,

                tags:
                  item.tags || {},

                distance,

                ...classification,

              };

            })

            .filter(Boolean)

            .filter(

              (item) =>

                item.distance <=
                searchRadius

            );


        // ------------------------------------------
        // REMOVE DUPLICATES
        // ------------------------------------------

        const unique = [];


        processed.forEach(
          (item) => {

            const duplicate =
              unique.some(

                (existing) =>

                  Math.abs(
                    existing.latitude -
                    item.latitude
                  ) < 0.00005 &&

                  Math.abs(
                    existing.longitude -
                    item.longitude
                  ) < 0.00005

              );


            if (!duplicate) {

              unique.push(item);

            }

          }
        );


        setPlaces(unique);


      } catch (error) {

        console.error(
          "Overpass error:",
          error
        );


        setPlacesError(

          "Nearby map information could not be loaded right now."

        );


        setPlaces([]);

      } finally {

        setLoadingPlaces(false);

      }

    };


  // ==================================================
  // COUNTS
  // ==================================================

  const counts =
    useMemo(() => {

      const safe =
        places.filter(

          (place) =>
            place.type === "safe"

        ).length;


      const danger =
        places.filter(

          (place) =>
            place.type === "danger"

        ).length;


      const unknown =
        places.filter(

          (place) =>
            place.type === "unknown"

        ).length;


      return {

        safe,

        danger,

        unknown,

      };

    }, [places]);


  // ==================================================
  // DANGER PLACES
  // ==================================================

  const dangerPlaces =
    useMemo(() => {

      return places

        .filter(
          (place) =>
            place.type === "danger"
        )

        .sort(
          (a, b) =>
            a.distance - b.distance
        );

    }, [places]);


  // ==================================================
  // SAFETY LEVEL
  // ==================================================

  let safetyLevel =
    "Limited Data";


  let safetyClass =
    "limited";


  if (counts.danger > 0) {

    safetyLevel =
      "Safety Alert";

    safetyClass =
      "danger";

  }

  else if (counts.safe > 0) {

    safetyLevel =
      "More Safety Signals";

    safetyClass =
      "safe";

  }


  // ==================================================
  // OPEN GOOGLE MAPS
  // ==================================================

  const openGoogleMaps =
    () => {

      if (!location) {
        return;
      }


      window.open(

        `https://www.google.com/maps?q=${location.latitude},${location.longitude}`,

        "_blank"

      );

    };


  // ==================================================
  // LOGOUT
  // ==================================================

  const logout = () => {

    localStorage.removeItem(
      "safeherUser"
    );

    navigate("/login");

  };


  // ==================================================
  // RENDER
  // ==================================================

  return (

    <div className="safety-map-page">


      {/* ==================================================
          SIDEBAR
      ================================================== */}

      <aside className="map-sidebar">


        <div className="map-sidebar-logo">

          <div className="map-logo-box">
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


        <p className="map-menu-title">
          MAIN MENU
        </p>


        <nav className="map-sidebar-nav">


          <Link to="/dashboard">
            <span>⌂</span>
            Home
          </Link>


          <Link to="/sos">
            <span>◉</span>
            SOS
          </Link>


          <Link
            to="/map"
            className="map-active"
          >
            <span>⌖</span>
            Safety Map
          </Link>


          <Link to="/emergency-contacts">
            <span>♧</span>
            Emergency Contacts
          </Link>


          <Link to="/safety-tips">
            <span>✦</span>
            Safety Tips
          </Link>


          <Link to="/chatbot">
            <span>◌</span>
            SafeHer Assistant
          </Link>


        </nav>


        <div className="map-divider"></div>


        <p className="map-menu-title">
          ACCOUNT
        </p>


        <nav className="map-sidebar-nav">


          <Link to="/profile">
            <span>○</span>
            Profile
          </Link>


          <Link to="/settings">
            <span>⚙</span>
            Settings
          </Link>


        </nav>


        <div className="map-sidebar-space"></div>


        <button
          className="map-logout"
          onClick={logout}
        >
          <span>↪</span>
          Logout
        </button>


      </aside>


      {/* ==================================================
          MAIN
      ================================================== */}

      <main className="map-main">


        {/* HEADER */}

        <header className="map-header">


          <div>

            <p className="map-welcome">
              LOCATION AWARENESS
            </p>


            <h1>
              Safety Map
            </h1>


            <p className="map-header-description">
              Check safety-related signals around
              your current location.
            </p>

          </div>


          <div className="map-user">


            <div className="map-user-avatar">

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


        {/* ==================================================
            LOCATION CARD
        ================================================== */}

        <section className="location-status-card">


          <div className="location-status-icon">
            📍
          </div>


          <div className="location-status-text">


            <span>
              CURRENT LOCATION
            </span>


            {loadingLocation ? (

              <h3>
                Detecting your location...
              </h3>

            ) : location ? (

              <h3>
                ✓ Location detected
              </h3>

            ) : (

              <h3>
                Location unavailable
              </h3>

            )}


            {location && (

              <>

                <p>
                  Accuracy: approximately{" "}
                  {Math.round(
                    location.accuracy
                  )}{" "}
                  metres
                </p>


                <small
                  style={{
                    display: "block",
                    marginTop: "5px",
                    color: "#777",
                  }}
                >
                  {location.latitude.toFixed(6)}
                  {" , "}
                  {location.longitude.toFixed(6)}
                </small>

              </>

            )}


            {locationError && (

              <p className="map-error">
                {locationError}
              </p>

            )}

          </div>


          <div className="radius-control">


            <label>
              Detection Radius
            </label>


            <select
              value={radius}
              onChange={(e) =>
                setRadius(
                  Number(
                    e.target.value
                  )
                )
              }
            >

              <option value="2000">
                2 KM
              </option>


              <option value="3000">
                3 KM
              </option>


            </select>


          </div>


          <button
            className="refresh-location"
            onClick={getLocation}
          >
            ↻ Refresh
          </button>


        </section>


        {/* ==================================================
            RED SAFETY ALERT
        ================================================== */}

        {dangerPlaces.length > 0 && (

          <section
            className="safety-danger-alert"
            style={{
              background:
                "linear-gradient(135deg, #fff1f1, #ffe3e3)",
              border:
                "1px solid #ffb5b5",
              borderLeft:
                "6px solid #e53935",
              borderRadius: "16px",
              padding: "20px",
              marginBottom: "22px",
              display: "flex",
              alignItems: "flex-start",
              gap: "16px",
              boxShadow:
                "0 8px 25px rgba(229,57,53,0.10)",
            }}
          >

            <div
              style={{
                width: "48px",
                height: "48px",
                minWidth: "48px",
                borderRadius: "50%",
                background: "#e53935",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "24px",
                boxShadow:
                  "0 0 0 7px rgba(229,57,53,0.12)",
              }}
            >
              !
            </div>


            <div style={{ flex: 1 }}>

              <div
                style={{
                  color: "#c62828",
                  fontSize: "12px",
                  fontWeight: "800",
                  letterSpacing: "1px",
                  marginBottom: "5px",
                }}
              >
                SAFETY ALERT
              </div>


              <h2
                style={{
                  margin:
                    "0 0 7px",
                  color: "#8e1c1c",
                  fontSize: "20px",
                }}
              >
                Caution signals detected nearby
              </h2>


              <p
                style={{
                  margin:
                    "0 0 12px",
                  color: "#6d3030",
                  lineHeight: "1.6",
                  fontSize: "14px",
                }}
              >
                SafeHer detected{" "}
                <strong>
                  {dangerPlaces.length}
                </strong>{" "}
                mapped caution signal
                {dangerPlaces.length !== 1
                  ? "s"
                  : ""}{" "}
                within your selected area.
                Stay alert and prefer well-used
                routes.
              </p>


              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "8px",
                }}
              >

                {dangerPlaces
                  .slice(0, 3)
                  .map((place) => (

                    <span
                      key={place.id}
                      style={{
                        background:
                          "#ffffff",
                        color:
                          "#c62828",
                        border:
                          "1px solid #ffc5c5",
                        borderRadius:
                          "20px",
                        padding:
                          "7px 11px",
                        fontSize:
                          "12px",
                        fontWeight:
                          "600",
                      }}
                    >
                      🔴{" "}
                      {place.name}
                      {" • "}
                      {Math.round(
                        place.distance
                      )}
                      m
                    </span>

                  ))}

              </div>

            </div>


            <Link
              to="/sos"
              style={{
                background:
                  "#e53935",
                color: "#fff",
                textDecoration:
                  "none",
                padding:
                  "11px 15px",
                borderRadius:
                  "9px",
                fontWeight:
                  "700",
                fontSize:
                  "13px",
                whiteSpace:
                  "nowrap",
              }}
            >
              SOS
            </Link>


          </section>

        )}


        {/* ==================================================
            NO DANGER MESSAGE
        ================================================== */}

        {!loadingPlaces &&
          location &&
          dangerPlaces.length === 0 && (

            <section
              style={{
                background:
                  "#f0fff5",
                border:
                  "1px solid #bce8ca",
                borderRadius:
                  "14px",
                padding:
                  "15px 18px",
                marginBottom:
                  "22px",
                display:
                  "flex",
                alignItems:
                  "center",
                gap: "12px",
                color:
                  "#267343",
              }}
            >

              <span
                style={{
                  width: "34px",
                  height: "34px",
                  borderRadius:
                    "50%",
                  background:
                    "#2eaf5d",
                  color:
                    "#fff",
                  display:
                    "flex",
                  alignItems:
                    "center",
                  justifyContent:
                    "center",
                  fontWeight:
                    "700",
                }}
              >
                ✓
              </span>


              <div>

                <strong>
                  No mapped caution signals detected
                </strong>

                <p
                  style={{
                    margin:
                      "3px 0 0",
                    fontSize:
                      "12px",
                    color:
                      "#558765",
                  }}
                >
                  This does not guarantee that the
                  area is completely safe.
                </p>

              </div>

            </section>

          )}


        {/* ==================================================
            AREA ANALYSIS
        ================================================== */}

        <section className="safety-summary">


          <div className="summary-title">

            <span>
              AREA ANALYSIS
            </span>


            <h2>
              Nearby Safety Signals
            </h2>

          </div>


          <div className="summary-status">


            <div
              className={
                `status-indicator ${safetyClass}`
              }
            ></div>


            <div>

              <strong>
                {safetyLevel}
              </strong>


              <small>
                Based on mapped locations,
                not a guarantee of personal safety.
              </small>

            </div>


          </div>


          <div className="summary-counts">


            {/* SAFE */}

            <div
              className="count-box safe-count"
            >

              <strong>
                {counts.safe}
              </strong>


              <span>
                Safe-supporting
                signals
              </span>

            </div>


            {/* DANGER */}

            <div
              className="count-box"
              style={{
                background:
                  "#fff1f1",
                border:
                  "1px solid #ffcaca",
              }}
            >

              <strong
                style={{
                  color:
                    "#e53935",
                }}
              >
                {counts.danger}
              </strong>


              <span
                style={{
                  color:
                    "#9b4444",
                }}
              >
                Safety alerts
              </span>

            </div>


            {/* UNKNOWN */}

            <div
              className="count-box unknown-count"
            >

              <strong>
                {counts.unknown}
              </strong>


              <span>
                Other mapped
                places
              </span>

            </div>


          </div>


        </section>


        {/* ==================================================
            MAP
        ================================================== */}

        <section className="map-card">


          <div className="map-card-header">


            <div>

              <span>
                {radius / 1000} KM SAFETY AREA
              </span>


              <h2>
                Live Safety Map
              </h2>

            </div>


            <button
              className="google-map-button"
              onClick={openGoogleMaps}
              disabled={!location}
            >
              Open Google Maps
            </button>


          </div>


          <div className="leaflet-map-wrapper">


            {location ? (

              <MapContainer

                center={[
                  location.latitude,
                  location.longitude,
                ]}

                zoom={15}

                scrollWheelZoom={true}

                className="safeher-leaflet-map"

              >


                <TileLayer

                  attribution=
                    '&copy; OpenStreetMap contributors'

                  url=
                    "https://tile.openstreetmap.org/{z}/{x}/{y}.png"

                />


                <MapRecenter
                  location={location}
                />


                {/* ==========================================
                    CURRENT LOCATION ACCURACY CIRCLE
                ========================================== */}

                <Circle

                  center={[
                    location.latitude,
                    location.longitude,
                  ]}

                  radius={
                    Math.max(
                      location.accuracy,
                      30
                    )
                  }

                  pathOptions={{
                    color:
                      "#e91e63",

                    fillColor:
                      "#e91e63",

                    fillOpacity:
                      0.08,

                    weight: 1,

                  }}

                />


                {/* ==========================================
                    SAFETY SEARCH RADIUS
                ========================================== */}

                <Circle

                  center={[
                    location.latitude,
                    location.longitude,
                  ]}

                  radius={radius}

                  pathOptions={{

                    color:
                      "#e91e63",

                    fillColor:
                      "#e91e63",

                    fillOpacity:
                      0.025,

                    weight: 2,

                    dashArray:
                      "8 8",

                  }}

                />


                {/* ==========================================
                    CURRENT USER LOCATION
                ========================================== */}

                <Marker

                  position={[
                    location.latitude,
                    location.longitude,
                  ]}

                  icon={userIcon}

                  zIndexOffset={1000}

                >

                  <Popup>

                    <strong>
                      📍 You are here
                    </strong>

                    <br />

                    Current GPS location

                    <br />

                    <small>
                      Accuracy:{" "}
                      {Math.round(
                        location.accuracy
                      )}{" "}
                      m
                    </small>

                  </Popup>

                </Marker>


                {/* ==========================================
                    PLACE MARKERS
                ========================================== */}

                {places.map(
                  (place) => (

                    <CircleMarker

                      key={place.id}

                      center={[
                        place.latitude,
                        place.longitude,
                      ]}

                      radius={

                        place.type ===
                        "danger"

                          ? 9

                          : place.type ===
                            "safe"

                          ? 7

                          : 6

                      }


                      pathOptions={{

                        color:

                          place.type ===
                          "safe"

                            ? "#168a45"

                            : place.type ===
                              "danger"

                            ? "#d62828"

                            : "#777",


                        fillColor:

                          place.type ===
                          "safe"

                            ? "#27ae60"

                            : place.type ===
                              "danger"

                            ? "#e53935"

                            : "#999",


                        fillOpacity:
                          0.9,


                        weight:

                          place.type ===
                          "danger"

                            ? 3

                            : 2,

                      }}

                    >

                      <Popup>

                        <strong>
                          {place.name}
                        </strong>

                        <br />

                        <span
                          style={{
                            color:
                              place.type ===
                              "danger"
                                ? "#d62828"
                                : place.type ===
                                  "safe"
                                ? "#168a45"
                                : "#666",
                            fontWeight:
                              "700",
                          }}
                        >

                          {place.type ===
                          "danger"
                            ? "🔴 "
                            : place.type ===
                              "safe"
                            ? "🟢 "
                            : "⚪ "}

                          {place.label}

                        </span>

                        <br />

                        <small>
                          {Math.round(
                            place.distance
                          )}{" "}
                          m away
                        </small>

                        <br />

                        <small>
                          {place.reason}
                        </small>

                      </Popup>

                    </CircleMarker>

                  )
                )}


                {/* ==========================================
                    SAFE AREA RINGS
                ========================================== */}

                {places

                  .filter(
                    (place) =>
                      place.type ===
                      "safe"
                  )

                  .slice(0, 10)

                  .map(
                    (place) => (

                      <Circle

                        key={
                          `safe-${place.id}`
                        }

                        center={[
                          place.latitude,
                          place.longitude,
                        ]}

                        radius={120}

                        pathOptions={{

                          color:
                            "#27ae60",

                          fillColor:
                            "#27ae60",

                          fillOpacity:
                            0.07,

                          weight: 1,

                        }}

                      />

                    )
                  )}


                {/* ==========================================
                    RED DANGER ZONES
                ========================================== */}

                {places

                  .filter(
                    (place) =>
                      place.type ===
                      "danger"
                  )

                  .slice(0, 10)

                  .map(
                    (place) => (

                      <Circle

                        key={
                          `danger-${place.id}`
                        }

                        center={[
                          place.latitude,
                          place.longitude,
                        ]}

                        radius={180}

                        pathOptions={{

                          color:
                            "#e53935",

                          fillColor:
                            "#e53935",

                          fillOpacity:
                            0.15,

                          weight: 3,

                          dashArray:
                            "7 5",

                        }}

                      />

                    )
                  )}


              </MapContainer>

            ) : (


              <div className="map-placeholder">


                <div className="placeholder-icon">
                  📍
                </div>


                <h3>
                  Location required
                </h3>


                <p>
                  Allow browser location access
                  to analyse the nearby area.
                </p>


                <button
                  onClick={getLocation}
                >
                  Enable Location
                </button>


              </div>


            )}


          </div>


        </section>


        {/* ==================================================
            LEGEND
        ================================================== */}

        <section className="map-legend">


          <div className="legend-title">
            Map Legend
          </div>


          <div className="legend-item">

            <span
              className="legend-dot green"
            ></span>

            Safe-supporting signal

          </div>


          <div className="legend-item">

            <span
              className="legend-dot"
              style={{
                background:
                  "#e53935",
              }}
            ></span>

            Safety alert / caution

          </div>


          <div className="legend-item">

            <span
              className="legend-dot grey"
            ></span>

            Other / unknown

          </div>


          <div className="legend-item">

            <span
              className="legend-dot pink"
            ></span>

            Your current location

          </div>


        </section>


        {/* ==================================================
            INFORMATION
        ================================================== */}

        <section className="map-information">


          <div className="information-icon">
            ℹ
          </div>


          <div>


            <h3>
              How SafeHer analyses the area
            </h3>


            <p>

              SafeHer uses nearby
              OpenStreetMap information such
              as hospitals, police stations,
              public transport, major roads
              and public/commercial locations
              to show safety-supporting or
              caution signals.

            </p>


            <p>

              Red alerts are map-based
              caution signals. They do not
              confirm that an area is dangerous
              or unsafe. Missing map data also
              does not mean that a place is
              dangerous.

            </p>


          </div>


        </section>


        {/* ==================================================
            LOADING
        ================================================== */}

        {loadingPlaces && (

          <div className="map-loading">

            Loading nearby map information...

          </div>

        )}


        {/* ==================================================
            ERROR
        ================================================== */}

        {placesError && (

          <div className="map-data-error">

            {placesError}

          </div>

        )}


        {/* ==================================================
            QUICK ACTIONS
        ================================================== */}

        <section className="map-tools">


          {/* SOS */}

          <div className="map-tool-card">


            <div className="tool-icon pink">
              🚨
            </div>


            <div>


              <h3>
                Emergency SOS
              </h3>


              <p>
                Need immediate help?
                Open emergency SOS.
              </p>


              <Link to="/sos">
                Open SOS →
              </Link>


            </div>


          </div>


          {/* CONTACTS */}

          <div className="map-tool-card">


            <div className="tool-icon green">
              ♧
            </div>


            <div>


              <h3>
                Emergency Contacts
              </h3>


              <p>
                Keep your trusted contacts
                ready.
              </p>


              <Link to="/emergency-contacts">
                Manage Contacts →
              </Link>


            </div>


          </div>


          {/* TIPS */}

          <div className="map-tool-card">


            <div className="tool-icon orange">
              ✦
            </div>


            <div>


              <h3>
                Safety Tips
              </h3>


              <p>
                Learn practical safety guidance.
              </p>


              <Link to="/safety-tips">
                View Safety Tips →
              </Link>


            </div>


          </div>


        </section>


        {/* ==================================================
            FOOTER
        ================================================== */}

        <footer className="map-footer">


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


export default SafetyMap;