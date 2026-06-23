import { useEffect, useRef, useState } from "react";
import "./Navbar.css";

const NAV_LINKS = [
  { href: "#home", label: "Home" },
  { href: "#services", label: "Services" },
  { href: "#why-us", label: "About Us" },
  { href: "#projects", label: "Projects" },
  { href: "#testimonials", label: "Testimonials" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const navRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Active section highlight
      const sections = document.querySelectorAll("section[id]");
      const navH = navRef.current?.offsetHeight || 70;
      const scrollY = window.scrollY + navH + 40;
      sections.forEach((sec) => {
        if (scrollY >= sec.offsetTop && scrollY < sec.offsetTop + sec.offsetHeight) {
          setActiveSection(sec.id);
        }
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const smoothScroll = (e, href) => {
    e.preventDefault();
    setMenuOpen(false);
    const target = document.querySelector(href);
    if (!target) return;
    const navH = navRef.current?.offsetHeight || 70;
    const top = target.getBoundingClientRect().top + window.scrollY - navH - 12;
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <header id="navbar" className={`navbar${scrolled ? " scrolled" : ""}`} ref={navRef}>
      <div className="nav-container">
        <a href="#home" className="logo" onClick={(e) => smoothScroll(e, "#home")}>
          <span className="logo-mm">MM</span>
          <span className="logo-text">Builders</span>
        </a>

        <nav className={`nav-links${menuOpen ? " open" : ""}`}>
          {NAV_LINKS.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className={activeSection === href.slice(1) ? "active-nav" : ""}
              onClick={(e) => smoothScroll(e, href)}
            >
              {label}
            </a>
          ))}
          <a href="#contact" className="nav-cta" onClick={(e) => smoothScroll(e, "#contact")}>
            Get a Free Quote
          </a>
        </nav>

        <button
          className={`hamburger${menuOpen ? " open" : ""}`}
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {/* Mobile overlay */}
      {menuOpen && (
        <div className="nav-overlay" onClick={() => setMenuOpen(false)} />
      )}
    </header>
  );
}
