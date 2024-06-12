import React, { useEffect, useContext } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import authContext from '../context/auth/authContext';

const Profile = () => {
    const { checkLogin, loggedInUserData } = useContext(authContext);
    useEffect(() => {
        checkLogin();
    })

    return (
        <div className="min-h-screen flex items-center justify-center bg-secondary">
            <ToastContainer />
            <div className="bg-primary p-8 rounded-xl shadow-[0px_0px_20px_0px] shadow-[#30C7D6] w-full max-w-md">
                <label className={`text-white text-3xl items-center justify-center form-label transition ease-in-out duration-500 flex mb-4 font-bold`}>Profile</label>
                <div>
                    <p className="text-white text-xl mb-4"><strong>Name:</strong> {loggedInUserData.name}</p>
                    <p className="text-white text-xl mb-4"><strong>Email:</strong> {loggedInUserData.email}</p>
                </div>
            </div>
        </div>
    );
};

export default Profile;
