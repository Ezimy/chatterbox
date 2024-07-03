import React from 'react'
import './userList.css'
import UserInfo from './UserInfo/UserInfo'
import ChatList from './ChatList/ChatList'
const UserList = () => {
  return (
    <div className='list'>
      <UserInfo/>
      <ChatList/>
    </div>
  )
}

export default UserList;
