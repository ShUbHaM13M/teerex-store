import "./Navbar.css";
import { Cart } from "..";
import { Link, useLocation } from "wouter";

const Navbar = () => {
  const [location] = useLocation();

  return (
    <nav>
      <div className="logo-container">
        <div className="logo">
          <img
            title="TeeRex Store logo"
            src="/favicon.png"
            alt="TeeRex Store Logo"
          />
        </div>
        <h1>
          <Link href="/">TeeRex Store</Link>
        </h1>
      </div>
      <div className="nav-links">
        <Link
          href="/"
          className={`nav-link product-link ${
            location === "/" || location === "/home" ? "active" : ""
          }`}
        >
          Products
        </Link>
        <Cart />
      </div>
    </nav>
  );
};

export default Navbar;
