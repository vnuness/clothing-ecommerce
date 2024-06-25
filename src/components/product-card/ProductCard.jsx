import { useContext } from 'react';

import './ProductCard.scss'
import Button from '../button/ButtonComponent';
import { CartContext } from '../../contexts/Cart';


const ProductCard = ({ product }) => {

  const { addItemToCart } = useContext(CartContext);

  const addProductToCart = () => addItemToCart(product);

  const { name, price, imageUrl } = product;

  return (
    <div className='product-card-container'>
      <img src={imageUrl} alt={name} />
      <div className='footer'>
        <span className='name'>{name}</span>
        <span className='price'>{price}</span>
      </div>
      <Button buttonType='inverted' type="button" onClick={addProductToCart}>Add to cart</Button>
    </div>
  )

}

export default ProductCard;