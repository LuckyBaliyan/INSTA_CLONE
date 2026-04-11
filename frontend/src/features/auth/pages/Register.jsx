import React from 'react'
import { Link, useNavigate } from 'react-router'
import '../styles/form.scss';
import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import Loader from '../../../components/comman/Loader';

const Register = () => {

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { loading, handleRegister } = useAuth();
  const navigate = useNavigate();


  async function clean() {
    setUserName("");
    setEmail("");
    setPassword("");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await handleRegister(userName, email, password);
      clean();
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  }

  if (loading) {
    return (
      <>
        <Loader />
      </>
    )
  }


  return (
    <main>
      <div className="form-container">
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>

          <input required value={userName}
            onChange={(e) => { setUserName(e.target.value) }}
            type="text" name='userName' placeholder='Enter userName' />

          <input required value={email}
            onChange={(e) => { setEmail(e.target.value) }} type="email"
            name='Email' placeholder='Enter userEmail' />

          <input required value={password}
            onChange={(e) => { setPassword(e.target.value) }} type="password"
            name='password' placeholder='Enter password' />

          <button type='submit'>Register</button>

        </form>
        <p>Already have an account? <Link className={"toggleAuth"} to="/login"> Login</Link></p>
      </div>
    </main>
  )
}

export default Register;
