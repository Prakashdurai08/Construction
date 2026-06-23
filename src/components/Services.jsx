import { useEffect, useRef } from "react";
import "./Services.css";

const SERVICES = [
  {
    icon: "fa fa-home",
    title: "Residential Construction",
    desc: "New home builds & custom residential projects crafted with precision and care.",
    delay: 0,
  },
  {
    icon: "fa fa-building",
    title: "Commercial Buildings",
    desc: "Office, retail & industrial projects built to the highest specifications.",
    delay: 100,
  },
  {
    icon: "fa fa-wrench",
    title: "Renovation & Remodeling",
    desc: "Home & commercial renovations that breathe new life into existing spaces.",
    delay: 200,
  },
  {
    icon: "fa fa-clipboard-list",
    title: "Project Management",
    desc: "End-to-end planning & supervision ensuring every milestone is met.",
    delay: 300,
  },
  {
    icon: "fa fa-drafting-compass",
    title: "Structural Design",
    desc: "Engineering & design solutions that balance aesthetics with functionality.",
    delay: 400,
  },
  {
    icon: "fa fa-paint-roller",
    title: "Interior Finishing",
    desc: "Custom interior fit-outs that reflect your brand and lifestyle perfectly.",
    delay: 500,
  },
  {
    icon: "fa fa-compass",
    title: "Vaastu-Compliant Planning",
    desc: "Designs aligned with Vaastu principles, balancing tradition with modern living.",
    delay: 600,
  },
];

function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
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
  return ref;
}

export default function Services() {
  const sectionRef = useReveal();

  const smoothScroll = (e, href) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (!target) return;
    const navH = document.getElementById("navbar")?.offsetHeight || 70;
    window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - navH - 12, behavior: "smooth" });
  };

  return (
    <section id="services" className="services section-pad" ref={sectionRef}>
      <div className="container">
        <div className="section-header reveal">
          <span className="section-label">What We Do</span>
          <h2>Our <span className="accent">Services</span></h2>
          <p>Comprehensive construction solutions tailored to your needs</p>
        </div>

        <div className="services-grid">
          {SERVICES.map(({ icon, title, desc, delay }) => (
            <div className="service-card reveal" key={title} data-delay={delay}>
              <div className="service-icon">
                <i className={icon}></i>
              </div>
              <h3>{title}</h3>
              <p>{desc}</p>
              <a href="#contact" className="service-link" onClick={(e) => smoothScroll(e, "#contact")}>
                Learn More <i className="fa fa-arrow-right"></i>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}