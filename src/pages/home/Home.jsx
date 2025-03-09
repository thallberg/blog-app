import React from 'react'
import './HomeStyle.css'
import Header from '../../components/header/Header'
import Post from '../../components/post/Post'
import Sidebar from '../../components/sidebar/Sidebar'
import Footer from '../../components/footer/Footer'

export default function Home() {
  return (
    <>
    <Header/>
    <div className='home'>
       <Post/>
    </div>
    <Footer/>
    </>
  )
}
