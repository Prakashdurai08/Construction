import "./WhatsAppButton.css";

// ── Update with your WhatsApp number ──
const WHATSAPP_NUMBER = "12125551234";
const WHATSAPP_MSG = "Hello! I'm interested in getting a free construction quote from MM Builders.";

export default function WhatsAppButton() {
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MSG)}`;

  return (
    <a
      href={href}
      className="whatsapp-float"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
    >
      <i className="fab fa-whatsapp"></i>
      <span className="wa-tooltip">Chat with us!</span>
      <span className="wa-pulse"></span>
    </a>
  );
}
