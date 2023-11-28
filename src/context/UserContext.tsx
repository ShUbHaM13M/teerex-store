import { createContext, useCallback, useContext, useState } from "react";
import { Product } from "./StoreContext";

type CartItem = {
  [key: number]: Product;
};

type UserContextProps = {
  cart: CartItem | {};
  addProductToCart: (product: Product) => void;
  removeProductFromCart: (product_id: number) => void;
  deleteProductFromCart: (product_id: number) => void;
  getTotalItemsInCart: () => number;
  getProductQuantity: (product_id: number) => number;
};

export const UserContext = createContext<UserContextProps>({
  cart: [],
  addProductToCart: () => {},
  removeProductFromCart: () => {},
  deleteProductFromCart: () => {},
  getTotalItemsInCart: () => 0,
  getProductQuantity: () => 0,
});

export function useUserData() {
  return useContext(UserContext);
}

interface UserProviderProps {
  children: React.ReactNode;
}

export default function UserProvider({ children }: UserProviderProps) {
  const [productsInCart, setProductsInCart] = useState<CartItem>({});

  const addProductToCart = useCallback((product: Product) => {
    setProductsInCart((prev) => {
      const _product = prev[product.id];
      const cartItem: CartItem = {};
      cartItem[product.id] = {
        ...product,
        quantity: _product ? _product.quantity + 1 : 1,
      };
      return { ...prev, ...cartItem };
    });
  }, []);

  const getTotalItemsInCart = useCallback(() => {
    return Object.values(productsInCart).reduce(
      (count, curr) => count + curr.quantity,
      0
    );
  }, [productsInCart]);

  const removeProductFromCart = useCallback((product_id: number) => {
    setProductsInCart((prev) => {
      if (!prev[product_id]) return prev;

      const _product = prev[product_id];
      const cartItem: CartItem = {};
      cartItem[product_id] = {
        ..._product,
        quantity: _product ? _product.quantity - 1 : 1,
      };
      if (cartItem[product_id].quantity <= 0) {
        delete prev[product_id];
        return { ...prev };
      }
      return { ...prev, ...cartItem };
    });
  }, []);

  console.log(productsInCart);

  const deleteProductFromCart = useCallback((product_id: number) => {
    setProductsInCart((prev) => {
      if (!prev[product_id]) return prev;
      delete prev[product_id];
      return prev;
    });
  }, []);

  const getProductQuantity = (product_id: number) =>
    productsInCart[product_id] ? productsInCart[product_id].quantity : 0;

  const value = {
    cart: productsInCart,
    addProductToCart,
    getTotalItemsInCart,
    getProductQuantity,
    removeProductFromCart,
    deleteProductFromCart,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
