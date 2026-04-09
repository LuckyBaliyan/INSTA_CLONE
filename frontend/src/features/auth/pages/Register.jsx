import React from 'react'
import {Link} from 'react-router'
import '../styles/form.scss';

const Register = () => {
  return (
    <main>
      <div className="form-container">
        <h1>Register</h1>
        <form>
          <input type="text" name='userName' placeholder='Enter userName'/>
          <input type="email" name='Email' placeholder='Enter userEmail'/>
          <input type="text" name='password' placeholder='Enter password'/>

          <button>Register</button>
        </form>
        <p>Already have an account? &nbsp;<Link className={"toggleAuth"} to="/login"> Login</Link></p>
      </div>
    </main>
  )
}

export default Register;