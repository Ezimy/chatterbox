import React from 'react'
import './userInfo.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faEllipsis, faVideo, faEdit } from '@fortawesome/free-solid-svg-icons'
const UserInfo = () => {
  return (
    <div className='userInfo'>
      <div className='user'>
        <img src='' alt='avatar'/>
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
