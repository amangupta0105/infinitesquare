import React from 'react';
import '../../Styles/About/About.css'
import Layout from '../../Componets/Layout/Layout'

const About = () => {
    return (
        <Layout>
            <div className="about-page margin-top">
                <div className="background-shapes"></div>
                <section className="about-header">
                    <h1>Welcome to Our Adventure!</h1>
                    <p className="about-description">Join us on our whimsical journey through the world of ecommerce.</p>
                </section>

                <section className="our-mission">
                    <h2>Our Mission: Making Magic Happen!</h2>
                    <p className="mission-text">We are on a quest to sprinkle joy, one package at a time, with our enchanting products and mystical service. Our team is dedicated to bringing a smile to your face with every purchase, ensuring that your experience with us is nothing short of magical! We believe in the power of imagination and creativity, and we strive to infuse these elements into everything we do. Whether it's crafting unique products or providing exceptional customer service, our mission remains the same - to make magic happen!</p>
                </section>

                <section className="our-story">
                    <h2>Once Upon a Time...</h2>
                    <p className="story-text">In a land not so far away, a group of quirky individuals came together with a dream - to make online shopping an unforgettable experience. And thus, our epic saga began! With passion in our hearts and determination in our souls, we embarked on a journey filled with twists and turns, challenges and triumphs. From humble beginnings to soaring heights, our story is a testament to the power of dreams and the magic of teamwork.</p>
                </section>

                <section className="why-choose-us">
                    <h2>Why Choose Us?</h2>
                    <div className="reasons-container">
                        <div className="reason-card">
                            <h3 className="reason-title">Magical Products</h3>
                            <p className="reason-description">From spellbinding gadgets to potions that'll leave you mesmerized, we've got everything to ignite your imagination.</p>
                        </div>
                        <div className="reason-card">
                            <h3 className="reason-title">Whimsical Prices</h3>
                            <p className="reason-description">Our prices are so good, they're almost as magical as a unicorn. And who wouldn't want a unicorn?</p>
                        </div>
                        <div className="reason-card">
                            <h3 className="reason-title">Swift Delivery</h3>
                            <p className="reason-description">Faster than a speeding dragon, our delivery team ensures your goodies reach you in no time!</p>
                        </div>
                        <div className="reason-card">
                            <h3 className="reason-title">Customer Happiness Guarantee</h3>
                            <p className="reason-description">We promise to put a smile on your face, even if it means sending a dancing leprechaun to your doorstep.</p>
                        </div>
                    </div>
                </section>
            </div>
        </Layout>
    );
}

export default About;
