import { useState } from 'react';
import './App.css';
import SplashScreen from './components/SplashScreen';
import Question from './components/Question';

function App() {
    const [count, setCount] = useState(0)

    return (
        <div className='container'>
            {/* <SplashScreen /> */}
            <section className="questions">
                <Question />
            </section>
        </div>
    )
}

export default App
