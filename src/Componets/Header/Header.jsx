import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleSharpIcon from '@mui/icons-material/AccountCircleSharp';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import '../../Styles/Layout/Header.css'
import CategoryContext from '../../Context/Category/CategoryContext';

const Header = () => {
  const {countCart,searchQuery,setsearchQuery} = useContext(CategoryContext);
  return (
    <div className='header-section'>
      <div className="logo">
        <NavLink to ='/'><img src={require('../../Assests/Images/logo.png')} alt='logo' /></NavLink>
      </div>
      <div className="navbar-section">
        <ul className='navbar-list'>
          <li className='navbar-item'><NavLink to= '/' >HOME</NavLink></li>
          <li className='navbar-item'><NavLink to= '/about'>ABOUT</NavLink></li>
          <li className='navbar-item'><NavLink to= '/shop'>SHOP</NavLink></li>
          <li className='navbar-item'><NavLink to= '/contact'>CONTACT</NavLink></li>
        </ul>
      </div>
      <div className="search">
        <SearchIcon/>
        <input type='text' value={searchQuery} placeholder='Search your Item here ...' onChange={e=>setsearchQuery(e.target.value)}/>
      </div>
      <div className="user-navbar">
      <ul className='navbar-user-list'>
          <li className='navbar-user-item'><NavLink to= '/login' ><AccountCircleSharpIcon/></NavLink></li>
          <li className='navbar-user-item'><NavLink to= '/wishlist'><FavoriteBorderRoundedIcon/></NavLink></li>
          <li className='navbar-user-item'><NavLink to= '/cart'><ShoppingCartRoundedIcon/>
          {countCart > 0 && <div className='cartItems'>{countCart}</div>}
          </NavLink></li>
        </ul>
      </div>
    </div>
  )
}

export default Header