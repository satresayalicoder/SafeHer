import { BrowserRouter, Routes, Route } from "react-router-dom";

// ======================================================
// PUBLIC PAGES
// ======================================================

import Landing from "./pages/Landing";
import ChooseRole from "./pages/ChooseRole";


// ======================================================
// USER AUTHENTICATION PAGES
// ======================================================

import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";


// ======================================================
// USER DASHBOARD
// ======================================================

import Dashboard from "./pages/Dashboard";


// ======================================================
// USER DASHBOARD FEATURE PAGES
// ======================================================

import SOS from "./pages/SOS";
import SafetyMap from "./pages/SafetyMap";
import EmergencyContacts from "./pages/EmergencyContacts";
import SafetyTips from "./pages/SafetyTips";
import Chatbot from "./pages/Chatbot";
import Complaint from "./pages/Complaint";


// ======================================================
// USER NOTIFICATION PAGE
// ======================================================

import Notifications from "./pages/Notifications";


// ======================================================
// USER ACCOUNT PAGES
// ======================================================

import Profile from "./pages/Profile";
import Settings from "./pages/Settings";


// ======================================================
// ADMIN PAGES
// ======================================================

import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";


// ======================================================
// APP
// ======================================================

function App() {

  return (

    <BrowserRouter>

      <Routes>


        {/* ==================================================
            HOME / LANDING PAGE
        ================================================== */}

        <Route
          path="/"
          element={<Landing />}
        />


        {/* ==================================================
            CHOOSE ROLE PAGE
        ================================================== */}

        <Route
          path="/choose-role"
          element={<ChooseRole />}
        />


        {/* ==================================================
            USER LOGIN
        ================================================== */}

        <Route
          path="/login"
          element={<Login />}
        />


        {/* ==================================================
            USER REGISTER
        ================================================== */}

        <Route
          path="/register"
          element={<Register />}
        />


        {/* ==================================================
            FORGOT PASSWORD
        ================================================== */}

        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />


        {/* ==================================================
            USER MAIN DASHBOARD
        ================================================== */}

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />


        {/* ==================================================
            USER NOTIFICATIONS
        ================================================== */}

        <Route
          path="/notifications"
          element={<Notifications />}
        />


        {/* ==================================================
            SOS PAGE
        ================================================== */}

        <Route
          path="/sos"
          element={<SOS />}
        />


        {/* ==================================================
            SAFETY MAP PAGE
        ================================================== */}

        <Route
          path="/map"
          element={<SafetyMap />}
        />


        {/* ==================================================
            EMERGENCY CONTACTS PAGE
        ================================================== */}

        <Route
          path="/emergency-contacts"
          element={<EmergencyContacts />}
        />


        {/* ==================================================
            SAFETY TIPS PAGE
        ================================================== */}

        <Route
          path="/safety-tips"
          element={<SafetyTips />}
        />


        {/* ==================================================
            SAFEHER ASSISTANT / CHATBOT
        ================================================== */}

        <Route
          path="/chatbot"
          element={<Chatbot />}
        />


        {/* ==================================================
            FILE COMPLAINT PAGE
        ================================================== */}

        <Route
          path="/complaint"
          element={<Complaint />}
        />


        {/* ==================================================
            USER PROFILE
        ================================================== */}

        <Route
          path="/profile"
          element={<Profile />}
        />


        {/* ==================================================
            USER SETTINGS
        ================================================== */}

        <Route
          path="/settings"
          element={<Settings />}
        />


        {/* ==================================================
            ADMIN LOGIN
        ================================================== */}

        <Route
          path="/admin-login"
          element={<AdminLogin />}
        />


        {/* ==================================================
            ADMIN DASHBOARD
        ================================================== */}

        <Route
          path="/admin-dashboard"
          element={<AdminDashboard />}
        />


      </Routes>

    </BrowserRouter>

  );

}


// ======================================================
// EXPORT APP
// ======================================================

export default App;