import React from 'react'
import MonetizationOnRoundedIcon from '@mui/icons-material/MonetizationOnRounded';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import SupportAgentOutlinedIcon from '@mui/icons-material/SupportAgentOutlined';
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';
import '../../../Styles/Home/StaticSection/StaticSection.css';

const StaticSection = () => {
  return (
    <div className='staticData-container'>
     <div className='static-card'>
      <div className='static-icon'><MonetizationOnRoundedIcon/></div>
      <div className='static-heading'>MONEY BACK GURANTEE</div>
      <div className='static-about'>Your Satisfaction is Our Priority: Backed by Our Ironclad Money Back Guarantee!</div>
     </div>  
     <div className='static-card'>
      <div className='static-icon'><LocalShippingOutlinedIcon/></div>
      <div className='static-heading'>FREE DELIVERY</div>
      <div className='static-about'>Make your first order even sweeter with free delivery included!</div>
     </div>  
     <div className='static-card'>
      <div className='static-icon'><SupportAgentOutlinedIcon/></div>
      <div className='static-heading'>ALWAY SUPPORT</div>
      <div className='static-about'>Beyond transactions: Experience genuine care and support through our dedicated 'Always Support' channel</div>
     </div>  
     <div className='static-card'>
      <div className='static-icon'><PaidOutlinedIcon/></div>
      <div className='static-heading'>SECURE PAYMENT</div>
      <div className='static-about'>Lock in Trust: Our Secure Payment Gateway Ensures Your Peace of Mind</div>
     </div>  
    </div>
  )
}

export default StaticSection