import React, { useState } from 'react'
import './userInfo.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faEllipsis, faUser, faEdit } from '@fortawesome/free-solid-svg-icons'
import {useUserStore} from '../../../lib/userStore'
import avatar from '../../../assets/images/avatar.jpg'
const UserInfo = () => {
  const {currentUser, updateUser} = useUserStore()
  const userAvatar = currentUser.avatar ? currentUser.avatar : avatar;
  const [isEditing, setIsEditing] = useState(false);
  const [newUsername, setNewUsername] = useState(currentUser.username);
  const handleEdit = ()=>{
    console.log('Edit user')
    setIsEditing(true)
  }
  const handleSave = () => {
    // updateUser({ ...currentUser, username: newUsername });
    console.log('Save user')
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSave();
    }
  }
  const handleImg = ()=>{
    console.log('Edit avatar')
  }
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
        {isEditing ? (
          <input
            type='text'
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
          />
        ) : (
          <h2 onClick={handleEdit}>{currentUser.username}</h2>
        )}
      </div>
      <div className='icons'>
        <div className='icon-container'>
          <FontAwesomeIcon icon={faUser} onClick={handleImg}/>
          <span className='tooltip'>Edit Avatar Image</span>
        </div>
        <div className='icon-container'>
          <FontAwesomeIcon icon={faEdit} onClick={handleEdit} />
          <span className='tooltip'>Edit Username</span>
        </div>
      </div>
    </div>
  )
}

export default UserInfo
