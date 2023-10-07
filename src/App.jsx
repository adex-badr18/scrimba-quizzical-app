import { useState } from 'react';
import './App.css';
import SplashScreen from './components/SplashScreen';

function App() {
    const [count, setCount] = useState(0)

    return (
        <div className='container'>
            <SplashScreen />
        </div>
    )
}

export default App
