import { useEffect, useRef, useState } from "react";
import "./Projects.css";

const FILTERS = ["all", "residential", "commercial", "renovation"];

const PROJECTS = [
  { category: "residential", tag: "Residential", title: "Modern Family Home", img: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=800&q=80", delay: 0 },
  { category: "commercial", tag: "Commercial", title: "Downtown Office Tower", img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80", delay: 100 },
  { category: "residential", tag: "Residential", title: "Luxury Apartment Complex", img: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80", delay: 200 },
  { category: "renovation", tag: "Renovation", title: "Retail Center Renovation", img: "https://images.unsplash.com/photo-1555636222-cae831e670b3?auto=format&fit=crop&w=800&q=80", delay: 300 },
  { category: "commercial", tag: "Commercial", title: "Industrial Warehouse Hub", img: "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?auto=format&fit=crop&w=800&q=80", delay: 400 },
  { category: "renovation", tag: "Renovation", title: "Heritage Villa Restoration", img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80", delay: 500 },
];

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("all");
  const sectionRef = useRef(null);

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
      { threshold: 0.08 }
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

  const visible = PROJECTS.filter(
    (p) => activeFilter === "all" || p.category === activeFilter
  );

  return (
    <section id="projects" className="projects section-pad" ref={sectionRef}>
      <div className="container">
        <div className="section-header reveal">
          <span className="section-label">Our Portfolio</span>
          <h2>Our <span className="accent">Projects</span></h2>
          <p>A glimpse into our finest work across sectors</p>
        </div>

        <div className="projects-filter reveal">
          {FILTERS.map((f) => (
            <button
              key={f}
              className={`filter-btn${activeFilter === f ? " active" : ""}`}
              onClick={() => setActiveFilter(f)}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        <div className="projects-grid" key={activeFilter}>
          {visible.map(({ tag, title, img }, i) => (
            <div
              className="proj-card reveal visible"
              key={title}
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="proj-img">
                <img src={img} alt={title} loading="lazy" />
                <div className="proj-overlay">
                  <a href="#contact" className="proj-btn" onClick={(e) => smoothScroll(e, "#contact")}>
                    <i className="fa fa-plus"></i>
                  </a>
                </div>
                <div className="proj-number">{String(i + 1).padStart(2, "0")}</div>
              </div>
              <div className="proj-info">
                <span className="proj-tag">{tag}</span>
                <h3>{title}</h3>
              </div>
            </div>
          ))}
        </div>

        <div className="proj-cta reveal">
          <a href="#contact" className="btn-primary" onClick={(e) => smoothScroll(e, "#contact")}>
            Start Your Project <i className="fa fa-arrow-right"></i>
          </a>
        </div>
      </div>
    </section>
  );
}