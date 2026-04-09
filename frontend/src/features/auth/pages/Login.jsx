import React from 'react'
import {Link} from 'react-router'
import '../styles/form.scss';

const Login = () => {
  return (
    <main>
        <div className="form-container">
            <h1>Login</h1>
            <form action="">
                <input type="text" name="userName" placeholder='Enter Username'/>
                <input type="text"  name="password" placeholder='Enter password' />
                <button type='submit'>Login</button>
            </form>
            <p>Don't have an account? &nbsp;<Link className={"toggleAuth"} to="/register">Register</Link></p>
        </div>
    </main>
  )
}

export default Login;
