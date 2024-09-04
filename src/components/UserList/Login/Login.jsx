import './login.css'
import React, {useState} from 'react'
import { toast } from 'react-toastify'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth'
import upload from '/src/lib/upload'
import { auth,db } from '/src/lib/firebase'
import { doc, setDoc } from 'firebase/firestore'
import avatarPlaceholder from '/src/assets/images/avatar.jpg'
const Login = () => {
    const [loading, setLoading] = useState(false)
    const [avatar, setAvatar] = useState({
        file: null,
        url:""
    })
    const handleAvatar = (e) => {
        if(e.target.files[0]){
            setAvatar({
                file:e.target.files[0],
                url:URL.createObjectURL(e.target.files[0])
            })
        }
    }
    const handleLogin = async (e) => {
        e.preventDefault()
        setLoading(true)
        const formData = new FormData(e.target)
        const {email, password} = Object.fromEntries(formData)
        try{
            await signInWithEmailAndPassword(auth, email, password)
            toast.success("User Logged In Successfully")
        }
        catch(err){
            toast.error(err.message)
            console.log(err)
            }
        finally{
            setLoading(false)
        }
    }
    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData(e.target);
        const { username, email, password } = Object.fromEntries(formData);
        
        try {
            const res = await createUserWithEmailAndPassword(auth, email, password);
            const imgUrl = await upload(avatar.file);
            
            try {
                await setDoc(doc(db, "users", res.user.uid), {
                    username,
                    email,
                    avatar: imgUrl,
                    id: res.user.uid,
                    blocked: [],
                    description: "Default Description",
                });
                toast.success("User Created Successfully");
            } catch (err) {
                console.log("Error setting user document:", err);
                toast.error("Failed to create user document.");
            }
            
            try {
                await setDoc(doc(db, "userchats", res.user.uid), {
                    chats: [],
                });
            } catch (err) {
                console.log("Error setting userchats document:", err);
                toast.error("Failed to create userchats document.");
            }
        } catch (err) {
            console.log("Error during registration:", err);
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    }
  return (
    <div className="login">
        <div className="item">
            <h2>Welcome Back,</h2>
            <form onSubmit={handleLogin}>
                <input type="text" placeholder='Email' name='email'/>
                <input type="password" name='password' placeholder='Password'/>
                <button disabled={loading}>{loading ? "Loading" : "Sign In"}</button>
            </form>
        </div>
        <div className="seperator"></div>
        <div className="item">
            <h2>Dont have an Account? <br /> Create an Account</h2>
            <form onSubmit={handleRegister}>
                <label htmlFor="file">
                    <img src={avatar.url || avatarPlaceholder} alt='' />
                    Upload an Image
                </label>
                <input type="file" id='file' style={{display: 'none'}} onChange={handleAvatar}/>
                <input type="text" placeholder='Username' name='username' />
                <input type="text" placeholder='Email' name='email'/>
                <input type="password" name='password' placeholder='Password'/>
                <button disabled={loading}>{loading ? "Loading" : "Sign Up"}</button>
            </form>
        </div>
    </div>
  )
}

export default Login
