import React from 'react'
import './userInfo.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faEllipsis, faVideo, faEdit } from '@fortawesome/free-solid-svg-icons'
import avatar from '../../../assets/images/avatar.jpg'
const UserInfo = () => {
  return (
    <div className='userInfo'>
      <div className='user'>
        <img src={avatar} alt='avatar'/>
        <h2>Username</h2>
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
