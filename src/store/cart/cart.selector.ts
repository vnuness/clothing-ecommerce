
import { createSelector } from "reselect";
import { CartItem } from "./cart.types";
import { CartState } from "./cart.reducer";

import { RootState } from "../store";

const selectCartReducer = (state: RootState): CartState => state.cart;

export const selectCartItems = createSelector(
  [selectCartReducer],
  (cart: CartState): CartItem[] => cart.cartItems
)

export const selectIsCartOpen = createSelector(
  [selectCartReducer],
  (cart: CartState): boolean => cart.isCartOpen
);

export const selectCartTotalAmount = createSelector(
  [selectCartItems],
  (cartItems: CartItem[]): number => cartItems.reduce((total, cartItem) => total + cartItem.price * cartItem.quantity, 0)
);

export const selectCartCount = createSelector(
  [selectCartItems],
  (cartItems: CartItem[]): number => cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
);