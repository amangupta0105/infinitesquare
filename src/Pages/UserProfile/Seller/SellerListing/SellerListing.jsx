import React from 'react';
import { useForm } from 'react-hook-form';
import '../../../../Styles/Profile/Seller/SellerListing.css';
import {addDoc, collection} from 'firebase/firestore'
import {db} from '../../../../Database/firebase'

const SellerListing = () => {
  const { handleSubmit, register, formState: { errors }, getValues, reset } = useForm();
  const productref = collection(db,'product-list');

  function formSubmit(data) {
    const { 'no-sizes': sizesCount } = data;
    const sizes = [];
    for (let i = 0; i < sizesCount; i++) {
      sizes.push(getValues(`size-${i}`));
    }
    console.log(data,sizes);
    addDoc(productref,{
      brand:data.brand,
      category:data.category,
      discount:data.discount,
      img:data.image,
      name:data.name,
      price:data.price,
      quantity:data.quantity,
      size:sizes,
    })
    reset();
  }
  

  return (
    <div className='seller-listing-container'>
      <h2 className='form-title'>List a New Product</h2>
      <form className='product-form' onSubmit={handleSubmit(formSubmit)}>
        <div className='form-group'>
          <label htmlFor='name'>Product Name*</label>
          <input type='text' id='name' {...register("name", {
            required: 'Product Name is required'
          })} />
          {errors.name && <span className='error-message'>{errors.name.message}</span>}
        </div>
        <div className='form-group'>
          <label htmlFor='brand'>Brand*</label>
          <input type='text' id='brand' {...register("brand", {
            required: 'Brand is required'
          })} />
          {errors.brand && <span className='error-message'>{errors.brand.message}</span>}
        </div>
        <div className='form-group'>
          <label htmlFor='category'>Category*</label>
          <select {...register("category", {
            required: 'Select Category'
          })}>
            <option value="mens">MENS</option>
            <option value="women">WOMEN</option>
            <option value="home">HOME & LIVING</option>
            <option value="beauty">BEAUTY</option>
            <option value="electronics">ELECTRONICS</option>
            <option value="others">OTHERS</option>
          </select>
          {errors.category && <span className='error-message'>{errors.category.message}</span>}
        </div>
        <div className='form-group'>
          <label htmlFor='image'>Image URL</label>
          <input type='text' id='image' {...register("image")} />
        </div>
        <div className='form-group'>
          <label htmlFor='price'>Price*</label>
          <input type='number' id='price' {...register("price", {
            required: 'Set Price',
            min: {
              value: 0,
              message: 'Price must be greater than or equal to 0'
            }
          })} />
          {errors.price && <span className='error-message'>{errors.price.message}</span>}
        </div>
        <div className='form-group'>
          <label htmlFor='discount'>Discount</label>
          <input type='number' id='discount' {...register("discount", {
            min: {
              value: 0,
              message: 'Discount must be greater than or equal to 0'
            }
          })} />
          {errors.discount && <span className='error-message'>{errors.discount.message}</span>}
        </div>
        <div className='form-group'>
          <label htmlFor='quantity'>Quantity*</label>
          <input type='number' id='quantity' {...register("quantity", {
            required: 'Set quantity',
            min: {
              value: 0,
              message: 'quantity must be greater than or equal to 0'
            }
          })} />
          {errors.price && <span className='error-message'>{errors.price.message}</span>}
        </div>
        <div className='form-group'>
          <label htmlFor='sizes-available'>Number of Sizes Available</label>
          <input type='number' id='sizes-available' {...register("no-sizes", {
            required: 'Number of sizes available is required'
          })} />
          {errors['no-sizes'] && <span className='error-message'>{errors['no-sizes'].message}</span>}
        </div>

        {[...Array(parseInt(getValues('no-sizes') || 0)).keys()].map(index => (
          <div key={`size-${index}`}>
            <label className='list-label' htmlFor={`size-${index}`}>Size {index + 1}:</label>
            <input type='text' id={`size-${index}`} {...register(`size-${index}`, {
              required: `Size ${index + 1} is required`
            })} />
            <p>{errors[`size-${index}`] && errors[`size-${index}`].message}</p>
            <br />
          </div>
        ))}
        <button type='submit' className='submit-button'>Submit</button>
      </form>
    </div>
  );
}

export default SellerListing;
