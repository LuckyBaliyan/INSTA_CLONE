import { createPost, getFeed, likePost, unlikePost } from "../services/post.api";
import { useContext, useEffect } from "react";
import { PostContext } from "../post.context";

export const usePost = ()=>{
   const context = useContext(PostContext);

   const {loading, setLoading, feed, setFeed, posts, setPosts} = context;

   const handleGetFeed = async () => {
      setLoading(true);
      const data = await getFeed();
      setFeed(data.posts);
      setLoading(false);
   }

   const handleCreatePost = async (imageFile, caption) =>{
      setLoading(true);
      const data = await createPost(imageFile, caption);
      setFeed([data.post, ...feed]);
      setLoading(false);
   }

   //hydartion of feed don't neede we use [] instead of null in useState of feed
   //this was comming beacuse when are desturcturing feed even before fetching as
   // we create post and then navigate cause refetching and feed was not initially [] 
   // it was null which breaks 

   /*useEffect(()=>{
     handleGetFeed();
   },[])*/

   const handleLike = async (post)=>{
      const data = await likePost(post);
      await handleGetFeed();
   }

   const handleUnLike = async (post)=>{
      const data = await unlikePost(post);
      await handleGetFeed();
   }

   return {loading, feed, posts, handleGetFeed, handleCreatePost, handleLike, handleUnLike};
}