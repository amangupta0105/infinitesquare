import React from 'react'
import Layout from '../../Componets/Layout/Layout'
import EmblaCarousel from './CarouselBanner/EmblaCarousel'
import '../../Styles/Home/embla.css'
import img1 from '../../Assests/Images/Casousel/img1.jpg';
import img2 from '../../Assests/Images/Casousel/img2.jpg';
import img3 from '../../Assests/Images/Casousel/img3.jpg';
import img4 from '../../Assests/Images/Casousel/img4.jpg';
import FeaturedProducts from './Featured-Items/FeaturedProducts';
import Category from './Category-Section/Category';
import StaticSection from './Static-Section/StaticSection';

const Home = () => {

    const OPTIONS = { dragFree: true, loop: true }
    const SLIDES = [img1,img2,img3,img4]

  return (
    <div className='home-container margin-top'>
        <Layout> 
          <div className="carousel">
            <EmblaCarousel slides={SLIDES} options={OPTIONS} />   
          </div>
          <div className="Static-Section">
            <StaticSection/>
          </div>
          <div className="feature-section">
            <FeaturedProducts/>
          </div>
          <div className="category-section">
            <Category/>
          </div>
        </Layout>

    </div>
  )
}

export default Home