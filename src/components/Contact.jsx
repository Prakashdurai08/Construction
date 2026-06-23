import { useEffect, useRef, useState } from "react";
import "./Contact.css";

// ── EmailJS Config ─────────────────────────────
// 1. Sign up at https://emailjs.com (free plan)
// 2. Create Email Service + Template
//    Template variables: {{fname}} {{lname}} {{email}} {{phone}} {{service}} {{message}}
// 3. Paste your keys below
const EMAILJS_PUBLIC_KEY  = "YOUR_PUBLIC_KEY";
const EMAILJS_SERVICE_ID  = "YOUR_SERVICE_ID";
const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID";
// ───────────────────────────────────────────────

const INFO = [
  { icon: "fa fa-map-marker-alt", title: "Our Office", text: "42 Anna Salai, Chennai, Tamil Nadu 600002" },
  { icon: "fa fa-phone", title: "Call Us", text: "+91 98765 43210", href: "tel:+919876543210" },
  { icon: "fa fa-envelope", title: "Email Us", text: "info@mmbuilders.com", href: "mailto:info@mmbuilders.com" },
  { icon: "fa fa-clock", title: "Working Hours", text: "Mon – Sat: 9:00 AM – 7:00 PM" },
];

const SOCIALS = [
  { icon: "fab fa-facebook-f", label: "Facebook" },
  { icon: "fab fa-instagram", label: "Instagram" },
  { icon: "fab fa-linkedin-in", label: "LinkedIn" },
  { icon: "fab fa-youtube", label: "YouTube" },
];

const INITIAL = { fname: "", lname: "", email: "", phone: "", service: "", message: "" };

export default function Contact() {
  const [form, setForm] = useState(INITIAL);
  const [status, setStatus] = useState(null); // null | "loading" | "success" | "error"
  const [errorMsg, setErrorMsg] = useState("");
  const sectionRef = useRef(null);

  // Load EmailJS script once
  useEffect(() => {
    if (window.emailjs) return;
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js";
    script.onload = () => window.emailjs.init(EMAILJS_PUBLIC_KEY);
    document.head.appendChild(script);
  }, []);

  // Reveal
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.querySelectorAll(".reveal").forEach((r) => {
            const delay = parseInt(r.dataset.delay) || 0;
            setTimeout(() => r.classList.add("visible"), delay);
          });
          observer.disconnect();
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    setStatus(null);
  };

  const validate = () => {
    const required = [
      { key: "fname", label: "First name" },
      { key: "lname", label: "Last name" },
      { key: "email", label: "Email address" },
      { key: "service", label: "Service" },
      { key: "message", label: "Project details" },
    ];
    for (const { key, label } of required) {
      if (!form[key].trim()) {
        setErrorMsg(`${label} is required.`);
        return false;
      }
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setErrorMsg("Please enter a valid email address.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) { setStatus("error"); return; }
    setStatus("loading");
    setErrorMsg("");
    try {
      await window.emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, form);
      setStatus("success");
      setForm(INITIAL);
    } catch (err) {
      console.error("EmailJS:", err);
      setStatus("error");
      setErrorMsg("Something went wrong. Please try WhatsApp or call us directly.");
    }
  };

  return (
    <section id="contact" className="contact section-pad" ref={sectionRef}>
      <div className="container">
        <div className="section-header reveal">
          <span className="section-label">Get In Touch</span>
          <h2>Request a <span className="accent">Free Quote</span></h2>
          <p>Let MM Builders bring your vision to life. Fill out the form and we'll get back to you within 24 hours.</p>
        </div>

        <div className="contact-grid">
          {/* Info */}
          <div className="contact-info reveal">
            {INFO.map(({ icon, title, text, href }) => (
              <div className="info-card" key={title}>
                <div className="info-icon"><i className={icon}></i></div>
                <div>
                  <h4>{title}</h4>
                  {href
                    ? <p><a href={href}>{text}</a></p>
                    : <p>{text}</p>}
                </div>
              </div>
            ))}
            <div className="social-links">
              {SOCIALS.map(({ icon, label }) => (
                <a href="#" key={label} aria-label={label} className="social-link">
                  <i className={icon}></i>
                </a>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="contact-form-wrap reveal" data-delay="200">
            <form onSubmit={handleSubmit} noValidate>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="fname">First Name *</label>
                  <input id="fname" name="fname" type="text" placeholder="John" value={form.fname} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label htmlFor="lname">Last Name *</label>
                  <input id="lname" name="lname" type="text" placeholder="Doe" value={form.lname} onChange={handleChange} required />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input id="email" name="email" type="email" placeholder="john@email.com" value={form.email} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input id="phone" name="phone" type="tel" placeholder="+1 (212) 555-0000" value={form.phone} onChange={handleChange} />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="service">Service Required *</label>
                <select id="service" name="service" value={form.service} onChange={handleChange} required>
                  <option value="">Select a service...</option>
                  <option>Residential Construction</option>
                  <option>Commercial Buildings</option>
                  <option>Renovation &amp; Remodeling</option>
                  <option>Project Management</option>
                  <option>Structural Design</option>
                  <option>Interior Finishing</option>
                  <option>Vaastu-Compliant Planning</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="message">Project Details *</label>
                <textarea id="message" name="message" rows="5" placeholder="Tell us about your project..." value={form.message} onChange={handleChange} required></textarea>
              </div>

              <button type="submit" className="btn-submit" disabled={status === "loading"}>
                {status === "loading"
                  ? <><i className="fa fa-spinner fa-spin"></i> Sending...</>
                  : <><i className="fa fa-paper-plane"></i> Send Message</>
                }
              </button>

              {status === "success" && (
                <div className="form-msg success">
                  <i className="fa fa-check-circle"></i> Message sent! We'll contact you within 24 hours.
                </div>
              )}
              {status === "error" && errorMsg && (
                <div className="form-msg error">
                  <i className="fa fa-exclamation-circle"></i> {errorMsg}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}