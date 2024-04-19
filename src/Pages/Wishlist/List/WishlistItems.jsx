import React, { useContext } from 'react';
import UserContext from '../../../Context/User/UserContext';
import WishListProductTemplate from './WishListProductTemplate';

const WishlistItems = () => {
  const { userList } = useContext(UserContext);
  if (!userList || userList.length === 0 || !userList[0].wishlist || userList[0].wishlist.length === 0) {
    return (
      <div className='wishlist-items'>
        <div className='no-tem'>
          Transform Your Wishlist with Amazing Finds
          <br/>Add some irresistible products to your wishlist and elevate your shopping experience!
        </div>
      </div>
    );
  }

  return (
    <div className='wishlist-items'>
      <WishListProductTemplate/>
    </div>
  );
};

export default WishlistItems;
