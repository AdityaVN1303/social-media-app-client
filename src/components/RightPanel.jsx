import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PROXY_URL } from "../utils/constants";
import toast from "react-hot-toast";

const RightPanel = () => {

    const [suggestedUsers, setSuggestedUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
      const getUsers = async ()=>{
        try {
            setLoading(true);
            const response = await fetch(`${PROXY_URL}/api/users/suggested` , {
                credentials : 'include'
            })

            const data = await response.json();

            if (!response.ok) {
                setLoading(false);
                toast(data?.error);
                return;
            }
            setLoading(false);
            // console.log(data);
            setSuggestedUsers(data);


        } catch (error) {
            console.log(error);
        }
      }
      getUsers();
    }, [])
    

	if (suggestedUsers?.length === 0) return <div className='md:w-64 w-0'></div>;

	return (
		<div className='hidden sticky top-2 w-full lg:block my-4 mx-2 col-span-1'>
			<div className='bg-[#16181C] p-4 w-full rounded-md'>
				<p className='font-bold'>Who to follow</p>
				<div className='flex flex-col gap-4'>
					{!loading &&
						suggestedUsers?.map((user) => (
							<Link
								to={`/profile/${user.username}`}
								className='flex items-center justify-between gap-4'
								key={user._id}
							>
								<div className='flex gap-2 items-center'>
									<div className='avatar'>
										<div className='w-8 rounded-full'>
											<img className="rounded-full" src={user.profileImg || "https://cdn-icons-png.flaticon.com/512/149/149071.png"} />
										</div>
									</div>
									<div className='flex flex-col'>
										<span className='font-semibold tracking-tight truncate w-28'>
											{user.fullname}
										</span>
										<span className='text-sm text-slate-500'>@{user.username}</span>
										<div>
								</div>
									</div>
								</div>
							</Link>
						))}
				</div>
			</div>
		</div>
	);
};
export default RightPanel;
