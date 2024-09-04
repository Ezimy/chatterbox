import './file.css';
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faFile } from '@fortawesome/free-solid-svg-icons';
const File = ({src, index, date}) => {
return (
    <>
        <div className="fileItem">
            <div className="fileDetail">
                <FontAwesomeIcon icon={faFile} className='file-icon'/>
                <span>File {index+1}</span>
                <span className='date'>{date}</span>
            </div>
            <a href={src} className='download' download target='_blank'>
                <FontAwesomeIcon icon={faDownload} className='icon'/>
            </a>
        </div>
        <hr />
    </>
)
}

export default File