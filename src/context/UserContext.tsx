import { createContext, useCallback, useContext, useState } from "react";
import { Product, useStore } from "./StoreContext";
import { useNotification } from "./NotificationContext";

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
  getTotalAmount: () => number;
};

export const UserContext = createContext<UserContextProps>({
  cart: [],
  addProductToCart: () => {},
  removeProductFromCart: () => {},
  deleteProductFromCart: () => {},
  getTotalItemsInCart: () => 0,
  getProductQuantity: () => 0,
  getTotalAmount: () => 0,
});

export function useUserData() {
  return useContext(UserContext);
}

interface UserProviderProps {
  children: React.ReactNode;
}

export default function UserProvider({ children }: UserProviderProps) {
  const { setMessage } = useNotification();
  const [productsInCart, setProductsInCart] = useState<CartItem>({});
  const { getProductById } = useStore();

  const addProductToCart = useCallback(
    (product: Product) => {
      setProductsInCart((prev) => {
        const _product = prev[product.id];
        const quantity = _product ? _product.quantity + 1 : 1;
        const { quantity: storeQuantity } = getProductById(product.id)!;
        if (storeQuantity >= quantity) {
          const cartItem: CartItem = {};
          cartItem[product.id] = {
            ...product,
            quantity,
          };
          return { ...prev, ...cartItem };
        }
        setMessage({
          text: `Oops! You've exceeded the available stock for this item. Max quantity is ${storeQuantity}.`,
          type: "error",
        });
        return { ...prev };
      });
    },
    [getProductById]
  );

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

  const deleteProductFromCart = useCallback((product_id: number) => {
    setProductsInCart((prev) => {
      if (!prev[product_id]) return prev;
      delete prev[product_id];
      return { ...prev };
    });
  }, []);

  const getProductQuantity = (product_id: number) =>
    productsInCart[product_id] ? productsInCart[product_id].quantity : 0;

  function getTotalAmount() {
    return Object.values(productsInCart).reduce(
      (amount, product) => amount + product.quantity * product.price,
      0
    );
  }

  const value = {
    cart: productsInCart,
    addProductToCart,
    getTotalItemsInCart,
    getProductQuantity,
    removeProductFromCart,
    deleteProductFromCart,
    getTotalAmount,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
