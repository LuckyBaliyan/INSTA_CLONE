import React from 'react'
import { useNavigate } from 'react-router'

export const Home = () => {
  const navigate = useNavigate();
  return (
    <main className='home'>
        <h1>
            Welcome to Insta
        </h1>
        <button className='primary-btn' onClick={()=>navigate("/feed")}>
            Enter here
        </button>
    </main>
  )
}
