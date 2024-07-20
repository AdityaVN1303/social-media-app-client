import React from 'react'
import { Link } from 'react-router-dom'

const UserComponent = ({user}) => {
  return (
    <Link to={`/profile/${user?.username}`} className="user flex justify-start space-x-10 items-center p-2 my-10 border border-slate-700">
        <img className='w-10 h-10 rounded-full' src={user?.profileImg ||  "https://cdn-icons-png.flaticon.com/512/149/149071.png"} alt="" />
        <div className="write">
            <h1 className='font-bold'>{user?.fullname} , <span className='text-sm text-slate-500'>@{user?.username}</span> <span className='text-sm text-blue-600'>{user?.followers.length} followers</span></h1>
            <h1 className='text-sm'>{user?.bio}</h1>
        </div>
    </Link>
  )
}

export default UserComponent