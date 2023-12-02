import "./Loader.css";

export default function Loader() {
  return (
    <div className="loader-container">
      <div className="lds-ripple">
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
