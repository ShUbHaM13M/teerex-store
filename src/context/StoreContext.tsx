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
  [key: string]: Set<string>;
};

const API_URL =
  import.meta.env.API_URL ||
  "https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json";

interface StoreContextProps {
  products: Product[];
  loading: boolean;
  filterProductsBySearch: (query: string) => void;
  getProductById: (product_id: number) => Product | undefined;
  updateFilters: (
    attribute: string,
    value: string,
    action: "add" | "remove"
  ) => void;
}

export const StoreContext = createContext<StoreContextProps>({
  products: [],
  loading: true,
  filterProductsBySearch: () => {},
  getProductById: () => undefined,
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

function getFilteredProducts(products: Product[], filters: Filter) {
  return products.filter((product) => {
    let match = true;
    Object.entries(filters).forEach(([type, value]) => {
      match =
        match &&
        [...value].reduce((acc, v) => {
          const current = product[type];
          switch (typeof current) {
            case "string":
              return acc || current.toLowerCase() === v;
            case "number":
              let [min, max] = v.split("-");
              if (!max) return acc || current > parseInt(min);
              return (
                acc || (current >= parseInt(min) && current <= parseInt(max))
              );
            default:
              return acc;
          }
        }, false);
    });
    return match;
  });
}

function checkProductMatchQuery(
  query: string,
  tokens: string[],
  products: Product[]
) {
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
}

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [products, setProducts] = useState<Product[]>([]);
  const loading = !products.length;
  console.log(loading);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [filters, setFilters] = useState<Filter>({});

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

      setFilteredProducts(checkProductMatchQuery(query, tokens, products));
    },
    [products]
  );

  const updateFilters = useCallback(
    (attribute: string, value: string, action: "add" | "remove") => {
      setFilters((filter) => {
        if (action === "add") {
          if (Object.keys(filter).includes(attribute)) {
            filter[attribute].add(value);
            return { ...filter };
          }
          const newFilter: Filter = {};
          newFilter[attribute] = new Set([value]);
          return { ...filter, ...newFilter };
        }
        if (action === "remove") {
          filter[attribute]?.delete(value);
          if (filter[attribute]?.size === 0) delete filter[attribute];
          return { ...filter };
        }
        return filter;
      });
    },
    []
  );

  const getProductById = useCallback(
    (product_id: number) => {
      const product = products.find((product) => product.id === product_id);
      return product;
    },
    [products]
  );

  useEffect(() => {
    getProducts().then((data) => {
      setProducts(data);
    });
  }, []);

  useEffect(() => {
    if (!Object.keys(filters).length) {
      setFilteredProducts(products);
      return;
    }

    setFilteredProducts(getFilteredProducts(products, filters));
  }, [filters, products]);

  const value = {
    products: filteredProducts,
    loading,
    filterProductsBySearch,
    getProductById,
    updateFilters,
  };

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
}
