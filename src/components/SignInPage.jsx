import React, { useState } from 'react';
import "../styles/SignInScreen.css";
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

const SignInPage = () => {

    const [username,setUsername] = useState(null);
    const [password,setPassword] = useState(null);

    const register =(e)=>{
        e.preventDefault();
        createUserWithEmailAndPassword(auth,username,password).then((authUser)=>{
            console.log(authUser.user);
        }).catch((error)=>{
            alert(error.message);
        })

    }

    const signIn = (e)=>{
        e.preventDefault();
        signInWithEmailAndPassword(auth,username,password).then((userAuth)=>{
            console.log(userAuth);
        }).catch((error)=>{
            alert(error.message);
        })
    }

  return (
    <div className='signUp__body'>
        <form>
            <h1>Sign In</h1>
            <input type="email" placeholder='email@domain.com' onChange={(e)=>setUsername(e.target.value)} />
            <input type='password' placeholder='*********' onChange={(e)=>(setPassword(e.target.value))}/>
            <button type='submit' onClick={signIn}>Sign In</button>
        </form>
        <h4>New to Interview Trainer? <span className='signIn__signup' onClick={register}>Sign up</span> now!</h4>
        
    </div>
  )
}

export default SignInPage