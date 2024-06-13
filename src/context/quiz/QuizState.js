import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import quizContext from './quizContext';

const QuizState = (props) => {


    const [category, setCategory] = useState();


    return (
        <quizContext.Provider value={{ category, setCategory }}>
            {props.children}
        </quizContext.Provider>
    );
};

export default QuizState;
