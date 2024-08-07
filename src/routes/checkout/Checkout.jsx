
import './Checkout.scss';
import CheckoutItem from '../../components/checkout-item/CheckoutItem';
import { useSelector } from 'react-redux';
import { selectCartItems, selectCartTotalAmount } from '../../store/cart/cart.selector';
import PaymentForm from '../../components/payment-form/payment-form.component';

const Checkout = () => {

  const cartItems = useSelector(selectCartItems);
  const cartTotalAmount = useSelector(selectCartTotalAmount);


  return (
    <div className='checkout-container'>
      <div className='checkout-header'>
        <div className='header-block'>
          <span>Product</span>
        </div>
        <div className='header-block'>
          <span>Description</span>
        </div>
        <div className='header-block'>
          <span>Quantity</span>
        </div>
        <div className='header-block'>
          <span>Price</span>
        </div>
        <div className='header-block'>
          <span>Remove</span>
        </div>
      </div>

      {cartItems.map(cartItem => {
        return (
          <CheckoutItem key={cartItem.id} cartItem={cartItem} />
        )
      })}
      <span className='total'>Total: ${cartTotalAmount}</span>
      <PaymentForm />

    </div>
  );

}

export default Checkout;