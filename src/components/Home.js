import React, { useContext, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import authContext from '../context/auth/authContext';
import logo from '../assets/logo2.png';
import circle from '../assets/circle.png';
import { Link } from 'react-router-dom';

function Home() {
  const { checkLogin, loggedInUserData, getAllUsersData, allUsersData } = useContext(authContext);
  const [selectedSubject, setSelectedSubject] = useState('economics');
  const [dropdownOpen, setDropdownOpen] = useState(false);

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
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className='flex flex-col w-full mb-2'
      >
        {scores.map((user, index) => (
          <motion.div
            key={index}
            className={`flex justify-between mx-5 items-center text-lg py-2 px-4 rounded-lg mb-2 ${index % 2 === 0 ? 'bg-[#e0f7fa]' : 'bg-[#b2ebf2]'}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <span>{index + 1}.</span>
            <span className='font-semibold'>{user.name}</span>
            <span className='font-bold text-indigo-700'>{user.score}</span>
          </motion.div>
        ))}
      </motion.div>
    );
  };

  const handleSubjectChange = (subject) => {
    setSelectedSubject(subject);
    setDropdownOpen(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className='bg-secondary flex flex-col pt-10 pb-20 justify-center items-center min-h-screen relative'
    >
      <div className='absolute left-auto md:left-7 top-24 opacity-25 md:opacity-35 overflow-hidden'>
        <img src={circle} alt="circle-left" className='animate-slow-spin' />
      </div>
      <div className='hidden md:block absolute right-7 top-24 opacity-35 overflow-hidden'>
        <img src={circle} alt="circle-left" className='animate-slow-spin' />
      </div>
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
        className='w-2/3 md:w-fit'
      >
        <img src={logo} alt="Logo" />
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className='flex justify-center items-center font-bold text-[#07E1E6] text-2xl md:text-3xl mt-7 mb-3'
      >
        Welcome {loggedInUserData?.name}!🕹️
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className='flex md:w-1/4 w-1/2 mt-1 z-30'
      >
        <Link to={'/spin'} className='flex justify-center items-center bg-primary rounded-xl text-[#07E1E6] p-2 w-full shadow-sm hover:shadow-teal-300 font-bold text-xl border hover:border-transparent md:text-2xl'>Start Game</Link>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className='flex flex-col items-center justify-center mt-20 lg:w-1/3 w-2/3 rounded-xl z-30 bg-[#f5f5f5a0] shadow-[0px_0px_10px_0px] shadow-[#30C7D6] p-6'
      >
        <span className='text-indigo-700 font-bold text-2xl mt-2 mb-4'>Leaderboard</span>
        <div className='relative w-full'>
          <button
            className='mt-2 mb-4 px-4 py-2 rounded-lg bg-indigo-600 text-white w-full text-left flex justify-between items-center'
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            {selectedSubject.charAt(0).toUpperCase() + selectedSubject.slice(1)}
            <span className='ml-2'>{dropdownOpen ? '▲' : '▼'}</span>
          </button>
          {dropdownOpen && (
            <motion.ul
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className='absolute w-full bg-indigo-600 rounded-lg shadow-lg z-10 overflow-hidden'
            >
              {['economics', 'it', 'history', 'science', 'gk'].map(subject => (
                <li
                  key={subject}
                  className='px-4 py-2 hover:bg-indigo-700 cursor-pointer text-white'
                  onClick={() => handleSubjectChange(subject)}
                >
                  {subject.charAt(0).toUpperCase() + subject.slice(1)}
                </li>
              ))}
            </motion.ul>
          )}
        </div>
        {renderLeaderboard()}
      </motion.div>
    </motion.div>
  );
}

export default Home;
