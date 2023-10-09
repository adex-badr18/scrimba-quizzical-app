import { useState, useEffect } from 'react';
import './App.css';
import SplashScreen from './components/SplashScreen';
import Question from './components/Question';

function App() {
    const [isSplashScreen, setIsSplashScreen] = useState(true);
    const [questionsArr, setQuestionsArr] = useState([]);
    const [checkAnswers, setCheckAnswers] = useState(false);

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

    return (
        <div className='container'>
            {
                isSplashScreen ?

                    <SplashScreen startQuiz={startQuiz} /> :

                    <section className="questions">
                        <div>
                            <img src="/blobs1.png" className="blobs top" alt="" />

                            {questionsJsx}

                            <img src="/blobs2.png" className="blobs bottom" alt="" />
                        </div>

                        {
                            checkAnswers ?
                                <div className='submit score-container'>
                                    <h4 className='score'>{`You scored ${3}/${5} correct answers`}</h4>
                                    <button>Play again</button>
                                </div> :
                                <div className='submit'>
                                    <button>Check answers</button>
                                </div>
                        }
                    </section>
            }
        </div>
    )
}

export default App
