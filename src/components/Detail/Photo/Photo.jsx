import './photo.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import React from 'react'

const Photo = ({src, index, alt, date}) => {
  return (
  <>
  <div className="photoItem">
    <div className="photoDetail">
      <img src={src} alt={alt} />
      <span>Photo {index+1}</span>
      <span className='date'>{date}</span>
    </div>
    <a href={src} className='download' target='_blank'>
      <FontAwesomeIcon icon={faDownload} className='icon'/>
    </a>
  </div>
  <hr />
  </>
  )
}

export default Photo
