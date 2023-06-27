import { createContext, useContext, useState } from "react";

// 定義 Context 中 value 的型別
interface CartContextType {
  cartItem: any;
  setCartItem: (mode: any) => void;
  cartInfo: object;
  setCartInfo: (mode: object) => void;
}

// 設定context變數的初始值
const defaultValue: CartContextType = {
  cartItem: [],
  setCartItem: () => {},
  cartInfo: {},
  setCartInfo: () => {},
};

// 定義 Provider 元件 Props 的型別
interface ProviderProps {
  children: React.ReactNode;
}

const CartContext = createContext<CartContextType>(defaultValue);
export const useCart = () => useContext(CartContext);

export const CartProvider = ({children}:ProviderProps) => {
  const [cartItem, setCartItem] = useState<any>(); // cart item 購物車內產品項目
  const [cartInfo, setCartInfo] = useState<object>({}); // cart info 購物車資訊
  
  return (
    <CartContext.Provider 
      value={{
          cartItem,
          setCartItem,
          cartInfo,
          setCartInfo
        }}
      >
      {children}
    </CartContext.Provider>
  );
};
