import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PROXY_URL } from "../utils/constants";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setUser } from "../utils/authSlice";

const Login = () => {
  const [username, setUsername] = useState("adreanpatil");
  const [password, setPassword] = useState("adrean");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const info = {
        username,
        password,
      };

      const response = await fetch(`${PROXY_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(info),
      });

      const data = await response.json();

      if (data?.error) {
        setLoading(false);
        toast.error(data?.error);
        return;
      }

      if (response.ok) {
        setLoading(false);
        toast.success("Logged In Successfully !");
        dispatch(setUser(data));
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {loading ? (
        <div className="grid col-span-5 place-items-center min-h-screen">
          <div className="w-8 h-8 place-self-center border-4 border-gray-400 border-t-green-800 rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8 col-span-5">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
              Sign in to your account
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form
              onSubmit={handleSubmit}
              method="post"
              encType="multipart/form-data"
              className="space-y-6"
            >
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium leading-6 text-white"
                >
                  Username
                </label>
                <div className="mt-2">
                  <input
                    onChange={(e) => {
                      setUsername(e.target.value);
                    }}
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
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-white"
                  >
                    Password
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
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
                  Sign in
                </button>
              </div>
            </form>

            <p className="mt-10 text-center text-sm text-gray-500">
              New User?{" "}
              <Link
                to="/register"
                className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
              >
                Sign up Here
              </Link>
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
