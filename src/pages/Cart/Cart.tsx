import { CartItem } from "../../components";
import { useUserData } from "../../context/UserContext";
import "./Cart.css";

export default function CartPage() {
  const { cart, getTotalItemsInCart, getTotalAmount } = useUserData();

  const totalItems = getTotalItemsInCart();
  const totalAmount = getTotalAmount();

  return (
    <main>
      <div className="container cart">
        <h2 className="header">
          <span>Shopping Cart</span>{" "}
          <span className="item-count">
            {!!totalItems ? `${totalItems} Items` : "No Items in cart"}{" "}
          </span>
        </h2>
        <hr />
        <div className="cart-item-container">
          {Object.values(cart).map((product) => (
            <CartItem key={product.id} product={product} />
          ))}
        </div>
        <hr />
        <span className="total-amount">Total ₹: {totalAmount}</span>
      </div>
    </main>
  );
}
