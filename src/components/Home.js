import React, { useContext, useEffect } from 'react'
import authContext from '../context/auth/authContext'

function Home() {

  const { checkLogin, getLoggedInUserData } = useContext(authContext);


  useEffect(() => {
    const fetchData = async () => {
      await getLoggedInUserData();
      checkLogin();
    };
    fetchData();
  }, [])


  return (
    <div className='bg-secondary flex justify-center items-center h-screen'>

    </div>
  )
}

export default Home