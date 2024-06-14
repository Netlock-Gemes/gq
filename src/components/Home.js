import React, { useContext, useEffect, useState } from 'react';
import authContext from '../context/auth/authContext';
import logo from '../assets/GamifiedSec.png';
import circle from '../assets/circle.png';
import { Link } from 'react-router-dom';


function Home() {
  const { checkLogin, loggedInUserData, getAllUsersData, allUsersData } = useContext(authContext);
  const [selectedSubject, setSelectedSubject] = useState('economics');

  useEffect(() => {
    checkLogin();
    getAllUsersData();
  }, []);

  const renderLeaderboard = () => {
    const scores = allUsersData.map(user => ({
      name: user.name,
      score: user.score[selectedSubject] || 0
    }));

    scores.sort((a, b) => b.score - a.score);

    return (
      <div className='flex flex-col w-full mb-2'>
        {scores.map((user, index) => (
          <div key={index} className='flex justify-between mx-5 items-center text-white text-lg border-b'>
            <span>{user.name}:</span>
            <span>{user.score}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className='bg-secondary flex flex-col pt-10 pb-20 justify-center items-center min-h-screen relative'>
      <div className='absolute left-auto md:left-7 top-24 opacity-25 md:opacity-35 overflow-hidden'>
        <img src={circle} alt="circle-left" className='animate-slow-spin' />
      </div>
      <div className='hidden md:block absolute right-7 top-24 opacity-35 overflow-hidden'>
        <img src={circle} alt="circle-left" className='animate-slow-spin' />
      </div>
      <div className='w-2/3 md:w-fit'>
        <img src={logo} alt="Logo" />
      </div>
      <div className='flex justify-center items-center font-bold text-[#07E1E6] text-2xl md:text-3xl mt-7 mb-3'>
        Welcome {loggedInUserData?.name}!🕹️
      </div>
      <div className='flex md:w-1/4 w-1/2 mt-1 z-30'>
        <Link to={'/spin'} className='flex justify-center items-center bg-primary rounded-xl text-[#07E1E6] p-2 w-full shadow-sm hover:shadow-teal-300 font-bold text-xl border hover:border-transparent md:text-2xl'>Start Game</Link>
      </div>
      <div className='flex flex-col border-2 items-center justify-center mt-20 lg:w-1/3 w-2/3 rounded-xl z-30'>
        <span className='text-[#F0EEF2] font-bold text-2xl mt-2'>Leaderboard</span>
        <select
          className='mt-2 mb-2 px-4 py-1.5 rounded-lg bg-white border-transparent focus:outline-none'
          value={selectedSubject}
          onChange={(e) => setSelectedSubject(e.target.value)}
        >
          <option value="economics">Economics</option>
          <option value="it">IT</option>
          <option value="history">History</option>
          <option value="science">Science</option>
          <option value="gk">GK</option>
        </select>
        {renderLeaderboard()}
      </div>
    </div>
  );
}

export default Home;
