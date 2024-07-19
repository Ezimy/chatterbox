import './App.css';
import UserList from './components/UserList/UserList.jsx';
import Chat from './components/Chat/Chat.jsx';
import Details from './components/Detail/Detail.jsx';
import Login from './components/UserList/Login/Login';
import Notification from './components/UserList/Notification/Notification.jsx';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './lib/firebase';
import { useUserStore } from './lib/userStore';
import { useChatStore } from './lib/chatStore.jsx';
function App() {
  const {currentUser, isLoading, fetchUserInfo} = useUserStore()
  const {chatId} = useChatStore()
  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchUserInfo(user.uid);
      } else {
        fetchUserInfo(null);
      }
    });

    return () => {
      unSub();
    };
  }, [fetchUserInfo]);
  
  if (isLoading) return <div className='loading'>Loading...</div>

  return (
    <>
      <div className='app'>
        { currentUser ? (
          <>
            <UserList/>
            {chatId && <Chat/>}
            {chatId && <Details/>}
          </>
        ) : (
          <Login/>
        )}
        <Notification/>
      </div>
    </>
  )
}

export default App
