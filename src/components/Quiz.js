import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import quizContext from '../context/quiz/quizContext';
import { questionsData } from '../constants/questionsData';
import ConfettiExplosion from 'react-confetti-explosion';
import authContext from '../context/auth/authContext';

const Quiz = () => {
    const { category } = useContext(quizContext);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState(Array.from({ length: questionsData[category]?.length || 0 }, () => null));
    const [showScore, setShowScore] = useState(false);
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(60);
    const { checkLogin, loggedInUserData } = useContext(authContext);

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

    const handleAnswerOptionClick = (isCorrect) => {
        const updatedSelectedAnswers = [...selectedAnswers];
        updatedSelectedAnswers[currentQuestionIndex] = isCorrect;
        setSelectedAnswers(updatedSelectedAnswers);
        if (currentQuestionIndex < questions.length - 1) {
            handleNextQuestion();
        } else {
            calculateScore(updatedSelectedAnswers);
        }
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(prevIndex => prevIndex + 1);
            setTimeLeft(60);
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
            const response = await fetch('http://localhost:5000/api/auth/submit-score', {
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
        <div className='bg-secondary flex flex-col justify-center items-center min-h-screen pb-10 px-4'>
            {showScore ? (
                <div className='text-2xl flex flex-col justify-center items-center text-white'>
                    {score > 5 ? (
                        <div className='text-2xl md:text-4xl flex flex-col justify-center items-center font-semibold'>
                            <ConfettiExplosion />
                            <span className='text-[#07E1E6]'>Congratulations 🎉</span>
                            <span>You scored {score} out of {questions.length}</span>
                        </div>
                    ) : (
                        <div className='text-2xl md:text-4xl flex flex-col justify-center items-center font-semibold'>
                            <span className='text-[#07E1E6]'>Too Bad 😔</span>
                            <span>You scored {score} out of {questions.length}</span>
                        </div>
                    )}
                    <Link to={'/spin'} className='flex justify-center items-center w-64 bg-primary rounded-xl text-[#07E1E6] p-2 shadow-sm hover:shadow-teal-300 font-bold text-xl border hover:border-transparent mt-6'>
                        Return to Subjects
                    </Link>
                </div>
            ) : (
                <div className='flex flex-col justify-center items-center w-full md:w-1/2 border p-4 md:p-20 rounded-xl relative bg-[#392f6f] shadow-lg shadow-teal-800'>
                    <div className='w-full mb-4 mt-8 relative h-6 bg-gray-200 rounded-lg overflow-hidden'>
                        <div
                            className='h-full bg-teal-500'
                            style={{
                                width: `${((currentQuestionIndex) / questions.length) * 100}%`
                            }}
                        />
                    </div>

                    <div className='absolute top-4 left-4 text-white'>
                        Question {currentQuestionIndex + 1} of {questions.length}
                    </div>

                    <div className='absolute top-4 right-4 text-white'>
                        Time Left: {timeLeft} seconds
                    </div>

                    <div className='text-2xl text-white mb-4'>
                        {questions[currentQuestionIndex].question}
                    </div>

                    <div className='flex flex-col w-full'>
                        {questions[currentQuestionIndex].options.map((option, index) => (
                            <button
                                key={index}
                                className='bg-primary text-white p-2 m-2 w-full rounded-xl hover:shadow-teal-300 shadow-sm'
                                onClick={() => handleAnswerOptionClick(option === questions[currentQuestionIndex].answer)}
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Quiz;
