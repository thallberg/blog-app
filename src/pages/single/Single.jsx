import React, { useState } from 'react'
import './SingleStyle.css'
import Sidebar from '../../components/sidebar/Sidebar'
import SinglePost from '../../components/singlepost/SinglePost'
import UserService from '../../services/UserService';

export default function Single() {
  const [post, setPost] = useState(null); // Lägg till post-state

  return (
    <div className='single'>
        
        <SinglePost setPost={setPost} />
        <Sidebar isSettingsPage={false} user={post?.user || UserService.getUser()} />


    </div>
  )
}
