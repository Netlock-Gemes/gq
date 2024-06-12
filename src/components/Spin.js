import React from 'react'
import spinner from '../assets/homelander.jpg'

const Spin = () => {
    return (
        <div className='bg-secondary flex flex-col pt-32 items-center min-h-screen'>
            <img className='h-60 w-60 rounded-full animate-spin' src={spinner} alt="spin" />
        </div>
    )
}

export default Spin