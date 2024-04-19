import React, { useContext } from 'react'
import Layout from '../../Componets/Layout/Layout'
import UserContext from '../../Context/User/UserContext'
import { Button } from '@mui/material';
import WishlistItems from './List/WishlistItems';
import CategoryContext from '../../Context/Category/CategoryContext'
import '../../Styles/Wishlist/Wishlist.css'

const Wishlist = () => {
  const  {currentUser} = useContext(UserContext);
  const {navigate} = useContext(CategoryContext);

  return (
    <div className='wishlist-page margin-top'>
      <Layout>
        {!currentUser ? <div className='login-button'>
          <Button variant='outlined' onClick={()=>navigate('/login')}>Login / SignUp </Button>
        </div> : <div ><WishlistItems/></div>} 
      </Layout>
    </div>
  )
}

export default Wishlist