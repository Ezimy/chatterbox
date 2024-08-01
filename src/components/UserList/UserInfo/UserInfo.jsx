import React, { useState } from 'react'
import './userInfo.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faEllipsis, faUser, faEdit } from '@fortawesome/free-solid-svg-icons'
import {useUserStore} from '../../../lib/userStore'
import avatar from '../../../assets/images/avatar.jpg'
import {db} from '../../../lib/firebase'
import { doc, updateDoc } from 'firebase/firestore';
const UserInfo = () => {
  const {currentUser, updateUser} = useUserStore()
  const [isEditing, setIsEditing] = useState(false);
  const [newUsername, setNewUsername] = useState(currentUser.username);
  const [newAvatar, setNewAvatar] = useState(currentUser.avatar);
  // handle edit username
  const handleEdit = ()=>{
    setIsEditing(true)
  }
  const handleSave = async () => {
    const userRef = doc(db, 'users', currentUser.id);
    try{
      await updateDoc(userRef, { username: newUsername });
      updateUser({ ...currentUser, username: newUsername })
      console.log('Save user')
    }
    catch(err){ console.log(err) }
    finally{
      setIsEditing(false)
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSave();
    }
  }
  // handle edit avatar
  const handleEditAvatar = async (e)=>{
    console.log(currentUser)
    const userRef = doc(db, 'users', currentUser.id);
      setNewAvatar({
          file:e.target.files[0],
          url:URL.createObjectURL(e.target.files[0])
      })
    try{
      // upload new avatar
      // update user avatar
      await updateDoc(userRef, { avatar: newAvatar });
      updateUser({ ...currentUser, avatar: newAvatar })
      console.log('Save user avatar')
      console.log(currentUser)
    }
    catch(err){ console.log(err) }
  }
  return (
    <div className='userInfo'>
      <div className='user'>
      <img 
          src={currentUser.avatar} 
          alt='avatar' 
          onError={() => {
            console.error('Failed to load user avatar:', currentUser.avatar);
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
          <label htmlFor="file">
            <FontAwesomeIcon icon={faUser}/>
            <span className='tooltip'>Edit Avatar Image</span>
          </label>
          <input type='file' id='file' style={{display: 'none'}}  onChange={handleEditAvatar}/>
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
