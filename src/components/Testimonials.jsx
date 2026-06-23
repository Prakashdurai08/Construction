import { useEffect, useRef, useState } from "react";
import "./Testimonials.css";

const TESTIMONIALS = [
  {
    stars: 5,
    text: "MM Builders exceeded our expectations. Our new home is everything we dreamed of and delivered right on schedule. Absolutely fantastic work from start to finish!",
    initials: "SL",
    name: "Sarah L.",
    role: "Custom Home Build",
  },
  {
    stars: 5,
    text: "Highly professional and always on schedule. The office renovation transformed our workspace entirely. The team communicated at every step. Couldn't be happier.",
    initials: "JR",
    name: "James R.",
    role: "Office Renovation",
  },
  {
    stars: 5,
    text: "Top-notch quality and great communication. MM Builders managed our apartment complex project flawlessly from start to finish. Highly recommended!",
    initials: "LM",
    name: "Linda M.",
    role: "Apartment Development",
  },
  {
    stars: 4.5,
    text: "Professional, reliable, and the workmanship is outstanding. Our retail renovation was done beautifully within budget. Will definitely work with them again.",
    initials: "DP",
    name: "David P.",
    role: "Retail Renovation",
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const trackRef = useRef(null);
  const autoRef = useRef(null);
  const touchStart = useRef(0);
  const sectionRef = useRef(null);

  const total = TESTIMONIALS.length;

  const goTo = (i) => {
    setCurrent((i + total) % total);
  };

  const next = () => goTo(current + 1);
  const prev = () => goTo(current - 1);

  const resetAuto = () => {
    clearInterval(autoRef.current);
    autoRef.current = setInterval(next, 4500);
  };

  useEffect(() => {
    autoRef.current = setInterval(() => setCurrent((c) => (c + 1) % total), 4500);
    return () => clearInterval(autoRef.current);
  }, [total]);

  // Reveal observer
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
      { threshold: 0.08 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleNext = () => { next(); resetAuto(); };
  const handlePrev = () => { prev(); resetAuto(); };

  const handleTouchStart = (e) => { touchStart.current = e.touches[0].clientX; };
  const handleTouchEnd = (e) => {
    const diff = touchStart.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) { diff > 0 ? handleNext() : handlePrev(); }
  };

  return (
    <section id="testimonials" className="testimonials section-pad" ref={sectionRef}>
      <div className="container">
        <div className="section-header reveal">
          <span className="section-label">Client Love</span>
          <h2>Client <span className="accent">Testimonials</span></h2>
          <p>What our clients say about working with us</p>
        </div>

        <div className="testi-slider reveal">
          <div
            className="testi-track"
            ref={trackRef}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {TESTIMONIALS.map((t, i) => (
              <div
                key={t.name}
                className={`testi-card${i === current ? " active" : ""}`}
              >
                <div className="testi-quote">
                  <i className="fa fa-quote-left"></i>
                </div>
                <div className="testi-stars">
                  {[...Array(5)].map((_, si) => (
                    <i
                      key={si}
                      className={
                        si < Math.floor(t.stars)
                          ? "fa fa-star"
                          : si < t.stars
                          ? "fa fa-star-half-alt"
                          : "far fa-star"
                      }
                    ></i>
                  ))}
                </div>
                <p className="testi-text">&ldquo;{t.text}&rdquo;</p>
                <div className="testi-author">
                  <div className="testi-avatar">{t.initials}</div>
                  <div>
                    <strong>{t.name}</strong>
                    <span>{t.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="slider-controls">
            <button className="slider-btn" onClick={handlePrev} aria-label="Previous">
              <i className="fa fa-chevron-left"></i>
            </button>
            <div className="slider-dots">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  className={`dot${i === current ? " active" : ""}`}
                  onClick={() => { goTo(i); resetAuto(); }}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
            <button className="slider-btn" onClick={handleNext} aria-label="Next">
              <i className="fa fa-chevron-right"></i>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
