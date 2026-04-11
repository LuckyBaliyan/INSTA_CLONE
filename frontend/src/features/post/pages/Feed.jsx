import React from 'react'
import '../styles/feed.scss';
import Post from '../components/Post';
import { usePost } from '../hooks/usePost';
import { useEffect } from 'react';
import Loader from '../../../components/comman/Loader';
import Nav from '../../../components/nav/Nav';

const Feed = () => {

  const {feed, loading, handleGetFeed, handleLike, handleUnLike} = usePost();

  useEffect(()=>{
    handleGetFeed();
  },[]);

  
  if(loading || !feed){
    return (
        <>
         <Loader />
        </>
    )
  }

  return (
   <main className='feed-page'>
    <Nav />
     <div className="feed">
        <div className="posts">
            {
              feed.map((post, index)=>(
                //handle the case of same string id then use mongo._id or index
                <Post key={post._id || post.id || index} user={post.user} post={post}
                loading={loading} handleLike={handleLike} handleUnLike={handleUnLike}/>
              ))
            }
        </div>
     </div>
   </main>
  )
}

export default Feed;
