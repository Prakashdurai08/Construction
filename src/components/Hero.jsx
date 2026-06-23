import { useEffect, useRef } from "react";
import "./Hero.css";

export default function Hero() {
  const countersRef = useRef([]);
  const counted = useRef(false);
  const heroRef = useRef(null);

  // Reveal hero text on mount (hero is above the fold, so no scroll-trigger needed)
  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const items = el.querySelectorAll(".reveal");
    items.forEach((r, i) => {
      setTimeout(() => r.classList.add("visible"), 100 + i * 100);
    });
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !counted.current) {
          counted.current = true;
          countersRef.current.forEach((el) => {
            if (!el) return;
            const target = parseInt(el.dataset.target);
            let current = 0;
            const step = Math.ceil(target / 60);
            const timer = setInterval(() => {
              current += step;
              if (current >= target) {
                current = target;
                clearInterval(timer);
              }
              el.textContent = current;
            }, 30);
          });
        }
      },
      { threshold: 0.15 }
    );
    const section = document.getElementById("home");
    if (section) observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const smoothScroll = (e, href) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (!target) return;
    const navH = document.getElementById("navbar")?.offsetHeight || 70;
    const top = target.getBoundingClientRect().top + window.scrollY - navH - 12;
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <section id="home" className="hero" ref={heroRef}>
      {/* Background */}
      <div className="hero-bg">
        <div className="hero-overlay"></div>
        <div className="hero-grid"></div>
        <div className="hero-glow"></div>
      </div>

      <div className="hero-content container">
        <div className="hero-badge reveal">
          <i className="fa fa-hard-hat"></i> Trusted Since 2013
        </div>

        <h1 className="hero-title reveal">
          Building Strong<br />
          <span className="accent">Foundations</span><br />
          for the Future
        </h1>

        <p className="hero-sub reveal">
          Tamil Nadu's trusted residential &amp; commercial construction experts<br />
          delivering quality, safety, and on-time results.
        </p>

        <div className="hero-btns reveal">
          <a href="#contact" className="btn-primary" onClick={(e) => smoothScroll(e, "#contact")}>
            <i className="fa fa-file-alt"></i> Get a Free Quote
          </a>
          <a href="#projects" className="btn-outline" onClick={(e) => smoothScroll(e, "#projects")}>
            <i className="fa fa-eye"></i> View Our Projects
          </a>
        </div>

        <div className="hero-stats reveal">
          <div className="stat">
            <div className="stat-number">
              <span className="stat-num" data-target="10" ref={(el) => (countersRef.current[0] = el)}>0</span>
              <span className="stat-suffix">+</span>
            </div>
            <p>Years Experience</p>
          </div>
          <div className="stat-divider"></div>
          <div className="stat">
            <div className="stat-number">
              <span className="stat-num" data-target="380" ref={(el) => (countersRef.current[1] = el)}>0</span>
              <span className="stat-suffix">+</span>
            </div>
            <p>Projects Done</p>
          </div>
          <div className="stat-divider"></div>
          <div className="stat">
            <div className="stat-number">
              <span className="stat-num" data-target="98" ref={(el) => (countersRef.current[2] = el)}>0</span>
              <span className="stat-suffix">%</span>
            </div>
            <p>Client Satisfaction</p>
          </div>
        </div>

        <p className="hero-areas reveal">
          <i className="fa fa-map-marker-alt"></i> Serving Chennai · Coimbatore · Madurai · Tiruchirappalli
        </p>
      </div>
    </section>
  );
}