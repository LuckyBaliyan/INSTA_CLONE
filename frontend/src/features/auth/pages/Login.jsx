import React from 'react'
import {Link, useNavigate} from 'react-router'
import '../styles/form.scss';
import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import Loader from '../../../components/comman/Loader';

const Login = () => {

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const {handleLogin, loading} = useAuth();

  const navigate = useNavigate();

  async function clean(){
    setUserName("");
    setPassword("");
  }

  if(loading){
    return(
      <>
        <Loader />
      </>
    )
  }

  async function handleSubmit(e){
    e.preventDefault();

    try {
      await handleLogin(userName, password).then(res=>{
        console.log(res.data);
        navigate("/feed");
      });
    } catch (err) {
      console.log(err);
    }
    finally{
      clean();
    }

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
