import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/auth/login/",
        {
          email: email,
          password: password,
        }
      );

      // Save logged-in user information
      localStorage.setItem(
        "safeherUser",
        JSON.stringify(response.data.user)
      );

      // Go to dashboard
      navigate("/dashboard");

    } catch (error) {

      if (error.response) {
        setError(
          error.response.data.message ||
          "Invalid email or password"
        );
      } else {
        setError(
          "Unable to connect to the server. Please make sure the backend is running."
        );
      }

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">

      {/* LEFT IMAGE SECTION */}
      <div className="login-image-section">

        <img
          src="https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=1200&q=90"
          alt="Two women together"
        />

        <div className="login-image-overlay"></div>

        <Link to="/" className="login-brand">
          <span className="login-logo">S</span>
          <span>SafeHer</span>
        </Link>

        <div className="image-message">

          <span>WELCOME TO SAFEHER</span>

          <h1>
            Your safety
            <br />
            starts with
            <em> awareness.</em>
          </h1>

          <p>
            Stay connected, stay informed and keep
            essential safety tools within reach.
          </p>

        </div>

        <div className="image-bottom-text">
          <span>●</span>
          Your safety matters, wherever you go.
        </div>

      </div>


      {/* RIGHT LOGIN SECTION */}
      <div className="login-form-section">

        <Link to="/" className="back-home">
          ← Back to SafeHer
        </Link>

        <div className="login-form-wrapper">

          <div className="login-heading">

            <div className="mobile-login-logo">
              <span>S</span>
            </div>

            <span className="login-small-title">
              WELCOME BACK
            </span>

            <h2>
              Login to your
              <br />
              <span>SafeHer account.</span>
            </h2>

            <p>
              Access your personal safety dashboard
              and stay connected.
            </p>

          </div>


          {/* ERROR MESSAGE */}
          {error && (
            <div className="login-error">
              <span>!</span>
              {error}
            </div>
          )}


          {/* LOGIN FORM */}
          <form
            onSubmit={handleLogin}
            className="login-form"
          >

            {/* EMAIL */}
            <div className="form-group">

              <label htmlFor="email">
                Email Address
              </label>

              <div className="input-wrapper">

                <span className="input-icon">
                  @
                </span>

                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  required
                />

              </div>

            </div>


            {/* PASSWORD */}
            <div className="form-group">

              <div className="password-label-row">

                <label htmlFor="password">
                  Password
                </label>

                <Link to="/forgot-password">
                  Forgot Password?
                </Link>

              </div>

              <div className="input-wrapper">

                <span className="input-icon">
                  •••
                </span>

                <input
                  id="password"
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  required
                />

                <button
                  type="button"
                  className="show-password"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  aria-label="Show or hide password"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>

              </div>

            </div>


            {/* REMEMBER ME */}
            <div className="remember-row">

              <label className="remember-label">

                <input type="checkbox" />

                <span>
                  Remember me
                </span>

              </label>

            </div>


            {/* LOGIN BUTTON */}
            <button
              type="submit"
              className="login-submit"
              disabled={loading}
            >
              {loading
                ? "Logging in..."
                : "Login to SafeHer"}

              {!loading && <span>→</span>}
            </button>

          </form>


          {/* DIVIDER */}
          <div className="login-divider">
            <span>or</span>
          </div>


          {/* GOOGLE */}
          <button
            type="button"
            className="google-login"
          >
            <span className="google-icon">G</span>
            Continue with Google
          </button>


          {/* REGISTER */}
          <div className="create-account">

            <span>
              Don't have a SafeHer account?
            </span>

            <Link to="/register">
              Create Account
            </Link>

          </div>


          {/* SECURITY NOTE */}
          <div className="login-security">

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

export default Login;