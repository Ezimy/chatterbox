import React, {useState, useEffect} from 'react'
import './detail.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDownload, faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons'
import avatarPlaceholder from '../../assets/images/avatar.jpg'
import {auth, db} from '../../lib/firebase'
import { useChatStore } from '../../lib/chatStore'
import { useUserStore } from '../../lib/userStore'
import { arrayRemove, arrayUnion, doc, getDoc, updateDoc } from 'firebase/firestore'
import Photo from './Photo/Photo.jsx'
import File from './File/File.jsx'
const Detail = () => {
  const [photoState,setPhotoState] = useState(false)
  const [fileState,setFileState] = useState(false)
  const {chatId,user,isCurrentUserBlocked, isReceiverBlocked, changeBlock} = useChatStore()
  const {currentUser} = useUserStore()
  const [sharedPhotos,setSharedPhotos] = useState([])
  const [sharedFiles,setSharedFiles] = useState([])
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
  useEffect(() => {
    const fetchSharedData = async () => {
      if (!chatId) return;

      try {
        const chatDocRef = doc(db, "chats", chatId);
        const chatDoc = await getDoc(chatDocRef);

        if (chatDoc.exists()) {
          const chatData = chatDoc.data();
          const { sharedPhotos = [], sharedFiles=[] } = chatData;
          setSharedPhotos(sharedPhotos);
          setSharedFiles(sharedFiles);
        } else {
          console.log("No such document!");
        }
      } catch (err) {
        console.error("Error fetching document:", err);
      }
    };
    fetchSharedData();
  }, [chatId, photoState, fileState, sharedFiles, sharedPhotos]);

  return (
    <div className='detail'>
        <div className="user">
          <img src={user?.avatar || avatarPlaceholder} alt="avatar" />
          <h2>{user?.username}</h2>
          <p>{user?.description}</p>
        </div>
        <div className="info">
          <div className="option">
            <div className="title">
              <span>Shared Photos</span>
              <FontAwesomeIcon icon={photoState ? faAngleUp : faAngleDown} onClick={() => setPhotoState(prev => !prev)} className={sharedPhotos.length === 0? "disabled": ""}/>
            </div>
            {photoState && sharedPhotos.length > 0 && sharedPhotos.map((photo, index) => (
              <Photo src={photo.url} date={photo.createdAt.toDate().toLocaleString()} index={index} key={index} alt={`Photo ${index+1}`} />
            ))}
          </div>
          <div className="option">
            <div className="title">
              <span>Shared Files</span>
              <FontAwesomeIcon icon={fileState ? faAngleUp : faAngleDown} onClick={()=> setFileState(prev => !prev)} className={sharedFiles.length === 0? "disabled" : ""}/>
            </div>
            {fileState && sharedFiles.length > 0 && sharedFiles.map((file, index) => (
              <File src={file.url} date={file.createdAt.toDate().toLocaleString()} index={index} key={index} />
            ))}
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
