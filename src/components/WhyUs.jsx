import { useEffect, useRef } from "react";
import "./WhyUs.css";

const FEATURES = [
  { icon: "fa fa-trophy", title: "10+ Years of Experience", desc: "A proven track record across hundreds of successful projects.", delay: 0 },
  { icon: "fa fa-shield-alt", title: "Licensed & Insured", desc: "Fully certified and compliant with all safety regulations.", delay: 100 },
  { icon: "fa fa-users", title: "Skilled Team of Experts", desc: "Seasoned professionals dedicated to craftsmanship and detail.", delay: 200 },
  { icon: "fa fa-boxes", title: "High-Quality Materials", desc: "We source premium materials for lasting durability and beauty.", delay: 300 },
  { icon: "fa fa-clock", title: "On-Time Delivery", desc: "Strict timelines and transparent communication throughout.", delay: 400 },
];

export default function WhyUs() {
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

  return (
    <section id="why-us" className="why-us section-pad" ref={sectionRef}>
      <div className="container">
        <div className="why-grid">
          {/* Visual panel */}
          <div className="why-visual reveal">
            <div className="why-visual-inner">
              <img
                src="https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&w=640&q=80"
                alt="MM Builders construction team at work"
                className="why-visual-img"
              />
              <div className="why-badge-float">
                <span className="badge-num">10+</span>
                <span className="badge-label">Years</span>
              </div>
              {/* Decorative rings */}
              <div className="ring ring-1"></div>
              <div className="ring ring-2"></div>
            </div>
          </div>

          {/* Content */}
          <div className="why-content">
            <div className="section-header left reveal">
              <span className="section-label">Why Choose Us</span>
              <h2>Why Choose <span className="accent">MM Builders</span></h2>
              <p>We combine decades of expertise with modern construction techniques to deliver unmatched results on every project.</p>
            </div>

            <div className="why-features">
              {FEATURES.map(({ icon, title, desc, delay }) => (
                <div className="why-feat reveal" key={title} data-delay={delay}>
                  <div className="feat-icon">
                    <i className={icon}></i>
                  </div>
                  <div className="feat-text">
                    <h4>{title}</h4>
                    <p>{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}