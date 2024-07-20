import React, { useEffect, useState } from 'react'
import {PROXY_URL} from '../utils/constants'
import {toast} from 'react-hot-toast'
import Post from './Post'

const Bookmarks = () => {

  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    const getBookmarks = async ()=>{
      try {
        const response = await fetch(`${PROXY_URL}/api/users/bookmark` , {
          credentials : 'include'
        })

        const data = await response.json();
        if(!response.ok){
          toast(data?.error);
          return;
        }
        setBookmarks(data);


      } catch (error) {
        console.log(error);
      }
    }
    getBookmarks();
  }, [])
  

  return (
    <div className="bookmarks col-span-3 mr-auto border-r border-gray-700 min-h-screen w-full">
      <h1 className='font-bold text-2xl py-10 text-center border-b border-gray-700'>Bookmarked Posts</h1>
      {
        bookmarks.length !== 0 ? bookmarks.map((item)=>{
          return <Post poster={item}/>
        }) : <h1 className='font-bold text-2xl text-center my-10'>You haven't Bookmarked any Posts !!!</h1>
      }
    </div>
  )
}

export default Bookmarks