import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AdminDashboard.css";

function AdminDashboard() {

  const navigate = useNavigate();

  const [activeMenu, setActiveMenu] =
    useState("Dashboard");

  const [showLogoutPopup, setShowLogoutPopup] =
    useState(false);


  // =====================================================
  // USERS DATA
  // =====================================================

  const [users, setUsers] = useState([]);

  const [totalUsers, setTotalUsers] =
    useState(0);

  const [usersLoading, setUsersLoading] =
    useState(true);

  const [usersError, setUsersError] =
    useState("");


  // =====================================================
  // SOS DATA
  // =====================================================

  const [sosAlerts, setSosAlerts] =
    useState([]);

  const [totalSOS, setTotalSOS] =
    useState(0);

  const [activeSOS, setActiveSOS] =
    useState(0);

  const [sosLoading, setSosLoading] =
    useState(true);

  const [sosError, setSosError] =
    useState("");


  // =====================================================
  // COMPLAINTS DATA
  // =====================================================

  const [complaints, setComplaints] =
    useState([]);

  const [totalComplaints, setTotalComplaints] =
    useState(0);

  const [pendingComplaints, setPendingComplaints] =
    useState(0);

  const [complaintsLoading, setComplaintsLoading] =
    useState(true);

  const [complaintsError, setComplaintsError] =
    useState("");


  // =====================================================
  // EMERGENCY CONTACTS DATA
  // =====================================================

  const [emergencyContacts, setEmergencyContacts] =
    useState([]);

  const [totalEmergencyContacts, setTotalEmergencyContacts] =
    useState(0);

  const [contactsLoading, setContactsLoading] =
    useState(true);

  const [contactsError, setContactsError] =
    useState("");


  // =====================================================
  // ADMIN
  // =====================================================

  const admin = JSON.parse(
    localStorage.getItem(
      "safeherAdmin"
    ) || "null"
  );


  // =====================================================
  // FETCH USERS
  // =====================================================

  const fetchUsers = async () => {

    try {

      setUsersLoading(true);
      setUsersError("");

      const response =
        await axios.get(
          "http://127.0.0.1:8000/api/auth/admin/users/"
        );

      console.log(
        "Users API Response:",
        response.data
      );

      setUsers(
        response.data.users || []
      );

      setTotalUsers(
        response.data.total_users || 0
      );

    } catch (error) {

      console.error(
        "Users API Error:",
        error
      );

      setUsersError(
        "Unable to load users from the server."
      );

    } finally {

      setUsersLoading(false);

    }

  };


  // =====================================================
  // FETCH SOS ALERTS
  // =====================================================

  const fetchSOS = async () => {

    try {

      setSosLoading(true);
      setSosError("");

      const response =
        await axios.get(
          "http://127.0.0.1:8000/api/sos/admin/"
        );

      console.log(
        "SOS API Response:",
        response.data
      );

      setSosAlerts(
        response.data.alerts || []
      );

      setTotalSOS(
        response.data.total_alerts || 0
      );

      setActiveSOS(
        response.data.active_alerts || 0
      );

    } catch (error) {

      console.error(
        "SOS API Error:",
        error
      );

      setSosError(
        "Unable to load SOS alerts from the server."
      );

      setSosAlerts([]);
      setTotalSOS(0);
      setActiveSOS(0);

    } finally {

      setSosLoading(false);

    }

  };


  // =====================================================
  // FETCH COMPLAINTS
  // =====================================================

  const fetchComplaints = async () => {

    try {

      setComplaintsLoading(true);
      setComplaintsError("");

      const response =
        await axios.get(
          "http://127.0.0.1:8000/api/sos/complaints/admin/"
        );

      console.log(
        "Complaints API Response:",
        response.data
      );

      setComplaints(
        response.data.complaints || []
      );

      setTotalComplaints(
        response.data.total_complaints || 0
      );

      setPendingComplaints(
        response.data.pending_complaints || 0
      );

    } catch (error) {

      console.error(
        "Complaints API Error:",
        error
      );

      console.error(
        "Complaint Error Response:",
        error.response?.data
      );

      setComplaintsError(
        "Unable to load complaints from the server."
      );

      setComplaints([]);
      setTotalComplaints(0);
      setPendingComplaints(0);

    } finally {

      setComplaintsLoading(false);

    }

  };


  // =====================================================
  // FETCH EMERGENCY CONTACTS
  // =====================================================

  const fetchEmergencyContacts = async () => {

    try {

      setContactsLoading(true);
      setContactsError("");

      const response =
        await axios.get(
          "http://127.0.0.1:8000/api/emergency/admin/"
        );

      console.log(
        "Emergency Contacts API Response:",
        response.data
      );

      setEmergencyContacts(
        response.data.contacts || []
      );

      setTotalEmergencyContacts(
        response.data.total_contacts || 0
      );

    } catch (error) {

      console.error(
        "Emergency Contacts API Error:",
        error
      );

      console.error(
        "Emergency Contacts Error Response:",
        error.response?.data
      );

      setContactsError(
        "Unable to load emergency contacts from the server."
      );

      setEmergencyContacts([]);
      setTotalEmergencyContacts(0);

    } finally {

      setContactsLoading(false);

    }

  };


  // =====================================================
  // LOAD ALL DATA
  // =====================================================

  useEffect(() => {

    fetchUsers();
    fetchSOS();
    fetchComplaints();
    fetchEmergencyContacts();

  }, []);


  // =====================================================
  // LOGOUT
  // =====================================================

  const handleLogout = () => {

    localStorage.removeItem(
      "safeherAdmin"
    );

    setShowLogoutPopup(false);

    navigate("/admin-login");

  };


  // =====================================================
  // MENU
  // =====================================================

  const handleMenuClick = (menu) => {

    setActiveMenu(menu);

    if (menu === "Users") {
      fetchUsers();
    }

    if (menu === "SOS Alerts") {
      fetchSOS();
    }

    if (menu === "Complaints") {
      fetchComplaints();
    }

    if (menu === "Emergency Contacts") {
      fetchEmergencyContacts();
    }

  };


  // =====================================================
  // UPDATE SOS STATUS
  // =====================================================

  const updateSOSStatus = async (
    sosId,
    status
  ) => {

    try {

      await axios.patch(
        `http://127.0.0.1:8000/api/sos/${sosId}/status/`,
        {
          status: status
        }
      );

      console.log(
        "SOS status updated:",
        status
      );

      fetchSOS();

    } catch (error) {

      console.error(
        "SOS status update error:",
        error
      );

      alert(
        "Unable to update SOS status."
      );

    }

  };


  // =====================================================
  // UPDATE COMPLAINT STATUS
  // =====================================================

  const updateComplaintStatus = async (
    complaintId,
    status
  ) => {

    try {

      await axios.patch(
        `http://127.0.0.1:8000/api/sos/complaints/${complaintId}/status/`,
        {
          status: status
        }
      );

      console.log(
        "Complaint status updated:",
        status
      );

      fetchComplaints();

    } catch (error) {

      console.error(
        "Complaint status update error:",
        error
      );

      console.error(
        "Complaint status response:",
        error.response?.data
      );

      alert(
        "Unable to update complaint status."
      );

    }

  };


  // =====================================================
  // OPEN SOS LOCATION
  // =====================================================

  const openSOSLocation = (
    latitude,
    longitude
  ) => {

    const mapUrl =
      `https://www.google.com/maps?q=${latitude},${longitude}`;

    window.open(
      mapUrl,
      "_blank"
    );

  };


  // =====================================================
  // FORMAT DATE TIME
  // =====================================================

  const formatDateTime = (
    date
  ) => {

    if (!date) {
      return "-";
    }

    return new Date(
      date
    ).toLocaleString();

  };


  // =====================================================
  // FORMAT DATE
  // =====================================================

  const formatDate = (
    date
  ) => {

    if (!date) {
      return "-";
    }

    return new Date(
      date
    ).toLocaleDateString();

  };


  // =====================================================
  // COMPLAINT STATUS STYLE
  // =====================================================

  const getComplaintStatusStyle = (
    status
  ) => {

    if (status === "PENDING") {

      return {
        background: "#fff4d6",
        color: "#9a6b00"
      };

    }

    if (status === "UNDER_REVIEW") {

      return {
        background: "#e8f0ff",
        color: "#3157a4"
      };

    }

    if (status === "RESOLVED") {

      return {
        background: "#e8f8ed",
        color: "#278447"
      };

    }

    return {
      background: "#eeeeee",
      color: "#333333"
    };

  };


  // =====================================================
  // RENDER
  // =====================================================

  return (

    <div className="admin-dashboard">


      {/* =====================================================
          SIDEBAR
      ===================================================== */}

      <aside className="admin-sidebar">

        <div className="admin-sidebar-logo">

          <span>
            Safe
          </span>

          Her

        </div>


        <div className="admin-panel-title">

          ADMIN PANEL

        </div>


        <nav className="admin-menu">


          {/* DASHBOARD */}

          <button
            className={
              activeMenu === "Dashboard"
                ? "admin-menu-item active"
                : "admin-menu-item"
            }
            onClick={() =>
              handleMenuClick(
                "Dashboard"
              )
            }
          >

            <span className="menu-icon">
              ⌂
            </span>

            Dashboard

          </button>


          {/* USERS */}

          <button
            className={
              activeMenu === "Users"
                ? "admin-menu-item active"
                : "admin-menu-item"
            }
            onClick={() =>
              handleMenuClick(
                "Users"
              )
            }
          >

            <span className="menu-icon">
              ♙
            </span>

            Users

          </button>


          {/* SOS */}

          <button
            className={
              activeMenu === "SOS Alerts"
                ? "admin-menu-item active"
                : "admin-menu-item"
            }
            onClick={() =>
              handleMenuClick(
                "SOS Alerts"
              )
            }
          >

            <span className="menu-icon">
              !
            </span>

            SOS Alerts

          </button>


          {/* COMPLAINTS */}

          <button
            className={
              activeMenu === "Complaints"
                ? "admin-menu-item active"
                : "admin-menu-item"
            }
            onClick={() =>
              handleMenuClick(
                "Complaints"
              )
            }
          >

            <span className="menu-icon">
              ▤
            </span>

            Complaints

          </button>


          {/* EMERGENCY CONTACTS */}

          <button
            className={
              activeMenu === "Emergency Contacts"
                ? "admin-menu-item active"
                : "admin-menu-item"
            }
            onClick={() =>
              handleMenuClick(
                "Emergency Contacts"
              )
            }
          >

            <span className="menu-icon">
              ☎
            </span>

            Emergency Contacts

          </button>


          <div className="admin-menu-divider"></div>


          {/* SETTINGS */}

          <button
            className={
              activeMenu === "Settings"
                ? "admin-menu-item active"
                : "admin-menu-item"
            }
            onClick={() =>
              handleMenuClick(
                "Settings"
              )
            }
          >

            <span className="menu-icon">
              ⚙
            </span>

            Settings

          </button>

        </nav>


        {/* LOGOUT */}

        <button
          className="admin-logout"
          onClick={() =>
            setShowLogoutPopup(
              true
            )
          }
        >

          <span className="menu-icon">
            ↪
          </span>

          Logout

        </button>

      </aside>


      {/* =====================================================
          MAIN
      ===================================================== */}

      <main className="admin-main">


        {/* TOP BAR */}

        <header className="admin-topbar">

          <div>

            <p className="admin-breadcrumb">

              Admin Panel /{" "}

              {activeMenu}

            </p>

            <h1>
              {activeMenu}
            </h1>

          </div>


          <div className="admin-profile">

            <div className="admin-avatar">
              A
            </div>

            <div className="admin-profile-info">

              <strong>
                Administrator
              </strong>

              <span>
                {admin?.email ||
                  "Admin"}
              </span>

            </div>

          </div>

        </header>


        {/* =====================================================
            DASHBOARD
        ===================================================== */}

        {activeMenu === "Dashboard" && (

          <section className="admin-content">


            {/* WELCOME */}

            <div className="welcome-card">

              <div>

                <p className="welcome-small">

                  SAFEHER ADMINISTRATION

                </p>

                <h2>

                  Welcome back, Admin 👋

                </h2>

                <p>

                  Monitor and manage the SafeHer
                  platform from one secure dashboard.

                </p>

              </div>

              <div className="welcome-icon">

                🛡️

              </div>

            </div>


            {/* STATISTICS */}

            <div className="stats-grid">


              {/* USERS */}

              <div className="stat-card">

                <div className="stat-icon users-icon">

                  ♙

                </div>

                <div>

                  <p>
                    Total Users
                  </p>

                  <h3>

                    {usersLoading
                      ? "..."
                      : totalUsers}

                  </h3>

                  <span>
                    Registered users
                  </span>

                </div>

              </div>


              {/* SOS */}

              <div className="stat-card">

                <div className="stat-icon sos-icon">

                  !

                </div>

                <div>

                  <p>
                    SOS Alerts
                  </p>

                  <h3>

                    {sosLoading
                      ? "..."
                      : totalSOS}

                  </h3>

                  <span>

                    {activeSOS} active alerts

                  </span>

                </div>

              </div>


              {/* COMPLAINTS */}

              <div className="stat-card">

                <div className="stat-icon complaint-icon">

                  ▤

                </div>

                <div>

                  <p>
                    Complaints
                  </p>

                  <h3>

                    {complaintsLoading
                      ? "..."
                      : totalComplaints}

                  </h3>

                  <span>

                    {pendingComplaints} pending complaints

                  </span>

                </div>

              </div>


              {/* CONTACTS */}

              <div className="stat-card">

                <div className="stat-icon contact-icon">

                  ☎

                </div>

                <div>

                  <p>
                    Emergency Contacts
                  </p>

                  <h3>

                    {contactsLoading
                      ? "..."
                      : totalEmergencyContacts}

                  </h3>

                  <span>

                    Saved contacts

                  </span>

                </div>

              </div>

            </div>


            {/* LOWER CARDS */}

            <div className="admin-grid">


              {/* RECENT SOS */}

              <div className="admin-panel-card">

                <div className="panel-header">

                  <div>

                    <h3>
                      Recent SOS Alerts
                    </h3>

                    <p>
                      Latest emergency activity
                    </p>

                  </div>

                  <button
                    onClick={() =>
                      handleMenuClick(
                        "SOS Alerts"
                      )
                    }
                  >
                    View All
                  </button>

                </div>


                {sosLoading ? (

                  <div className="empty-state">

                    <div className="empty-icon">
                      ...
                    </div>

                    <h4>
                      Loading SOS alerts
                    </h4>

                  </div>

                ) : sosAlerts.length === 0 ? (

                  <div className="empty-state">

                    <div className="empty-icon">
                      ✓
                    </div>

                    <h4>
                      No SOS alerts
                    </h4>

                    <p>

                      No emergency alerts have been
                      recorded yet.

                    </p>

                  </div>

                ) : (

                  <div
                    style={{
                      overflowX:
                        "auto"
                    }}
                  >

                    <table
                      style={{
                        width: "100%",
                        borderCollapse:
                          "collapse",
                        marginTop:
                          "15px"
                      }}
                    >

                      <thead>

                        <tr>

                          <th
                            style={{
                              padding:
                                "10px",
                              textAlign:
                                "left"
                            }}
                          >
                            User
                          </th>

                          <th
                            style={{
                              padding:
                                "10px",
                              textAlign:
                                "left"
                            }}
                          >
                            Status
                          </th>

                          <th
                            style={{
                              padding:
                                "10px",
                              textAlign:
                                "left"
                            }}
                          >
                            Time
                          </th>

                        </tr>

                      </thead>

                      <tbody>

                        {sosAlerts
                          .slice(0, 5)
                          .map(
                            (alert) => (

                              <tr
                                key={
                                  alert.id
                                }
                              >

                                <td
                                  style={{
                                    padding:
                                      "10px"
                                  }}
                                >

                                  <strong>
                                    {
                                      alert.user_name
                                    }
                                  </strong>

                                  <br />

                                  <small>
                                    {
                                      alert.user_email
                                    }
                                  </small>

                                </td>

                                <td
                                  style={{
                                    padding:
                                      "10px"
                                  }}
                                >

                                  {alert.status}

                                </td>

                                <td
                                  style={{
                                    padding:
                                      "10px"
                                  }}
                                >

                                  {
                                    formatDateTime(
                                      alert.created_at
                                    )
                                  }

                                </td>

                              </tr>

                            )
                          )}

                      </tbody>

                    </table>

                  </div>

                )}

              </div>


              {/* RECENT COMPLAINTS */}

              <div className="admin-panel-card">

                <div className="panel-header">

                  <div>

                    <h3>
                      Recent Complaints
                    </h3>

                    <p>
                      Latest user complaints
                    </p>

                  </div>

                  <button
                    onClick={() =>
                      handleMenuClick(
                        "Complaints"
                      )
                    }
                  >
                    View All
                  </button>

                </div>


                {complaintsLoading ? (

                  <div className="empty-state">

                    <div className="empty-icon">
                      ...
                    </div>

                    <h4>
                      Loading complaints
                    </h4>

                  </div>

                ) : complaints.length === 0 ? (

                  <div className="empty-state">

                    <div className="empty-icon">
                      ✓
                    </div>

                    <h4>
                      No complaints
                    </h4>

                    <p>
                      No complaints have been
                      submitted yet.
                    </p>

                  </div>

                ) : (

                  <div
                    style={{
                      overflowX:
                        "auto"
                    }}
                  >

                    <table
                      style={{
                        width:
                          "100%",
                        borderCollapse:
                          "collapse",
                        marginTop:
                          "15px"
                      }}
                    >

                      <thead>

                        <tr>

                          <th
                            style={{
                              padding:
                                "10px",
                              textAlign:
                                "left"
                            }}
                          >
                            User
                          </th>

                          <th
                            style={{
                              padding:
                                "10px",
                              textAlign:
                                "left"
                            }}
                          >
                            Complaint
                          </th>

                          <th
                            style={{
                              padding:
                                "10px",
                              textAlign:
                                "left"
                            }}
                          >
                            Status
                          </th>

                        </tr>

                      </thead>

                      <tbody>

                        {complaints
                          .slice(0, 5)
                          .map(
                            (complaint) => (

                              <tr
                                key={
                                  complaint.id
                                }
                              >

                                <td
                                  style={{
                                    padding:
                                      "10px"
                                  }}
                                >

                                  <strong>
                                    {
                                      complaint.user_name
                                    }
                                  </strong>

                                  <br />

                                  <small>
                                    {
                                      complaint.user_email
                                    }
                                  </small>

                                </td>


                                <td
                                  style={{
                                    padding:
                                      "10px"
                                  }}
                                >

                                  <strong>
                                    {
                                      complaint.title
                                    }
                                  </strong>

                                  <br />

                                  <small>
                                    {
                                      complaint.category
                                    }
                                  </small>

                                </td>


                                <td
                                  style={{
                                    padding:
                                      "10px"
                                  }}
                                >

                                  <span
                                    style={{
                                      display:
                                        "inline-block",
                                      padding:
                                        "6px 10px",
                                      borderRadius:
                                        "20px",
                                      fontSize:
                                        "11px",
                                      fontWeight:
                                        "600",
                                      ...getComplaintStatusStyle(
                                        complaint.status
                                      )
                                    }}
                                  >

                                    {
                                      complaint.status
                                    }

                                  </span>

                                </td>

                              </tr>

                            )
                          )}

                      </tbody>

                    </table>

                  </div>

                )}

              </div>


              {/* RECENT EMERGENCY CONTACTS */}

              <div className="admin-panel-card">

                <div className="panel-header">

                  <div>

                    <h3>
                      Recent Emergency Contacts
                    </h3>

                    <p>
                      Latest saved emergency contacts
                    </p>

                  </div>

                  <button
                    onClick={() =>
                      handleMenuClick(
                        "Emergency Contacts"
                      )
                    }
                  >
                    View All
                  </button>

                </div>


                {contactsLoading ? (

                  <div className="empty-state">

                    <div className="empty-icon">
                      ...
                    </div>

                    <h4>
                      Loading contacts
                    </h4>

                  </div>

                ) : emergencyContacts.length === 0 ? (

                  <div className="empty-state">

                    <div className="empty-icon">
                      ☎
                    </div>

                    <h4>
                      No emergency contacts
                    </h4>

                    <p>
                      No emergency contacts have
                      been saved yet.
                    </p>

                  </div>

                ) : (

                  <div
                    style={{
                      overflowX:
                        "auto"
                    }}
                  >

                    <table
                      style={{
                        width:
                          "100%",
                        borderCollapse:
                          "collapse",
                        marginTop:
                          "15px"
                      }}
                    >

                      <thead>

                        <tr>

                          <th
                            style={{
                              padding:
                                "10px",
                              textAlign:
                                "left"
                            }}
                          >
                            User
                          </th>

                          <th
                            style={{
                              padding:
                                "10px",
                              textAlign:
                                "left"
                            }}
                          >
                            Contact
                          </th>

                          <th
                            style={{
                              padding:
                                "10px",
                              textAlign:
                                "left"
                            }}
                          >
                            Relation
                          </th>

                        </tr>

                      </thead>

                      <tbody>

                        {emergencyContacts
                          .slice(0, 5)
                          .map(
                            (contact) => (

                              <tr
                                key={
                                  contact.id
                                }
                              >

                                <td
                                  style={{
                                    padding:
                                      "10px"
                                  }}
                                >

                                  <strong>
                                    {
                                      contact.user_name
                                    }
                                  </strong>

                                  <br />

                                  <small>
                                    {
                                      contact.user_email
                                    }
                                  </small>

                                </td>


                                <td
                                  style={{
                                    padding:
                                      "10px"
                                  }}
                                >

                                  <strong>
                                    {
                                      contact.name
                                    }
                                  </strong>

                                  <br />

                                  <small>
                                    {
                                      contact.phone
                                    }
                                  </small>

                                </td>


                                <td
                                  style={{
                                    padding:
                                      "10px"
                                  }}
                                >

                                  {
                                    contact.relation
                                  }

                                </td>

                              </tr>

                            )
                          )}

                      </tbody>

                    </table>

                  </div>

                )}

              </div>

            </div>


            {/* SYSTEM STATUS */}

            <div className="system-status-card">

              <div>

                <h3>
                  SafeHer System Status
                </h3>

                <p>
                  Platform services overview
                </p>

              </div>

              <div className="status-badge">

                ● System Active

              </div>

            </div>

          </section>

        )}


        {/* =====================================================
            USERS
        ===================================================== */}

        {activeMenu === "Users" && (

          <section className="admin-content">

            <div className="page-intro">

              <h2>
                Registered Users
              </h2>

              <p>
                Manage and monitor SafeHer user accounts.
              </p>

            </div>


            {usersError && (

              <div
                className="admin-error"
                style={{
                  marginBottom:
                    "20px"
                }}
              >

                {usersError}

              </div>

            )}


            {usersLoading ? (

              <div className="large-empty-card">

                <div className="large-empty-icon">
                  ...
                </div>

                <h3>
                  Loading users...
                </h3>

                <p>
                  Fetching registered users from
                  the SafeHer database.
                </p>

              </div>

            ) : users.length === 0 ? (

              <div className="large-empty-card">

                <div className="large-empty-icon">
                  ♙
                </div>

                <h3>
                  No users registered
                </h3>

                <p>
                  There are currently no registered
                  users in the SafeHer database.
                </p>

              </div>

            ) : (

              <div className="admin-panel-card">

                <div className="panel-header">

                  <div>

                    <h3>
                      All Registered Users
                    </h3>

                    <p>
                      Total Users:{" "}
                      {totalUsers}
                    </p>

                  </div>

                  <button
                    onClick={
                      fetchUsers
                    }
                  >
                    Refresh
                  </button>

                </div>


                <div
                  style={{
                    width: "100%",
                    overflowX:
                      "auto"
                  }}
                >

                  <table
                    style={{
                      width: "100%",
                      borderCollapse:
                        "collapse",
                      marginTop:
                        "20px"
                    }}
                  >

                    <thead>

                      <tr>

                        <th
                          style={{
                            textAlign:
                              "left",
                            padding:
                              "14px",
                            borderBottom:
                              "1px solid #eeeeee"
                          }}
                        >
                          ID
                        </th>

                        <th
                          style={{
                            textAlign:
                              "left",
                            padding:
                              "14px",
                            borderBottom:
                              "1px solid #eeeeee"
                          }}
                        >
                          Name
                        </th>

                        <th
                          style={{
                            textAlign:
                              "left",
                            padding:
                              "14px",
                            borderBottom:
                              "1px solid #eeeeee"
                          }}
                        >
                          Email
                        </th>

                        <th
                          style={{
                            textAlign:
                              "left",
                            padding:
                              "14px",
                            borderBottom:
                              "1px solid #eeeeee"
                          }}
                        >
                          Registered
                        </th>

                      </tr>

                    </thead>


                    <tbody>

                      {users.map(
                        (user) => (

                          <tr
                            key={
                              user.id
                            }
                          >

                            <td
                              style={{
                                padding:
                                  "14px",
                                borderBottom:
                                  "1px solid #f2f2f2"
                              }}
                            >
                              {user.id}
                            </td>

                            <td
                              style={{
                                padding:
                                  "14px",
                                borderBottom:
                                  "1px solid #f2f2f2",
                                fontWeight:
                                  "600"
                              }}
                            >
                              {user.name}
                            </td>

                            <td
                              style={{
                                padding:
                                  "14px",
                                borderBottom:
                                  "1px solid #f2f2f2"
                              }}
                            >
                              {user.email}
                            </td>

                            <td
                              style={{
                                padding:
                                  "14px",
                                borderBottom:
                                  "1px solid #f2f2f2"
                              }}
                            >

                              {user.created_at
                                ? new Date(
                                    user.created_at
                                  ).toLocaleDateString()
                                : "-"}

                            </td>

                          </tr>

                        )
                      )}

                    </tbody>

                  </table>

                </div>

              </div>

            )}

          </section>

        )}


        {/* =====================================================
            SOS ALERTS
        ===================================================== */}

        {activeMenu === "SOS Alerts" && (

          <section className="admin-content">

            <div className="page-intro">

              <h2>
                SOS Alerts
              </h2>

              <p>
                Monitor emergency SOS activity from users.
              </p>

            </div>


            {sosError && (

              <div
                className="admin-error"
                style={{
                  marginBottom:
                    "20px"
                }}
              >

                {sosError}

              </div>

            )}


            {sosLoading ? (

              <div className="large-empty-card">

                <div className="large-empty-icon">
                  ...
                </div>

                <h3>
                  Loading SOS alerts...
                </h3>

                <p>
                  Fetching emergency alerts from
                  the SafeHer database.
                </p>

              </div>

            ) : sosAlerts.length === 0 ? (

              <div className="large-empty-card">

                <div className="large-empty-icon danger">
                  !
                </div>

                <h3>
                  No SOS alerts
                </h3>

                <p>
                  Emergency alerts will appear here
                  when users activate SOS.
                </p>

                <button
                  onClick={
                    fetchSOS
                  }
                  style={{
                    marginTop:
                      "15px",
                    padding:
                      "10px 18px",
                    border:
                      "none",
                    borderRadius:
                      "8px",
                    background:
                      "#e91e63",
                    color:
                      "white",
                    cursor:
                      "pointer",
                    fontWeight:
                      "600"
                  }}
                >
                  Refresh
                </button>

              </div>

            ) : (

              <div className="admin-panel-card">

                <div className="panel-header">

                  <div>

                    <h3>
                      All SOS Alerts
                    </h3>

                    <p>
                      Total SOS Alerts:{" "}
                      {totalSOS}
                      {" | "}
                      Active:{" "}
                      {activeSOS}
                    </p>

                  </div>

                  <button
                    onClick={
                      fetchSOS
                    }
                  >
                    Refresh
                  </button>

                </div>


                <div
                  style={{
                    width: "100%",
                    overflowX:
                      "auto"
                  }}
                >

                  <table
                    style={{
                      width:
                        "100%",
                      minWidth:
                        "950px",
                      borderCollapse:
                        "collapse",
                      marginTop:
                        "20px"
                    }}
                  >

                    <thead>

                      <tr>

                        <th
                          style={{
                            textAlign:
                              "left",
                            padding:
                              "14px",
                            borderBottom:
                              "1px solid #eeeeee"
                          }}
                        >
                          SOS ID
                        </th>

                        <th
                          style={{
                            textAlign:
                              "left",
                            padding:
                              "14px",
                            borderBottom:
                              "1px solid #eeeeee"
                          }}
                        >
                          User
                        </th>

                        <th
                          style={{
                            textAlign:
                              "left",
                            padding:
                              "14px",
                            borderBottom:
                              "1px solid #eeeeee"
                          }}
                        >
                          Email
                        </th>

                        <th
                          style={{
                            textAlign:
                              "left",
                            padding:
                              "14px",
                            borderBottom:
                              "1px solid #eeeeee"
                          }}
                        >
                          Location
                        </th>

                        <th
                          style={{
                            textAlign:
                              "left",
                            padding:
                              "14px",
                            borderBottom:
                              "1px solid #eeeeee"
                          }}
                        >
                          Date & Time
                        </th>

                        <th
                          style={{
                            textAlign:
                              "left",
                            padding:
                              "14px",
                            borderBottom:
                              "1px solid #eeeeee"
                          }}
                        >
                          Status
                        </th>

                        <th
                          style={{
                            textAlign:
                              "left",
                            padding:
                              "14px",
                            borderBottom:
                              "1px solid #eeeeee"
                          }}
                        >
                          Actions
                        </th>

                      </tr>

                    </thead>


                    <tbody>

                      {sosAlerts.map(
                        (alert) => (

                          <tr
                            key={
                              alert.id
                            }
                          >

                            <td
                              style={{
                                padding:
                                  "14px",
                                borderBottom:
                                  "1px solid #f2f2f2",
                                fontWeight:
                                  "600"
                              }}
                            >

                              #
                              {alert.id}

                            </td>


                            <td
                              style={{
                                padding:
                                  "14px",
                                borderBottom:
                                  "1px solid #f2f2f2"
                              }}
                            >

                              <strong>
                                {
                                  alert.user_name
                                }
                              </strong>

                            </td>


                            <td
                              style={{
                                padding:
                                  "14px",
                                borderBottom:
                                  "1px solid #f2f2f2"
                              }}
                            >

                              {
                                alert.user_email
                              }

                            </td>


                            <td
                              style={{
                                padding:
                                  "14px",
                                borderBottom:
                                  "1px solid #f2f2f2"
                              }}
                            >

                              <div>

                                <small>

                                  Lat:{" "}
                                  {
                                    Number(
                                      alert.latitude
                                    ).toFixed(
                                      5
                                    )
                                  }

                                  <br />

                                  Lng:{" "}
                                  {
                                    Number(
                                      alert.longitude
                                    ).toFixed(
                                      5
                                    )
                                  }

                                </small>

                                <br />

                                <button
                                  onClick={() =>
                                    openSOSLocation(
                                      alert.latitude,
                                      alert.longitude
                                    )
                                  }
                                  style={{
                                    marginTop:
                                      "6px",
                                    border:
                                      "none",
                                    background:
                                      "#fff0f5",
                                    color:
                                      "#e91e63",
                                    padding:
                                      "6px 10px",
                                    borderRadius:
                                      "6px",
                                    cursor:
                                      "pointer",
                                    fontSize:
                                      "12px",
                                    fontWeight:
                                      "600"
                                  }}
                                >

                                  📍 View Map

                                </button>

                              </div>

                            </td>


                            <td
                              style={{
                                padding:
                                  "14px",
                                borderBottom:
                                  "1px solid #f2f2f2"
                              }}
                            >

                              {
                                formatDateTime(
                                  alert.created_at
                                )
                              }

                            </td>


                            <td
                              style={{
                                padding:
                                  "14px",
                                borderBottom:
                                  "1px solid #f2f2f2"
                              }}
                            >

                              <span
                                style={{
                                  display:
                                    "inline-block",
                                  padding:
                                    "6px 10px",
                                  borderRadius:
                                    "20px",
                                  fontSize:
                                    "12px",
                                  fontWeight:
                                    "600",
                                  background:
                                    alert.status ===
                                    "ACTIVE"
                                      ? "#ffe5e5"
                                      : alert.status ===
                                        "RESPONDED"
                                      ? "#fff4d6"
                                      : "#e8f8ed",
                                  color:
                                    alert.status ===
                                    "ACTIVE"
                                      ? "#c62828"
                                      : alert.status ===
                                        "RESPONDED"
                                      ? "#9a6b00"
                                      : "#278447"
                                }}
                              >

                                {
                                  alert.status
                                }

                              </span>

                            </td>


                            <td
                              style={{
                                padding:
                                  "14px",
                                borderBottom:
                                  "1px solid #f2f2f2"
                              }}
                            >

                              {alert.status ===
                                "ACTIVE" && (

                                <button
                                  onClick={() =>
                                    updateSOSStatus(
                                      alert.id,
                                      "RESPONDED"
                                    )
                                  }
                                  style={{
                                    border:
                                      "none",
                                    background:
                                      "#fff4d6",
                                    color:
                                      "#9a6b00",
                                    padding:
                                      "8px 10px",
                                    borderRadius:
                                      "7px",
                                    cursor:
                                      "pointer",
                                    marginRight:
                                      "6px",
                                    fontWeight:
                                      "600",
                                    fontSize:
                                      "12px"
                                  }}
                                >

                                  Respond

                                </button>

                              )}


                              {alert.status !==
                                "RESOLVED" && (

                                <button
                                  onClick={() =>
                                    updateSOSStatus(
                                      alert.id,
                                      "RESOLVED"
                                    )
                                  }
                                  style={{
                                    border:
                                      "none",
                                    background:
                                      "#333",
                                    color:
                                      "white",
                                    padding:
                                      "8px 10px",
                                    borderRadius:
                                      "7px",
                                    cursor:
                                      "pointer",
                                    fontWeight:
                                      "600",
                                    fontSize:
                                      "12px"
                                  }}
                                >

                                  Resolve

                                </button>

                              )}

                            </td>

                          </tr>

                        )
                      )}

                    </tbody>

                  </table>

                </div>

              </div>

            )}

          </section>

        )}


        {/* =====================================================
            COMPLAINTS
        ===================================================== */}

        {activeMenu === "Complaints" && (

          <section className="admin-content">

            <div className="page-intro">

              <h2>
                User Complaints
              </h2>

              <p>
                Review complaints submitted through SafeHer.
              </p>

            </div>


            {complaintsError && (

              <div
                className="admin-error"
                style={{
                  marginBottom:
                    "20px"
                }}
              >

                {complaintsError}

              </div>

            )}


            {complaintsLoading ? (

              <div className="large-empty-card">

                <div className="large-empty-icon">
                  ...
                </div>

                <h3>
                  Loading complaints...
                </h3>

                <p>
                  Fetching complaints from
                  the SafeHer database.
                </p>

              </div>

            ) : complaints.length === 0 ? (

              <div className="large-empty-card">

                <div className="large-empty-icon">
                  ▤
                </div>

                <h3>
                  No complaints
                </h3>

                <p>
                  Submitted complaints will appear here.
                </p>

                <button
                  onClick={
                    fetchComplaints
                  }
                  style={{
                    marginTop:
                      "15px",
                    padding:
                      "10px 18px",
                    border:
                      "none",
                    borderRadius:
                      "8px",
                    background:
                      "#e91e63",
                    color:
                      "white",
                    cursor:
                      "pointer",
                    fontWeight:
                      "600"
                  }}
                >

                  Refresh

                </button>

              </div>

            ) : (

              <div className="admin-panel-card">

                <div className="panel-header">

                  <div>

                    <h3>
                      All Complaints
                    </h3>

                    <p>

                      Total Complaints:{" "}
                      {totalComplaints}

                      {" | "}

                      Pending:{" "}
                      {pendingComplaints}

                    </p>

                  </div>

                  <button
                    onClick={
                      fetchComplaints
                    }
                  >
                    Refresh
                  </button>

                </div>


                <div
                  style={{
                    width:
                      "100%",
                    overflowX:
                      "auto"
                  }}
                >

                  <table
                    style={{
                      width:
                        "100%",
                      minWidth:
                        "1200px",
                      borderCollapse:
                        "collapse",
                      marginTop:
                        "20px"
                    }}
                  >

                    <thead>

                      <tr>

                        <th
                          style={{
                            textAlign:
                              "left",
                            padding:
                              "14px",
                            borderBottom:
                              "1px solid #eeeeee"
                          }}
                        >
                          ID
                        </th>

                        <th
                          style={{
                            textAlign:
                              "left",
                            padding:
                              "14px",
                            borderBottom:
                              "1px solid #eeeeee"
                          }}
                        >
                          User
                        </th>

                        <th
                          style={{
                            textAlign:
                              "left",
                            padding:
                              "14px",
                            borderBottom:
                              "1px solid #eeeeee"
                          }}
                        >
                          Title
                        </th>

                        <th
                          style={{
                            textAlign:
                              "left",
                            padding:
                              "14px",
                            borderBottom:
                              "1px solid #eeeeee"
                          }}
                        >
                          Category
                        </th>

                        <th
                          style={{
                            textAlign:
                              "left",
                            padding:
                              "14px",
                            borderBottom:
                              "1px solid #eeeeee"
                          }}
                        >
                          Description
                        </th>

                        <th
                          style={{
                            textAlign:
                              "left",
                            padding:
                              "14px",
                            borderBottom:
                              "1px solid #eeeeee"
                          }}
                        >
                          Location
                        </th>

                        <th
                          style={{
                            textAlign:
                              "left",
                            padding:
                              "14px",
                            borderBottom:
                              "1px solid #eeeeee"
                          }}
                        >
                          Incident Date
                        </th>

                        <th
                          style={{
                            textAlign:
                              "left",
                            padding:
                              "14px",
                            borderBottom:
                              "1px solid #eeeeee"
                          }}
                        >
                          Submitted
                        </th>

                        <th
                          style={{
                            textAlign:
                              "left",
                            padding:
                              "14px",
                            borderBottom:
                              "1px solid #eeeeee"
                          }}
                        >
                          Status
                        </th>

                        <th
                          style={{
                            textAlign:
                              "left",
                            padding:
                              "14px",
                            borderBottom:
                              "1px solid #eeeeee"
                          }}
                        >
                          Actions
                        </th>

                      </tr>

                    </thead>


                    <tbody>

                      {complaints.map(
                        (complaint) => (

                          <tr
                            key={
                              complaint.id
                            }
                          >

                            <td
                              style={{
                                padding:
                                  "14px",
                                borderBottom:
                                  "1px solid #f2f2f2",
                                fontWeight:
                                  "600"
                              }}
                            >

                              #
                              {complaint.id}

                            </td>


                            <td
                              style={{
                                padding:
                                  "14px",
                                borderBottom:
                                  "1px solid #f2f2f2"
                              }}
                            >

                              <strong>
                                {
                                  complaint.user_name
                                }
                              </strong>

                              <br />

                              <small>
                                {
                                  complaint.user_email
                                }
                              </small>

                            </td>


                            <td
                              style={{
                                padding:
                                  "14px",
                                borderBottom:
                                  "1px solid #f2f2f2",
                                fontWeight:
                                  "600"
                              }}
                            >

                              {
                                complaint.title
                              }

                            </td>


                            <td
                              style={{
                                padding:
                                  "14px",
                                borderBottom:
                                  "1px solid #f2f2f2"
                              }}
                            >

                              {
                                complaint.category
                              }

                            </td>


                            <td
                              style={{
                                padding:
                                  "14px",
                                borderBottom:
                                  "1px solid #f2f2f2",
                                maxWidth:
                                  "300px"
                              }}
                            >

                              <div
                                style={{
                                  whiteSpace:
                                    "normal",
                                  lineHeight:
                                    "1.5"
                                }}
                              >

                                {
                                  complaint.description
                                }

                              </div>

                            </td>


                            <td
                              style={{
                                padding:
                                  "14px",
                                borderBottom:
                                  "1px solid #f2f2f2"
                              }}
                            >

                              {
                                complaint.location ||
                                "-"
                              }

                            </td>


                            <td
                              style={{
                                padding:
                                  "14px",
                                borderBottom:
                                  "1px solid #f2f2f2"
                              }}
                            >

                              {
                                complaint.incident_date
                                  ? formatDate(
                                      complaint.incident_date
                                    )
                                  : "-"
                              }

                            </td>


                            <td
                              style={{
                                padding:
                                  "14px",
                                borderBottom:
                                  "1px solid #f2f2f2"
                              }}
                            >

                              {
                                formatDateTime(
                                  complaint.created_at
                                )
                              }

                            </td>


                            <td
                              style={{
                                padding:
                                  "14px",
                                borderBottom:
                                  "1px solid #f2f2f2"
                              }}
                            >

                              <span
                                style={{
                                  display:
                                    "inline-block",
                                  padding:
                                    "6px 10px",
                                  borderRadius:
                                    "20px",
                                  fontSize:
                                    "12px",
                                  fontWeight:
                                    "600",
                                  ...getComplaintStatusStyle(
                                    complaint.status
                                  )
                                }}
                              >

                                {
                                  complaint.status
                                }

                              </span>

                            </td>


                            <td
                              style={{
                                padding:
                                  "14px",
                                borderBottom:
                                  "1px solid #f2f2f2"
                              }}
                            >

                              {complaint.status ===
                                "PENDING" && (

                                <button
                                  onClick={() =>
                                    updateComplaintStatus(
                                      complaint.id,
                                      "UNDER_REVIEW"
                                    )
                                  }
                                  style={{
                                    border:
                                      "none",
                                    background:
                                      "#e8f0ff",
                                    color:
                                      "#3157a4",
                                    padding:
                                      "8px 10px",
                                    borderRadius:
                                      "7px",
                                    cursor:
                                      "pointer",
                                    marginRight:
                                      "6px",
                                    fontWeight:
                                      "600",
                                    fontSize:
                                      "12px"
                                  }}
                                >

                                  Review

                                </button>

                              )}


                              {complaint.status !==
                                "RESOLVED" && (

                                <button
                                  onClick={() =>
                                    updateComplaintStatus(
                                      complaint.id,
                                      "RESOLVED"
                                    )
                                  }
                                  style={{
                                    border:
                                      "none",
                                    background:
                                      "#333",
                                    color:
                                      "white",
                                    padding:
                                      "8px 10px",
                                    borderRadius:
                                      "7px",
                                    cursor:
                                      "pointer",
                                    fontWeight:
                                      "600",
                                    fontSize:
                                      "12px"
                                  }}
                                >

                                  Resolve

                                </button>

                              )}

                            </td>

                          </tr>

                        )
                      )}

                    </tbody>

                  </table>

                </div>

              </div>

            )}

          </section>

        )}


        {/* =====================================================
            EMERGENCY CONTACTS
        ===================================================== */}

        {activeMenu === "Emergency Contacts" && (

          <section className="admin-content">

            <div className="page-intro">

              <h2>
                Emergency Contacts
              </h2>

              <p>
                Monitor emergency contacts associated
                with SafeHer users.
              </p>

            </div>


            {/* ERROR */}

            {contactsError && (

              <div
                className="admin-error"
                style={{
                  marginBottom:
                    "20px"
                }}
              >

                {contactsError}

              </div>

            )}


            {/* LOADING */}

            {contactsLoading ? (

              <div className="large-empty-card">

                <div className="large-empty-icon">
                  ...
                </div>

                <h3>
                  Loading emergency contacts...
                </h3>

                <p>
                  Fetching emergency contacts from
                  the SafeHer database.
                </p>

              </div>

            ) : emergencyContacts.length === 0 ? (

              <div className="large-empty-card">

                <div className="large-empty-icon">
                  ☎
                </div>

                <h3>
                  No emergency contacts
                </h3>

                <p>
                  Emergency contact records will appear
                  here when users save their contacts.
                </p>

                <button
                  onClick={
                    fetchEmergencyContacts
                  }
                  style={{
                    marginTop:
                      "15px",
                    padding:
                      "10px 18px",
                    border:
                      "none",
                    borderRadius:
                      "8px",
                    background:
                      "#e91e63",
                    color:
                      "white",
                    cursor:
                      "pointer",
                    fontWeight:
                      "600"
                  }}
                >

                  Refresh

                </button>

              </div>

            ) : (

              <div className="admin-panel-card">

                <div className="panel-header">

                  <div>

                    <h3>
                      All Emergency Contacts
                    </h3>

                    <p>
                      Total Contacts:{" "}
                      {totalEmergencyContacts}
                    </p>

                  </div>

                  <button
                    onClick={
                      fetchEmergencyContacts
                    }
                  >
                    Refresh
                  </button>

                </div>


                {/* CONTACT TABLE */}

                <div
                  style={{
                    width:
                      "100%",
                    overflowX:
                      "auto"
                  }}
                >

                  <table
                    style={{
                      width:
                        "100%",
                      minWidth:
                        "950px",
                      borderCollapse:
                        "collapse",
                      marginTop:
                        "20px"
                    }}
                  >

                    <thead>

                      <tr>

                        <th
                          style={{
                            textAlign:
                              "left",
                            padding:
                              "14px",
                            borderBottom:
                              "1px solid #eeeeee"
                          }}
                        >
                          ID
                        </th>

                        <th
                          style={{
                            textAlign:
                              "left",
                            padding:
                              "14px",
                            borderBottom:
                              "1px solid #eeeeee"
                          }}
                        >
                          SafeHer User
                        </th>

                        <th
                          style={{
                            textAlign:
                              "left",
                            padding:
                              "14px",
                            borderBottom:
                              "1px solid #eeeeee"
                          }}
                        >
                          User Email
                        </th>

                        <th
                          style={{
                            textAlign:
                              "left",
                            padding:
                              "14px",
                            borderBottom:
                              "1px solid #eeeeee"
                          }}
                        >
                          Contact Name
                        </th>

                        <th
                          style={{
                            textAlign:
                              "left",
                            padding:
                              "14px",
                            borderBottom:
                              "1px solid #eeeeee"
                          }}
                        >
                          Phone
                        </th>

                        <th
                          style={{
                            textAlign:
                              "left",
                            padding:
                              "14px",
                            borderBottom:
                              "1px solid #eeeeee"
                          }}
                        >
                          Relation
                        </th>

                        <th
                          style={{
                            textAlign:
                              "left",
                            padding:
                              "14px",
                            borderBottom:
                              "1px solid #eeeeee"
                          }}
                        >
                          Added On
                        </th>

                      </tr>

                    </thead>


                    <tbody>

                      {emergencyContacts.map(
                        (contact) => (

                          <tr
                            key={
                              contact.id
                            }
                          >

                            <td
                              style={{
                                padding:
                                  "14px",
                                borderBottom:
                                  "1px solid #f2f2f2",
                                fontWeight:
                                  "600"
                              }}
                            >

                              #
                              {contact.id}

                            </td>


                            <td
                              style={{
                                padding:
                                  "14px",
                                borderBottom:
                                  "1px solid #f2f2f2"
                              }}
                            >

                              <strong>
                                {
                                  contact.user_name
                                }
                              </strong>

                            </td>


                            <td
                              style={{
                                padding:
                                  "14px",
                                borderBottom:
                                  "1px solid #f2f2f2"
                              }}
                            >

                              {
                                contact.user_email
                              }

                            </td>


                            <td
                              style={{
                                padding:
                                  "14px",
                                borderBottom:
                                  "1px solid #f2f2f2",
                                fontWeight:
                                  "600"
                              }}
                            >

                              {
                                contact.name
                              }

                            </td>


                            {/* PHONE NUMBER */}

                            <td
                              style={{
                                padding:
                                  "14px",
                                borderBottom:
                                  "1px solid #f2f2f2",
                                fontWeight:
                                  "600",
                                whiteSpace:
                                  "nowrap"
                              }}
                            >

                              <strong>
                                {
                                  contact.phone
                                }
                              </strong>

                            </td>


                            <td
                              style={{
                                padding:
                                  "14px",
                                borderBottom:
                                  "1px solid #f2f2f2"
                              }}
                            >

                              {
                                contact.relation
                              }

                            </td>


                            <td
                              style={{
                                padding:
                                  "14px",
                                borderBottom:
                                  "1px solid #f2f2f2"
                              }}
                            >

                              {
                                formatDateTime(
                                  contact.created_at
                                )
                              }

                            </td>

                          </tr>

                        )
                      )}

                    </tbody>

                  </table>

                </div>

              </div>

            )}

          </section>

        )}


        {/* =====================================================
            SETTINGS
        ===================================================== */}

        {activeMenu === "Settings" && (

          <section className="admin-content">

            <div className="page-intro">

              <h2>
                Admin Settings
              </h2>

              <p>
                Manage administrator preferences.
              </p>

            </div>

            <div className="settings-card">

              <div className="setting-row">

                <div>

                  <h3>
                    Admin Account
                  </h3>

                  <p>
                    {admin?.email ||
                      "Admin"}
                  </p>

                </div>

                <span className="setting-status">
                  Active
                </span>

              </div>


              <div className="setting-row">

                <div>

                  <h3>
                    Platform
                  </h3>

                  <p>
                    SafeHer Women Safety Platform
                  </p>

                </div>

                <span className="setting-status">
                  Active
                </span>

              </div>

            </div>

          </section>

        )}

      </main>


      {/* =====================================================
          LOGOUT POPUP
      ===================================================== */}

      {showLogoutPopup && (

        <div
          className="logout-overlay"
          onClick={() =>
            setShowLogoutPopup(
              false
            )
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
              your SafeHer admin account?
            </p>

            <div className="logout-popup-buttons">

              <button
                className="cancel-logout"
                onClick={() =>
                  setShowLogoutPopup(
                    false
                  )
                }
              >
                Cancel
              </button>

              <button
                className="confirm-logout"
                onClick={
                  handleLogout
                }
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

export default AdminDashboard;