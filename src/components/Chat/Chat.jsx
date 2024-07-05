import React, { useState } from 'react'
import './chat.css'
import EmojiPicker from 'emoji-picker-react'
const Chat = () => {
  const [open,setOpen] = useState(false)
  const [text,setText] = useState("");
  const pickEmoji = (e)=>{
    setText((prev)=>prev+e.emoji);
    setOpen((prev)=>!prev)
  };
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
          <img src="" alt="phone" />
          <img src="" alt="video" />
          <img src="" alt="info" />
        </div>
      </div>
      <div className="center">
        <div className="message">
          <img src="" alt="avatar" />
          <div className="texts">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores officiis reprehenderit molestias, voluptatem soluta dolore ut architecto possimus delectus nulla totam error excepturi dolorem ducimus dolor quae libero est cumque!
            </p>
          </div>
          <span>1 min ago</span>    
        </div>
        <div className="message own">
          <div className="texts">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores officiis reprehenderit molestias, voluptatem soluta dolore ut architecto possimus delectus nulla totam error excepturi dolorem ducimus dolor quae libero est cumque!
            </p>
          </div>
          <span>1 min ago</span>    
        </div>
      </div>
      <div className="bottom">
        <div className="icons">
          <img src="" alt="phone" />
          <img src="" alt="video" />
          <img src="" alt="info" />
        </div>
        <input type="text" placeholder='Type a message...' value={text} onChange={e=>setText(e.target.value)}/>
        <div className="emoji">
          <img src="" alt="emoji picker" onClick={()=>setOpen(prev=>!prev)}/>
          <div className="picker">
            <EmojiPicker open={open} className='emojiPicker' onEmojiClick={pickEmoji}/>
          </div>
        </div>
        <button className='sendButton'>Send</button>
      </div>
    </div>
  )
}

export default Chat
