import React, { useContext } from 'react'
import CategoryContext from '../../../Context/Category/CategoryContext'
import '../../../Styles/Authentication/LoginLayout.css';

const LoginLayout = ({children}) => {

  const {navigate} = useContext(CategoryContext);

  return (
    <div className='login-layout-container'>
        <div className='login-layout-header'>
            <div className='logo'>
              <img src={require('../../../Assests/Images/logo.png')} alt='logo' onClick={()=>navigate('/')}/>
            </div>
        </div>
        {children}
    </div>
  )
}

export default LoginLayout