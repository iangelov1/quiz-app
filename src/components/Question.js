import React, { useContext } from 'react';

import QuizContext from '../context/QuizContext';

function Question(props) {
    const { state } = useContext(QuizContext);

    const { currentQuastion, questions } = state;

    const question = questions[currentQuastion];

    return <h1>{question}</h1>;
}

export default Question;