import "./Navbar.css";
import { Cart } from "..";
import { Link, useLocation } from "wouter";

const Navbar = () => {
  const [location] = useLocation();

  return (
    <header>
      <nav>
        <h1>TeeRex Store</h1>
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
    </header>
  );
};

export default Navbar;
