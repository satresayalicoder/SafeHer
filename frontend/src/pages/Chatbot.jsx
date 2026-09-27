import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./Chatbot.css";

function Chatbot() {
  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("safeherUser")
  );

  const [input, setInput] = useState("");

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "bot",
      text:
        "Hi! I'm SafeHer Assistant. I can help you with everyday safety, travel safety, night safety, emergency situations and SafeHer features. How can I help you?",
    },
  ]);

  const logout = () => {
    localStorage.removeItem("safeherUser");
    navigate("/login");
  };

  // --------------------------------------------
  // BOT RESPONSE
  // --------------------------------------------

  const getBotResponse = (question) => {
    const text = question.toLowerCase().trim();

    if (
      text.includes("sos") ||
      text.includes("emergency") ||
      text.includes("danger") ||
      text.includes("help")
    ) {
      return (
        "If you are in immediate danger, move toward a safer public place when possible and contact appropriate emergency services or someone you trust. In SafeHer, you can also open the SOS page to access your emergency options."
      );
    }

    if (
      text.includes("travel") ||
      text.includes("travelling") ||
      text.includes("trip")
    ) {
      return (
        "For safer travel, plan your route, keep your phone charged, check transport details, stay connected with someone you trust, and prefer active public routes when possible."
      );
    }

    if (
      text.includes("night") ||
      text.includes("dark")
    ) {
      return (
        "When travelling at night, stay aware of your surroundings, prefer well-used routes, keep your phone accessible, avoid unnecessary distractions, and keep trusted contacts available."
      );
    }

    if (
      text.includes("location") ||
      text.includes("map")
    ) {
      return (
        "SafeHer's Safety Map can use your browser location to show nearby mapped places and safety-related signals. Remember that map indicators are only signals and cannot guarantee that an area is safe or unsafe."
      );
    }

    if (
      text.includes("contact") ||
      text.includes("family") ||
      text.includes("friend")
    ) {
      return (
        "You can add trusted people through Emergency Contacts. Their details can then be accessed from the SafeHer emergency-contact section."
      );
    }

    if (
      text.includes("online") ||
      text.includes("internet") ||
      text.includes("scam") ||
      text.includes("password")
    ) {
      return (
        "For online safety, use strong unique passwords, avoid sharing sensitive information, be careful with unexpected links and messages, and review your privacy settings."
      );
    }

    if (
      text.includes("safeher")
    ) {
      return (
        "SafeHer is designed to bring important safety features together, including SOS, Safety Map, Emergency Contacts, Safety Tips and SafeHer Assistant."
      );
    }

    if (
      text.includes("alone") ||
      text.includes("walking")
    ) {
      return (
        "If you are walking alone, stay aware of your surroundings, keep your phone accessible, avoid unnecessary distractions and, when possible, choose active public routes."
      );
    }

    if (
      text.includes("hello") ||
      text.includes("hi") ||
      text.includes("hey")
    ) {
      return (
        "Hello! 😊 I'm SafeHer Assistant. Ask me about SOS, travel safety, night safety, emergency contacts, the Safety Map or online safety."
      );
    }

    if (
      text.includes("thank")
    ) {
      return (
        "You're welcome! Stay aware and take care. 😊"
      );
    }

    return (
      "I can help with SOS, emergency situations, travel safety, night safety, Safety Map, emergency contacts and online safety. Try asking me one of these."
    );
  };

  // --------------------------------------------
  // SEND MESSAGE
  // --------------------------------------------

  const sendMessage = (messageText = input) => {
    const question = messageText.trim();

    if (!question) {
      return;
    }

    const userMessage = {
      id: Date.now(),
      sender: "user",
      text: question,
    };

    const botMessage = {
      id: Date.now() + 1,
      sender: "bot",
      text: getBotResponse(question),
    };

    setMessages((previous) => [
      ...previous,
      userMessage,
      botMessage,
    ]);

    setInput("");
  };

  // --------------------------------------------
  // QUICK QUESTIONS
  // --------------------------------------------

  const quickQuestions = [
    "What should I do in an emergency?",
    "Give me night safety tips",
    "How can I travel safely?",
    "How does Safety Map work?",
  ];

  return (
    <div className="chatbot-page">

      {/* ================= SIDEBAR ================= */}

      <aside className="chatbot-sidebar">

        <div className="chatbot-logo">

          <div className="chatbot-logo-box">
            S
          </div>

          <div>
            <h2>SafeHer</h2>
            <span>WOMEN'S SAFETY</span>
          </div>

        </div>

        <p className="chatbot-menu-title">
          MAIN MENU
        </p>

        <nav className="chatbot-nav">

          <Link to="/dashboard">
            <span>⌂</span>
            Home
          </Link>

          <Link to="/sos">
            <span>◉</span>
            SOS
          </Link>

          <Link to="/map">
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

          <Link
            to="/chatbot"
            className="chatbot-active"
          >
            <span>◌</span>
            SafeHer Assistant
          </Link>

        </nav>

        <div className="chatbot-divider"></div>

        <p className="chatbot-menu-title">
          ACCOUNT
        </p>

        <nav className="chatbot-nav">

          <Link to="/profile">
            <span>○</span>
            Profile
          </Link>

          <Link to="/settings">
            <span>⚙</span>
            Settings
          </Link>

        </nav>

        <div className="chatbot-sidebar-space"></div>

        <button
          className="chatbot-logout"
          onClick={logout}
        >
          <span>↪</span>
          Logout
        </button>

      </aside>


      {/* ================= MAIN ================= */}

      <main className="chatbot-main">

        {/* HEADER */}

        <header className="chatbot-header">

          <div>

            <p className="chatbot-label">
              SAFEHER SUPPORT
            </p>

            <h1>
              SafeHer Assistant
            </h1>

            <p className="chatbot-description">
              Ask questions and get quick safety guidance.
            </p>

          </div>


          <div className="chatbot-user">

            <div className="chatbot-user-avatar">
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


        {/* ================= CHAT AREA ================= */}

        <section className="chatbot-card">

          {/* CHAT HEADER */}

          <div className="chatbot-card-header">

            <div className="assistant-profile">

              <div className="assistant-avatar">
                S
              </div>

              <div>

                <h2>
                  SafeHer Assistant
                </h2>

                <div className="assistant-online">
                  <span></span>
                  Available for safety guidance
                </div>

              </div>

            </div>

          </div>


          {/* MESSAGES */}

          <div className="chat-messages">

            {messages.map((message) => (

              <div
                key={message.id}
                className={
                  message.sender === "user"
                    ? "message-row user-message-row"
                    : "message-row bot-message-row"
                }
              >

                {message.sender === "bot" && (
                  <div className="message-avatar">
                    S
                  </div>
                )}

                <div
                  className={
                    message.sender === "user"
                      ? "message-bubble user-bubble"
                      : "message-bubble bot-bubble"
                  }
                >
                  {message.text}
                </div>

              </div>

            ))}

          </div>


          {/* QUICK QUESTIONS */}

          <div className="quick-question-area">

            <p>
              Quick questions
            </p>

            <div className="quick-question-list">

              {quickQuestions.map(
                (question) => (

                  <button
                    key={question}
                    onClick={() =>
                      sendMessage(question)
                    }
                  >
                    {question}
                  </button>

                )
              )}

            </div>

          </div>


          {/* INPUT */}

          <div className="chat-input-area">

            <input
              type="text"
              placeholder="Ask a safety question..."
              value={input}
              onChange={(e) =>
                setInput(e.target.value)
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  sendMessage();
                }
              }}
            />

            <button
              onClick={() => sendMessage()}
              disabled={!input.trim()}
            >
              Send
            </button>

          </div>


          <p className="chat-disclaimer">
            SafeHer Assistant provides general safety
            guidance. For immediate danger, contact
            appropriate emergency services or a
            trusted person.
          </p>

        </section>


        {/* ================= FEATURE CARDS ================= */}

        <section className="assistant-features">

          <div className="assistant-feature">

            <div className="feature-icon">
              🚨
            </div>

            <div>

              <h3>
                Emergency Support
              </h3>

              <p>
                Get guidance about what to do
                during an emergency.
              </p>

              <Link to="/sos">
                Open SOS →
              </Link>

            </div>

          </div>


          <div className="assistant-feature">

            <div className="feature-icon">
              📍
            </div>

            <div>

              <h3>
                Location Awareness
              </h3>

              <p>
                Explore nearby map information
                through Safety Map.
              </p>

              <Link to="/map">
                Open Safety Map →
              </Link>

            </div>

          </div>


          <div className="assistant-feature">

            <div className="feature-icon">
              ✦
            </div>

            <div>

              <h3>
                Safety Guidance
              </h3>

              <p>
                Read practical safety guidance
                for everyday situations.
              </p>

              <Link to="/safety-tips">
                View Safety Tips →
              </Link>

            </div>

          </div>

        </section>


        {/* FOOTER */}

        <footer className="chatbot-footer">

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

export default Chatbot;