import { CategoryItem } from '../categories/category.types';
import { createAction, Action, ActionWithPayload, withMatcher } from '../../utils/reducer/reducer.utils';
import { CART_ACTION_TYPES, CartItem } from './cart.types';

const addCartItem = (cartItems: CartItem[], product: CategoryItem): CartItem[] => {

  const existingCartItem = cartItems.find(cartProduct => product.id === cartProduct.id);

  if (existingCartItem) {
    return cartItems.map((cartItem) => cartItem.id === product.id ?
      { ...cartItem, quantity: cartItem.quantity + 1 }
      : cartItem
    )
  }

  return [...cartItems, { ...product, quantity: 1 }];

};

const removeCartItem = (cartItems: CartItem[], cartItemToRemove: CartItem): CartItem[] => {
  const existingCartItem = cartItems.find(cartItem => cartItem.id === cartItemToRemove.id);

  if (existingCartItem && existingCartItem.quantity === 1) {
    return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id)
  } else {
    return cartItems.map(cartItem => cartItem.id === cartItemToRemove.id ?
      { ...cartItem, quantity: cartItemToRemove.quantity - 1 }
      : cartItem
    )
  }
};

const clearCartItem = (cartItems: CartItem[], cartItemToRemove: CartItem): CartItem[] => cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id)

export type SetCartItems = ActionWithPayload<CART_ACTION_TYPES.SET_CART_ITEMS, CartItem[]>;
export type SetIsCartOpen = ActionWithPayload<CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean>;

export const setCartItems = withMatcher((cartItems: CartItem[]): SetCartItems => createAction(CART_ACTION_TYPES.SET_CART_ITEMS, cartItems))

export const addItemToCart = withMatcher((cartItems: CartItem[], product: CategoryItem): SetCartItems => {
  const newCartItems = addCartItem(cartItems, product);
  // return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
  return setCartItems(newCartItems)
});

export const removeItemFromCart = withMatcher((cartItems: CartItem[], cartItemToRemove: CartItem): SetCartItems => {
  const newCartItems = removeCartItem(cartItems, cartItemToRemove);
  // return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
  return setCartItems(newCartItems)
});

export const clearItemFromCart = withMatcher((cartItems: CartItem[], cartItemToClear: CartItem): SetCartItems => {
  const newCartItems = clearCartItem(cartItems, cartItemToClear);
  // return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
  return setCartItems(newCartItems)
});

export const setIsCartOpen = withMatcher((bool: boolean): SetIsCartOpen => createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool));