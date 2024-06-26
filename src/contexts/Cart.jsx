
import { createContext, useState, useEffect } from 'react';

const addCartItem = (cartItems, product) => {

  const existingCartItem = cartItems.find(cartProduct => product.id === cartProduct.id);

  if (existingCartItem) {
    return cartItems.map((cartItem) => cartItem.id === product.id ?
      { ...cartItem, quantity: cartItem.quantity + 1 }
      : cartItem
    )
  }

  return [...cartItems, { ...product, quantity: 1 }];

};

const removeCartItem = (cartItems, cartItemToRemove) => {
  const existingCartItem = cartItems.find(cartItem => cartItem.id === cartItemToRemove.id);

  if (existingCartItem.quantity === 1) {
    return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id)
  } else {
    return cartItems.map(cartItem => cartItem.id === cartItemToRemove.id ?
      { ...cartItem, quantity: cartItemToRemove.quantity - 1 }
      : cartItem
    )
  }
};


const clearCartItem = (cartItems, cartItemToRemove) => cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id)

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => { },
  cartItems: [],
  addItemToCart: () => { },
  removeItemFromCart: () => { },
  clearItemFromCart: () => { },
  cartCount: 0
});

export const CartProvider = ({ children }) => {

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotalAmount, setCartTotalAmount] = useState(0);

  useEffect(() => {
    const newCartCount = cartItems.reduce((total, cartItem) => {
      return total + cartItem.quantity;
    }, 0)

    setCartCount(newCartCount);
  }, [cartItems])

  useEffect(() => {
    const newCartTotalAmount = cartItems.reduce((total, cartItem) => {
      return total + cartItem.price * cartItem.quantity;
    }, 0)

    setCartTotalAmount(newCartTotalAmount);
  }, [cartItems])

  const addItemToCart = (product) => {
    setCartItems(addCartItem(cartItems, product))
  };

  const removeItemFromCart = (cartItemToRemove) => {
    setCartItems(removeCartItem(cartItems, cartItemToRemove))
  };

  const clearItemFromCart = (cartItemToClear) => {
    setCartItems(clearCartItem(cartItems, cartItemToClear))
  };

  const value = { isCartOpen, setIsCartOpen, cartItems, addItemToCart, cartCount, removeItemFromCart, cartTotalAmount, clearItemFromCart };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>

};