import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore'
import React, { useContext, useEffect, useState } from 'react'
import { db } from '../../../Database/firebase'
import '../../../Styles/Shop/ShopSideBar.css';
import CategoryContext from '../../../Context/Category/CategoryContext';
import { Button } from '@mui/material';

const ShopSideBar = () => {

  const [filterCategory, setFilterCategory] = useState([]);
  const { category, setCategory } = useContext(CategoryContext);

  useEffect(() => {
    const categoryRef = query(collection(db, 'category-list'), orderBy('number'));

    let filterQuery = category ? query(categoryRef, where('category', '==', category)) : categoryRef;

    const unsub = onSnapshot(filterQuery, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        name: doc.data().name,
        category: doc.data().category
      }));
      setFilterCategory(data);
    });

    return () => {
      unsub();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  return (
    <div className='shop-sidebar'>
      <div className='shop-sidebar-allproducts'>
        <Button variant="contained" onClick={() => setCategory('')}>All Products</Button>
      </div>
      <div className='filter-category-container'>
        <div className='filter-heading'>Category</div>
        <div className='filter-category'>
          {filterCategory.map((data) => (
            <div className='category-list' key={data.id}>
              <label htmlFor={data.id}>
                <div className="category-item">
                  <input type='radio' id={data.id} name='category' value={data.name} onClick={() => setCategory(data.category)} />
                  {data.name}
                </div>
              </label>
            </div>
          ))}
        </div>
      </div>
      <div className='filter-subCategory-container'>
        <div className='filter-heading'>subCategory</div>
      </div>
      <div className='filter-brands-container'>
        <div className='filter-heading'>brands</div>
      </div>
      <div className='filter-price-container'>
        <div className='filter-heading'>price</div>
      </div>
    </div>
  )
}

export default ShopSideBar;
