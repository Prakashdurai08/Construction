import "./Footer.css";

const QUICK_LINKS = [
  { href: "#home", label: "Home" },
  { href: "#services", label: "Services" },
  { href: "#why-us", label: "About Us" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Get a Quote" },
];

const SERVICES = [
  "Residential Construction",
  "Commercial Buildings",
  "Renovation & Remodeling",
  "Project Management",
  "Structural Design",
  "Vaastu-Compliant Planning",
];

const SOCIALS = [
  { icon: "fab fa-facebook-f", label: "Facebook" },
  { icon: "fab fa-instagram", label: "Instagram" },
  { icon: "fab fa-linkedin-in", label: "LinkedIn" },
  { icon: "fab fa-youtube", label: "YouTube" },
];

export default function Footer() {
  const smoothScroll = (e, href) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (!target) return;
    const navH = document.getElementById("navbar")?.offsetHeight || 70;
    window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - navH - 12, behavior: "smooth" });
  };

  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="container">
          <div className="footer-grid">
            {/* Brand */}
            <div className="footer-brand">
              <div className="logo">
                <span className="logo-mm">MM</span>
                <span className="logo-text">Builders</span>
              </div>
              <p>Building strong foundations for families, businesses, and communities across Tamil Nadu since 2013.</p>
              <div className="footer-socials">
                {SOCIALS.map(({ icon, label }) => (
                  <a href="#" key={label} aria-label={label} className="social-link">
                    <i className={icon}></i>
                  </a>
                ))}
              </div>
            </div>

            {/* Quick links */}
            <div className="footer-col">
              <h4>Quick Links</h4>
              <ul>
                {QUICK_LINKS.map(({ href, label }) => (
                  <li key={href}>
                    <a href={href} onClick={(e) => smoothScroll(e, href)}>
                      <i className="fa fa-chevron-right"></i> {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div className="footer-col">
              <h4>Services</h4>
              <ul>
                {SERVICES.map((s) => (
                  <li key={s}>
                    <a href="#services" onClick={(e) => smoothScroll(e, "#services")}>
                      <i className="fa fa-chevron-right"></i> {s}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div className="footer-col">
              <h4>Contact</h4>
              <ul className="footer-contact">
                <li>
                  <i className="fa fa-map-marker-alt"></i>
                  <span>42 Anna Salai, Chennai, Tamil Nadu 600002</span>
                </li>
                <li>
                  <i className="fa fa-phone"></i>
                  <a href="tel:+919876543210">+91 98765 43210</a>
                </li>
                <li>
                  <i className="fa fa-envelope"></i>
                  <a href="mailto:info@mmbuilders.com">info@mmbuilders.com</a>
                </li>
                <li>
                  <i className="fa fa-clock"></i>
                  <span>Mon – Sat: 9 AM – 7 PM</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <p>&copy; {new Date().getFullYear()} MM Builders. All rights reserved.</p>
          <div className="footer-legal">
            <a href="#">Privacy Policy</a>
            <span>|</span>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}