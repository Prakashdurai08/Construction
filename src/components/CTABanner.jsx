import { useEffect, useRef } from "react";
import "./CTABanner.css";

export default function CTABanner() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.querySelectorAll(".reveal").forEach((r) => r.classList.add("visible"));
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const smoothScroll = (e, href) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (!target) return;
    const navH = document.getElementById("navbar")?.offsetHeight || 70;
    window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - navH - 12, behavior: "smooth" });
  };

  return (
    <section className="cta-banner" ref={sectionRef}>
      <div className="cta-bg">
        <div className="cta-pattern"></div>
        <div className="cta-glow"></div>
      </div>
      <div className="container cta-content reveal">
        <div className="cta-text">
          <h2>Planning a Construction Project?</h2>
          <p>Let MM Builders bring your vision to life with expert craftsmanship and precision.</p>
        </div>
        <a href="#contact" className="btn-primary cta-btn" onClick={(e) => smoothScroll(e, "#contact")}>
          <i className="fa fa-file-alt"></i> Request a Free Quote
        </a>
      </div>
    </section>
  );
}
