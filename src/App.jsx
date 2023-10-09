import { useState, useEffect } from 'react';
import './App.css';
import SplashScreen from './components/SplashScreen';
import Question from './components/Question';

function App() {
    const [isSplashScreen, setIsSplashScreen] = useState(true);
    const [questionsArr, setQuestionsArr] = useState([]);

    useEffect(() => {
        fetch('https://opentdb.com/api.php?amount=5&type=multiple')
            .then(res => res.json())
            .then(data => {
                data.response_code === 0 && setQuestionsArr(data.results);
            })
    }, []);

    function startQuiz() {
        setIsSplashScreen(false);
    }

    const questionsJsx = questionsArr.map((questionObj, i) => {
        const index = Math.floor(Math.random() * 4);
        const answer = questionObj.correct_answer;
        const options = [...questionObj.incorrect_answers];

        options.splice(index, 0, answer);

        const prop = {
            question: questionObj.question,
            options: options,
            answer: answer
        }

        return <Question key={i} prop={prop} />
    });

    // console.log(questionsJsx);

    return (
        <div className='container'>
            {
                isSplashScreen ? 
                
                <SplashScreen startQuiz={startQuiz} /> : 
                
                <section className="questions">
                    {questionsJsx}
                </section>
            }
        </div>
    )
}

export default App
