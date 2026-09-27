import { useNavigate } from "react-router-dom";
import "./ChooseRole.css";

function ChooseRole() {

  const navigate = useNavigate();

  // USER → USER LOGIN
  const handleUser = () => {
    navigate("/login");
  };

  // ADMIN → ADMIN LOGIN
  const handleAdmin = () => {
    navigate("/admin-login");
  };

  return (
    <div className="role-page">

      {/* Background Decoration */}
      <div className="role-circle circle-one"></div>
      <div className="role-circle circle-two"></div>

      <div className="role-container">

        {/* Logo */}
        <div className="role-logo">
          <span>Safe</span>Her
        </div>

        <div className="role-content">

          <p className="role-small-title">
            WELCOME TO SAFEHER
          </p>

          <h1>
            Choose Your Role
          </h1>

          <p className="role-description">
            Select how you want to continue with SafeHer.
          </p>


          {/* ================= ROLE CARDS ================= */}

          <div className="role-cards">

            {/* ================= USER ================= */}

            <div
              className="role-card user-card"
              onClick={handleUser}
            >

              <div className="role-image-wrapper">

                <img
                  src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=900&q=85"
                  alt="Group of women"
                />

              </div>

              <div className="role-card-content">

                <div className="role-icon">
                  👩
                </div>

                <h2>
                  User
                </h2>

                <p>
                  Access your personal SafeHer dashboard,
                  emergency SOS, safety map, emergency
                  contacts and safety assistance.
                </p>

                <button
                  className="role-button user-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleUser();
                  }}
                >
                  Continue as User
                  <span>→</span>
                </button>

              </div>

            </div>


            {/* ================= ADMIN ================= */}

            <div
              className="role-card admin-card"
              onClick={handleAdmin}
            >

              <div className="role-image-wrapper">

                <img
                  src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=900&q=85"
                  alt="SafeHer Admin"
                />

              </div>

              <div className="role-card-content">

                <div className="role-icon admin-icon">
                  🛡️
                </div>

                <h2>
                  Admin
                </h2>

                <p>
                  Manage users, emergency information,
                  safety reports and SafeHer platform
                  activities.
                </p>

                <button
                  className="role-button admin-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAdmin();
                  }}
                >
                  Continue as Admin
                  <span>→</span>
                </button>

              </div>

            </div>

          </div>


          {/* BACK BUTTON */}

          <button
            className="back-login"
            onClick={() => navigate("/")}
          >
            ← Back to Home
          </button>

        </div>

      </div>

    </div>
  );
}

export default ChooseRole;