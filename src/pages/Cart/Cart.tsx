import { IconNotFound } from "../../assets/icons";
import { CartItem } from "../../components";
import { useUserData } from "../../context/UserContext";
import "./Cart.css";

export default function CartPage() {
  const { cart, getTotalItemsInCart, getTotalAmount } = useUserData();

  const totalItems = getTotalItemsInCart();
  const totalAmount = getTotalAmount();
  const itemsInCart = Object.values(cart);

  return (
    <main>
      <div className="container cart">
        <h2 className="header">
          <span>Shopping Cart</span>{" "}
          {!!totalItems ? (
            <span className="item-count">{totalItems} Items</span>
          ) : (
            ""
          )}
        </h2>
        <hr />
        <div className="cart-item-container">
          {itemsInCart.map((product) => (
            <CartItem key={product.id} product={product} />
          ))}
          {!totalItems ? (
            <div className="not-found-container">
              <IconNotFound />
              <h2>No Items in your Cart.</h2>
            </div>
          ) : (
            ""
          )}
        </div>
        {!!totalItems ? (
          <>
            <hr />
            <span className="total-amount">Total ₹: {totalAmount}</span>
          </>
        ) : (
          ""
        )}
      </div>
    </main>
  );
}
