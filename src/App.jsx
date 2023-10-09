import { useState } from 'react';
import './App.css';
import SplashScreen from './components/SplashScreen';
import Question from './components/Question';

function App() {
    const [isSplashScreen, setIsSplashScreen] = useState(true);

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
