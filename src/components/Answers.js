import React, { useContext } from 'react';

import Answer from './Answer';

import QuizContext from '../context/QuizContext';

function Answers() {
    const { state, dispatch } = useContext(QuizContext);

    const { currentAnswer, currentQuestion, questions } = state;

    const question = questions[currentQuestion];

    return (
        <>
            <Answer
                letter="a"
                answer={question.answer_a}

                // handleClick={props.handleClick}
                dispatch={dispatch}

                selected={currentAnswer === 'a'}
            />
            <Answer
                letter="b"
                answer={question.answer_b}

                // handleClick={props.handleClick}
                dispatch={dispatch}

                selected={currentAnswer === 'b'}
            />
            <Answer
                letter="c"
                answer={question.answer_c}

                // handleClick={props.handleClick}
                dispatch={dispatch}

                selected={currentAnswer === 'c'}
            />
            <Answer
                letter="d"
                answer={question.answer_d}

                // handleClick={props.handleClick}
                dispatch={dispatch}

                selected={currentAnswer === 'd'}
            />
        </>
    );
}

export default Answers;