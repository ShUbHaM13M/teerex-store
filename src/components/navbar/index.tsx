import "./Navbar.css";
import { Cart } from "..";
import { Link, useLocation } from "wouter";

const Navbar = () => {
  const [location] = useLocation();

  return (
    <nav>
      <h1>
        <a href="/">TeeRex Store</a>
      </h1>
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
