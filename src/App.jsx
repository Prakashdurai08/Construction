import { useEffect, useState } from "react";
import Loader from "./components/Loader";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import WhyUs from "./components/WhyUs";
import Projects from "./components/Projects";
import Process from "./components/Process";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import CTABanner from "./components/CTABanner";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";
import BackToTop from "./components/BackToTop";
import "./App.css";

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading && <Loader />}
      <div className={`app-wrapper${loading ? " no-scroll" : ""}`}>
        <Navbar />
        <main>
          <Hero />
          <Services />
          <WhyUs />
          <Projects />
          <Process />
          <Testimonials />
          <Contact />
          <CTABanner />
        </main>
        <Footer />
        <WhatsAppButton />
        <BackToTop />
      </div>
    </>
  );
}
