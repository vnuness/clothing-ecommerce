
import './CartDropdown.scss'
import Button from '../button/ButtonComponent'

const CartDropdown = () => {

  return (
    <div className='cart-dropdown-container'>
      <div className='cart-items'>
        <Button>CHECKOUT</Button>
      </div>
    </div>
  )
}

export default CartDropdown;