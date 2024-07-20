import Post from "./Post";
import { useEffect, useState } from "react";
import {toast} from 'react-hot-toast'
import {PROXY_URL} from '../utils/constants'

const Posts = ({feedType , userProfile , username}) => {

	const [POSTS, setPOSTS] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
	  const getPosts = async ()=>{
		setLoading(true);
		try {
			// console.log(feedType);
			const url = ()=>{
				if (feedType === "following") {
					return `${PROXY_URL}/api/posts/following`
				}
				else if(feedType === "likes"){
					return `${PROXY_URL}/api/posts/likes/${userProfile}`
				}
				else if(feedType === "posts"){
					return `${PROXY_URL}/api/posts/user/${username}`
				}
				else{
					return `${PROXY_URL}/api/posts/all`
				}
	
			}
	
			const response = await fetch(url() , {
				credentials : 'include'
			})

			const data = await response.json();
			if (!response.ok) {
				setLoading(false);
				toast(data?.error);
				return;
			}
			// console.log(data);
			setLoading(false);
			setPOSTS(data);

	
		  } catch (error) {
			console.log(error);
		  }
	  }
	  getPosts();
	}, [feedType , username])
	

	const isLoading = false;

	return (
		<>
			{!isLoading && POSTS?.length === 0 && <p className='text-center my-4'>No posts in this tab. Switch 👻</p>}
			{!isLoading && POSTS && (
				
					loading ? <div className='grid col-span-5 place-items-center min-h-screen'>
					<div className="w-8 h-8 place-self-center border-4 border-gray-400 border-t-green-800 rounded-full animate-spin"></div>
				  </div> : <div>
					{POSTS.map((post) => (
						<Post key={post._id} poster={post} />
					))}
				</div>
				
			)}
		</>
	);
};
export default Posts;