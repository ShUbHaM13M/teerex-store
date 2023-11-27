import { Product } from "../../context/StoreContext";
import "./ProductCard.css";

interface ProductCardProps {
  product: Product;
  onAddCartClick: () => void;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="card-container">
      <img
        className="product-image"
        src={product.imageURL}
        alt={product.name}
        title={product.imageURL}
      />
      <p className="product-title">{product.name}</p>
      <div className="action">
        <span className="price">Rs {product.price}</span>
        <button className="cart-btn" type="button" title="Add to cart">
          Add to cart
        </button>
      </div>
    </div>
  );
}
