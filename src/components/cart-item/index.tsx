import { useCallback } from "react";
import { Product } from "../../context/StoreContext";
import { useUserData } from "../../context/UserContext";
import "./CartItem.css";

export default function CartItem({ product }: { product: Product }) {
  const { addProductToCart, removeProductFromCart, deleteProductFromCart } =
    useUserData();

  const onAddClick = useCallback(() => {
    addProductToCart(product);
  }, []);

  const onRemoveClick = useCallback(() => {
    removeProductFromCart(product.id);
  }, []);

  const onDeleteClick = useCallback(() => {
    deleteProductFromCart(product.id);
  }, []);

  return (
    <div className="cart-item">
      <img
        className="product-image"
        src={product.imageURL}
        alt={product.name}
        title={product.name}
      />
      <div className="info">
        <span className="product-name">{product.name}</span>
        <span className="product-price">
          ₹ {product.price * product.quantity}
        </span>
      </div>
      <div className="action">
        <div className="counter">
          <button
            onClick={onRemoveClick}
            className="change-btn"
            type="button"
            title="Remove Item"
          >
            -
          </button>
          <span>x {product.quantity}</span>
          <button
            className="change-btn"
            onClick={onAddClick}
            type="button"
            title="Add Item"
          >
            +
          </button>
        </div>
        <button
          onClick={onDeleteClick}
          title={`Remove ${product.name} from cart`}
          className="delete-btn"
          type="button"
        >
          <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none">
            <path
              d="M10 11V17"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M14 11V17"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M4 7H20"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M6 7H12H18V18C18 19.6569 16.6569 21 15 21H9C7.34315 21 6 19.6569 6 18V7Z"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
