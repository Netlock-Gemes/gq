import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authContext from './authContext';

const AuthState = (props) => {
    const [isLogin, setIsLogin] = useState(false);
    const [loggedInUserData, setLoggedInUserData] = useState([]);
    const [allUsersData, setAllUsersData] = useState([]);
    const navigate = useNavigate();

    const getLoggedInUserData = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/register');
            setIsLogin(false);
            return;
        }

        try {
            const response = await fetch(`${process.env.REACT_APP_HOST}/api/auth/profile`, {
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
                console.log(data);
                navigate('/register');
            }
        } catch (error) {
            console.error('Error fetching profile data:', error);
            navigate('/register');
        }
    };

    const checkLogin = async () => {
        await getLoggedInUserData();
    };

    const getAllUsersData = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_HOST}/api/auth/getUsersData`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.json();

            if (response.ok) {
                setAllUsersData(data);
            } else {
                console.log(data);
            }
        } catch (error) {
            console.error('Error fetching users data:', error);
        }
    };


    return (
        <authContext.Provider value={{ checkLogin, getLoggedInUserData, loggedInUserData, setLoggedInUserData, isLogin, setIsLogin, getAllUsersData, allUsersData }}>
            {props.children}
        </authContext.Provider>
    );
};

export default AuthState;
