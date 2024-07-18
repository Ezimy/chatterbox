import React, { useState } from 'react'
import avatar from '../../../../assets/images/avatar.jpg'
import './addUser.css'
import { db } from '../../../../lib/firebase'
import { collection, getDocs, query, where, setDoc, doc, updateDoc, serverTimestamp, arrayUnion } from "firebase/firestore";
import { useUserStore } from '../../../../lib/userStore'
const AddUser = () => {
    const [user, setUser] = useState(null)
    const {currentUser} = useUserStore()
    const handleSearch = async (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const username = formData.get('username')
        try {
          const userRef = collection(db, "users");
          const q = query(userRef, where("username", "==", username));
          const querySnapshot = await getDocs(q);
          if(querySnapshot){
            setUser(querySnapshot.docs[0].data())
          }
        }
        catch (error) {
            console.log("Error getting user: ", error);
        }
    }
    const handleAdd = async (e) => {
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
            receiverId: currentUser.id,
            updatedAt: Date.now(),
          }),
        })
        
        await updateDoc(doc(userChatsRef, currentUser.id), {
          chats:arrayUnion ({
            chatId: newChatRef.id,
            lastMessage: "",
            receiverId: user.id,
            updatedAt: Date.now(),
          }),
        })
      }
      catch(error){
        console.log("Error adding chat: ", error);
      }
    }
  return (
    <div className='addUser'>
        <form onSubmit={handleSearch}>
            <input type="text" placeholder='Username' name='username' />
            <button>Search</button>
        </form>
        { user && <div className='user'>
            <div className="detail">
                <img src={user.avatar ? user.avatar : avatar} alt="" />
                <span>{user.username}</span>
                <button onClick={handleAdd}>Add User</button>
            </div>
        </div>}
    </div>
  )
}

export default AddUser
