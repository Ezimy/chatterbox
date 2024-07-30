import React, { useState, useRef, useEffect } from 'react'
import './chat.css'
import EmojiPicker from 'emoji-picker-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage, faSmile, faCamera, faMicrophone, faPhone, faVideo, faInfo, faFile} from '@fortawesome/free-solid-svg-icons'
import { arrayUnion, doc, onSnapshot, updateDoc, getDoc } from 'firebase/firestore'
import { db } from '../../lib/firebase'
import avatar from '../../assets/images/avatar.jpg'
import { useUserStore } from '../../lib/userStore'
import { useChatStore } from '../../lib/chatStore'
import upload from '../../lib/upload'
const Chat = () => {
  const [open,setOpen] = useState(false)
  const [text,setText] = useState("");
  const [chat,setChat] = useState();
  const {currentUser} = useUserStore()
  const {chatId, user, isCurrentUserBlocked, isReceiverBlocked} = useChatStore()
  const [img, setImg] = useState({
    file:null,
    url:"",
  })
  const endRef = useRef(null)
  const pickEmoji = (e)=>{
    setText((prev)=>prev+e.emoji);
    setOpen((prev)=>!prev)
  };
  const handleImg = (e)=>{
    if(e.target.files[0]){
      setImg({
        file:e.target.files[0],
        url:URL.createObjectURL(e.target.files[0]),
      })
    }
  }
  const handleSend = async ()=>{

    let imgUrl = null
    
    try{

      if(img.file){
        imgUrl = await upload(img.file);
      }

      await updateDoc(doc(db, "chats", chatId),{
        messages: arrayUnion({
          senderId: currentUser.id,
          text,
          createdAt: new Date(),
          ...(imgUrl && {img: imgUrl}),
        })
      })
      const userIds = [currentUser.id, user.id]

      userIds.forEach(async (id)=>{

        const userChatRef = doc(db,"userchats",id)
        const userChatsSnapshot = await getDoc(userChatRef)

        if(userChatsSnapshot.exists()){

          const userChatsData = userChatsSnapshot.data()
          const chatIndex = userChatsData.chats.findIndex((c)=>c.chatId === chatId)

          userChatsData.chats[chatIndex].lastMessage = text
          userChatsData.chats[chatIndex].isSeen = id === currentUser.id? true: false
          userChatsData.chats[chatIndex].updatedAt = Date.now()

          await updateDoc(userChatRef,{
            chats: userChatsData.chats,
            })
          }
        })
      }
    catch(err){
      console.log("error has occured"+err)
    }
    setImg({
      file:null,
      url:"",
    })
    setText("")
  }
  useEffect(() => {
    if (endRef.current) {
      endRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chat]);

  useEffect(()=>{
    const unSub = onSnapshot(doc(db, "chats", chatId), (res)=>{
      setChat(res.data())
    })
    return ()=>{
      unSub()
    }
  },[chatId])

  return (
    <div className='chat'>
      <div className="top">
        <div className="user">
          <img src={user?.avatar || avatar} alt="avatar" />
          <div className="texts">
            <span>{user.username}</span>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Culpa, deleniti aliquam? Eveniet deleniti autem optio ut vel maxime nisi voluptatum placeat nobis omnis soluta dolorum, beatae recusandae animi. Vero, voluptates.</p>
          </div>
        </div>
        <div className='icons'>
          <FontAwesomeIcon icon={faPhone}/>
          <FontAwesomeIcon icon={faVideo}/>
          <FontAwesomeIcon icon={faInfo}/>
        </div>
      </div>
      <div className="center">
        { chat?.messages?.map((message) =>(
          <div className={`message ${message.senderId === currentUser.id ? 'own' : ''}`} key={message?.createdAt}>
            <div className="texts">
              {message.img && <img
                src={message.img}
                alt="img"
              />
              }
                { message.text && <p>
                  {message.text}
                </p>
                }
            </div>
          </div>
        ))
        }
        {
          img.url && <div className={'message own preview'}>
            <div className="texts">
              <img src={img.url} alt="img"/>
            </div>
          </div>
        }
        <div ref={endRef}>

        </div>
      </div>
      <div className="bottom">
        <div className="icons">
          <label htmlFor="file">
            <FontAwesomeIcon icon={faImage} className={`icon ${isCurrentUserBlocked||isReceiverBlocked? "disabled" : ""}`}/>
          </label>
          <input type="file" id='file' style={{display:"none"}} onChange={handleImg}/>
            <FontAwesomeIcon icon={faFile} className={`icon ${isCurrentUserBlocked||isReceiverBlocked? "disabled" : ""}`}/>
        </div>
        <input 
        type="text" 
        placeholder='Type a message...' 
        value={text} 
        onChange={e=>setText(e.target.value)}
        disabled={isCurrentUserBlocked||isReceiverBlocked}/>
        <div className={`emoji ${isCurrentUserBlocked||isReceiverBlocked? "disabled" : ""}`}>
            <FontAwesomeIcon icon={faSmile} onClick={()=>setOpen(prev=>!prev)}/>
          <div className="picker">
            <EmojiPicker open={open} className='emojiPicker' onEmojiClick={pickEmoji}/>
          </div>
        </div>
        <button className='sendButton' onClick={handleSend} disabled={isCurrentUserBlocked||isReceiverBlocked}>Send</button>
      </div>
    </div>
  )
}

export default Chat
