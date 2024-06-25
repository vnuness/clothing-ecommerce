
import { createContext, useState, useEffect } from 'react';

const productIsInCart = (cartItems, product) => {
  const cartProduct = cartItems.find(cartProduct => product.id === cartProduct.id);

  if (cartProduct?.id) {
    return true;
  } else {
    return false;
  }
};

const addCartItem = (cartItems, product) => {

  const existingCartItem = productIsInCart(cartItems, product);

  if (existingCartItem) {
    return cartItems.map((cartItem) => cartItem.id === product.id ?
      { ...cartItem, quantity: cartItem.quantity + 1 }
      : cartItem
    )
  }

  return [...cartItems, { ...product, quantity: 1 }];

};

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => { },
  cartItems: [],
  addItemToCart: () => { },
  cartCount: 0
});

export const CartProvider = ({ children }) => {

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const newCartCount = cartItems.reduce((total, cartItem) => {
      return total + cartItem.quantity;
    }, 0)

    setCartCount(newCartCount)
  }, [cartItems])

  const addItemToCart = (product) => {
    setCartItems(addCartItem(cartItems, product))
  }

  const value = { isCartOpen, setIsCartOpen, cartItems, addItemToCart, cartCount };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>

};