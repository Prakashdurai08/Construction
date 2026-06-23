import "./Loader.css";

export default function Loader() {
  return (
    <div id="loader" className="loader">
      <div className="loader-logo">MM</div>
      <p className="loader-tagline">Builders</p>
      <div className="loader-bar">
        <span></span>
      </div>
    </div>
  );
}
