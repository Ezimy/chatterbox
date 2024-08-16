import React, {useState} from 'react'
import './detail.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDownload, faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons'
import avatar from '../../assets/images/avatar.jpg'
import {auth, db} from '../../lib/firebase'
import { useChatStore } from '../../lib/chatStore'
import { useUserStore } from '../../lib/userStore'
import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore'
const Detail = () => {
  const [photoState,setPhotoState] = useState(false)
  const [chatSettingState,setChatSettingState] = useState(false)
  const [privacyState,setPrivacyState] = useState(false)
  const [fileState,setFileState] = useState(false)
  const {chatId,user,isCurrentUserBlocked, isReceiverBlocked, changeBlock} = useChatStore()
  const {currentUser} = useUserStore()

  const handleBlock = async ()=>{
    if (!user) return;
    const userDocRef = doc(db,"users",currentUser.id)
    try{
      await updateDoc(userDocRef,{
        blocked: isReceiverBlocked ? arrayRemove(user.id) : arrayUnion(user.id),
      })
      changeBlock()
    }
    catch(err){
      console.log(err)
    }
  }
  return (
    <div className='detail'>
        <div className="user">
          <img src={user?.avatar || avatar} alt="avatar" />
          <h2>{user?.username}</h2>
          <p>{user?.description}</p>
        </div>
        <div className="info">
          <div className="option">
            <div className="title">
              <span>Shared Photos</span>
              <FontAwesomeIcon icon={photoState ? faAngleUp : faAngleDown} onClick={() => setPhotoState(prev => !prev)}/>
            </div>
            {photoState && (<div className="photos">
              <div className="photoItem">
                <div className="photoDetail">
                  <img src="" alt="photo" />
                  <span>photo_2024-43324</span>
                </div>
                <FontAwesomeIcon icon={faDownload} className='icon'/>
              </div>
              <div className="photoItem">
                <div className="photoDetail">
                  <img src="" alt="photo" />
                  <span>photo_2024-43324</span>
                </div>
                <FontAwesomeIcon icon={faDownload} className='icon'/>
              </div>
              <div className="photoItem">
                <div className="photoDetail">
                  <img src="" alt="photo" />
                  <span>photo_2024-43324</span>
                </div>
                <FontAwesomeIcon icon={faDownload} className='icon'/>
              </div>
              <div className="photoItem">
                <div className="photoDetail">
                  <img src="" alt="photo" />
                  <span>photo_2024-43324</span>
                </div>
                <FontAwesomeIcon icon={faDownload} className='icon'/>
              </div>
            </div>)}
          </div>
          <div className="option">
            <div className="title">
              <span>Shared Files</span>
              <FontAwesomeIcon icon={fileState ? faAngleUp : faAngleDown} onClick={()=> setFileState(prev => !prev)}/>
            </div>
          </div>
          <button onClick={handleBlock}>{
            isCurrentUserBlocked ? 'You are Blocked' : isReceiverBlocked ? "User Blocked" : "Block User"
          }
          </button>
          <button className='logout' onClick={()=>auth.signOut()}>Logout</button>
        </div>
    </div>
  )
}

export default Detail
