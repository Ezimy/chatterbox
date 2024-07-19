import React, { useState, useRef, useEffect } from 'react'
import './chat.css'
import EmojiPicker from 'emoji-picker-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage, faSmile, faCamera, faMicrophone, faPhone, faVideo, faInfo } from '@fortawesome/free-solid-svg-icons'
import { arrayUnion, doc, onSnapshot, updateDoc, getDoc } from 'firebase/firestore'
import { db } from '../../lib/firebase'
import avatar from '../../assets/images/avatar.jpg'
import { useUserStore } from '../../lib/userStore'
import { useChatStore } from '../../lib/chatStore'
const Chat = () => {
  const [open,setOpen] = useState(false)
  const [text,setText] = useState("");
  const [chat,setChat] = useState();
  const {currentUser} = useUserStore()
  const {chatId, user} = useChatStore()
  const pickEmoji = (e)=>{
    setText((prev)=>prev+e.emoji);
    setOpen((prev)=>!prev)
  };
  const handleSend = async ()=>{
    if(text === "") return;
    try{
      await updateDoc(doc(db, "chats", chatId),{
        messages: arrayUnion({
          senderId: currentUser.id,
          text,
          createAt: new Date(),
        })
      })
      const userIds = [currentUser.id, user.id]
      userIds.forEach(async (id)=>{
        const userChatRef = doc(db,"userchats",id)
        const userChatsSnapshot = await getDoc(userChatRef)
        if(userChatsSnapshot.exists()){
          const userChatsData = userChatsSnapshot.data()
          console.log(userChatsData)
          const chatIndex = userChatsData.chats.findIndex((c)=>c.id === chatId)
          console.log(chatIndex)
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
  };
  const endRef = useRef(null);
  useEffect(()=>{
    endRef.current.scrollIntoView({behavior:'smooth'})
  },[])

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
          <img src="" alt="avatar" />
          <div className="texts">
            <span>Jane</span>
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
          <div className="message own" key={message?.createAt}>
            <div className="texts">
              {message.img && <img
                src={message.img}
                alt="img"
              />
              }
                <p>
                  {message.text}
                </p>
                {/* <span>{message.createAt}</span>     */}
            </div>
          </div>
        ))
        }
        <div ref={endRef}>

        </div>
      </div>
      <div className="bottom">
        <div className="icons">
          <FontAwesomeIcon icon={faImage}/>
          <FontAwesomeIcon icon={faCamera}/>
          <FontAwesomeIcon icon={faMicrophone}/>
        </div>
        <input type="text" placeholder='Type a message...' value={text} onChange={e=>setText(e.target.value)}/>
        <div className="emoji">
            <FontAwesomeIcon icon={faSmile} onClick={()=>setOpen(prev=>!prev)}/>
          <div className="picker">
            <EmojiPicker open={open} className='emojiPicker' onEmojiClick={pickEmoji}/>
          </div>
        </div>
        <button className='sendButton' onClick={handleSend}>Send</button>
      </div>
    </div>
  )
}

export default Chat
