import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../../Pages/Home/Home'
import About from '../../Pages/About/About'
import Contact from '../../Pages/Contact/Contact'
import Login from '../../Pages/Authentication/Login'
import Wishlist from '../../Pages/Wishlist/Wishlist'
import Cart from '../../Pages/Cart/Cart'
import Shop from '../../Pages/Shop/Shop'
import RegisterUser from '../../Pages/Authentication/LoginUser/RegisterUser'
import ProfilePage from '../../Pages/UserProfile/ProfilePage' 

const Routing = () => {
  return (
    <div className='routing-container'>
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path ='/about' element ={<About/>} />
            <Route path='/shop' element ={<Shop/>}/>
            <Route path='/contact' element ={<Contact />} /> 
            <Route path='/login' element ={<Login/>} />
            <Route path='/register' element ={<RegisterUser/>} />
            <Route path ='/wishlist' element ={<Wishlist />} />
            <Route path='/cart' element ={<Cart/>} />
            <Route path='/profile' element ={<ProfilePage/>} />
        </Routes>
    </div>
  )
}

export default Routing;