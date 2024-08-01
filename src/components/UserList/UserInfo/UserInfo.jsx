import React, { useState } from 'react'
import './userInfo.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faEllipsis, faUser, faEdit } from '@fortawesome/free-solid-svg-icons'
import {useUserStore} from '../../../lib/userStore'
import avatar from '../../../assets/images/avatar.jpg'
import {db} from '../../../lib/firebase'
import { doc, updateDoc } from 'firebase/firestore';
import upload from '../../../lib/upload'
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
  const handleEditAvatar = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const imgUrl = await upload(file); // Upload new avatar and get URL
        const userRef = doc(db, 'users', currentUser.id);
        await updateDoc(userRef, { avatar: imgUrl });
        updateUser({ ...currentUser, avatar: imgUrl });
        setNewAvatar(imgUrl); // Update local state
        console.log('Saved user avatar');
      } catch (err) {
        console.log(err);
      }
    }
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
