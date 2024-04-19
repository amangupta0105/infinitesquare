import React, { useContext, useEffect } from 'react';
import Layout from '../../Componets/Layout/Layout';
import { Button } from '@mui/material';
import UserContext from '../../Context/User/UserContext';
import CategoryContext from '../../Context/Category/CategoryContext';
import '../../Styles/Profile/ProfilePage.css';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../Database/firebase';
import BuyerProfile from '../../Pages/UserProfile/Buyer/BuyerProfie';
import SellerProfile from '../../Pages/UserProfile/Seller/SellerProfie';

const ProfilePage = () => {
  const { currentUser, setCurrentUser ,userList,setUserList} = useContext(UserContext);
  const { navigate,setcountCart } = useContext(CategoryContext);
  const displayName = currentUser.displayName || '';
  

  useEffect(() => {
    if (currentUser && currentUser.email) {
      const fetchUserList = async () => {
        const userQuery = query(collection(db, 'user-list'), where('userEmail', '==', currentUser.email));
        const querySnapshot = await getDocs(userQuery);
        const userData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          name: doc.data().userName,
          email: doc.data().userEmail,
          type: doc.data().type,
          wishlist: doc.data().wishlist,
          cart: doc.data().cart
        }));
        setUserList(userData);
        if (userData.length > 0) {
            navigate('/profile');
        }
      };
      fetchUserList();
    }

  }, [currentUser,setUserList,navigate]);
  

  const logoutHandler = () => {
    setCurrentUser('');
    setcountCart(0);
    navigate('/login');
  };

  const createProfile = async (type) => {
    try {
      await addDoc(collection(db, 'user-list'), {
        userName: displayName,
        userEmail: currentUser.email,
        type: type,
        wishlist: [],
        cart: []
      }
    );
    navigate('/login');
    
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

  return (
    <div className='profile-page-contanier margin-top'>
      <Layout>
        <div className='profile-page'>
          <div className="logout-button">
            <Button variant='contained' onClick={logoutHandler}>LOGOUT</Button>
          </div>
          {userList.length === 0 && (
            <div className="user-type">
              <Button variant="outlined" onClick={() => createProfile('buyer')}>Buyer</Button>
              <Button variant="outlined" onClick={() => createProfile('seller')}>Seller</Button>
            </div>
          )}
          {userList && userList.length > 0 && (
            <React.Fragment>
              {userList[0].type === 'buyer' && <BuyerProfile user={userList[0]} />}
              {userList[0].type === 'seller' && <SellerProfile user={userList[0]} />}
            </React.Fragment>
          )}
        </div>
      </Layout>
    </div>
  );
};

export default ProfilePage;
