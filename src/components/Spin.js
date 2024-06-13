import React, { useContext, useEffect, useState } from 'react'
import WheelComponent from './Wheel';
import { Link } from 'react-router-dom';
import quizContext from '../context/quiz/quizContext';
import authContext from '../context/auth/authContext';


const Spin = () => {
    const segments = [
        "GK",
        "History",
        "Science",
        "IT",
        "Economics",
    ];
    const segColors = ["#EE4040", "#F0CF50", "#815CD1", "#3DA5E0", "#34A24F"];
    // const [category, setCategory] = useState();
    const { category, setCategory } = useContext(quizContext);
    const { checkLogin, loggedInUserData } = useContext(authContext);


    const onFinished = (category) => {
        setCategory(category);
        console.log(category);
    };

    useEffect(() => {
        checkLogin();
    }, []);
    

    return (
        <div className='bg-secondary flex w-full justify-center items-center min-h-screen pb-10'>
            <div className='flex w-1/3'>
                <WheelComponent
                    segments={segments}
                    segColors={segColors}
                    onFinished={(category) => onFinished(category)}
                    primaryColor="black"
                    contrastColor="white"
                    buttonText="Spin"
                    isOnlyOnce={false}
                    upDuration={500}
                    downDuration={600}
                    fontFamily="Arial"
                />
            </div>
            <div className='flex flex-col justify-center w-1/3 items-center'>
                <div className='flex justify-center items-center font-bold text-[#07E1E6] text-3xl mb-12'>
                    Hello {loggedInUserData.name}!🎯
                </div>
                <div>

                    {
                        !category ?
                            <span className='text-gray-200 mb-2 flex justify-center items-center'>⚠️Spin that wheel first</span> :
                            <span className='text-gray-200 mb-2 flex justify-center items-center'>󠀽</span>
                    }
                    {!category ?
                        <button disabled className='flex justify-center items-center w-64 bg-primary rounded-xl text-[#07E1E6] p-2 shadow-sm font-bold text-xl border text-opacity-30'> Start Quiz
                        </button> :
                        <Link to={'/quiz'} className='flex justify-center items-center w-64 bg-primary rounded-xl text-[#07E1E6] p-2 shadow-sm hover:shadow-teal-300 font-bold text-xl border hover:border-transparent'>
                            Start Quiz of {category}
                        </Link>
                    }
                </div>
            </div>
        </div>
    )
}

export default Spin