import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {PROXY_URL} from '../utils/constants'
import {toast} from 'react-hot-toast'

const Register = () => {

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullname, setFullname] = useState('');
  const [loading, setloading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e)=>{
        e.preventDefault();

        try {
          setloading(true);
            const info = {
                username , 
                password ,
                email ,
                fullname
            }

            const response = await fetch(`${PROXY_URL}/api/auth/signup` , {
                method: 'POST',
                headers : {'Content-Type' : 'application/json'},
                credentials : 'include',
                body : JSON.stringify(info)
            })

            const data = await response.json();

            if (data?.error) {
                toast.error(data?.error)
                setloading(false);
                return;
            }

            if (response.ok) {
              setloading(true);
                toast.success("Logged In Successfully !");
                navigate("/");
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
    </div> : <div className="flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8 col-span-5">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
          Register New account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit} method="post" encType="multipart/form-data" className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium leading-6 text-white">
              Username
            </label>
            <div className="mt-2">
              <input
              onChange={(e)=>{setUsername(e.target.value)}}
                id="username"
                name="username"
                type="text"
                value={username}
                required
                autoComplete="username"
                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label htmlFor="fullname" className="block text-sm font-medium leading-6 text-white">
              Fullname
            </label>
            <div className="mt-2">
              <input
              onChange={(e)=>{setFullname(e.target.value)}}
                id="fullname"
                name="fullname"
                type="text"
                value={fullname}
                required
                autoComplete="fullname"
                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-white">
              Email
            </label>
            <div className="mt-2">
              <input
              onChange={(e)=>{setEmail(e.target.value)}}
                id="email"
                name="email"
                type="email"
                value={email}
                required
                autoComplete="email"
                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-white">
                Password
              </label>
            </div>
            <div className="mt-2">
              <input
                onChange={(e)=>{setPassword(e.target.value)}}
                id="password"
                name="password"
                type="password"
                value={password}
                required
                autoComplete="current-password"
                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Register
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Already Register?{' '}
          <Link to="/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
            Login Here
          </Link>
        </p>
      </div>
    </div>
    }
    </>
  )
}

export default Register