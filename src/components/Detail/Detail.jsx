import React from 'react'
import './detail.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp, faArrowDown, faDownload } from '@fortawesome/free-solid-svg-icons'
const Detail = () => {
  return (
    <div className='detail'>
        <div className="user">
          <img src="" alt="avatar" />
          <h2>Jane Doe</h2>
          <p>Lorem ipsum dolor sit amet.</p>
        </div>
        <div className="info">
          <div className="option">
            <div className="title">
              <span>Chat Settings</span>
              <FontAwesomeIcon icon={faArrowUp}/>
            </div>
          </div>
          <div className="option">
            <div className="title">
              <span>Privacy and help</span>
              <FontAwesomeIcon icon={faArrowUp}/>
            </div>
          </div>
          <div className="option">
            <div className="title">
              <span>Shared Photos</span>
              <FontAwesomeIcon icon={faArrowDown}/>
            </div>
            <div className="photos">
              <div className="photoItem">
                <div className="photoDetail">
                  <img src="" alt="photo" />
                  <span>photo_2024-43324</span>
                </div>
                <FontAwesomeIcon icon={faDownload}/>
              </div>
            </div>
          </div>
          <div className="option">
            <div className="title">
              <span>Shared Files</span>
              <FontAwesomeIcon icon={faArrowUp}/>
            </div>
          </div>
          <button>Block User</button>
        </div>
    </div>
  )
}

export default Detail
