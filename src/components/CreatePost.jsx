import { CiImageOn } from "react-icons/ci";
import { BsEmojiSmileFill } from "react-icons/bs";
import { useRef, useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import {PROXY_URL} from '../utils/constants'
import {toast} from 'react-hot-toast'
import Picker from '@emoji-mart/react'
import data from '@emoji-mart/data'
import {useNavigate} from 'react-router-dom'
import {useSelector} from 'react-redux'

const CreatePost = () => {
	const [text, setText] = useState("");
	const [image, setImage] = useState(null);
	const [visible, setVisible] = useState(false);
	const [loading, setLoading] = useState(false);

	const imgRef = useRef(null);

	const navigate = useNavigate();
	const user = useSelector((store)=>store.auth.user);

	const isError = false;

	const handleSubmit = async (e) => {
		e.preventDefault();
		
		try {
			setLoading(true);
			if (!text) {
				toast("Enter some text creating post !!!");
				return;
			}
			const formData = new FormData();
			formData.append('text', text);
			formData.append('image', image);

			const response = await fetch(`${PROXY_URL}/api/posts/create` , {
				method : "POST" , 
				body : formData , 
				credentials : 'include'
			})

			const data = await response.json();
			if (!response.ok) {
				setLoading(false);
				toast(data.error);
				return;
			}
			// console.log(data);
			setLoading(false);
			toast("Post created Successfully !");
			setText("");
			setImage(null);
			navigate(`/profile/${user?.username}`);

		} catch (error) {
			console.log(error);
		}

	};

	const addEmoji = (e) => {
		const sym = e.unified.split("_");
		const codeArray = [];
		sym.forEach((el) => codeArray.push("0x" + el));
		let emoji = String.fromCodePoint(...codeArray);
		setText(text + emoji);
	  };

	return (
		<>
		{
			loading ? <div className='grid col-span-5 place-items-center min-h-screen'>
			<div className="w-8 h-8 place-self-center border-4 border-gray-400 border-t-green-800 rounded-full animate-spin"></div>
		  </div>  : <div className='flex p-4 items-start gap-4 border-b border-gray-700'>
			<div className='avatar'>
				<div className='w-8 rounded-full'>
					<img className="rounded-full" src={user?.profileImg ? user?.profileImg : "https://cdn-icons-png.flaticon.com/512/149/149071.png"} />
				</div>
			</div>
			<form className='flex flex-col gap-2 w-full' onSubmit={handleSubmit}>
				<textarea
					className='textarea w-full p-0 bg-transparent text-lg resize-none border-none focus:outline-none  border-gray-800'
					placeholder='What is happening?!'
					value={text}
					onChange={(e) => setText(e.target.value)}
				/>
				{image && (
					<div className='relative w-72 mx-auto'>
						<IoCloseSharp
							className='absolute top-0 right-0 text-white bg-gray-800 rounded-full w-5 h-5 cursor-pointer'
							onClick={() => {
								setImage(null);
								imgRef.current.value = null;
							}}
						/>
						<img src={image && URL.createObjectURL(image)} className='w-full mx-auto h-72 object-contain rounded' />
					</div>
				)}

				<div className='flex justify-between border-t py-2 border-t-gray-700'>
					<div className='flex gap-1 items-center relative'>
						<CiImageOn
							className='fill-primary w-6 h-6 cursor-pointer'
							onClick={() => imgRef.current.click()}
						/>
						<BsEmojiSmileFill onClick={()=>{setVisible(!visible)}} className='fill-primary w-5 h-5 cursor-pointer' />
						<div className="absolute top-10">
					{visible && <Picker data={data} onEmojiSelect={addEmoji}/> }
					</div>
					</div>
					<input type='file' hidden ref={imgRef} onChange={(e)=>{setImage(e.target.files[0])}} />
					<button className='btn bg-blue-500 py-1 rounded-full btn-sm text-white px-4'>
						Post
					</button>
				</div>
				{isError && <div className='text-red-500'>Something went wrong</div>}
			</form>
		</div>
		}
		</>
	);
};
export default CreatePost;