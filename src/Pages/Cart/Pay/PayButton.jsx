import { Button } from '@mui/material';
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import React, { useContext } from 'react';
import { db } from '../../../Database/firebase';
import UserContext from '../../../Context/User/UserContext';
import CategoryContext from '../../../Context/Category/CategoryContext';

const PayButton = (props) => {
    const cartList = props.products;
    const amount = props.totalAmount;

    const orderRef = collection(db, 'order-list');
    const { userList } = useContext(UserContext);
    const {navigate,setcountCart} = useContext(CategoryContext);
    const userRef = doc(db,'user-list',userList[0].id);
    async function payHandler() {
        try {
            if (!cartList || cartList.length === 0) {
                alert('Cart is empty');
                return;
            }
            
            if (userList && userList[0].cart.length > 0 && userList[0].email) {
                alert(`AMOUNT TO PAID on delivery:- ${amount}`);
                const sanitizedCartList = cartList.map(product => ({
                    ...product,
                    size: product.size || [] // Set size to an empty array if it's undefined
                }));

                const currentDate = new Date(); 
                await addDoc(orderRef, {
                    userEmail: userList[0].email,
                    userId: userList[0].id,
                    products: sanitizedCartList,
                    amount:amount,
                    orderDate:currentDate
                });
                updateDoc(userRef,{
                    cart:[]
                })
                setcountCart(0)
                
                navigate('/profile')
            }
        } catch (error) {
            console.error('Error placing order:', error);
    
        }
    }
    

    return (
        <div className='pay-button'>
            <Button variant="contained" onClick={payHandler}>PLACE ORDER</Button>
        </div>
    );
}

export default PayButton;
