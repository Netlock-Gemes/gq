import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import { IoMdClose } from "react-icons/io";
import 'react-toastify/dist/ReactToastify.css';
import authContext from '../context/auth/authContext';

const Login = () => {
    const { setIsLogin } = useContext(authContext);
    const [credentials, setCredetials] = useState({ email: "", password: "" });
    let navigate = useNavigate();

    const onChange = (e) => {
        setCredetials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        });
        setCredetials({ email: "", password: "" });
        setIsLogin(true);
        const data = await response.json();
        if (response.ok) {
            localStorage.setItem('token', data.token);
            toast.success("Login successful!", {
                autoClose: 2000,
            });
            setTimeout(() => navigate('/'), 2000); // Redirect after 2 seconds
        } else {
            toast.error(data.msg || "Login failed. Please try again.", {
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

    const [isMsgVisible, setIsMsgVisible] = useState("flex");

    return (
        <div className="min-h-screen flex items-center justify-center bg-secondary relative">
            <ToastContainer />
            <div className="absolute inset-0 bg-cover bg-center z-0" style={{ backgroundImage: "url('/path-to-your-background-image.jpg')" }}></div>
            <div className="bg-primary p-8 rounded-xl shadow-[0px_0px_20px_0px] shadow-[#30C7D6] w-full max-w-md z-10">
                <label className={`text-white text-3xl items-center justify-center form-label transition ease-in-out duration-500 flex mb-4 font-bold`}>Login</label>
                <form onSubmit={handleSubmit}>
                    {/* Email */}
                    <div className="mb-6">
                        <div className='flex justify-between'>
                            <label htmlFor='email' className={`text-white text-xl form-label transition ease-in-out duration-500 inline-block mb-2 font-semibold`}>Email ID</label>
                            <p className={`text-white transition ease-in-out duration-500 mt-2 text-sm`}>Need an account?
                                <Link to={'/register'} className={`text-sky-400 font-medium transition ease-in-out duration-500 mx-1`} >Register</Link>
                            </p>
                        </div>
                        <input id="email" type="email" onChange={onChange} value={credentials.email} name="email"
                            className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            placeholder="Enter Email ID" required />
                    </div>

                    {/* Password */}
                    <div className="mb-6 relative">
                        <div className='flex justify-between'>
                            <label htmlFor='password' className={`text-white text-xl form-label transition ease-in-out duration-500 inline-block mb-2 font-semibold`}>Password</label>
                            <button type="button" className="absolute right-3 top-10">
                                <FaEyeSlash onClick={togglePass} className={`${hideEyeSlash} text-white transition ease-in-out duration-500 h-5 w-5`} />
                                <FaEye onClick={togglePass} className={`${hideEye} text-white transition ease-in-out duration-500 h-5 w-5`} />
                            </button>
                        </div>
                        <input id="password" type={`${showPass}`} onChange={onChange} value={credentials.password} name="password"
                            className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            placeholder="Enter Password" required />
                    </div>

                    {/* Button */}
                    <div className="flex justify-center mb-4">
                        <button type='submit'
                            className="w-full px-2 py-3 md:py-2.5 bg-blue-600 text-white font-semibold text-lg leading-tight rounded shadow-md md:hover:bg-blue-800 hover:shadow-lg focus:bg-blue-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-600 active:shadow-lg active:text-gray-400 transition duration-150 ease-in-out">
                            Login
                        </button>
                    </div>

                    <div className="flex justify-center mb-4">
                        <p className={`text-white transition ease-in-out duration-500 text-sm cursor-pointer text-center`}>Forgot password?</p>
                    </div>
                </form>
            </div>

            {/* Welcome Message */}
            <div className={` ${isMsgVisible} flex-col fixed bottom-1 text-center px-4 py-6 bg-white bg-opacity-80 rounded-lg shadow-lg z-10`}>
                <button className='flex w-full justify-end text-2xl' onClick={()=>setIsMsgVisible("hidden")}><IoMdClose /></button>
                <h2 className="text-3xl font-bold text-blue-600 mb-4">Welcome to Gamified Quiz!</h2>
                <p className="text-gray-700 text-lg mb-4">Join our platform to test your knowledge, earn rewards, and compete with others in a fun and engaging way. Sign up today and start your journey towards becoming a quiz master!</p>
                <p className="text-gray-700 text-lg mb-4">Don't have an account? <Link to="/register" className="text-blue-600 underline">Register here</Link> to get started.</p>
                <p className="text-gray-700 text-lg">Already a member? Log in to access your personalized dashboard and continue your learning adventure.</p>
            </div>
        </div>
    );
};

export default Login;
