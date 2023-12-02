import { useState } from "react";
import { Sidebar, ProductCard, Searchbar, Loader } from "../../components";
import { useStore } from "../../context/StoreContext";
import "./Home.css";
import { IconNotFound } from "../../assets/icons";

export default function HomePage() {
  const { products, loading } = useStore();
  const [showFitlers, setShowFilters] = useState(false);

  function toggleShowFilter() {
    setShowFilters((prev) => !prev);
  }

  return (
    <main>
      <Searchbar
        showFilters={showFitlers}
        onShowFitersButtonClick={toggleShowFilter}
      />
      <div className="container">
        <Sidebar showFilters={showFitlers} onCloseClick={toggleShowFilter} />
        <section className="product-container">
          {loading && <Loader />}
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
          {!loading && !products.length ? (
            <div className="not-found-container">
              <IconNotFound />
              <h2>No Items Found!</h2>
            </div>
          ) : (
            ""
          )}
        </section>
      </div>
    </main>
  );
}
