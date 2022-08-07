import React from 'react'
import './Footer.css'

const d = new Date();
let year = d.getFullYear();

const Footer = () => {
  return (
    <div className='footer'>© {year} Language Interpreters</div>
  )
}

export default Footer