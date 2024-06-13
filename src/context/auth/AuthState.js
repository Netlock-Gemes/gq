import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authContext from './authContext';
import { toast } from 'react-toastify';

const AuthState = (props) => {
    const [isLogin, setIsLogin] = useState(false);
    const [loggedInUserData, setLoggedInUserData] = useState([]);
    const navigate = useNavigate();

    const getLoggedInUserData = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/api/auth/profile', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': token,
                },
            });

            const data = await response.json();

            if (response.ok) {
                setIsLogin(true);
                setLoggedInUserData(data);
            } else {
                toast.error(data.msg || "Failed to fetch profile data", {
                    autoClose: 2000,
                });
                console.log(data);
                navigate('/login');
            }
        } catch (error) {
            console.error('Error fetching profile data:', error);
            toast.error('An error occurred while fetching profile data', {
                autoClose: 2000,
            });
            navigate('/login');
        }
    };

    const checkLogin = async () => {
        await getLoggedInUserData();
        if (!isLogin) {
            console.log(isLogin);
            // navigate('/login');
        }
    };

    return (
        <authContext.Provider value={{ checkLogin, getLoggedInUserData, loggedInUserData, setLoggedInUserData, isLogin, setIsLogin }}>
            {props.children}
        </authContext.Provider>
    );
};

export default AuthState;
