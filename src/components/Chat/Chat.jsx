import React, { useState, useRef, useEffect } from 'react'
import './chat.css'
import EmojiPicker from 'emoji-picker-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage, faSmile, faCamera, faMicrophone, faPhone, faVideo, faInfo } from '@fortawesome/free-solid-svg-icons'
import avatar from '../../assets/images/avatar.jpg'
const Chat = () => {
  const [open,setOpen] = useState(false)
  const [text,setText] = useState("");
  const pickEmoji = (e)=>{
    setText((prev)=>prev+e.emoji);
    setOpen((prev)=>!prev)
  };
  const endRef = useRef(null);
  useEffect(()=>{
    endRef.current.scrollIntoView({behavior:'smooth'})
  },[])
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
        <div className="message">
          <img src="" alt="avatar" />
          <div className="texts">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores officiis reprehenderit molestias, voluptatem soluta dolore ut architecto possimus delectus nulla totam error excepturi dolorem ducimus dolor quae libero est cumque!
            </p>
            <span>1 min ago</span>   
          </div> 
        </div>
        <div className="message own">
          <div className="texts">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores officiis reprehenderit molestias, voluptatem soluta dolore ut architecto possimus delectus nulla totam error excepturi dolorem ducimus dolor quae libero est cumque!
            </p>
            <span>1 min ago</span>    
          </div>
        </div>
        <div className="message">
          <img src="" alt="avatar" />
          <div className="texts">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores officiis reprehenderit molestias, voluptatem soluta dolore ut architecto possimus delectus nulla totam error excepturi dolorem ducimus dolor quae libero est cumque!
            </p>
            <span>1 min ago</span>   
          </div> 
        </div>
        <div className="message own">
          <div className="texts">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores officiis reprehenderit molestias, voluptatem soluta dolore ut architecto possimus delectus nulla totam error excepturi dolorem ducimus dolor quae libero est cumque!
            </p>
            <span>1 min ago</span>    
          </div>
        </div>
        <div className="message">
          <img src="" alt="avatar" />
          <div className="texts">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores officiis reprehenderit molestias, voluptatem soluta dolore ut architecto possimus delectus nulla totam error excepturi dolorem ducimus dolor quae libero est cumque!
            </p>
            <span>1 min ago</span>   
          </div> 
        </div>
        <div className="message own">
          <div className="texts">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores officiis reprehenderit molestias, voluptatem soluta dolore ut architecto possimus delectus nulla totam error excepturi dolorem ducimus dolor quae libero est cumque!
            </p>
            <span>1 min ago</span>    
          </div>
        </div>
        <div className="message">
          <img src="" alt="avatar" />
          <div className="texts">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores officiis reprehenderit molestias, voluptatem soluta dolore ut architecto possimus delectus nulla totam error excepturi dolorem ducimus dolor quae libero est cumque!
            </p>
            <span>1 min ago</span>   
          </div> 
        </div>
        <div className="message own">
          <div className="texts">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores officiis reprehenderit molestias, voluptatem soluta dolore ut architecto possimus delectus nulla totam error excepturi dolorem ducimus dolor quae libero est cumque!
            </p>
            <span>1 min ago</span>    
          </div>
        </div>
        <div className="message">
          <img src="" alt="avatar" />
          <div className="texts">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores officiis reprehenderit molestias, voluptatem soluta dolore ut architecto possimus delectus nulla totam error excepturi dolorem ducimus dolor quae libero est cumque!
            </p>
            <span>1 min ago</span>   
          </div> 
        </div>
        <div className="message own">
          <div className="texts">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores officiis reprehenderit molestias, voluptatem soluta dolore ut architecto possimus delectus nulla totam error excepturi dolorem ducimus dolor quae libero est cumque!
            </p>
            <span>1 min ago</span>    
          </div>
        </div>
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
        <button className='sendButton'>Send</button>
      </div>
    </div>
  )
}

export default Chat
