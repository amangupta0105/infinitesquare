import { collection, onSnapshot, query, where } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react';
import { db } from '../../../Database/firebase';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import '../../../Styles/Profile/OrderItem/OrderItems.css';
import UserContext from '../../../Context/User/UserContext';

const OrderItems = () => {
  const [orders, setOrders] = useState([]);
  const {userList} = useContext(UserContext);

  useEffect(() => {
    const q = query(collection(db, 'order-list'), where('userEmail', '==', userList[0].email));
    const unsubscribe = onSnapshot(q, snapshot => {
      const ordersData = snapshot.docs.map(doc => ({
        id: doc.id,
        userEmail: doc.data().userEmail,
        amount: doc.data().amount,
        orderDate: doc.data().orderDate,
        products: doc.data().products.map(product => ({
          id: product.id,
          img: product.img,
          name: product.name,
          price: product.price,
          finalPrice: Math.floor(product.price * (1 - product.discount / 100)),
          brand: product.brand,
          size: product.size,
          discount: product.discount
        }))
      }));
      // console.log(ordersData); 
      setOrders(ordersData);
    });
    return () => {
      unsubscribe();
    };
  }, [userList]);
  

  return (
    <div className='item-list-page'>
      {orders.map((order) => (
        <div key={order.id} className='order-container'>
          <div className='order-user-date'>Order Date: {new Date(order.orderDate.seconds * 1000).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</div>
         <div className='order-amount'>Amount: <CurrencyRupeeIcon/>{order.amount}</div>
          {order.products.map(product => (
            <div key={product.id} className='order-card-flex'>
              <div className='order-cart-left'>
                <div className='order-cart-product-img '><img src={product.img} alt='product'/></div>
              </div>
              <div className='order-cart-right'>
                <div className='order-cart-product-brand'>{product.brand}</div>
                <div className='order-cart-product-name'>{product.name}</div>
                <div className='order-cart-product-price'>Price:- 
                  {product.discount === 0 ? (
                    <span className='order-cart-updated-price'><CurrencyRupeeIcon/>{product.finalPrice}/-</span>
                  ) : (
                    <div className='order-cart-discounted-price'>
                      <span className='order-cart-updated-price'><CurrencyRupeeIcon/>{product.finalPrice}</span>
                      <span className='order-cart-price'><CurrencyRupeeIcon/>{product.price}</span>/-
                    </div>
                  )}
                </div>
                <div className="order-cart-product-size">
                  {product.size && product.size.map(size => (
                    <div className='size' key={size}>{size}</div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default OrderItems;
