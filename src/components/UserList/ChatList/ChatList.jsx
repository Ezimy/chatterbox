import React, { useState } from 'react'
import './chatList.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'
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
        <img src='' alt='avatar'/>
        <div className="texts">
          <span>Jane Doe</span>
          <p>hello</p>
        </div>
      </div>
      <div className="item">
        <img src='' alt='avatar'/>
        <div className="texts">
          <span>Jane Doe</span>
          <p>hello</p>
        </div>
      </div>
      <div className="item">
        <img src='' alt='avatar'/>
        <div className="texts">
          <span>Jane Doe</span>
          <p>hello</p>
        </div>
      </div>
      <div className="item">
        <img src='' alt='avatar'/>
        <div className="texts">
          <span>Jane Doe</span>
          <p>hello</p>
        </div>
      </div>
      <div className="item">
        <img src='' alt='avatar'/>
        <div className="texts">
          <span>Jane Doe</span>
          <p>hello</p>
        </div>
      </div>
      <div className="item">
        <img src='' alt='avatar'/>
        <div className="texts">
          <span>Jane Doe</span>
          <p>hello</p>
        </div>
      </div>
      <div className="item">
        <img src='' alt='avatar'/>
        <div className="texts">
          <span>Jane Doe</span>
          <p>hello</p>
        </div>
      </div>
      <div className="item">
        <img src='' alt='avatar'/>
        <div className="texts">
          <span>Jane Doe</span>
          <p>hello</p>
        </div>
      </div>
    </div>
  )
}

export default chatList
