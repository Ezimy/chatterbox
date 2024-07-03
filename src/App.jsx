import './App.css';
import UserList from './components/UserList/UserList.jsx';
import Chat from './components/Chat/Chat.jsx';
import Details from './components/Detail/Detail.jsx';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBZOehBkuBVDbBmSw6q7mWJn5ObzQWcMCY",
  authDomain: "chatterbox-fc597.firebaseapp.com",
  projectId: "chatterbox-fc597",
  storageBucket: "chatterbox-fc597.appspot.com",
  messagingSenderId: "108476134385",
  appId: "1:108476134385:web:894931221e776270c7ca50",
  measurementId: "G-LQN4B21X39"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

function App() {
  return (
    <>
      <div className='app'>
        <UserList/>
        <Chat/>
        <Details/>
      </div>
    </>
  )
}

export default App
