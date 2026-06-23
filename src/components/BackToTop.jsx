import { useEffect, useState } from "react";
import "./BackToTop.css";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <button
      id="backToTop"
      className={`back-to-top${visible ? " visible" : ""}`}
      onClick={scrollTop}
      aria-label="Back to top"
    >
      <i className="fa fa-chevron-up"></i>
    </button>
  );
}
