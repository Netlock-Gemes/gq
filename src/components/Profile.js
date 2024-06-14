import React, { useEffect, useContext } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import authContext from '../context/auth/authContext';
import { Link, useNavigate } from 'react-router-dom';
import blankprofile from '../assets/blankprofile.jpg';

const Profile = () => {
    const { checkLogin, loggedInUserData, setIsLogin } = useContext(authContext);
    let navigate = useNavigate();

    useEffect(() => {
        checkLogin();
    }, []);

    const calculateAchievements = (userData) => {
        if (!userData || !userData.score) return { highestScore: 0, quizzesCompleted: 0, bestCategory: '' };

        const scores = Object.entries(userData.score);
        const validScores = scores.map(([category, score]) => (typeof score === 'number' ? score : 0));
        const highestScore = Math.max(...validScores);
        const quizzesCompleted = validScores.filter(score => score > 5).length;
        const bestCategory = scores.reduce((best, [category, score]) => score > best.score ? { category, score } : best, { category: '', score: 0 }).category;

        return { highestScore, quizzesCompleted, bestCategory };
    };

    const { highestScore, quizzesCompleted, bestCategory } = calculateAchievements(loggedInUserData);

    const handleLogout = () => {
        setIsLogin(false);
        localStorage.clear();
        navigate('/login');
    };

    return (
        <div className="min-h-screen flex flex-col items-center pb-8 bg-secondary p-4 md:p-0">
            <ToastContainer theme="dark" />
            <div className="bg-primary p-6 md:p-8 rounded-xl shadow-[0px_0px_20px_0px] shadow-[#30C7D6] w-full max-w-md mt-10 md:mt-20">
                <label className="text-white text-2xl md:text-3xl flex justify-center items-center mb-4 font-bold">Profile</label>
                <div className="flex flex-col items-center">
                    <img
                        src={loggedInUserData.profilePicture || blankprofile}
                        alt="Profile"
                        className="rounded-full w-24 h-24 md:w-32 md:h-32 mb-4 shadow-lg"
                    />
                    <p className="text-white text-lg md:text-xl mb-2"><strong>Name:</strong> {loggedInUserData.name}</p>
                    <p className="text-white text-lg md:text-xl mb-2"><strong>Email:</strong> {loggedInUserData.email}</p>
                    <p className="text-white text-lg md:text-xl mb-4"><strong>Joined:</strong> {new Date(loggedInUserData.date).toLocaleDateString()}</p>
                    <div className="flex flex-col md:flex-row justify-between w-full gap-4">
                        <Link to="/spin" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 text-center">Play Quiz</Link>
                        <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 text-center">Logout</button>
                    </div>
                </div>
            </div>
            <div className="bg-primary p-6 md:p-8 rounded-xl shadow-[0px_0px_20px_0px] shadow-[#30C7D6] w-full max-w-md mt-8 md:mt-10">
                <label className="text-white text-xl md:text-2xl flex justify-center items-center mb-4 font-bold">Activity Summary</label>
                <div className="text-white text-base md:text-lg">
                    <p className='text-white flex justify-between w-full px-4'><span>Highest Score:</span><span>{highestScore}</span></p>
                    <p className='text-white flex justify-between w-full px-4'><span>Quizzes Completed:</span><span> {quizzesCompleted}</span></p>
                    <p className='text-white flex justify-between w-full px-4'><span>Best Category: </span><span>{bestCategory === '' ? "None" : bestCategory}</span></p>
                </div>
            </div>
        </div>
    );
};

export default Profile;
