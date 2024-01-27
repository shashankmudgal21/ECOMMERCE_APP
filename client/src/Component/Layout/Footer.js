import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className='footer'>
      <h4>All right reserved &copy; shashank</h4>
      <p><Link to = '/about'>About</Link> | <Link to = '/contact'>Contact</Link> | <Link to = '/policy'>Policy</Link> </p>
    </div>
  )
}

export default Footer
