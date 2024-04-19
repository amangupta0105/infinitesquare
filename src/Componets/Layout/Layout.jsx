import React from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import '../../Styles/Layout/Layout.css'

const Layout = ({children}) => {
  return (
    <div className='layout-container'>
      <Header />
      {children}
      <Footer/>
    </div>
  )
}

export default Layout