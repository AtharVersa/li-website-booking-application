import React from 'react'
import './Footer.css'

const d = new Date();
let year = d.getFullYear();

const Footer = () => {
  return (
    <div className='footer'>© {year} Language Interpreters Ltd.</div>
  )
}

export default Footer