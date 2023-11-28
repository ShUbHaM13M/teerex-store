import { Product } from "../../context/StoreContext";
import { useUserData } from "../../context/UserContext";
import "./AddToCart.css";

export default function AddToCartBtn({ product }: { product: Product }) {
  const { addProductToCart, getProductQuantity, removeProductFromCart } =
    useUserData();

  const quantity = getProductQuantity(product.id);

  function onAddToCartClick() {
    addProductToCart(product);
  }

  function onRemoveFromCartClick() {
    removeProductFromCart(product.id);
  }

  if (quantity) {
    return (
      <div className="cart-btn counter">
        <button
          onClick={onRemoveFromCartClick}
          className="change-btn"
          type="button"
          title="Remove Item"
        >
          -
        </button>
        <span>{quantity}</span>
        <button
          className="change-btn"
          onClick={onAddToCartClick}
          type="button"
          title="Add Item"
        >
          +
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={onAddToCartClick}
      className="cart-btn"
      type="button"
      title="Add to cart"
    >
      Add to cart
    </button>
  );
}
