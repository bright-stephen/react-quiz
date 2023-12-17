import Quiz from "../src/component/Quiz/Quiz"
import { jsQuizz } from "./component/Quiz/questions";
// import { useEffect, useState } from "react";

// function App() {
//     // fetch questions from API
//   const [questions, setQuestions] = useState([]);

//   useEffect(() => {
//     getQuestions();
//   }, []);

//   const getQuestions = async () => {
//     try {
//       const response = await fetch(
//         "https://657674a20febac18d403e7fa.mockapi.io/api/xbot/questions"
//       );
//       const questionsResponse = await response.json();
//       console.log(questionsResponse);
//       setQuestions(questionsResponse);
      
//     } catch (error) {
//       console.log(error)
//     }
//   }



//   return questions.length && <Quiz questions={questions}/>
  
// }



function App () {
  // get questions from questions.js
  return <Quiz questions={jsQuizz.questions}/>
}


export default App;
