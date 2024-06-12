import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import authContext from './authContext'



const AuthState = (props) => {


    const [isLogin, setIsLogin] = useState(false);

    const navigate = useNavigate();
    const checkLogin = () => {
        if (!localStorage.getItem('token')) {
            setIsLogin(true);
            navigate('/login');
        }
    }










    const [loggedInUserData, setLoggedInUserData] = useState([]);

    const getLoggedInUserData = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
            return;
        }

        const response = await fetch('http://localhost:5000/api/auth/profile', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': token,
            },
        });
        const data = await response.json();
        if (response.ok) {
            setLoggedInUserData(data);
        } else {
            // toast.error(data.msg || "Failed to fetch profile data", {
            //     autoClose: 2000,
            // });
            console.log(data)
            // navigate('/login');
        }
    };

    return (
        <authContext.Provider value={{ checkLogin, getLoggedInUserData, loggedInUserData, setLoggedInUserData, isLogin, setIsLogin }}>
            {props.children}
        </authContext.Provider>
    )
}

export default AuthState