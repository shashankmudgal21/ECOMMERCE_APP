import React from 'react'
import Layout from '../Component/Layout/Layout'
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { FaHeadphones } from "react-icons/fa6";

const Contact = () => {
  return (
    <Layout title={'Contact us'}>
      <div className="contact-container container">
        <div className="cont1 container-md-6">
          <img className='contact_img' src="../images/contact.avif" alt="Remote-image" />
        </div>
        <div className="cont-2 container-md-6">
          <h1 className='contact-title'>CONTACT US</h1>
          <p>any query and info about product feel free to call anytime we 24x7 available</p>
          <div className="contact-desc">
          <p><span><MdEmail /></span>  www.helpEcommerce.gmail.com</p>
          <p><span><FaPhoneAlt /></span> +91 123456789</p>
          <p><span><FaHeadphones /></span> Toll free 1800-0000-0000</p>
          </div>
        </div>
      </div>
     
    </Layout>
  )
}

export default Contact
