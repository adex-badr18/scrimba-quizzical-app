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

    return (
        <div className='container'>
            {
                isSplashScreen ? 
                
                <SplashScreen startQuiz={startQuiz} /> : 
                
                <section className="questions">
                    <Question />
                </section>
            }
        </div>
    )
}

export default App
