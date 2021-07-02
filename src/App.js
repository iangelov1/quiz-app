import React, { useReducer } from 'react';

import Progress from './components/Progress';
import Question from './components/Question';
import Answers from './components/Answers';

import QuizContext from './context/QuizContext';

import './App.css';

import {
    SET_CURRENT_QUESTION,
    SET_CURRENT_ANSWER,
    SET_ANSWERS,
    SET_SHOW_RESULTS,
    SET_ERROR,
    RESET_QUIZ
} from './reducers/types';

import quizReducer from './reducers/QuizReducer';

function App() {
    // const [currentQuestion, setCurrentQuestion] = useState(0);
    // const [currentAnswer, setCurrentAnswer] = useState('');
    // const [answers, setAnswers] = useState([]);
    // const [showResults, setShowResults] = useState(false);
    // const [error, setError] = useState('');

    const questions = [
        {
            id: 1,
            question: 'Which statement about Hooks is not true?',
            answer_a:
                'Hooks are 100% backwards-compatible and can be used side by side with classes',
            answer_b: 'Hooks are still in beta and not available yet',
            answer_c:
                "Hooks are completely opt-in, there's no need to rewrite existing code",
            answer_d: 'All of the above',
            correct_answer: 'b',
        },
        {
            id: 2,
            question: 'Which one is not a Hook?',
            answer_a: 'useState()',
            answer_b: 'useConst()',
            answer_c: 'useReducer()',
            answer_d: 'All of the above',
            correct_answer: 'b',
        },
        {
            id: 3,
            question: 'What Hook should be used for data fetching?',
            answer_a: 'useDataFetching()',
            answer_b: 'useApi()',
            answer_c: 'useEffect()',
            answer_d: 'useRequest()',
            correct_answer: 'c',
        },
    ];

    const initialState = {
        questions, 
        currentQuestion: 0,
        currentAnswer: "",
        answers: [],
        showResults: false,
        error: "",
    }

    const [state, dispatch] = useReducer(quizReducer, initialState);

    const { currentQuestion, currentAnswer, answers, showResults, error } = state;

    const question = questions[currentQuestion];

    // render error
    const renderError = () => {
        if (!error) {
            return;
        }

        return <div className="error">{error}</div>
    };

    //checking selected answer is correct or failed
    const renderResultMark = (question, answer) => {
        if (question.correct_answer === answer.answer) {
            return <span className="correct">Correct</span>
        }

        return <span className="failed">Failed</span>
    };

    // render result 
    const renderResultsData = () => {
        return answers.map(answer => {
            const question = questions.find(
                question => question.id === answer.questionId
            );

            return (
                <div key={question.id}>
                    {question.question} - { renderResultMark(question, answer) }
                </div>
            )
        });
    };

    // restart quiz
    const restart = () => {
        //setAnswers([]);
        // setCurrentAnswer('');
        // setCurrentQuestion(0);
        // setShowResults(false);
        dispatch({ type: RESET_QUIZ})
    };

    // set answer in answers array and redirect to other quastion
    const next = () => {
        const answer = { questionId: question.id, answer: currentAnswer };

        if (!currentAnswer) {
            // setError("Please select option");
            dispatch({ type: SET_ERROR, error: "Please select option"})
            return
        }

        answers.push(answer);

        // setAnswers(answers);
        dispatch({ type: SET_ANSWERS, answers });

        // setCurrentAnswer('');
        dispatch({ type: SET_CURRENT_ANSWER, currentAnswer: "" });

        if (currentQuestion + 1 < questions.length) {
            // setCurrentQuestion(currentQuestion + 1)
            dispatch({ type: SET_CURRENT_QUESTION, currentQuestion: currentQuestion + 1});
            return
        }

        // setShowResults(true)
        dispatch({ type: SET_SHOW_RESULTS, showResults: true })
    };

    console.log("answers array", answers)
    console.log(showResults)

    if (showResults) {
        return (
            <div className="container results">
                <h2>Results</h2>
                <ul>{ renderResultsData() }</ul>
                <button className="btn btn-primary" onClick={restart}>Restart</button>
            </div>
        )
    } else {
        return (
            <QuizContext.Provider value={{ state, dispatch }}>
                <div className="container">
                    <Progress total={questions.length} current={currentQuestion + 1} />

                    {renderError()}
                    
                    {/* <Question question={question.question} /> */}
                    <Question />

                    <Answers 
                        // question={question}
                        // currentAnswer={currentAnswer}
                        // // handleClick={handleClick}
                        // dispatch={dispatch}
                    />
        
                    <button className="btn btn-primary" onClick={next}>
                        Confirm and Continue
                    </button>
                </div> 
            </QuizContext.Provider>
        )
    }
}

export default App;