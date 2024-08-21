import React, { useEffect, useState } from 'react'
import avatar from '../../../../assets/images/avatar.jpg'
import './addUser.css'
import { db } from '../../../../lib/firebase'
import { collection, getDocs, query, where, setDoc, doc, updateDoc, serverTimestamp, arrayUnion, onSnapshot } from "firebase/firestore";
import { useUserStore } from '../../../../lib/userStore'
const AddUser = ({setAddMode}) => {
    const [users, setUsers] = useState([])
    const {currentUser} = useUserStore()
    const [input, setInput] = useState('')
    const filteredUsers = users.filter(user => user.username.toLowerCase().includes(input.toLowerCase()))
    useEffect(() => {
      const unSub = onSnapshot(collection(db, "users"), (snapshot) => {
          const userList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setUsers(userList);
      });

      return () => {
          unSub();
      }
  }, []);
  const mapUsers = () => {
    return filteredUsers
      .filter(user => user.id !== currentUser.id)
      .map(user => (
        <div key={user.id} className="user">
          <div>
            <img src={user.avatar ? user.avatar : avatar} alt="" />
            <span>{user.username}</span>
          </div>
          <button onClick={() => handleAdd(user)}>Add User</button>
        </div>
      ));
  }
    const handleAdd = async (user) => {
      const chatRef = collection(db, "chats");
      const userChatsRef = collection(db, "userchats");
      try{
        const newChatRef = doc(chatRef)
        await setDoc(newChatRef,{
          createdAt: serverTimestamp(),
          messages: [],
        })
        await updateDoc(doc(userChatsRef, user.id), {
          chats:arrayUnion ({
            chatId: newChatRef.id,
            lastMessage: "",
            isSeen: false,
            receiverId: currentUser.id,
            updatedAt: Date.now(),
          }),
        })
        
        await updateDoc(doc(userChatsRef, currentUser.id), {
          chats:arrayUnion ({
            chatId: newChatRef.id,
            lastMessage: "",
            isSeen: false,
            receiverId: user.id,
            updatedAt: Date.now(),
          }),
        })
      }
      catch(error){
        console.log("Error adding chat: ", error);
      }
      finally{
        setAddMode(false)
      }
    }
  return (
    <div className='addUser'>
        <div className='search-user'>
            <input type="text" placeholder='Username' name='username' onChange={(e) => setInput(e.target.value)}/>
        </div>
        <div className="user-list">
          {mapUsers()}
        </div>
    </div>
  )
}

export default AddUser
