import { useEffect, useState } from "react";
import axios from "axios";

function EmergencyContacts() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [relation, setRelation] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const user = JSON.parse(
    localStorage.getItem("safeherUser")
  );

  const userId = user?.id;

  // LOAD CONTACTS FROM DATABASE
  const loadContacts = async () => {
    if (!userId) {
      setError("User information not found.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/emergency/${userId}/`
      );

      setContacts(response.data.contacts);
    } catch (err) {
      setError("Unable to load emergency contacts.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadContacts();
  }, []);

  // ADD CONTACT
  const handleAddContact = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    if (!name || !phone || !relation) {
      setError("Please fill all fields.");
      return;
    }

    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/api/emergency/${userId}/add/`,
        {
          name,
          phone,
          relation,
        }
      );

      setMessage(response.data.message);

      setName("");
      setPhone("");
      setRelation("");

      // Reload actual database data
      loadContacts();

    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Unable to add emergency contact."
      );
    }
  };

  return (
    <div style={styles.page}>

      <div style={styles.container}>

        <h1 style={styles.heading}>
          Emergency Contacts
        </h1>

        <p style={styles.subtitle}>
          Manage the people who can be contacted during an emergency.
        </p>

        {/* ADD CONTACT */}

        <div style={styles.card}>

          <h2 style={styles.cardTitle}>
            Add Emergency Contact
          </h2>

          <form onSubmit={handleAddContact}>

            <input
              type="text"
              placeholder="Contact name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={styles.input}
            />

            <input
              type="tel"
              placeholder="Phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              style={styles.input}
            />

            <input
              type="text"
              placeholder="Relation"
              value={relation}
              onChange={(e) => setRelation(e.target.value)}
              style={styles.input}
            />

            <button
              type="submit"
              style={styles.button}
            >
              Add Contact
            </button>

          </form>

          {message && (
            <p style={styles.success}>
              {message}
            </p>
          )}

          {error && (
            <p style={styles.error}>
              {error}
            </p>
          )}

        </div>

        {/* CONTACT LIST */}

        <div style={styles.card}>

          <h2 style={styles.cardTitle}>
            Your Emergency Contacts
          </h2>

          {loading ? (
            <p>Loading contacts...</p>
          ) : contacts.length === 0 ? (
            <p style={styles.empty}>
              No emergency contacts added yet.
            </p>
          ) : (
            contacts.map((contact) => (
              <div
                key={contact.id}
                style={styles.contact}
              >
                <div>
                  <h3 style={styles.name}>
                    {contact.name}
                  </h3>

                  <p style={styles.detail}>
                    {contact.relation}
                  </p>

                  <p style={styles.phone}>
                    {contact.phone}
                  </p>
                </div>
              </div>
            ))
          )}

        </div>

      </div>

    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f8f8f8",
    padding: "40px 20px",
  },

  container: {
    maxWidth: "850px",
    margin: "0 auto",
  },

  heading: {
    marginBottom: "8px",
    fontSize: "32px",
  },

  subtitle: {
    color: "#666",
    marginBottom: "30px",
  },

  card: {
    background: "#ffffff",
    padding: "25px",
    borderRadius: "16px",
    marginBottom: "25px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.06)",
  },

  cardTitle: {
    marginBottom: "20px",
  },

  input: {
    width: "100%",
    padding: "13px",
    marginBottom: "12px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    fontSize: "15px",
    boxSizing: "border-box",
  },

  button: {
    width: "100%",
    padding: "13px",
    border: "none",
    borderRadius: "8px",
    background: "#e91e63",
    color: "#fff",
    fontSize: "16px",
    cursor: "pointer",
  },

  contact: {
    padding: "18px",
    border: "1px solid #eee",
    borderRadius: "12px",
    marginBottom: "12px",
  },

  name: {
    margin: "0 0 5px",
  },

  detail: {
    margin: "0 0 5px",
    color: "#777",
  },

  phone: {
    margin: 0,
    fontWeight: "600",
  },

  success: {
    color: "green",
    marginTop: "15px",
  },

  error: {
    color: "red",
    marginTop: "15px",
  },

  empty: {
    color: "#777",
  },
};

export default EmergencyContacts;