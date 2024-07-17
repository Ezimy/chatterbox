import React from 'react'
import './userInfo.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faEllipsis, faVideo, faEdit } from '@fortawesome/free-solid-svg-icons'
import {useUserStore} from '../../../lib/userStore'
import avatar from '../../../assets/images/avatar.jpg'
const UserInfo = () => {
  const {currentUser} = useUserStore()
  const userAvatar = currentUser.avatar ? currentUser.avatar : avatar;
  console.log(currentUser.avatar)
  return (
    <div className='userInfo'>
      <div className='user'>
      <img 
          src={userAvatar} 
          alt='avatar' 
          onError={(e) => { 
            e.target.src = avatar; 
            console.error('Failed to load user avatar:', userAvatar);
          }} 
        />
        <h2>{currentUser.username}</h2>
      </div>
      <div className='icons'>
        <FontAwesomeIcon icon={faEllipsis}/>
        <FontAwesomeIcon icon={faVideo}/>
        <FontAwesomeIcon icon={faEdit}/>
      </div>
    </div>
  )
}

export default UserInfo
