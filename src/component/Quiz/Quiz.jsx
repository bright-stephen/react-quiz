import { useState } from "react";
import {resultInitialState} from "./questions"
import AnswerTimer from "../AnswerTimer/AnswerTimer";
import "./Quiz.scss";
import "./Quiz.css";
import Result from "../Result/Result";
import 'bootstrap/dist/css/bootstrap.min.css';



const Quiz = ({questions}) => {
    const [currentQuestion, setCurrrentQuestion] = useState(0);
    const [answerIdx, setAnswerIdx] = useState(null);
    const [answer, setAnswer] = useState(null);
    const [result, setResult] = useState(resultInitialState);
    const [showResult, setShowResult] = useState(false);
    const [inputAnswer, setInputAnswer] = useState('');
    const [showAnswerTimer, setShowAnswerTimer] = useState(true);

    const {question, choices, correctAnswer, type} = questions[currentQuestion];

    const onAnswerClick = (answer, index) => {
        setAnswerIdx(index);
        if (answer === correctAnswer) {
            setAnswer(true)
        } else {
            setAnswer(false);
        }

    }

    const onClickNext = (finalAnswer) => {
        setAnswerIdx(null);
        setShowAnswerTimer(false);
        setInputAnswer('');
        setResult((prev) => 
            finalAnswer
            ? {
                ...prev,
                score: prev.score + 1,
                correctAnswers: prev.correctAnswers + 1,
            } : {
                ...prev,
                wrongAnswers: prev.wrongAnswers + 1,
            }
        )
        
        if(currentQuestion !== questions.length - 1) {
            setCurrrentQuestion((prev) => prev + 1);
        } else{
            setCurrrentQuestion(0);
            setShowResult(true)
        }


        setTimeout(() => {
            setShowAnswerTimer(true);
        })

        
    }

    const onTryAgain = (evt) => {
        setResult(resultInitialState);
        setShowResult(false);
        setInputAnswer('');
    }

    const handleInputChange = (evt) => {
        setInputAnswer(evt.target.value);

        if(evt.target.value === correctAnswer) {
            setAnswer(true);
        } else {
            setAnswer(false);
        }
    }

    const getAnswerUI = () => {
        if (type === "FIB") {
            return(
                <div>
                    <h4 className="text">Fill in your Answer...</h4>
                    <input value={inputAnswer.toLowerCase()} onChange={handleInputChange}/>
                </div>
            )
        } else {
            return(
                <ul>
                    {
                        choices.map((answer, index) => (
                            <li 
                                onClick={() => onAnswerClick(answer, index)}
                                key={answer}
                                className={answerIdx === index ? "selected-answer" : null}
                            >
                                {answer}

                            </li>
                        ))
                    }
                </ul>
            )
        }
    }

    const handleTimeUp = () => {
        setAnswer(false);
        onClickNext(false);
    }







    return(
        <div className="quiz-container">
           {!showResult ? ( 
           <>
                {showAnswerTimer && <AnswerTimer duration={10} onTimeUp={handleTimeUp}/>}
                <span className="active-question-no">{currentQuestion + 1}</span>
                <span className="total-question">/{questions.length}</span>
                <h2>{question}</h2>
                {getAnswerUI()}
                <div className="footer">
                    <button onClick={() => onClickNext(answer)} disabled={answerIdx === null && !inputAnswer}>
                        {currentQuestion === questions.length - 1 ? "Finsh" : "Next"}
                    </button>
                </div>
            </>) : (
                <Result result={result} onTryAgain={onTryAgain} totalQuestions={questions.length}/>
            )}
        </div>

    );

}


export default Quiz;