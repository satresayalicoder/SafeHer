import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function ForgotPassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const navigate = useNavigate();

  const handleReset = (e) => {
    e.preventDefault();

    // Backend password reset next step mein connect karenge
    navigate("/login");
  };

  return (
    <div className="forgot-page">

      {/* LEFT IMAGE */}
      <div className="forgot-image-section">

        <img
  src="https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=1200&q=90"
  alt="Two women together"
/>

        <div className="forgot-image-overlay"></div>

        <Link to="/" className="forgot-brand">
          <span className="forgot-logo">S</span>
          <span>SafeHer</span>
        </Link>

        <div className="forgot-image-message">
          <span>SAFEHER</span>

          <h1>
            Your safety
            <br />
            matters
            <em>.</em>
          </h1>

          <p>
            Reset your password and continue using
            SafeHer safety services.
          </p>
        </div>

      </div>


      {/* RIGHT FORM */}
      <div className="forgot-form-section">

        <Link to="/login" className="forgot-back">
          ← Back to Login
        </Link>

        <div className="forgot-form-wrapper">

          <div className="forgot-heading">

            <span className="forgot-small-title">
              RESET PASSWORD
            </span>

            <h2>
              Change your
              <br />
              <span>password.</span>
            </h2>

            <p>
              Enter your email and create a new password
              for your SafeHer account.
            </p>

          </div>


          <form
            onSubmit={handleReset}
            className="forgot-form"
          >

            {/* EMAIL */}
            <div className="form-group">

              <label htmlFor="forgot-email">
                Email Address
              </label>

              <div className="input-wrapper">

                <span className="input-icon">@</span>

                <input
                  id="forgot-email"
                  type="email"
                  placeholder="Enter your email"
                  required
                />

              </div>

            </div>


            {/* NEW PASSWORD */}
            <div className="form-group">

              <label htmlFor="new-password">
                New Password
              </label>

              <div className="input-wrapper">

                <span className="input-icon">
                  •••
                </span>

                <input
                  id="new-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter new password"
                  minLength="6"
                  required
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

            </div>


            {/* CONFIRM PASSWORD */}
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
                  type={showConfirm ? "text" : "password"}
                  placeholder="Confirm new password"
                  minLength="6"
                  required
                />

                <button
                  type="button"
                  className="show-password"
                  onClick={() =>
                    setShowConfirm(!showConfirm)
                  }
                >
                  {showConfirm ? "Hide" : "Show"}
                </button>

              </div>

            </div>


            {/* BUTTON */}
            <button
              type="submit"
              className="forgot-submit"
            >
              Reset Password
              <span>→</span>
            </button>

          </form>


          <div className="forgot-login-link">
            Remember your password?
            <Link to="/login">
              Login here
            </Link>
          </div>

        </div>

      </div>

    </div>
  );
}

export default ForgotPassword;