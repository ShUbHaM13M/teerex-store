import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

export type Product = {
  id: number;
  imageURL: string;
  name: string;
  type: string;
  price: number;
  currency: string;
  color: string;
  gender: string;
  quantity: number;
  [key: string]: string | number;
};

type Filter = {
  type: keyof Product;
  value: string;
};

const API_URL =
  import.meta.env.API_URL ||
  "https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json";

interface StoreContextProps {
  products: Product[];
  filterProductsBySearch: (query: string) => void;
  updateFilters: (
    attribute: string,
    value: string,
    action: "add" | "remove"
  ) => void;
}

export const StoreContext = createContext<StoreContextProps>({
  products: [],
  filterProductsBySearch: () => {},
  updateFilters: () => {},
});

export function useStore() {
  return useContext(StoreContext);
}

async function getProducts(): Promise<Product[]> {
  const res = await fetch(API_URL);
  const data = await res.json();
  return data as Product[];
}

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [filters, setFilters] = useState<Filter[]>([]);

  const filterProductsBySearch = useCallback(
    (query: string) => {
      if (!query.length) {
        setFilteredProducts(products);
        return;
      }

      const tokens = query
        .trim()
        .split(" ")
        .map((token) => token.toLowerCase());

      setFilteredProducts(() => {
        if (tokens.length > 1) {
          return products.filter((product) => {
            if (
              query.toLowerCase() === product.name.toLowerCase() ||
              (tokens.includes(product.color.toLowerCase()) &&
                tokens.includes(product.type.toLowerCase()))
            )
              return true;
            return false;
          });
        }
        return products.filter((product) => {
          if (
            tokens.includes(product.color.toLowerCase()) ||
            tokens.includes(product.type.toLowerCase())
          )
            return true;
        });
      });
    },
    [products]
  );

  const updateFilters = useCallback(
    (attribute: string, value: string, action: "add" | "remove") => {
      setFilters((prev) => {
        if (action === "add") return [...prev, { type: attribute, value }];
        if (action === "remove")
          return prev.filter((filter) => filter.value !== value);
        return prev;
      });
    },
    []
  );

  useEffect(() => {
    getProducts().then((data) => {
      setProducts(data);
      setFilteredProducts(data);
    });
  }, []);

  useEffect(() => {
    if (!filters.length) {
      setFilteredProducts(products);
      return;
    }

    const filtered = products.filter((product) => {
      for (const filter of filters) {
        const value = product[filter.type];
        if (filter.type === "price") {
          console.log(parseInt(filter.value));
        } else if (
          typeof value === "string" &&
          value.toLowerCase() === filter.value
        )
          return true;
      }
      return false;
    });
    setFilteredProducts(filtered);
  }, [filters, products]);

  const value = {
    products: filteredProducts,
    filterProductsBySearch,
    updateFilters,
  };

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
}
