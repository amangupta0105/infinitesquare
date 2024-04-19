import React from 'react'
import ProductTemplate from '../../../Componets/Product/ProductTemplate'
import { collection, query, where } from 'firebase/firestore';
import { db } from '../../../Database/firebase';
import '../../../Styles/Home/Featured/FeaturedProduct.css';

const FeaturedProducts = () => {

  const productRef = query(collection(db,'product-list'),where('featured','==',true));
  return (
    <div className='feature-container'>
      <h2 className='product-heading'>MEDAL WORTHY PRODUCTS TO BAG</h2>
      <ProductTemplate query={productRef}/>
    </div>
  )
}

export default FeaturedProducts