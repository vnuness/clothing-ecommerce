
import './CartDropdown.scss'
import Button from '../button/ButtonComponent'

import CartItem from '../cart-item/CartItem'
import { useContext } from 'react'
import { CartContext } from '../../contexts/Cart'

const CartDropdown = () => {

  const { cartItems } = useContext(CartContext);

  return (
    <div className='cart-dropdown-container'>
      <div className='cart-items'>
        {cartItems.map((item) => (
          <CartItem key={item.id} cartItem={item} />))}
      </div>
      <Button>CHECKOUT</Button>
    </div>
  )
}

export default CartDropdown;