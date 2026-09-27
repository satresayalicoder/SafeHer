import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    const form = e.target;

    const name = form.name.value.trim();
    const email = form.email.value.trim();

    // =========================
    // ALL FIELDS VALIDATION
    // =========================

    if (!name || !email || !password || !confirmPassword) {
      setError("All fields are required.");
      return;
    }

    // =========================
    // PASSWORD VALIDATION
    // Minimum 6 characters
    // At least 1 letter
    // At least 1 number
    // =========================

    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d).{6,}$/;

    if (!passwordPattern.test(password)) {
      setError(
        "Password must contain at least 6 characters, 1 letter and 1 number."
      );
      return;
    }

    // =========================
    // CONFIRM PASSWORD
    // =========================

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // =========================
    // SEND DATA TO DJANGO
    // =========================

    try {
      setLoading(true);

      const response = await axios.post(
        "http://127.0.0.1:8000/api/auth/register/",
        {
          name: name,
          email: email,
          password: password,
        }
      );

      console.log("Registration Response:", response.data);

      // Professional success message
      setSuccess(
        "Registration successful! Redirecting to login..."
      );

      // Clear form
      form.reset();
      setPassword("");
      setConfirmPassword("");

      // Redirect after showing success message
      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (error) {
      console.error("Registration Error:", error);

      if (error.response) {
        setError(
          error.response.data.message ||
          "Registration failed. Please try again."
        );
      } else if (error.request) {
        setError(
          "Cannot connect to server. Please make sure Django server is running."
        );
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">

      {/* =========================================
          LEFT IMAGE SECTION
      ========================================= */}

      <div className="register-image-section">

        <img
          src="https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=1200&q=90"
          alt="Two women together"
        />

        <div className="register-image-overlay"></div>

        <Link to="/" className="register-brand">
          <span className="register-logo">S</span>
          <span>SafeHer</span>
        </Link>

        <div className="register-image-message">

          <span>JOIN SAFEHER</span>

          <h1>
            Your safety,
            <br />
            our shared
            <em> priority.</em>
          </h1>

          <p>
            Create your SafeHer account and keep
            essential safety tools within reach.
          </p>

        </div>

        <div className="register-bottom-text">
          <span>●</span>
          Stay aware. Stay connected. Stay safe.
        </div>

      </div>


      {/* =========================================
          RIGHT REGISTER SECTION
      ========================================= */}

      <div className="register-form-section">

        <Link to="/login" className="back-login">
          ← Back to Login
        </Link>

        <div className="register-form-wrapper">

          {/* =====================================
              HEADING
          ===================================== */}

          <div className="register-heading">

            <div className="mobile-register-logo">
              <span>S</span>
            </div>

            <span className="register-small-title">
              GET STARTED
            </span>

            <h2>
              Create your
              <br />
              <span>SafeHer account.</span>
            </h2>

            <p>
              Join SafeHer and take control of your
              personal safety.
            </p>

          </div>


          {/* =====================================
              REGISTER FORM
          ===================================== */}

          <form
            onSubmit={handleRegister}
            className="register-form"
          >

            {/* =================================
                FULL NAME
            ================================= */}

            <div className="form-group">

              <label htmlFor="name">
                Full Name
              </label>

              <div className="input-wrapper">

                <span className="input-icon">
                  👤
                </span>

                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter your full name"
                  required
                />

              </div>

            </div>


            {/* =================================
                EMAIL
            ================================= */}

            <div className="form-group">

              <label htmlFor="register-email">
                Email Address
              </label>

              <div className="input-wrapper">

                <span className="input-icon">
                  @
                </span>

                <input
                  id="register-email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  required
                />

              </div>

            </div>


            {/* =================================
                PASSWORD
            ================================= */}

            <div className="form-group">

              <label htmlFor="register-password">
                Password
              </label>

              <div className="input-wrapper">

                <span className="input-icon">
                  •••
                </span>

                <input
                  id="register-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError("");
                    setSuccess("");
                  }}
                  required
                  minLength="6"
                />

                <button
                  type="button"
                  className="show-password"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                >
                  {showPassword ? "Hide" : "Show"}
                </button>

              </div>

              <small className="password-hint">
                Minimum 6 characters with at least 1 letter
                and 1 number.
              </small>

            </div>


            {/* =================================
                CONFIRM PASSWORD
            ================================= */}

            <div className="form-group">

              <label htmlFor="confirm-password">
                Confirm Password
              </label>

              <div className="input-wrapper">

                <span className="input-icon">
                  •••
                </span>

                <input
                  id="confirm-password"
                  type={
                    showConfirmPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    setError("");
                    setSuccess("");
                  }}
                  required
                  minLength="6"
                />

                <button
                  type="button"
                  className="show-password"
                  onClick={() =>
                    setShowConfirmPassword(
                      !showConfirmPassword
                    )
                  }
                >
                  {showConfirmPassword ? "Hide" : "Show"}
                </button>

              </div>

            </div>


            {/* =================================
                ERROR MESSAGE
            ================================= */}

            {error && (
              <div className="register-error">
                <span>!</span>
                {error}
              </div>
            )}


            {/* =================================
                SUCCESS MESSAGE
            ================================= */}

            {success && (
              <div className="register-success">
                <span>✓</span>
                <div>
                  <strong>Success</strong>
                  <p>{success}</p>
                </div>
              </div>
            )}


            {/* =================================
                TERMS
            ================================= */}

            <div className="register-terms">

              <label>

                <input
                  type="checkbox"
                  required
                />

                <span>
                  I agree to the SafeHer{" "}
                  <a href="#terms">
                    Terms & Conditions
                  </a>
                  {" "}and{" "}
                  <a href="#privacy">
                    Privacy Policy
                  </a>.
                </span>

              </label>

            </div>


            {/* =================================
                REGISTER BUTTON
            ================================= */}

            <button
              type="submit"
              className="register-submit"
              disabled={loading || success}
            >

              {loading
                ? "Creating Account..."
                : success
                ? "Account Created ✓"
                : "Create SafeHer Account"}

              {!loading && !success && (
                <span>→</span>
              )}

            </button>

          </form>


          {/* =====================================
              LOGIN LINK
          ===================================== */}

          <div className="already-account">

            <span>
              Already have a SafeHer account?
            </span>

            <Link to="/login">
              Login
            </Link>

          </div>


          {/* =====================================
              SECURITY
          ===================================== */}

          <div className="register-security">

            <span>✓</span>

            <p>
              Your personal information is kept
              private and secure.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Register;