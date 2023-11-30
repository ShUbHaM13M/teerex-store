import { AddToCartBtn } from "..";
import { Product } from "../../context/StoreContext";
import "./ProductCard.css";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="card-container">
      <img
        className="product-image"
        src={product.imageURL}
        alt={product.name}
        title={product.name}
      />
      <p className="product-title">{product.name}</p>
      <div className="action">
        <span className="price">₹ {product.price}</span>
        <AddToCartBtn product={product} />
      </div>
    </div>
  );
}
