import './App.css';
import UserList from './components/UserList/UserList.jsx';
import Chat from './components/Chat/Chat.jsx';
import Details from './components/Detail/Detail.jsx';
import Login from './components/UserList/Login/Login';
import Notification from './components/UserList/Notification/Notification.jsx';

function App() {
  const user = false
  return (
    <>
      <div className='app'>
        { user ? (
          <>
            <UserList/>
            <Chat/>
            <Details/>
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
