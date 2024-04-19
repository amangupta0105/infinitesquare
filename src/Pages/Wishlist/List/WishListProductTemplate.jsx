import { collection, doc, onSnapshot, query, updateDoc, where} from 'firebase/firestore'
import React, { useContext, useEffect, useState } from 'react'
import { Button } from '@mui/material';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import UserContext from '../../../Context/User/UserContext';
import CloseIcon from '@mui/icons-material/Close';
import { db } from '../../../Database/firebase';
import CategoryContext from '../../../Context/Category/CategoryContext'
import '../../../Styles/Cart/CartProductTemplate.css'
import ShoppingCartCheckoutTwoToneIcon from '@mui/icons-material/ShoppingCartCheckoutTwoTone';

const WishListProductTemplate = () => {
  const [productList,setproductList] = useState([]);
  const {userList,setUserList,currentUser} = useContext(UserContext);
  const {navigate,setcountCart} = useContext(CategoryContext);
  const ref = doc(db,'user-list',userList[0].id);

  useEffect(() => {
    const productRef = query(collection(db, 'product-list'), where('name', 'in', userList[0].wishlist));
    const unsub = onSnapshot(productRef,(snapshot)=>{
      const data= snapshot.docs.map((doc)=>{
        const price = doc.data().price;
        const discount = doc.data().discount;
        const updatedPrice = Math.floor( price * (1 - discount / 100));
        return ({
          id:doc.id,
          name:doc.data().name,
          img:doc.data().img,
          price:doc.data().price,
          finalPrice:updatedPrice,
          brand:doc.data().brand,
          size:doc.data().size,
          discount:doc.data().discount,
          quantity:doc.data().quantity
        })
        
      })
      setproductList(data);
    })
    return () => {
      unsub();
    }
  }, [userList])

  //wishlist code
  function addToCartHandler(productName){
    
    if(currentUser && userList){
      // eslint-disable-next-line
      {!(userList[0].cart.includes(productName)) && (userList[0].cart.push(productName))}
      updateDoc(ref,{
        cart:userList[0].cart
      })
      setcountCart(userList[0].cart.length)
    }
    navigate('/cart');
  }

//remove code
  function removeProductHandler(productName) {

    for (let index = 0; index < userList[0].wishlist.length; index++) {
     if(userList[0].wishlist[index] === productName){
      const data = userList[0].wishlist.splice(index,1);
      setUserList(prevState => ({ ...prevState, wishlist: data }));
     } 
    }
    updateDoc(ref,{wishlist:userList[0].wishlist})
  }

  return (
    <div className='cart-product-template'>
        <div className='cart-heading'>
        Treasured Items
        </div>
        <div className='cart-page'>
          <div className="cart-product-container">
            {productList.map((data)=>{
              return(
                <div className='cart-product-card'>
                  <div className='card-flex'>
                    <div className='cart-left'>
                        <div className='cart-product-img '><img src={data.img} alt='product' /></div>
                    </div>
                    <div className='cart-right'>
                        <div className='cart-product-brand'>{data.brand}</div>
                        <div className='cart-product-name'>{data.name}</div>                
                        <div className='cart-product-price'>Price:- 
                        {/* eslint-disable-next-line */}
                        {data.discount == 0 ? <span className='cart-updated-price'><CurrencyRupeeIcon/>{data.finalPrice}/-</span> 
                        :<div className='cart-discounted-price'>
                            <span className='cart-updated-price'><CurrencyRupeeIcon/>{data.finalPrice}</span>
                            <span className='cart-price'><CurrencyRupeeIcon/>{data.price}</span>/-  
                        </div>}
                        </div>
                        <div className="cart-product-size">
                            {data.size && (data.size).map((size)=>{
                            return(<div className='size'>
                                {size}
                                </div>)
                            })}
                        </div>
                    </div>
                  </div>
                    <div className='cart-buttom'>
                        <div className="cart-product-buttons">
                          <div className='cart-remove'>
                            <Button onClick={()=>removeProductHandler(data.name)}> <CloseIcon/>Remove from Wishlist</Button>
                            </div>
                        <div className='cart-product-wishlisht'>
                            <Button onClick={()=>addToCartHandler(data.name)}><ShoppingCartCheckoutTwoToneIcon/>Add to CART</Button>
           
                        </div>
                      </div>
                    </div>
                </div>
              )
            })}
          </div>
        </div>
    </div>
  )
}

export default WishListProductTemplate
