import React from 'react';

import { SET_CURRENT_ANSWER, SET_ERROR } from '../reducers/types';

function Answer(props) {
    let classes = ['answer'];

    // set answer
    const handleClick = (e) => {
        //setCurrentAnswer(e.target.value);
        props.dispatch({ type: SET_CURRENT_ANSWER, currentAnswer: e.target.value });

        //setError("");
       props.dispatch({ type: SET_ERROR, error: "" });
    };

    if (props.selected) {
        classes.push('selected');
    }
    return (
        <button
            value={props.letter}
            className={classes.join(' ')}
            onClick={handleClick}
        >
            <span className="letter">{props.letter}.</span> {props.answer}
        </button>
    );
}

export default Answer;