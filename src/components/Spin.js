import React, { useContext, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import WheelComponent from './Wheel';
import { Link } from 'react-router-dom';
import quizContext from '../context/quiz/quizContext';
import authContext from '../context/auth/authContext';
import circle from '../assets/circle.png';

const Spin = () => {
    const segments = ["GK", "History", "Science", "IT", "Economics"];
    const segColors = ["#EE4040", "#F0CF50", "#815CD1", "#3DA5E0", "#34A24F"];
    const { category, setCategory } = useContext(quizContext);
    const { checkLogin, loggedInUserData } = useContext(authContext);
    const [funFact, setFunFact] = useState('');
    const [isSpinning, setIsSpinning] = useState(false);

    const onFinished = (category) => {
        setCategory(category);
        setIsSpinning(false);
        console.log(category);
    };

    const fetchFact = async () => {
        try {
            const response = await fetch('https://api.quotable.io/random?tags=knowledge');
            const data = await response.json();
            setFunFact(data.content);
        } catch (error) {
            console.log("Failed to fetch quote");
        }
    }
    

    useEffect(() => {
        checkLogin();
        fetchFact();
        // eslint-disable-next-line
    }, []);

    const calculateAchievements = (userData) => {
        if (!userData || !userData.score) return { highestScore: 0, quizzesCompleted: 0, bestCategory: 'None' };

        const scores = Object.entries(userData.score);
        const validScores = scores.map(([category, score]) => (typeof score === 'number' ? score : 0));
        const highestScore = Math.max(...validScores);
        const quizzesCompleted = validScores.filter(score => score > 0).length;
        const bestCategory = scores.reduce((best, [category, score]) => score > best.score ? { category, score } : best, { category: '', score: 0 }).category;

        return { highestScore, quizzesCompleted, bestCategory };
    };

    const { highestScore, quizzesCompleted, bestCategory } = calculateAchievements(loggedInUserData);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className='bg-secondary flex flex-col w-full justify-center items-center min-h-screen pb-10'
        >
            <div className='fixed hidden md:flex left-auto md:left-7 top-24 opacity-20 overflow-hidden'>
                <img src={circle} alt="circle-left" className='animate-slow-spin' />
            </div>
            <div className='fixed hidden md:flex right-7 top-24 overflow-hidden opacity-20'>
                <img src={circle} alt="circle-right" className='animate-slow-spin' />
            </div>
            <div className='fixed md:flex justify-center left-auto top-20 opacity-20 overflow-hidden w-[600px] h-[600px] md:w-full md:h-full z-0'>
                <img src={circle} alt="circle-center" className='animate-slow-spin w-full h-full md:w-fit' />
            </div>
            <div className='flex flex-col items-center xl:w-3/4 w-full z-30'>
                <motion.div
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className='flex justify-center items-center font-bold text-[#07E1E6] text-2xl md:text-3xl mt-7 mb-3'
                >
                    Hello {loggedInUserData?.name}!🎯
                </motion.div>
                {funFact && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className='text-white font-semibold text-center mb-2 w-2/3 md:w-full'
                    >
                        <em>"{funFact}"</em>
                    </motion.div>
                )}
                <div className='flex md:flex-row flex-col w-full justify-around items-center'>
                    <motion.div
                        className='flex md:w-1/2 w-full justify-center overflow-hidden h-96 md:h-full'
                        initial={{ rotate: 0 }}
                        animate={{ rotate: isSpinning ? 360 : 0 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                    >
                        <WheelComponent
                            size={230}
                            segments={segments}
                            segColors={segColors}
                            onFinished={(category) => onFinished(category)}
                            primaryColor="black"
                            contrastColor="white"
                            buttonText="Spin"
                            isOnlyOnce={false}
                            onSpinStart={() => setIsSpinning(true)}
                        />
                    </motion.div>
                    <div className='flex flex-col justify-center md:w-1/2 w-full items-center'>
                        <div className='flex flex-col items-center'>
                            {
                                !category ?
                                    <span className='text-gray-200 mb-4'>⚠️ Spin the wheel to select a subject</span> :
                                    <span className='text-gray-200 mb-4'>Selected Category: <b>{category}</b></span>
                            }
                            {!category ?
                                <button disabled className='flex justify-center items-center w-64 bg-primary rounded-xl text-[#07E1E6] p-2 shadow-sm font-bold text-xl border text-opacity-30'> Start Quiz
                                </button> :
                                <Link to={'/quiz'} className='flex justify-center items-center w-64 bg-primary rounded-xl text-[#07E1E6] p-2 shadow-sm hover:shadow-teal-300 font-bold text-xl border hover:border-transparent'>
                                    Start Quiz of {category}
                                </Link>
                            }
                        </div>
                        <div className='flex flex-col items-center mt-8'>
                            <h2 className='text-[#F0EEF2] font-bold text-2xl mb-4 '>Your Achievements</h2>
                            <div className='bg-primary flex flex-col items-center justify-center rounded-md p-4 md:w-80 w-72 shadow-[0px_0px_20px_0px] shadow-[#30C7D6]'>
                                <p className='text-white flex justify-between w-full px-4'><span>Highest Score:</span><span>{highestScore}</span></p>
                                <p className='text-white flex justify-between w-full px-4'><span>Quizzes Completed:</span><span> {quizzesCompleted}</span></p>
                                <p className='text-white flex justify-between w-full px-4'><span>Best Category: </span><span>{bestCategory === '' ? "None" : bestCategory}</span></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

export default Spin;
