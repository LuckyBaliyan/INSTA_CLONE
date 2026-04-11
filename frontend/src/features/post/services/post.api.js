import axios from 'axios';

const api = axios.create({
    baseURL:"http://localhost:3000",
    withCredentials:true
});


export async function getFeed() {
    const response = await api.get("/api/posts/feed");
    return response.data;
}

export async function createPost(file,caption){
   //files can't be shared via json

   const formData = new FormData();

   formData.append("image", file);
   formData.append("caption", caption);

   const res = await api.post("/api/posts", formData);

   return res.data;
}

export async function likePost(postId){
    const res = await api.post(`/api/posts/like/${postId}`);
    return res.data;
}

export async function unlikePost(postId){
    const res = await api.post(`/api/posts/unlike/${postId}`);
    return res.data;
}
