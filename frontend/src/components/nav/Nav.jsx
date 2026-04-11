import React from 'react'
import './styles/nav.scss'
import { useNavigate } from 'react-router'

const Nav = () => {
  const navigate = useNavigate();

  return (
    <nav className='nav-bar'>
        <p>Insta</p>
        <button onClick={()=>navigate("/createPost")} className='btn primary-btn'>new post</button>
    </nav>
  )
}

export default Nav;