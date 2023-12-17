import "./AnswerTimer.scss";
import { useEffect, useState, useRef } from "react";


function AnswerTimer({duration, onTimeUp}) {
    const [counter, setCounter] = useState(0);
    const [progressLoaded, setprogressLoaded] = useState(0);
    const intervalRef = useRef();

    useEffect(() => {
        intervalRef.current = setInterval(() => {
            setCounter((cur) => cur + 1)
        }, 1000);

        return() => clearInterval(intervalRef.current)
    }, []);


    useEffect(() => {
        setprogressLoaded(100 *(counter / duration))

        if (counter === duration) {
            clearInterval(intervalRef.current)

            setTimeout(() => {
                onTimeUp();
            }, 1000);
        }
    }, [counter]);


    return(
        <div className="answer-timer-loader">
            <div 
                style={{
                    width: `${progressLoaded}%`,
                    backgroundColor: `${
                        progressLoaded < 70
                        ? "green"
                        : progressLoaded < 80
                        ? "lightgreen"
                        : progressLoaded < 90
                        ? "Orange"
                        : "red"
                        }`,
                    }}
            
                className="progress">
            </div>
        </div>
    )
}


export default AnswerTimer;