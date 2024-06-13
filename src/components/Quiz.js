import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import quizContext from '../context/quiz/quizContext';
import { questionsData } from '../constants/questionsData';
import ConfettiExplosion from 'react-confetti-explosion';

const Quiz = () => {
    const { category } = useContext(quizContext);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState(Array.from({ length: questionsData[category]?.length || 0 }, () => null)); // Initialize with null values
    const [showScore, setShowScore] = useState(false);
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(10);
    const navigate = useNavigate();

    const questions = questionsData[category] || [];

    useEffect(() => {
        if (questions.length > 0 && timeLeft > 0) {
            const timerId = setInterval(() => {
                setTimeLeft(timeLeft - 1);
            }, 1000);
            return () => clearInterval(timerId);
        } else {
            handleNextQuestion();
        }
    }, [timeLeft, questions]);

    const handleAnswerOptionClick = (isCorrect) => {
        const updatedSelectedAnswers = [...selectedAnswers];
        updatedSelectedAnswers[currentQuestionIndex] = isCorrect;
        setSelectedAnswers(updatedSelectedAnswers);
        handleNextQuestion();
    };

    const handleNextQuestion = () => {
        const nextQuestionIndex = currentQuestionIndex + 1;
        if (nextQuestionIndex < questions.length) {
            setCurrentQuestionIndex(nextQuestionIndex);
            setTimeLeft(10); // Reset timer for next question
        } else {
            const updatedSelectedAnswers = [...selectedAnswers];
            updatedSelectedAnswers[currentQuestionIndex] = true; // Update selectedAnswers for the last question
            const calculatedScore = updatedSelectedAnswers.filter(answer => answer === true).length;
            setScore(calculatedScore);
            setShowScore(true);
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
        <div className='bg-secondary flex w-full justify-center items-center min-h-screen pb-10'>
            {showScore ? (
                <div className='text-2xl flex flex-col justify-center items-center text-white'>
                    {
                        score > 5 ? <div className='text-4xl flex flex-col justify-center items-center font-semibold'>

                            <ConfettiExplosion />
                            <span>Congratulations 🎉</span>
                            <span>You scored {score} out of {questions.length}</span>
                        </div> : <div className='text-4xl flex flex-col justify-center items-center font-semibold'>
                            <span>Too Bad 😔</span>
                            <span>You scored {score} out of {questions.length}</span>
                        </div>
                    }
                </div>
            ) : (
                <div className='flex flex-col justify-center items-center w-1/2 border p-20 rounded-xl relative bg-[#392f6f] shadow-lg shadow-teal-800'>
                    <div className='w-full mb-4 relative h-6 bg-gray-200 rounded-lg overflow-hidden'>
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
