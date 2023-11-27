import { ProductCard } from "../../components";
import { useStore } from "../../context/StoreContext";
import "./Home.css";

export default function HomePage() {
  const { products } = useStore();
  return (
    <div className="product-container">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddCartClick={() => {}}
        />
      ))}
    </div>
  );
}
