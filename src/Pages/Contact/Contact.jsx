import Layout from '../../Componets/Layout/Layout';
import '../../Styles/Contact/Contact.css';
import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('default_service', 'template_qmuvbsn', form.current, {
        publicKey: 'IwW7-_Xho0hcDLBi_',
      })
      .then(
        () => {
          form.current.reset();
        },
        (error) => {
          console.log('FAILED...', error.text);
        },
      );

  };
  return (
    <div className='contact-form-page'>
      <Layout>
            <div className='contact-form-heading margin-top'>
                <h2>Contact Us</h2>
                <p>If you have any questions or concerns, feel free to reach out to us using the form below:</p>
            </div>
            <div className='contact-form-container'>
              <div className='side-photo-left'>
                <img src={require('../../Assests/Images/Contact/contact-side.jpg')} alt='side-section'/>
              </div>
              <div className='side-right'>
                <form ref={form} onSubmit={sendEmail} className='contact-form'>
                  <label>Name</label>
                  <input type="text" name="user_name"/>
                  <label>Email</label>
                  <input type="email" name="user_email"/>
                  <label>Message</label>
                  <textarea name="message"/>
                  <input type="submit" value="Send"/>
                </form>
              </div>
            </div>
      </Layout>
    </div>

  );
};

export default Contact;
