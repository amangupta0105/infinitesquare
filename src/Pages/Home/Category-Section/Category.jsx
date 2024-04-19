import React, { useContext, useEffect, useState } from 'react'
import { db } from '../../../Database/firebase'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import '../../../Styles/Home/Category/Category.css';
import CategoryContext from '../../../Context/Category/CategoryContext';

const Category = () => {

  const [categoryList,setCategoryList] = useState([]);
  const {setCategory,navigate} = useContext(CategoryContext);
  const categoryRef = query( collection(db,'category-list'),orderBy('number'));
  useEffect(() => {
    const unsub = onSnapshot(categoryRef,snapshot=>{
      const data = snapshot.docs.map(doc =>{
        return ({
          id:doc.id,
          name:doc.data().name,
          category:doc.data().category,
          discount:doc.data().discount,
          img:doc.data().img
        })
      })
      setCategoryList(data);
    })
  
    return () => {
      unsub();
    }
    // eslint-disable-next-line
  }, [])

  function categorySelectionHandler(category){
    setCategory(category);
    navigate('/shop');
  }
  

  return (
    <div className='category-container'>
      <h2 className='category-heading'>SHOP BY CATEGORY</h2>
      <div className="category-section">
        {categoryList.map((data)=>{
          return (
            <div className="category-card" key={data.id} onClick={()=>categorySelectionHandler(data.category)}> 
              <img className='category-image' src={require(`../../../Assests/Images/Categories/${data.img}`)} alt='category-images' />
              <div className="category-data">
                <div className='category-name'>{data.name}</div>
                <div className='category-discount'>{data.discount} OFF</div>
                <div className='shop-now'>SHOP NOW</div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Category