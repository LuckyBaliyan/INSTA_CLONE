import React from 'react'
import {Link} from 'react-router'
import '../styles/form.scss';
import axios from 'axios'
import { useState } from 'react';

const Register = () => {

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  
  async function clean(){
    setUserName("");
    setEmail("");
    setPassword("");
  }


  async function handleSubmit(e){
    e.preventDefault();

    try{
      const res = await  axios.post("http://localhost:3000/api/auth/register",{
        userName,
        email,
        password
        },{
          withCredentials:true // to store cookies 
      });

      console.log(res.data);
    }
    catch(err){
      console.log(err.response?.data || err.message);
    }

    clean();
  }

  return (
    <main>
      <div className="form-container">
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>

          <input required value={userName} 
          onChange={(e)=>{setUserName(e.target.value)}}
          type="text" name='userName' placeholder='Enter userName'/>

          <input required value={email} 
          onChange={(e)=>{setEmail(e.target.value)}} type="email" 
          name='Email' placeholder='Enter userEmail'/>

          <input required value={password} 
          onChange={(e)=>{setPassword(e.target.value)}} type="text" 
          name='password' placeholder='Enter password'/>

          <button type='submit'>Register</button>

        </form>
        <p>Already have an account? <Link className={"toggleAuth"} to="/login"> Login</Link></p>
      </div>
    </main>
  )
}

export default Register;