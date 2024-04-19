import React, { useState } from 'react'
import SellerListing from './SellerListing/SellerListing';
import '../../../Styles/Profile/Seller/SellerProfile.css'
import OrderItems from '../Order/OrderItems';

const SellerProfie = (props) => {
  const [listVisible,setlistVisible] = useState(false);
  const user = props.user;

  return (
    <div className='seller-profile-layout'>
            <h2>Welcome {user.name ? user.name : user.email}!</h2>
            <h3>Your Profile as a Seller</h3>
            <p>Thank you for being a valued member of our community. Here's a summary of your seller profile:</p>
            <div className='order-history'>
                <h2>Your Order History:</h2>
                <OrderItems />
            </div>
      <button onClick={()=>setlistVisible(!listVisible)} className='listing-button'>
        Click here to list your Product
      </button>
      {listVisible && <SellerListing/>}
    </div>
  )
}

export default SellerProfie


