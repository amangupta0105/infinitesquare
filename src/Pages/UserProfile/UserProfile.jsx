import React, { useContext } from 'react'
import UserContext from '../../Context/User/UserContext';
import BuyerProfile from '../../Pages/UserProfile/Buyer/BuyerProfie';
import SellerProfile from '../../Pages/UserProfile/Seller/SellerProfie';
import Layout from '../../Componets/Layout/Layout';

const UserProfile = () => {
    const { userList} = useContext(UserContext);
    console.log(userList);
  return (
    <div>
        <Layout>
        {userList && userList.length > 0 && (
            <React.Fragment>
              {userList[0].type === 'buyer' && <BuyerProfile user={userList[0]} />}
              {userList[0].type === 'seller' && <SellerProfile user={userList[0]} />}
            </React.Fragment>
          )}
          {!(userList && userList.length > 0) || alert('Select Type') }
        </Layout>
    </div>
  )
}

export default UserProfile