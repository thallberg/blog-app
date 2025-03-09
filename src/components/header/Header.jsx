import React from 'react'
import './HeaderStyle.css'
import heroImg from '../../assets/home/heroimg.webp'

export default function Header() {
  return (
    <header className='header'>
      <div className="header-content">
        <span className='header-title'>Blogged</span>
      </div>
      <img className='header-image' src={heroImg} alt="" />

    </header>
  )
}
