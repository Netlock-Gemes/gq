import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import authContext from '../context/auth/authContext';

const Register = () => {
    const { setIsLogin } = useContext(authContext);
    const [credentials, setCredetials] = useState({ name: "", email: "", password: "" });
    let navigate = useNavigate();

    const onChange = (e) => {
        setCredetials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:5000/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        });
        setCredetials({ name: "", email: "", password: "" });
        setIsLogin(true);
        const data = await response.json();
        if (response.ok) {
            localStorage.setItem('token', data.token);
            toast.success("Registration successful!", {
                autoClose: 2000,
            });
            setTimeout(() => navigate('/'), 2000); // Redirect after 2 seconds
        } else {
            toast.error(data.msg || "Registration failed. Please try again.", {
                autoClose: 2000,
            });
        }
    };

    const [showPass, setShowPass] = useState("password");
    const [hideEye, setHideEye] = useState("hidden");
    const [hideEyeSlash, setHideEyeSlash] = useState("block");
    const togglePass = () => {
        if (showPass === "password") {
            setShowPass("");
            setHideEye("block");
            setHideEyeSlash("hidden");
        } else {
            setShowPass("password");
            setHideEyeSlash("block");
            setHideEye("hidden");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-secondary">
            <ToastContainer />
            <div className="bg-primary p-8 rounded-xl shadow-[0px_0px_20px_0px] shadow-[#30C7D6] w-full max-w-md">
                <label className={`text-white text-3xl items-center justify-center form-label transition ease-in-out duration-500 flex mb-4 font-bold`}>Register</label>
                <form onSubmit={handleSubmit}>
                    {/* Name */}
                    <div className="mb-6">
                        <label htmlFor='name' className={`text-white text-xl form-label transition ease-in-out duration-500 inline-block mb-2 font-semibold`}>Name</label>
                        <input id="name" type="text" onChange={onChange} value={credentials.name} name="name"
                            className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            placeholder="Enter your name" required />
                    </div>

                    {/* Email */}
                    <div className="mb-6">
                        <label htmlFor='email' className={`text-white text-xl form-label transition ease-in-out duration-500 inline-block mb-2 font-semibold`}>Email ID</label>
                        <input id="email" type="email" onChange={onChange} value={credentials.email} name="email"
                            className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            placeholder="Enter Email ID" required />
                    </div>

                    {/* Password */}
                    <div className="mb-6">
                        <div className='flex justify-between'>
                            <label htmlFor='password' className={`text-white text-xl form-label transition ease-in-out duration-500 inline-block mb-2 font-semibold`}>Password</label>
                            <button type="button">
                                <FaEyeSlash onClick={togglePass} className={`${hideEyeSlash} text-white transition ease-in-out duration-500 h-5 w-5 mr-2 mt-2`} />
                                <FaEye onClick={togglePass} className={`${hideEye} text-white transition ease-in-out duration-500 h-5 w-5 mr-2 mt-2`} />
                            </button>
                        </div>
                        <input id="password" type={`${showPass}`} onChange={onChange} value={credentials.password} name="password"
                            className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            placeholder="Enter Password" required />
                    </div>

                    {/* Remember me */}
                    {/* <div className="flex mb-6">
                        <div className="flex h-3 mt-0.5">
                            <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300" />
                        </div>
                        <label htmlFor="remember" className={`select-none text-gray-300 ml-2 text-sm font-medium transition ease-in-out duration-500 cursor-pointer`}>Remember me</label>
                    </div> */}

                    <p className={`text-white transition ease-in-out duration-500 my-2 text-sm`}>Already have an account?
                        <Link to={'/login'} className={`text-sky-400 font-medium transition ease-in-out duration-500 mx-1`} >Login</Link>
                    </p>

                    {/* Button */}
                    <div className="flex justify-center">
                        <button type='submit'
                            className="w-full px-2 py-3 md:py-2.5 bg-blue-600 text-white font-semibold text-lg leading-tight rounded shadow-md md:hover:bg-blue-800 hover:shadow-lg focus:bg-blue-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-600 active:shadow-lg active:text-gray-400 transition duration-150 ease-in-out">
                            Sign up
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
