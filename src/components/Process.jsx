import { useEffect, useRef } from "react";
import "./Process.css";

const STEPS = [
  { num: "01", icon: "fa fa-phone", title: "Consultation", desc: "We discuss your vision, requirements, timeline, and budget in a free initial meeting.", delay: 0 },
  { num: "02", icon: "fa fa-pencil-ruler", title: "Design & Plan", desc: "Vaastu-compliant blueprints and a detailed project plan, prepared for your approval.", delay: 100 },
  { num: "03", icon: "fa fa-stamp", title: "Approvals & Permits", desc: "We handle Panchayat/Corporation approvals, DTCP and patta verification on your behalf.", delay: 200 },
  { num: "04", icon: "fa fa-hammer", title: "Construction", desc: "Expert builders execute with precision, providing regular site updates at every phase.", delay: 300 },
  { num: "05", icon: "fa fa-key", title: "Handover", desc: "We deliver on time, conduct a final walkthrough, and ensure your complete satisfaction.", delay: 400 },
];

export default function Process() {
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
    <section className="process section-pad" ref={sectionRef}>
      <div className="container">
        <div className="section-header reveal">
          <span className="section-label">How We Work</span>
          <h2>Our <span className="accent">Process</span></h2>
          <p>Simple steps to bring your vision to life</p>
        </div>

        <div className="process-steps">
          {STEPS.map(({ num, icon, title, desc, delay }, i) => (
            <div className="process-step-wrap" key={num}>
              <div className="process-step reveal" data-delay={delay}>
                <div className="step-num">{num}</div>
                <div className="step-icon">
                  <i className={icon}></i>
                </div>
                <h3>{title}</h3>
                <p>{desc}</p>
              </div>
              {i < STEPS.length - 1 && (
                <div className="process-arrow reveal" data-delay={delay + 75}>
                  <i className="fa fa-chevron-right"></i>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}