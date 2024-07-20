import { useEffect, useState } from "react";
import {toast} from 'react-hot-toast'
import { PROXY_URL } from "../utils/constants";
import {useDispatch, useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import { setUser } from "../utils/authSlice";

const EditProfileModal = () => {

	const navigate = useNavigate();

	const [formData, setFormData] = useState({
		fullName: "",
		username: "",
		email: "",
		bio: "",
		link: "",
		newPassword: "",
		currentPassword: "",
	});

	const user = useSelector((store)=>store.auth.user);
	const dispatch = useDispatch();
	// console.log(user);

	useEffect(() => {
	  setFormData({
		fullName: user.fullname,
		username: user?.username,
		email: user?.email,
		bio: user?.bio,
		link: user?.link,
	  })
	}, [user])
	

	const handleInputChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const updateProfile = async (e)=>{
		e.preventDefault();
		try {
			const response = await fetch(`${PROXY_URL}/api/users/update` , {
				method : "POST" , 
				credentials : "include",
				body : JSON.stringify(formData), 
				headers : {
					'Content-Type' : 'application/json'
				}
			})

			const data = await response.json();

			if (!response.ok) {
				toast(data?.error);
				return; 
			}

			dispatch(setUser(data));

			toast("Profile Updated Successfully !");
			setFormData({
				fullName: "",
				username: "",
				email: "",
				bio: "",
				link: "",
				newPassword: "",
				currentPassword: "",
			})
			navigate("/");

		} catch (error) {
			console.log(error);
		}

	}

	return (
		<>
			<button
				className='btn rounded-full bg-blue-500 px-2 py-1 hover:bg-blue-400'
				onClick={() => document.getElementById("edit_profile_modal").showModal()}
			>
				Edit profile
			</button>
			<dialog id='edit_profile_modal' className='modal bg-black shadow-2xl text-white'>
				<div className='modal-box border p-2 rounded-md border-gray-700 shadow-md'>
					<h3 className='font-bold text-lg my-3'>Update Profile</h3>
					<form
						className='flex flex-col gap-4'
						onSubmit={updateProfile}
					>
						<div className='flex flex-wrap gap-2'>
							<input
								type='text'
								placeholder='Full Name'
								className='flex-1 input border bg-transparent border-gray-700 rounded p-2 box-content input-md'
								value={formData.fullName}
								name='fullName'
								onChange={handleInputChange}
							/>
							<input
								type='text'
								placeholder='Username'
								className='flex-1 input border bg-transparent border-gray-700 rounded p-2 input-md'
								value={formData.username}
								name='username'
								onChange={handleInputChange}
							/>
						</div>
						<div className='flex flex-wrap gap-2'>
							<input
								type='email'
								placeholder='Email'
								className='flex-1 input border bg-transparent border-gray-700 rounded p-2 input-md'
								value={formData.email}
								name='email'
								onChange={handleInputChange}
							/>
							<textarea
								placeholder='Bio'
								className='flex-1 input border bg-transparent border-gray-700 rounded p-2 input-md'
								value={formData.bio}
								name='bio'
								onChange={handleInputChange}
							/>
						</div>
						<div className='flex flex-wrap gap-2'>
							<input
								type='password'
								placeholder='Current Password'
								className='flex-1 input border bg-transparent border-gray-700 rounded p-2 input-md'
								value={formData.currentPassword}
								name='currentPassword'
								onChange={handleInputChange}
							/>
							<input
								type='password'
								placeholder='New Password'
								className='flex-1 input border bg-transparent border-gray-700 rounded p-2 input-md'
								value={formData.newPassword}
								name='newPassword'
								onChange={handleInputChange}
							/>
						</div>
						<input
							type='text'
							placeholder='Link'
							className='flex-1 input border bg-transparent border-gray-700 rounded p-2 input-md'
							value={formData.link}
							name='link'
							onChange={handleInputChange}
						/>
						<button type="submit" className='btn bg-blue-500 hover:bg-blue-700 px-2 py-2 rounded-full btn-sm text-white'>Update</button>
					</form>
				</div>
				<form method='dialog' className='modal-backdrop'>
					<button className='outline-none bg-white text-black p-1 rounded-sm text-sm'>close</button>
				</form>
			</dialog>
		</>
	);
};
export default EditProfileModal;