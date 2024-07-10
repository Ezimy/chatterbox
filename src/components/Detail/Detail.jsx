import React, {useState} from 'react'
import './detail.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDownload, faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons'
import avatar from '../../assets/images/avatar.jpg'
const Detail = () => {
  const [photoState,setPhotoState] = useState(false)
  const [chatSettingState,setChatSettingState] = useState(false)
  const [privacyState,setPrivacyState] = useState(false)
  const [fileState,setFileState] = useState(false)
  return (
    <div className='detail'>
        <div className="user">
          <img src={avatar} alt="avatar" />
          <h2>Jane Doe</h2>
          <p>Lorem ipsum dolor sit amet.</p>
        </div>
        <div className="info">
          <div className="option">
            <div className="title">
              <span>Chat Settings</span>
              <FontAwesomeIcon icon={chatSettingState ? faAngleUp :faAngleDown} onClick={()=> setChatSettingState(prev => !prev)}/>
            </div>
          </div>
          <div className="option">
            <div className="title">
              <span>Privacy and help</span>
              <FontAwesomeIcon icon={privacyState ? faAngleUp : faAngleDown} onClick={()=> setPrivacyState(prev => !prev)}/>
            </div>
          </div>
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
          <button>Block User</button>
          <button className='logout'>Logout</button>
        </div>
    </div>
  )
}

export default Detail
