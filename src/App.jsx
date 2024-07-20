import { useEffect, useState } from "react"
import toast, {Toaster} from 'react-hot-toast'
import { Route , Routes } from "react-router-dom"
import { PROXY_URL } from "./utils/constants"
import { Navigate } from "react-router-dom"
import Homepage from './components/Homepage'
import Login from "./components/Login"
import Register from './components/Register'
import RightPanel from "./components/RightPanel"
import Sidebar from "./components/Sidebar"
import {useSelector , useDispatch} from 'react-redux'
import { setUser } from "./utils/authSlice"
import ProfilePage from "./components/Profile"
import NotificationPage from "./components/Notifications"
import Search from './components/Search'
import Bookmarks from './components/Bookmarks'
import SinglePost from "./components/SinglePost"

function App() {

  const authUser = useSelector((store)=>store.auth.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const getMe = async ()=>{
      try {
        const response = await fetch(`${PROXY_URL}/api/auth/me` , {
          credentials : 'include'
        })

        const data = await response.json();
        
        if (data?.error) {
          return;
        }

        // console.log(data);
        dispatch(setUser(data));

      } catch (error) {
        console.log(error);
      }
    }
    getMe();
  } , [])
  

  return (
    <div className="parent min-h-screen bg-black text-white">
    <div className="ap max-w-6xl mx-auto grid grid-cols-4 lg:grid-cols-5 pr-5">
      {
        authUser && <Sidebar authUser={authUser}/>
      }
    <Routes>
				<Route path='/' element={authUser ? <Homepage /> : <Navigate to='/login' />} />
        <Route path='/profile/:username' element={authUser ? <ProfilePage /> : <Navigate to='/login' />} />
        <Route path='/notifications' element={authUser ? <NotificationPage /> : <Navigate to='/login' />} />
				<Route path='/login' element={!authUser ? <Login /> : <Navigate to='/' />} />
        <Route path='/single/:id' element={authUser ? <SinglePost /> : <Navigate to='/login' />} />
        <Route path='/search' element={authUser ? <Search /> : <Navigate to='/login' />} />
        <Route path='/bookmarks' element={authUser ? <Bookmarks /> : <Navigate to='/login' />} />
				<Route path='/register' element={!authUser ? <Register /> : <Navigate to='/' />} />
			</Routes>
      {
        authUser && <RightPanel/>
      }
    </div>
    <Toaster/>
    </div>
  )
}

export default App