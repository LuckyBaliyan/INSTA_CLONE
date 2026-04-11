import { getFeed } from "../services/post.api";
import { useContext } from "react";
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

   return {loading, feed, posts, handleGetFeed};
}