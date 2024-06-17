import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import quizContext from '../context/quiz/quizContext';
import { questionsData } from '../constants/questionsData';
import ConfettiExplosion from 'react-confetti-explosion';
import authContext from '../context/auth/authContext';
import circle from '../assets/circle.png';
import { MdOutlineAccessTime } from "react-icons/md";
import ScoreChart from './ScoreChart';

const Quiz = () => {
    const { category } = useContext(quizContext);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState(Array.from({ length: questionsData[category]?.length || 0 }, () => null));
    const [showScore, setShowScore] = useState(false);
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(60);
    const { checkLogin, loggedInUserData } = useContext(authContext);
    const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);
    const [answerSubmitted, setAnswerSubmitted] = useState(false);

    const questions = questionsData[category] || [];

    useEffect(() => {
        if (questions.length > 0 && timeLeft > 0) {
            const timerId = setInterval(() => {
                setTimeLeft(timeLeft - 1);
            }, 1000);
            return () => clearInterval(timerId);
        } else if (timeLeft === 0) {
            handleNextQuestion();
        }
    }, [timeLeft, questions]);

    useEffect(() => {
        checkLogin();
    }, []);

    const handleAnswerOptionClick = (isCorrect, index) => {
        const updatedSelectedAnswers = [...selectedAnswers];
        updatedSelectedAnswers[currentQuestionIndex] = isCorrect;
        setSelectedAnswers(updatedSelectedAnswers);
        setSelectedOptionIndex(index);
        setAnswerSubmitted(true);
        if (isCorrect) {
            setScore(prevScore => prevScore + 1);
        }
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(prevIndex => prevIndex + 1);
            setTimeLeft(60);
            setSelectedOptionIndex(null);
            setAnswerSubmitted(false);
        } else {
            calculateScore(selectedAnswers);
        }
    };

    const calculateScore = (answers) => {
        const calculatedScore = answers.filter(answer => answer === true).length;
        setScore(calculatedScore);
        setShowScore(true);

        const existingScore = loggedInUserData.score[category.toLowerCase()] || 0;
        if (calculatedScore > existingScore) {
            submitScore(category.toLowerCase(), calculatedScore);
        }
    };

    const submitScore = async (category, score) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_HOST}/api/auth/submit-score`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': localStorage.getItem('token'),
                },
                body: JSON.stringify({ category, score })
            });

            if (!response.ok) {
                throw new Error('Failed to submit score');
            }

            const result = await response.json();
            console.log('Score submitted successfully:', result);
        } catch (error) {
            console.error('Error submitting score:', error);
        }
    };

    if (questions.length === 0) {
        return (
            <div className='bg-secondary flex flex-col gap-3 w-full justify-center items-center min-h-screen pb-10 text-white'>
                <span>
                    Loading...
                </span>
                <Link to={'/spin'} className='flex justify-center items-center w-64 bg-primary rounded-xl text-[#07E1E6] p-2 shadow-sm hover:shadow-teal-300 font-bold text-xl border hover:border-transparent'>
                    Spin again!
                </Link>
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className='bg-secondary flex flex-col justify-center items-center min-h-screen pb-10 px-4 relative'
        >
            <div className='fixed hidden md:flex left-auto md:left-7 top-24 opacity-25 md:opacity-35 overflow-hidden'>
                <img src={circle} alt="circle-left" className='animate-slow-spin' />
            </div>
            <div className='fixed hidden md:flex right-7 top-24 opacity-35 overflow-hidden'>
                <img src={circle} alt="circle-right" className='animate-slow-spin' />
            </div>
            <div className='fixed md:flex justify-center left-auto opacity-25 md:opacity-35 overflow-hidden w-[600px] h-[600px] md:w-full md:h-full z-0'>
                <img src={circle} alt="circle-center" className='animate-slow-spin w-full h-full md:w-fit' />
            </div>
            {showScore ? (
                <motion.div
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className='text-2xl flex flex-col justify-center items-center text-white z-30 bg-secondary px-2 py-5 md:p-6 xl:p-10 rounded-xl border shadow-[0px_0px_20px_0px] shadow-[#30C7D6] md:w-1/3'
                >
                    {score > 5 ? (
                        <div className='font-serif text-xl md:text-3xl flex flex-col justify-center items-center font-semibold'>
                            <ConfettiExplosion />
                            <span className='text-green-400'>Congrats {loggedInUserData?.name} 🎉</span>
                            <span className='text-center my-2'>You scored <span className='text-green-400'>{score}</span> out of {questions.length}</span>
                            <span className='text-base font-sans text-center text-gray-300'>Try your skills in different subjects</span>
                            <span className='font-sans text-xl mt-3'>⬇️Quiz Result⬇️</span>
                        </div>
                    ) : (
                        <div className='font-serif text-xl md:text-3xl flex flex-col justify-center items-center font-semibold'>
                            <span className='text-red-600'>Too Bad {loggedInUserData?.name} 😔</span>
                            <span className='text-center my-2'>You only scored <span className='text-red-600'>{score}</span> out of {questions.length}</span>
                            <span className='text-base font-sans'>You need to work on your skills</span>
                            <span className='font-sans text-xl mt-3'>⬇️Quiz Result⬇️</span>
                        </div>
                    )}

                    <ScoreChart score={score} totalQuestions={questions.length} />
                    <Link to={'/spin'} className='flex justify-center items-center w-44 md:w-64 bg-primary rounded-xl text-[#07E1E6] p-2 shadow-sm hover:shadow-teal-300 font-bold text-base md:text-xl border hover:border-transparent mt-6'>
                        Return to Subjects
                    </Link>
                </motion.div>
            ) : (
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className='flex flex-col justify-center items-center w-full md:w-1/2 border p-4 md:p-20 rounded-xl relative bg-[#392f6f] shadow-lg shadow-teal-800'
                >
                    <div className='w-full mb-4 mt-8 relative h-6 bg-gray-200 rounded-lg overflow-hidden'>
                        <div
                            className='h-full bg-teal-500'
                            style={{
                                width: `${((currentQuestionIndex) / questions.length) * 100}%`
                            }}
                        />
                    </div>

                    <div className='absolute top-4 left-4 text-white text-sm md:text-base'>
                        Question: <span className='font-semibold text-green-400'>{currentQuestionIndex + 1}</span>
                    </div>

                    <div className='absolute top-4 left-1/2 transform -translate-x-1/2 text-white text-sm md:text-base'>
                        Score: <span className='font-semibold text-green-400'>{score}</span>
                    </div>

                    <div className='absolute flex justify-center items-center top-4 right-4 text-white text-sm md:text-base'>
                        Time<MdOutlineAccessTime className='mx-1 h-5 w-5 hidden md:hidden' /><span className='hidden md:block'>-Left</span>:<span className='font-semibold ml-1 text-green-400 w-15'>{timeLeft} sec</span>
                    </div>

                    <div className='text-2xl text-white mb-4'>
                        {questions[currentQuestionIndex].question}
                    </div>

                    <div className='flex flex-col w-full'>
                        {questions[currentQuestionIndex].options.map((option, index) => (
                            <motion.button
                                key={index}
                                whileHover={{ scale: 1.05 }}
                                className={`p-2 m-2 w-full text-white rounded-xl hover:shadow-teal-300 shadow-sm ${selectedOptionIndex === null
                                        ? 'bg-primary'
                                        : index === selectedOptionIndex
                                            ? option === questions[currentQuestionIndex].answer
                                                ? 'bg-green-600'
                                                : 'bg-red-600'
                                            : option === questions[currentQuestionIndex].answer
                                                ? 'bg-green-600 opacity-50'
                                                : 'bg-red-600 opacity-50'
                                    }`}
                                onClick={() => handleAnswerOptionClick(option === questions[currentQuestionIndex].answer, index)}
                                disabled={answerSubmitted}
                            >
                                {option}
                            </motion.button>
                        ))}

                    </div>
                    <button
                        className='flex justify-center items-center md:w-56 w-1/2 bg-primary rounded-xl text-[#07E1E6] p-2 shadow-sm hover:shadow-teal-300 font-bold text-base md:text-lg border hover:border-transparent mt-4 disabled:text-opacity-30 disabled:hover:border-white disabled:hover:shadow-none'
                        onClick={handleNextQuestion}
                        disabled={!answerSubmitted}
                    >
                        {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Submit'}
                    </button>
                </motion.div>
            )}
        </motion.div>
    );
};

export default Quiz;
