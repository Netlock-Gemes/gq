import React, { useEffect, useContext } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import authContext from '../context/auth/authContext';
import { Link } from 'react-router-dom';
import blankprofile from '../assets/blankprofile.jpg';


const Profile = () => {
    const { checkLogin, loggedInUserData, setIsLogin } = useContext(authContext);
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

    return (
        <div className="min-h-screen flex flex-col items-center pb-8 bg-secondary">
            <ToastContainer />
            <div className="bg-primary p-8 rounded-xl shadow-[0px_0px_20px_0px] shadow-[#30C7D6] w-full max-w-md mt-20">
                <label className="text-white text-3xl flex justify-center items-center mb-4 font-bold">Profile</label>
                <div className="flex flex-col items-center">
                    <img
                        src={loggedInUserData.profilePicture || blankprofile}
                        alt="Profile"
                        className="rounded-full w-32 h-32 mb-4 shadow-lg"
                    />
                    <p className="text-white text-xl mb-2"><strong>Name:</strong> {loggedInUserData.name}</p>
                    <p className="text-white text-xl mb-2"><strong>Email:</strong> {loggedInUserData.email}</p>
                    <p className="text-white text-xl mb-2"><strong>Role:</strong> {loggedInUserData.role || "User"}</p>
                    <p className="text-white text-xl mb-4"><strong>Joined:</strong> {new Date(loggedInUserData.date).toLocaleDateString()}</p>
                    <div className="flex justify-between w-full">
                        <Link to="/spin" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">Play Quiz</Link>
                        <button onClick={() => {
                            setIsLogin(false);
                            localStorage.clear();
                        }} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700">Logout</button>
                    </div>
                </div>
            </div>
            <div className="bg-primary p-8 rounded-xl shadow-[0px_0px_20px_0px] shadow-[#30C7D6] w-full max-w-md mt-10">
                <label className="text-white text-2xl flex justify-center items-center mb-4 font-bold">Activity Summary</label>
                <div className="text-white text-lg">
                    <p className="mb-2"><strong>Highest Score: </strong> {highestScore}</p>
                    <p className="mb-2"><strong>Quizzes Completed: </strong> { quizzesCompleted }</p>
                    <p className="mb-2"><strong>Top Category: </strong> {bestCategory === '' ? "None" : bestCategory}</p>
                </div>
            </div>
        </div>
    );
};

export default Profile;
