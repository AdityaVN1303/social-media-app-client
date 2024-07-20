import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { PROXY_URL } from '../utils/constants';
import toast from 'react-hot-toast';
import Post from './Post';

const SinglePost = () => {

    const {id} = useParams();
    const [post, setPost] = useState(null);
    useEffect(() => {
      const getPost = async ()=>{
        try {
            const response = await fetch(`${PROXY_URL}/api/posts/single/${id}` , {
                credentials : 'include'
            })

            const data = await response.json();
            if(!response.ok){
                toast(data?.error);
                return;
            }

            console.log(data);
            setPost(data);

        } catch (error) {
            console.log(error);
        }
      }
      getPost();
    }, [])
    

  return (
    <div className="post col-span-3 w-full mr-auto border-r border-gray-700 min-h-screen">
        {
            post ? <Post poster={post}/> : <h1>Post Unavailable !!!</h1>
        }
    </div>
  )
}

export default SinglePost