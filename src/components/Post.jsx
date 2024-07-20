import { FaBookmark , FaHeart , FaRegComment, FaRegEye } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa";
import { useEffect, useState } from "react";
import { Link} from "react-router-dom";
import {useSelector} from 'react-redux'
import DeletePopup from './DeletePopup'
import { PROXY_URL } from "../utils/constants";
import toast from "react-hot-toast";
import { formatDistance } from 'date-fns';

const Post = ({ poster }) => {

	const [comment, setComment] = useState("");
	const [ago, setAgo] = useState(null);
	const [dialog, setDialog] = useState(false);
	const postOwner = poster.user;
	const [isLiked, setIsLiked] = useState(false);
	const [likeLoading, setlikeLoading] = useState(false);
	const [likeCount, setLikeCount] = useState(0);
	const [post, setPost] = useState(poster);
	const [isBookmarked, setIsBookmarked] = useState(false);

	const user = useSelector((store)=>store.auth.user);
	useEffect(() => {
	  const getPost = async ()=>{
		try {
			const response = await fetch(`${PROXY_URL}/api/posts/single/${poster?._id}` , {
				credentials : 'include'
			})

			const data = await response.json();
			if(!response.ok){
				toast(data?.error);
				return;
			}
			// console.log(data);
			setPost(data);
			setIsLiked(data?.likes?.includes(user._id))
			setLikeCount(data?.likes?.length);
			setIsBookmarked(user?.bookmarks?.includes(data?._id));


			// Date Formatting Code
			const date = new Date(data?.createdAt);

			const timeAgo = formatDistance(date, new Date(), { units: ['minutes', 'hours' , 'months'] })
			// console.log(timeAgo);
			setAgo(timeAgo);

			// Ends here


		} catch (error) {
			console.log(error);
		}
	  }
	  getPost();
	}, [])

	const isMyPost = (user?._id === poster?.user?._id);

	const handlePostComment = async (e) => {
		e.preventDefault();
		try {
			const response = await fetch (`${PROXY_URL}/api/posts/comment/${poster?._id}` , {
				credentials : 'include' , 
				method : "POST" , 
				body : JSON.stringify({text : comment}),
				headers : {
					'Content-Type' : 'application/json'
				}
			})

			const data = await response.json();
			if(!response.ok){
				toast(data?.error);
				return;
			}
			console.log(data);
			setPost(data);
			setComment("");
			toast("Comment Posted !");

		} catch (error) {
			console.log(error);
		}
	};

	const handleLikePost = async () => {
		try {
			setlikeLoading(true);
			const response = await fetch(`${PROXY_URL}/api/posts/like/${post?._id}` , {
				credentials : 'include',
				method : 'POST', 
			})

			const data = await response.json();

			if (!response.ok) {
				setlikeLoading(false);
				toast(data?.error);
				return;
			}
			console.log(data);
			setlikeLoading(false);
			setIsLiked(!isLiked);
			setLikeCount(data?.length);

		} catch (error) {
			console.log(error);
		}

	};

	const handleCancel = ()=>{
		setDialog(false);
	}

	const toggleBookmark = async ()=>{
		try {
			const response = await fetch(`${PROXY_URL}/api/users/toggle/${post._id}` , {
				credentials : 'include' , 
				method : "POST"
			})

			const data = await response.json();
			if (!response.ok) {
				toast(data?.error);
				return;
			}
			toast(data?.message);
			setIsBookmarked(data?.bookmark);

		} catch (error) {
			console.log(error);
		}
	}

	return (
		<>
			<div className='flex gap-2 items-start p-4 border-b border-gray-700'>
				{dialog && <DeletePopup handleCancel={handleCancel} id={post._id} username={post.user.username}/>}
				<div className='avatar'>
					<Link to={`/profile/${postOwner.username}`} className='w-8 rounded-full overflow-hidden'>
						<img className="w-8 rounded-full" src={postOwner?.profileImg ? postOwner?.profileImg : "https://cdn-icons-png.flaticon.com/512/149/149071.png"} />
					</Link>
				</div>
				<div className='flex flex-col flex-1'>
					<div className='flex gap-2 items-center'>
						<Link to={`/profile/${postOwner.username}`} className='font-bold'>
							{postOwner.fullName}
						</Link>
						<span className='text-gray-700 flex gap-1 text-sm'>
							<Link to={`/profile/${postOwner.username}`}>@{postOwner.username}</Link>
							<span>·</span>
							<span>{ago}</span>
						</span>
						{isMyPost && (
							<span className='flex justify-end flex-1'>
								<FaTrash className='cursor-pointer hover:text-red-500' onClick={()=>{setDialog(true)}} />
							</span>
						)}
					</div>
					<div className='flex flex-col gap-3 overflow-hidden'>
						<span>{post.text}</span>
						{post.img && (
							<img
								src={post.img}
								className=' object-contain rounded-lg border border-gray-700'
								alt=''
							/>
						)}
					</div>
					<div className='flex justify-between mt-3'>
						<div className='flex gap-4 items-center w-2/3 justify-between'>
							<div
								className='flex gap-1 items-center cursor-pointer group'
								onClick={() => document.getElementById("comments_modal" + post._id).showModal()}
							>
								<FaRegComment className='w-4 h-4  text-slate-500 group-hover:text-sky-400' />
								<span className='text-sm text-slate-500 group-hover:text-sky-400'>
									{post.comments.length}
								</span>
							</div>
							{/* We're using Modal Component from DaisyUI */}
							<dialog id={`comments_modal${post._id}`} className='modal p-2 bg-black shadow-2xl text-white border-none outline-none'>
								<div className='modal-box rounded border border-gray-600 p-2 box-content'>
									<h3 className='font-bold text-lg mb-4'>COMMENTS</h3>
									<div className='flex flex-col gap-3 max-h-60 overflow-auto'>
										{post.comments.length === 0 && (
											<p className='text-sm text-slate-500'>
												No comments yet 🤔 Be the first one 😉
											</p>
										)}
										{post.comments.map((comment) => (
											<Link to={`/profile/${comment.user.username}`} key={comment._id} className='flex gap-2 items-start'>
												<div className='avatar'>
													<div className='w-8 rounded-full'>
														<img
															src={comment.user.profileImg || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
														/>
													</div>
												</div>
												<div className='flex flex-col'>
													<div className='flex items-center gap-1'>
														<span className='font-bold'>{comment.user.fullName}</span>
														<span className='text-gray-700 text-sm'>
															@{comment.user.username}
														</span>
													</div>
													<div className='text-sm'>{comment.text}</div>
												</div>
											</Link>
										))}
									</div>
									<form
										className='flex gap-2 items-center mt-4 border-t border-gray-600 pt-2'
										onSubmit={handlePostComment}
									>
										<textarea
											className='textarea w-full p-1 rounded bg-transparent text-white text-md resize-none border focus:outline-none  border-gray-800'
											placeholder='Add a comment...'
											value={comment}
											onChange={(e) => setComment(e.target.value)}
										/>
										<button type="submit" className=' bg-blue-500  text-white rounded-sm p-4'>
												Post
										</button>
									</form>
								</div>
								<form method='dialog' className='modal-backdrop'>
									<button className='outline-none bg-white text-black p-1 rounded-sm text-sm'>close</button>
								</form>
							</dialog>
							<div className='flex gap-1 items-center group cursor-pointer'>
									<Link to={`/single/${post?._id}`}>
									<FaRegEye />
									</Link>
							</div>
							{
								likeLoading ? <div className="w-4 h-4 place-self-center border-4 border-gray-400 border-t-green-800 rounded-full animate-spin"></div> : <div className='flex gap-1 items-center group cursor-pointer' onClick={handleLikePost}>
								{!isLiked && (
									<FaRegHeart className='w-4 h-4 cursor-pointer text-slate-500 group-hover:text-pink-500' />
								)}
								{isLiked && <FaHeart />}

								<span
									className={`text-sm text-slate-500 group-hover:text-pink-500 ${
										isLiked ? "text-pink-500" : ""
									}`}
								>
									{likeCount}
								</span>
							</div>
							}
						</div>
						<div onClick={toggleBookmark} className='flex w-1/3 justify-end gap-2 items-center'>
							{
								!isBookmarked ? <FaRegBookmark className='w-4 h-4 text-slate-500 cursor-pointer' /> :
								<FaBookmark className='w-4 h-4 cursor-pointer' />
							}
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
export default Post;