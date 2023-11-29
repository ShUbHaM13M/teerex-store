import { useLocation } from "wouter";
import { useUserData } from "../../context/UserContext";
import "./Cart.css";

export default function Cart() {
  const [_, setLocation] = useLocation();
  const { getTotalItemsInCart } = useUserData();
  const totalItems = getTotalItemsInCart();

  return (
    <button
      title="Cart"
      type="button"
      onClick={() => setLocation("/cart")}
      className="cart-button"
    >
      <div className={`badge ${totalItems ? "show" : ""}`}>{totalItems}</div>
      <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none">
        <path
          d="M6.29977 5H21L19 12H7.37671M20 16H8L6 3H3M9 20C9 20.5523 8.55228 21 8 21C7.44772 21 7 20.5523 7 20C7 19.4477 7.44772 19 8 19C8.55228 19 9 19.4477 9 20ZM20 20C20 20.5523 19.5523 21 19 21C18.4477 21 18 20.5523 18 20C18 19.4477 18.4477 19 19 19C19.5523 19 20 19.4477 20 20Z"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
