import React, { useContext, useEffect, useState } from 'react';
import authContext from '../context/auth/authContext';
import logo from '../assets/GamifiedSec.png';
import { Link } from 'react-router-dom';

const userData = [
  {
    "name": "chaman",
    "email": "chaman@chaman.com",
    "score": {
      "economics": 9,
      "IT": 8,
      "history": 7,
      "science": 9
    }
  },
  {
    "name": "Alice",
    "email": "alice@example.com",
    "score": {
      "economics": 7,
      "IT": 6,
      "history": 8,
      "science": 9
    }
  },
  {
    "name": "Bob",
    "email": "bob@example.com",
    "score": {
      "economics": 8,
      "IT": 7,
      "history": 6,
      "science": 9
    }
  },
  {
    "name": "Charlie",
    "email": "charlie@example.com",
    "score": {
      "economics": 6,
      "IT": 9,
      "history": 8,
      "science": 7
    }
  },
  {
    "name": "David",
    "email": "david@example.com",
    "score": {
      "economics": 9,
      "IT": 8,
      "history": 7,
      "science": 8
    }
  },
  {
    "name": "Eve",
    "email": "eve@example.com",
    "score": {
      "economics": 8,
      "IT": 7,
      "history": 9,
      "science": 6
    }
  },
  {
    "name": "Frank",
    "email": "frank@example.com",
    "score": {
      "economics": 7,
      "IT": 8,
      "history": 6,
      "science": 9
    }
  },
  {
    "name": "Grace",
    "email": "grace@example.com",
    "score": {
      "economics": 9,
      "IT": 7,
      "history": 8,
      "science": 6
    }
  },
  {
    "name": "Hannah",
    "email": "hannah@example.com",
    "score": {
      "economics": 8,
      "IT": 6,
      "history": 7,
      "science": 9
    }
  }
];

function Home() {
  const { checkLogin, loggedInUserData } = useContext(authContext);
  const [selectedSubject, setSelectedSubject] = useState('economics'); // Default subject

  useEffect(() => {
    checkLogin();
  }, []);

  // Function to render leaderboard based on selected subject
  const renderLeaderboard = () => {
    // Filter and map scores for the selected subject
    const scores = userData.map(user => ({
      name: user.name,
      score: user.score[selectedSubject] || 0 // Default to 0 if subject score not found
    }));

    // Sort scores in descending order
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
    <div className='bg-secondary flex flex-col pt-10 pb-20 items-center min-h-screen'>
      <div>
        <img src={logo} alt="" />
      </div>
      <div className='flex w-1/4 mt-5'>
        <Link to={'/spin'} className='flex justify-center items-center bg-primary rounded-xl text-[#07E1E6] p-2 w-full shadow-sm hover:shadow-teal-300 font-bold text-xl border hover:border-transparent'>Start Game</Link>
      </div>
      <div className='flex flex-col border-2 items-center justify-center mt-20 w-1/4 rounded-md'>
        <span className='text-[#F0EEF2] font-bold text-2xl mt-2'>Leaderboard</span>
        {/* Subject selection dropdown */}
        <select
          className='mt-2 mb-2 px-4 py-2 rounded-lg bg-white border-transparent focus:outline-none'
          value={selectedSubject}
          onChange={(e) => setSelectedSubject(e.target.value)}
        >
          <option className='rounded-lg' value="economics">Economics</option>
          <option value="IT">IT</option>
          <option value="history">History</option>
          <option value="science">Science</option>
        </select>
        {/* Render leaderboard based on selected subject */}
        {renderLeaderboard()}
      </div>
    </div>
  );
}

export default Home;
