import { createContext, useContext, useEffect, useState } from "react";

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
};

const API_URL =
  import.meta.env.API_URL ||
  "https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json";

export const StoreContext = createContext<{ products: Product[] }>({
  products: [],
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

  useEffect(() => {
    getProducts().then((data) => setProducts(data));
  }, []);

  const value = { products };
  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
}
