import { collection, doc, onSnapshot, query, updateDoc, where} from 'firebase/firestore'
import React, { useContext, useEffect, useState } from 'react'
import { Button } from '@mui/material';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import FavoriteIcon from '@mui/icons-material/Favorite';
import UserContext from '../../../Context/User/UserContext';
import CloseIcon from '@mui/icons-material/Close';
import { db } from '../../../Database/firebase';
import CategoryContext from '../../../Context/Category/CategoryContext'
import '../../../Styles/Cart/CartProductTemplate.css'
import PayButton from '../Pay/PayButton';

const CartProductTemplate = () => {
  const [productList,setproductList] = useState([]);
  const {userList,setUserList,currentUser} = useContext(UserContext);
  const {navigate,setcountCart} = useContext(CategoryContext);
  const ref = doc(db,'user-list',userList[0].id);
  const [totalMRP,settotalMRP] = useState(0);
  const [finalPrice,setfinalPrice] = useState(0);
  const platformFee =20;
  const [shippingCharge,setshippingCharge] = useState(99);

  useEffect(() => {
    const productRef = query(collection(db, 'product-list'), where('name', 'in', userList[0].cart));
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
  function wishListHandler(productName){
    
    if(currentUser && userList){
      // eslint-disable-next-line
      {!(userList[0].wishlist.includes(productName)) && (userList[0].wishlist.push(productName))}
      updateDoc(ref,{
        wishlist:userList[0].wishlist
      })
    }
    navigate('/wishlist');
  }

//remove code
  function removeProductHandler(productName) {

    for (let index = 0; index < userList[0].cart.length; index++) {
     if(userList[0].cart[index] === productName){
      const data = userList[0].cart.splice(index,1);
      setUserList(prevState => ({ ...prevState, cart: data }));
     } 
    }
    updateDoc(ref,{cart:userList[0].cart})
    setcountCart(userList[0].cart.length)
  }

// Inside the component function
  useEffect(() => {
    let totalMRPValue = 0; 
    let finalPrice =0;
    for (const product of productList) {
      totalMRPValue +=  parseInt(product.price);
      finalPrice += parseInt(product.finalPrice)
    }
    settotalMRP(totalMRPValue);
    setfinalPrice(finalPrice)
    if (finalPrice > 999) {
      setshippingCharge(0);
    } else {
      setshippingCharge(99);
    }

  }, [productList,userList]); 

  function reduceQuantityHandler(quantity,id){
    console.log(productList,quantity,id);
  }

  return (
    <div className='cart-product-template'>
        <div className='cart-heading'>
        Lets Shop!! Order Now
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
                        <div class="cart-product-quantity">
                            <button class="quantity-button decrement" onClick={()=>reduceQuantityHandler(data.quantity,data.id)}>-</button>
                            <div class="quantity">Quantity</div>
                            <button class="quantity-button increment">+</button>
                        </div>
                    </div>
                  </div>
                    <div className='cart-buttom'>
                        <div className="cart-product-buttons">
                          <div className='cart-remove'>
                            <Button onClick={()=>removeProductHandler(data.name)}> <CloseIcon/>Remove from CART</Button>
                            </div>
                          <div className='cart-product-wishlisht'>
                              <Button onClick={()=>wishListHandler(data.name)}><FavoriteIcon/>Add to WishList</Button>
                          </div>
                      </div>
                    </div>
                </div>
              )
            })}
          </div>

          <div className='cart-details'>
            <div className='cart-details-heading'>PRICE DETAILS({userList[0].cart.length} item)</div>
            <div className='cart-details-total'>
              <div>Total MRP</div>
              <div>&#8377; {totalMRP}</div>
              </div>
            <div className='cart-details-discount'>
              <div>Discount on MRP</div>
              <div>&#8377;  {totalMRP-finalPrice}</div>
            </div>
            <div className='cart-details-pfee'>
              <div>Platform Fee</div>
              <div>&#8377; {platformFee}</div>
            </div>
            <div className='cart-details-sfee'>
              <div>Shipping Fee :-
                {shippingCharge === 0 && <div className='free-shipping'>We will pay...U just order</div>}
              </div>
              <div>&#8377; {shippingCharge}</div>
            </div>
            <div className='cart-details-total'>
              <div>TOTAL AMOUNT</div>
              <div className='total'>&#8377; {finalPrice+platformFee+shippingCharge}</div>
            </div>
            <div className="pay-button">
              <PayButton products={productList} totalAmount={finalPrice+platformFee+shippingCharge}/>
            </div>
          </div>
        </div>
    </div>
  )
}

export default CartProductTemplate
