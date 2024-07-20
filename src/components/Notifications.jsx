import { Link } from "react-router-dom";

import { IoSettingsOutline } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import { useEffect, useState } from "react";
import {PROXY_URL} from '../utils/constants'
import {toast} from 'react-hot-toast'

const NotificationPage = () => {

	const [notifications, setNotifications] = useState([]);
	const [loading, setloading] = useState(false);


	const getNotifications = async ()=>{
		try {
			setloading(true);
			const response = await fetch(`${PROXY_URL}/api/notifications` , {
				credentials : 'include'
			})

			const data = await response.json();

			if(!response.ok){
				setloading(false);
				toast(data?.error);
				return;
			}

			setloading(false);
			// console.log(data);
			setNotifications(data);


		} catch (error) {
			console.log(error);
		}
	  }

	useEffect(() => {
	  getNotifications();
	}, [])
	

	const deleteNotifications = async () => {
		try {
			setloading(true);
			const response = await fetch(`${PROXY_URL}/api/notifications` , {
				method : "DELETE", 
				credentials : "include"
			})

			if (!response.ok) {
				setloading(false);
				toast(data?.error);
				return;
			}

			setloading(false);
			const data = await response.json();
			toast(data?.message);
			getNotifications();

		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			{
				loading ? <div className='grid col-span-3 place-items-center min-h-screen'>
				<div className="w-8 h-8 place-self-center border-4 border-gray-400 border-t-green-800 rounded-full animate-spin"></div>
			  </div>  : <div className='col-span-3 border-l border-r border-gray-700 min-h-screen'>
				<div className='flex space-x-2 justify-between items-center p-4 border-b border-gray-700'>
					<p className='font-bold'>Notifications</p>
					<button onClick={deleteNotifications} className="bg-red-700 text-white px-2 py-1 text-xs lg:text-sm rounded-md">
						Delete All
					</button>
				</div>
				{notifications?.length === 0 && <div className='text-center p-4 font-bold'>No notifications 🤔</div>}
				{notifications?.map((notification) => (
					<div className='border-b border-gray-700' key={notification._id}>
						<div className='flex gap-2 p-4'>
							{notification.type === "follow" && <FaUser className='w-7 h-7 text-blue-500' />}
							{notification.type === "like" && <FaHeart className='w-7 h-7 text-red-500' />}
							<Link to={`/profile/${notification.from.username}`}>
								<div className='avatar'>
									<div className='w-8 rounded-full'>
										<img className="rounded-full" src={notification?.from?.profileImg || "https://cdn-icons-png.flaticon.com/512/149/149071.png" } />
									</div>
								</div>
								<div className='flex gap-1'>
									<span className='font-bold'>@{notification.from.username}</span>{" "}
									{notification.type === "follow" ? "followed you" : "liked your post"}
								</div>
							</Link>
						</div>
					</div>
				))}
			</div>
			}
		</>
	);
};
export default NotificationPage;