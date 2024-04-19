import React from 'react';
import OrderItems from '../Order/OrderItems';

const BuyerProfilePage = (props) => {
    const user = props.user;

    return (
        <div className='buyer-profile'>
            <h1>Welcome {user.name ? user.name : user.email}!</h1>
            <h2>Your Profile as a Buyer</h2>
            <p>Thank you for being a valued member of our community. Here's a summary of your buyer profile:</p>
            <div className='order-history'>
                <h2>Your Order History:</h2>
                <OrderItems />
            </div>
        </div>
    );
};

export default BuyerProfilePage;
