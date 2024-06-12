import React, { useContext, useEffect } from 'react'
import authContext from '../context/auth/authContext'
import logo from '../assets/GamifiedSec.png'
import { Link } from 'react-router-dom';

function Home() {

  const { checkLogin } = useContext(authContext);


  useEffect(() => {
    checkLogin();
  }, [])


  return (
    <div className='bg-secondary flex flex-col pt-32 items-center min-h-screen'>
      <div>
        <img src={logo} alt="" />
      </div>
      <div className='flex w-1/4 mt-5'>
        <Link to={'/spin'} className='flex justify-center items-center bg-primary rounded-xl text-[#07E1E6] p-2 w-full shadow-sm hover:shadow-teal-300 font-bold text-xl border hover:border-transparent'>Start Game</Link>
      </div>
      <div className='flex flex-col border-2 items-center justify-center mt-20 w-1/4 rounded-md'>
        <span className='text-[#F0EEF2] font-bold text-2xl'>Leatherboard</span>
        <div className='flex flex-col w-full mb-2'>
          <div className='flex justify-between mx-5 items-center text-white text-lg border-b'>
            <span>Chaman:</span>
            <span>10</span>
          </div>
          <div className='flex justify-between mx-5 items-center text-white text-lg border-b'>
            <span>Shana:</span>
            <span>40</span>
          </div>
          <div className='flex justify-between mx-5 items-center text-white text-lg border-b'>
            <span>Yeda:</span>
            <span>30</span>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Home