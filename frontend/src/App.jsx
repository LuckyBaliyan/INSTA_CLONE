import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './features/auth/pages/Login';
import Register from './features/auth/pages/Register';
import Feed from './features/post/pages/Feed';
import { CreatePost } from './features/post/pages/CreatePost';
import { Home } from './Home';

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
        <Route path={'/'} element={<Home />} />
        <Route path={'/feed'} element={<Feed />} />
        <Route path={"/createPost"} element={<CreatePost/>} />
        <Route path={'/login'} element={<Login/>}/>
        <Route path={'/register'} element={<Register/>} />
    </Routes>
    </BrowserRouter>
  )
}

export default App;
