import React, { useContext } from 'react';
import UserContext from '../../../Context/User/UserContext';
import CartProductTemplate from './CartProductTemplate';

const CartItems = () => {
  const { userList } = useContext(UserContext);

  // Check if userList is empty or cart is empty
  if (!userList || userList.length === 0 || !userList[0].cart || userList[0].cart.length === 0) {
    return (
      <div className='cart-items'>
        <div className='no-tem'>
          Your Cart is Lonely! Fill it with Awesome Products Now!
          <br/>Don't let your cart stay empty, explore our amazing products and fill it up with joy!
        </div>
      </div>
    );
  }

  // Render the cart items
  return (
    <div className='cart-items'>
      <CartProductTemplate/>
    </div>
  );
}

export default CartItems;
