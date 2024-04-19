import React, { useContext } from 'react'
import { collection, query, where } from 'firebase/firestore';
import { db } from '../../../Database/firebase'
import CategoryContext from '../../../Context/Category/CategoryContext';
import ProductTemplate from '../../../Componets/Product/ProductTemplate';
import '../../../Styles/Shop/Products.css'

const Products = () => {
  const { category} = useContext(CategoryContext);

  let productRef;
  if (category) {
      productRef = query(collection(db, 'product-list'), where('category', '==', category));
  } else {
      productRef = collection(db, 'product-list');
  }

  return (
      <div className="product-container">
        <ProductTemplate query={productRef}/>
      </div>
  );
}


export default Products