import React, { useState } from 'react'
import './chatList.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'
import AddUser from './AddUser/AddUser.jsx'
import avatar from '../../../assets/images/avatar.jpg'
const chatList = () => {
  const [addMode,setAddMode] = useState(false)
  return (
    <div className='chatList'>
      <div className='search'>
        <div className="searchBar">
          <FontAwesomeIcon icon={faSearch}/>
          <input type='text' placeholder='Search'></input>
        </div>
        <FontAwesomeIcon icon={addMode ? faMinus : faPlus} className='add' onClick={()=>setAddMode((prev)=>!prev)}/>
      </div>
      <div className="item">
        <img src={avatar} alt='avatar'/>
        <div className="texts">
          <span>Jane Doe</span>
          <p>hello</p>
        </div>
      </div>
      <div className="item">
        <img src={avatar} alt='avatar'/>
        <div className="texts">
          <span>Jane Doe</span>
          <p>hello</p>
        </div>
      </div>
      <div className="item">
        <img src={avatar} alt='avatar'/>
        <div className="texts">
          <span>Jane Doe</span>
          <p>hello</p>
        </div>
      </div>
      <div className="item">
        <img src={avatar} alt='avatar'/>
        <div className="texts">
          <span>Jane Doe</span>
          <p>hello</p>
        </div>
      </div>
      <div className="item">
        <img src={avatar} alt='avatar'/>
        <div className="texts">
          <span>Jane Doe</span>
          <p>hello</p>
        </div>
      </div>
      <div className="item">
        <img src={avatar} alt='avatar'/>
        <div className="texts">
          <span>Jane Doe</span>
          <p>hello</p>
        </div>
      </div>
      <div className="item">
        <img src={avatar} alt='avatar'/>
        <div className="texts">
          <span>Jane Doe</span>
          <p>hello</p>
        </div>
      </div>
      <div className="item">
        <img src={avatar} alt='avatar'/>
        <div className="texts">
          <span>Jane Doe</span>
          <p>hello</p>
        </div>
      </div>
      {addMode && <AddUser/>}
    </div>
  )
}

export default chatList
