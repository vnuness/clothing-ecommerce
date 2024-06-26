
import './CartDropdown.scss';
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
    <div className='cart-dropdown-container'>
      <div className='cart-items'>
        {cartItems.map((item) => (
          <CartItem key={item.id} cartItem={item} />))}
      </div>
      <Button onClick={goToCheckoutHandler}>
        CHECKOUT
      </Button>
    </div>
  )
}

export default CartDropdown;