
import { CartDropdownContainer, CartItems, EmptyMessage } from './CartDropdown.styles';
import Button from '../button/ButtonComponent';
import { useNavigate } from 'react-router-dom';

import CartItem from '../cart-item/CartItem';
import { useContext } from 'react';
import { CartContext } from '../../contexts/Cart';

const CartDropdown = () => {

  const { cartItems } = useContext(CartContext);
  const navigate = useNavigate();

  const goToCheckoutHandler = () => {
    navigate('/checkout')
  }

  return (
    <CartDropdownContainer>
      <CartItems>
        {cartItems.length ? cartItems.map((item) => (
          <CartItem key={item.id} cartItem={item} />
        )) : (
          <EmptyMessage>Your cart is empty</EmptyMessage>
        )
        }
      </CartItems>
      <Button onClick={goToCheckoutHandler}>
        CHECKOUT
      </Button>
    </CartDropdownContainer>
  )
}

export default CartDropdown;