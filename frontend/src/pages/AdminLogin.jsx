import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AdminLogin.css";

function AdminLogin() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);


  // ==========================================
  // ADMIN LOGIN
  // ==========================================

  const handleLogin = async (e) => {

    e.preventDefault();

    setError("");


    // EMPTY FIELD CHECK

    if (!email.trim() || !password) {

      setError(
        "Please enter admin email and password."
      );

      return;
    }


    setLoading(true);


    try {

      const response = await axios.post(
        "http://127.0.0.1:8000/api/auth/admin/login/",
        {
          email: email.trim(),
          password: password
        }
      );


      // ========================================
      // LOGIN SUCCESS
      // ========================================

      localStorage.setItem(
        "safeherAdmin",
        JSON.stringify(response.data.admin)
      );


      // Dashboard par redirect

      navigate("/admin-dashboard");

    } catch (err) {

      console.error(
        "Admin Login Error:",
        err
      );


      // Backend ne error response diya

      if (err.response) {

        setError(
          err.response.data.message ||
          "Invalid admin email or password."
        );

      } else {

        // Backend server connect nahi hua

        setError(
          "Unable to connect to SafeHer server. Please make sure the backend is running."
        );

      }

    } finally {

      setLoading(false);

    }

  };


  return (

    <div className="admin-login-page">

      <div className="admin-login-box">


        {/* ====================================
            LEFT IMAGE
        ==================================== */}

        <div className="admin-image-section">

          <img
            src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1200&q=85"
            alt="SafeHer Admin"
          />


          <div className="admin-image-overlay">

            <div className="admin-image-logo">
              <span>Safe</span>Her
            </div>


            <h2>
              SafeHer Administration
            </h2>


            <p>
              Manage and monitor the SafeHer
              platform from one secure place.
            </p>

          </div>

        </div>


        {/* ====================================
            RIGHT FORM
        ==================================== */}

        <div className="admin-form-section">

          <div className="admin-form-container">


            {/* LOGO */}

            <div className="admin-logo">
              <span>Safe</span>Her
            </div>


            <p className="admin-small-title">
              ADMIN ACCESS
            </p>


            <h1>
              Welcome Back
            </h1>


            <p className="admin-description">
              Sign in to your SafeHer administrator
              account.
            </p>


            {/* ERROR MESSAGE */}

            {error && (

              <div className="admin-error">
                {error}
              </div>

            )}


            {/* FORM */}

            <form onSubmit={handleLogin}>


              {/* EMAIL */}

              <div className="admin-form-group">

                <label>
                  Admin Email
                </label>

                <input
                  type="email"
                  placeholder="Enter admin email"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  disabled={loading}
                />

              </div>


              {/* PASSWORD */}

              <div className="admin-form-group">

                <label>
                  Password
                </label>


                <div className="admin-password-wrapper">

                  <input
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) =>
                      setPassword(e.target.value)
                    }
                    disabled={loading}
                  />


                  <button
                    type="button"
                    className="show-password"
                    onClick={() =>
                      setShowPassword(
                        !showPassword
                      )
                    }
                  >
                    {showPassword
                      ? "Hide"
                      : "Show"}
                  </button>

                </div>

              </div>


              {/* FORGOT PASSWORD */}

              <div className="admin-options">

                <button
                  type="button"
                  onClick={() =>
                    setError(
                      "Please contact the SafeHer system administrator."
                    )
                  }
                >
                  Forgot Password?
                </button>

              </div>


              {/* LOGIN BUTTON */}

              <button
                type="submit"
                className="admin-login-button"
                disabled={loading}
              >

                {loading
                  ? "Signing in..."
                  : "Login as Admin"}

                <span>
                  →
                </span>

              </button>

            </form>


            {/* BACK */}

            <button
              className="admin-back-button"
              onClick={() =>
                navigate("/choose-role")
              }
            >
              ← Back to Choose Role
            </button>


          </div>

        </div>

      </div>

    </div>

  );
}

export default AdminLogin;