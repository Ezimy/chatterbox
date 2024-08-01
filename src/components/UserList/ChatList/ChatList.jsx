import React, { useEffect, useState } from 'react'
import './chatList.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'
import AddUser from './AddUser/AddUser.jsx'
import avatar from '../../../assets/images/avatar.jpg'
import {useUserStore} from '../../../lib/userStore'
import { db } from '../../../lib/firebase'
import { doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore'
import { useChatStore } from '../../../lib/chatStore'
const chatList = () => {
  const [addMode,setAddMode] = useState(false)
  const [chats, setChats] = useState([])
  const [input, setInput] = useState('')

  const {currentUser} = useUserStore()
  const {chatId, changeChat} = useChatStore()
  useEffect(() => {
    const unSub = onSnapshot(doc(db, "userchats", currentUser.id), async (res) => {
      const items = res.data().chats
      const promises = items.map( async (item) => {
        const userDocRef = await doc(db, "users", item.receiverId)
        const userDocSnap = await getDoc(userDocRef)
        const user = userDocSnap.data()
        return {...item,user}
      })
      const chatData = await Promise.all(promises)
      setChats(chatData.sort((a,b) => a.updatedAt - b.updatedAt))
  });
  return () =>{
    unSub()
  }
  },[currentUser.id])

  const handleSelect = async (chat) => {
    const userChats = chats.map((item) => {
      const {user, ...rest} = item 
      return rest
    })
    const chatIndex = userChats.findIndex((item) => item.chatId === chat.chatId)
    userChats[chatIndex].isSeen = true
    const userChatRef = doc(db, "userchats", currentUser.id)
    try{
      await updateDoc(userChatRef, {
        chats: userChats,
      })
      changeChat(chat.chatId,chat.user)
      }
    catch(err){
      console.log("error has occured"+err)
      }
    }
    const filteredChats = chats.filter((chat) => chat.user.username.toLowerCase().includes(input.toLowerCase()))
  return (
    <div className='chatList'>
      <div className='search'>
        <div className="searchBar">
          <FontAwesomeIcon icon={faSearch}/>
          <input type='text' placeholder='Search' onChange={(e) => setInput(e.target.value)}></input>
        </div>
        <FontAwesomeIcon icon={addMode ? faMinus : faPlus} className='add' onClick={()=>setAddMode((prev)=>!prev)}/>
      </div>
      {filteredChats.map((chat) => (
            <div className="item" 
            key={chat.chatId} 
            onClick={()=>handleSelect(chat)}
            style={{
              backgroundColor: chat?.isSeen ? "transparent" : "#5183fe",
            }}
            >
              <img src={chat.user.avatar} alt='avatar'/>
              <div className="texts">
                <span>{chat.user.username}</span>
                <p>{chat.lastMessage}</p>
              </div>
            </div>
      ))}
      {addMode && <AddUser/>}
    </div>
  )
}

export default chatList
