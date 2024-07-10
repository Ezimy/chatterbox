import React from 'react'
import avatar from '../../../../assets/images/avatar.jpg'
import './addUser.css'
const AddUser = () => {
  return (
    <div className='addUser'>
        <form>
            <input type="text" placeholder='Username' name='username' />
            <button>Search</button>
        </form>
        <div className='user'>
            <div className="detail">
                <img src={avatar} alt="" />
                <span>Jane Doe</span>
                <button>Add User</button>
            </div>
        </div>
    </div>
  )
}

export default AddUser
