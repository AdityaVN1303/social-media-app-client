import Post from "./Post";
import { useEffect, useState } from "react";
import {toast} from 'react-hot-toast'
import {PROXY_URL} from '../utils/constants'

const Posts = ({feedType , userProfile , username}) => {

	const [POSTS, setPOSTS] = useState([]);

	useEffect(() => {
	  const getPosts = async ()=>{
		try {
			console.log(feedType);
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
				toast(data?.error);
				return;
			}
			// console.log(data);
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
				<div>
					{POSTS.map((post) => (
						<Post key={post._id} poster={post} />
					))}
				</div>
			)}
		</>
	);
};
export default Posts;