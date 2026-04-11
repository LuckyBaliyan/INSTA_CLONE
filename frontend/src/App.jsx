import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './features/auth/pages/Login';
import Register from './features/auth/pages/Register';
import Feed from './features/post/pages/Feed';

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
        <Route path={'/'} element={<h1>Welcome to Home</h1>} />
        <Route path={'/feed'} element={<Feed />} />
        <Route path={'/login'} element={<Login/>}/>
        <Route path={'/register'} element={<Register/>} />
    </Routes>
    </BrowserRouter>
  )
}

export default App;
