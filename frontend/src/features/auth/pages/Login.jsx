import React from 'react'
import {Link} from 'react-router'
import '../styles/form.scss';
import axios from 'axios'
import { useState } from 'react';

const Login = () => {

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  async function clean(){
    setUserName("");
    setPassword("");
  }

  async function handleSubmit(e){
   e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:3000/api/auth/login",
        { userName, password },
        { withCredentials: true }
      );
 
      console.log(res.data);
    } catch (err) {
      console.error(err.response?.data || err.message);
    }

    clean();
  } 

  return (
    <main>
        <div className="form-container">
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <input required value={userName} onChange={(e)=>{setUserName(e.target.value)}} type="text" name="userName" placeholder='Enter Username'/>
                <input required value={password} onChange={(e)=>{setPassword(e.target.value)}} type="password"  name="password" placeholder='Enter password' />
                <button type='submit'>Login</button>
            </form>
            <p>Don't have an account? &nbsp;<Link className={"toggleAuth"} to="/register">Register</Link></p>
        </div>
    </main>
  )
}

export default Login;
