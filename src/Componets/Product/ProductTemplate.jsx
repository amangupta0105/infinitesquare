import { doc, onSnapshot, updateDoc} from 'firebase/firestore'
import React, { useContext, useEffect, useState } from 'react'
import { Button } from '@mui/material';
import '../../Styles/Product/ProductTemplate.css'
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import ShoppingCartCheckoutTwoToneIcon from '@mui/icons-material/ShoppingCartCheckoutTwoTone';
import FavoriteIcon from '@mui/icons-material/Favorite';
import UserContext from '../../Context/User/UserContext'
import CategoryContext from '../../Context/Category/CategoryContext'
import {db} from '../../Database/firebase'

const ProductTemplate = (props) => {

  const [productList,setproductList] = useState([]);
  const productRef = props.query;
  const {userList,currentUser} = useContext(UserContext);
  const {navigate,setcountCart} = useContext(CategoryContext);
  const [wishlist, setWishlist] = useState({}); 


  useEffect(() => {
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
  }, [productRef])


  //wishlist code
  function wishListHandler(productName){
    if(currentUser && userList && userList[0].wishlist.length >= 0 ){
      !(userList[0].wishlist.includes(productName)) && (userList[0].wishlist.push(productName))
      const ref = doc(db,'user-list',userList[0].id);
      updateDoc(ref,{
        wishlist:userList[0].wishlist
      })
      setWishlist(prevState => ({
        ...prevState,
        [productName]: !prevState[productName] 
      }));
    }
    else{
      navigate('/wishlist');
    }
  }

// Add to Cart handler
  function addToCartHandler(productName) {
    if(currentUser && userList && userList[0].cart.length >= 0 ){
      !(userList[0].cart.includes(productName)) && (userList[0].cart.push(productName))
      const ref = doc(db,'user-list',userList[0].id);
      updateDoc(ref,{
        cart:userList[0].cart
      })
      setcountCart(userList[0].cart.length)
    }
    else{
      navigate('/cart');
    }
  }

  return (
    <div className='product-template'>
      <div className="product-container">
        {productList.map((data)=>{
          return(
            <div className='product-card'>
              <div className='product-img '><img src={data.img} alt='product' /></div>
              <div className='product-brand'>{data.brand}</div>
              <div className='product-name'>{data.name}</div>
              <div className="product-size">
                {data.size && (data.size).map((size)=>{
                  return(<div className='size'>
                    {size}
                    </div>)
                })}
              </div>
              
                <div className='product-price'>Price:- 
                {/* eslint-disable-next-line */}
                {data.discount == 0 ? <span className='updated-price'><CurrencyRupeeIcon/>{data.finalPrice}/-</span> 
                  :<div className='discounted-price'>
                    <span className='updated-price'><CurrencyRupeeIcon/>{data.finalPrice}</span>
                    <span className='price'><CurrencyRupeeIcon/>{data.price}</span>/- 
                  </div>}
                </div>
                <div className="product-buttons">
                  <div className='product-wishlisht'>
                    <Button onClick={()=>wishListHandler(data.name)}>
                      <FavoriteIcon style={{ color: wishlist[data.name] ? 'red' : '#4287f5' }} />
                    </Button>
                  </div>
                  <div className="product-add-to-cart">
                    <Button onClick={()=>addToCartHandler(data.name)}><ShoppingCartCheckoutTwoToneIcon/>Add to CART</Button>
                  </div>
                </div>
           
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ProductTemplate