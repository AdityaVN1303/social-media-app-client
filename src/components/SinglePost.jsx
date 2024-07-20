import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { PROXY_URL } from '../utils/constants';
import toast from 'react-hot-toast';
import Post from './Post';

const SinglePost = () => {

    const {id} = useParams();
    const [post, setPost] = useState(null);
    const [loading, setloading] = useState(false);
    useEffect(() => {
      const getPost = async ()=>{
        try {
          setloading(true);
            const response = await fetch(`${PROXY_URL}/api/posts/single/${id}` , {
                credentials : 'include'
            })

            const data = await response.json();
            if(!response.ok){
              setloading(false);
                toast(data?.error);
                return;
            }

            setloading(false);
            console.log(data);
            setPost(data);

        } catch (error) {
            console.log(error);
        }
      }
      getPost();
    }, [])
    

  return (
   <>
   {
    loading ? <div className='grid col-span-3 place-items-center min-h-screen'>
    <div className="w-8 h-8 place-self-center border-4 border-gray-400 border-t-green-800 rounded-full animate-spin"></div>
  </div> :  <div className="post col-span-3 w-full mr-auto border-r border-gray-700 min-h-screen">
    {
        post ? <Post poster={post}/> : <h1>Post Unavailable !!!</h1>
    }
</div>
   }
   </>
  )
}

export default SinglePost