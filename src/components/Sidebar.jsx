import XSvg from "../components/assets/svgs/X";

import { MdHomeFilled } from "react-icons/md";
import { IoBookmark, IoNotifications } from "react-icons/io5";
import { FaSearch, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { BiLogOut } from "react-icons/bi";
import toast from "react-hot-toast";
import { PROXY_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { setUser } from "../utils/authSlice";
import { useEffect, useState } from "react";

const Sidebar = ({authUser}) => {

    const navigate = useNavigate();
	const dispatch = useDispatch();

	const [count, setCount] = useState(0);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
	  const getCount = async ()=>{
		try {
			const response = await fetch(`${PROXY_URL}/api/notifications` , {
				credentials : 'include'
			});
			const data = await response.json();
			if(!response.ok){
				toast(data?.error);
				return;
			}

			setCount(data.length);



		} catch (error) {
			console.log(error);
		}
	  }
	  getCount();
	}, [])
	

    const logout = async ()=>{
       try {
		setLoading(true);
		const response = await fetch(`${PROXY_URL}/api/auth/logout` , {
            method : "POST",
            credentials : 'include' ,
            headers : {
                'Content-Type' : 'application/json'
            }
        })

        const data = await response.json();

        if(!response.ok){
            toast(data?.error);
			setLoading(false);
            return;
        }
        else{
			setLoading(false);
            toast(data.message);
			dispatch(setUser(null));			
            navigate("/login");
        }
	   } catch (error) {
		console.log(error);
	   }

    }

	return (
		<>
		{
			loading ? <div className='grid col-span-5 place-items-center min-h-screen'>
			<div className="w-8 h-8 place-self-center border-4 border-gray-400 border-t-green-800 rounded-full animate-spin"></div>
		  </div> : <div className='col-span-1'>
			{
                authUser && <div className='sticky top-0 left-0 h-screen flex flex-col border-r border-gray-700 w-20 md:w-full'>
				<Link to='/' className='flex justify-center md:justify-start'>
				 <img className="w-14 mt-5 px-2 object-cover" src="https://www.shareicon.net/data/128x128/2015/08/28/91993_ball_512x512.png" alt="" />
				</Link>
				<ul className='flex flex-col gap-3 mt-4'>
					<li className='flex justify-center md:justify-start'>
						<Link
							to='/'
							className='flex gap-3 items-center hover:bg-stone-900 transition-all rounded-full duration-300 py-2 pl-2 pr-4 max-w-fit cursor-pointer'
						>
							<MdHomeFilled className='w-8 h-8' />
							<span className='text-lg hidden md:block'>Home</span>
						</Link>
					</li>

					<li className='flex justify-center md:justify-start'>
						<Link
							to={`/search`}
							className='flex gap-3 items-center hover:bg-stone-900 transition-all rounded-full duration-300 py-2 pl-2 pr-4 max-w-fit cursor-pointer'
						>
							<FaSearch className="h-6 w-6" />
							<span className='text-lg hidden md:block'>Search</span>
						</Link>
					</li>


					<li className='flex justify-center md:justify-start'>
						<Link
							to='/notifications'
							onClick={()=>{setCount(0)}}
							className='flex gap-3 relative items-center hover:bg-stone-900 transition-all rounded-full duration-300 py-2 pl-2 pr-4 max-w-fit cursor-pointer'
						>
							<IoNotifications className='w-6 h-6' />
							<span className='text-lg hidden md:block'>Notifications</span>
							{
								count !== 0 && <span className="absolute bg-red-600 text-red-100 px-2 py-1 text-xs font-bold rounded-full -top-3 -right-3">{count}</span>
							}
						</Link>
					</li>

					<li className='flex justify-center md:justify-start'>
						<Link
							to={`/bookmarks`}
							className='flex gap-3 items-center hover:bg-stone-900 transition-all rounded-full duration-300 py-2 pl-2 pr-4 max-w-fit cursor-pointer'
						>
							<IoBookmark className="h-6 w-6" />
							<span className='text-lg hidden md:block'>Bookmarks</span>
						</Link>
					</li>

					<li className='flex justify-center md:justify-start'>
						<Link
							to={`/profile/${authUser?.username}`}
							className='flex gap-3 items-center hover:bg-stone-900 transition-all rounded-full duration-300 py-2 pl-2 pr-4 max-w-fit cursor-pointer'
						>
							<FaUser className='w-6 h-6' />
							<span className='text-lg hidden md:block'>Profile</span>
						</Link>
					</li>
				</ul>
				{authUser && (
					<button onClick={logout}
						className='mt-auto mb-10 flex gap-2 items-start transition-all duration-300 hover:bg-[#181818] py-2 px-4 rounded-full'
					>
						<div className='avatar hidden md:inline-flex'>
							<div className='w-8 rounded-full'>
								<img className="rounded-full" src={authUser?.profileImg || "https://cdn-icons-png.flaticon.com/512/149/149071.png"} />
							</div>
						</div>
						<div className='flex justify-between flex-1'>
							<div className='hidden md:block'>
								<p className='text-white font-bold text-sm w-20 truncate'>{authUser?.fullName}</p>
								<p className='text-slate-500 text-sm'>@{authUser?.username}</p>
							</div>
							<BiLogOut
								className='w-5 h-5 cursor-pointer'
							/>
						</div>
					</button>
				)}
			</div>
            }
		</div>
		}
		</>
	);
};
export default Sidebar;
