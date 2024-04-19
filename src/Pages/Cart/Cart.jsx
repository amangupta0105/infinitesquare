import React, { useContext } from 'react'
import Layout from '../../Componets/Layout/Layout'
import UserContext from '../../Context/User/UserContext'
import { Button } from '@mui/material';
import CartItems from './List/CartItems'
import CategoryContext from '../../Context/Category/CategoryContext';

const Cart = () => {
  const  {currentUser} = useContext(UserContext);
  const {navigate} = useContext(CategoryContext);

  return (
    <div className='margin-top'>
      <Layout>
      {!currentUser ? <div className='login-button'>
          <Button variant='outlined'  onClick={()=>navigate('/login')}>Login / SignUp </Button>
        </div> : <div><CartItems/></div>} 
      </Layout>
    </div>
  )
}

export default Cart