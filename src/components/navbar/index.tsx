import "./Navbar.css";
import { Cart } from "..";
import { Link, useLocation } from "wouter";

const Navbar = () => {
  const [location, setLocation] = useLocation();
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
          <button
            onClick={() => setLocation("/cart")}
            className="nav-link cart-button"
          >
            <Cart />
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
