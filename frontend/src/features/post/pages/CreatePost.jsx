import React, { useState } from 'react'
import '../styles/createPost.scss'
import ImageUploadSkeleton from '../components/ImageUploadSkeleton'
import { usePost } from '../hooks/usePost'
import Loader from '../../../components/comman/Loader'
import { useNavigate } from 'react-router'

export const CreatePost = () => {
  const [imageFile, setImageFile] = useState(null);
  const [caption, setCaption] = useState("");

  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files && e.target.files[0] ? e.target.files[0] : null;
    setImageFile(file);
  };

  const {handleCreatePost, loading} = usePost();

  async function handleSubmit(e){
    e.preventDefault();

    await handleCreatePost(imageFile, caption).then(res=>{
        navigate("/feed");
    })

  }

  if(loading){
    return(
        <>
         <Loader/>
        </>
    )
  }

  return (
    <main className='create-post-page'>
        <div className="form-container">
            <h1>Create Post</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="postImage" className={'post-image-label'}>
                    <ImageUploadSkeleton hasImage={!!imageFile} fileName={imageFile?.name} />
                </label>
                <input type="file" name="postImage" id="postImage" hidden onChange={handleImageChange}/>
                <input value={caption} onChange={(e)=>setCaption(e.target.value)} type="text" name="caption" id="caption" placeholder='enter caption'/>
                <button className="button primary-btn">Create Post</button>
            </form>
        </div>
    </main>
  )
}


