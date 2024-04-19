import React, { useContext } from 'react'
import UserContext from '../../Context/User/UserContext'
import LoginUser from './LoginUser/LoginUser'
import ProfilePage from '../UserProfile/ProfilePage';

const Login = () => {
  const  {currentUser} =useContext(UserContext);
  return (
    <div className='login-page'>
      {currentUser ? <ProfilePage /> : <LoginUser/>}
    </div>
  )
}

export default Login