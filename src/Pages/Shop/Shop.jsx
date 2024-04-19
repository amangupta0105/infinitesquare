import React from 'react'
import ShopSideBar from './ShopSection/ShopSideBar'
import Products from './ShopSection/Products'
import Layout from '../../Componets/Layout/Layout'
import '../../Styles/Shop/Shop.css';

const Shop = () => {
    return (
        <Layout>
            <div className='shop-container margin-top'>
                <div className="shop-sidebar">
                    <ShopSideBar/>
                </div>
                <div className='products'>
                    <Products/>
                </div>
            </div>
        </Layout>
    )
}

export default Shop