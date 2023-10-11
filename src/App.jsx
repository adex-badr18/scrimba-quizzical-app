import { useState, useEffect } from 'react';
import './App.css';
import SplashScreen from './components/SplashScreen';
import Question from './components/Question';
import { nanoid } from 'nanoid';

function App() {
    const [quizQueryString, setQuizQueryString] = useState('');
    const [queryParams, setQueryParams] = useState({ category: '', difficulty: '' });
    const [categories, setCategories] = useState([]);

    const [isSplashScreen, setIsSplashScreen] = useState(true);
    const [questionsArr, setQuestionsArr] = useState([]);
    const [showResult, setshowResult] = useState(false);
    const [scoreCount, setScoreCount] = useState(0);
    const [resetQuiz, setResetQuiz] = useState(false);

    useEffect(() => {
        fetch('https://opentdb.com/api_category.php')
            .then(res => res.json())
            .then(data => setCategories(data.trivia_categories))
    }, []);

    useEffect(() => {
        setResetQuiz(false);
        setQuestions();
    }, []);

    function setQuestions() {
        fetch(`https://opentdb.com/api.php?amount=5&type=multiple${quizQueryString}`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                let resultArr = [];
                data.response_code === 0 && (resultArr = data.results.map(result => {
                    const answerIndex = Math.floor(Math.random() * 4);
                    result.incorrect_answers.splice(answerIndex, 0, result.correct_answer);

                    return {
                        id: nanoid(),
                        question: result.question,
                        options: result.incorrect_answers,
                        answer: result.correct_answer,
                        selectedOption: ""
                    }
                }));

                setQuestionsArr(resultArr);
            })
    }

    function startQuiz() {
        setQueryString();
        setQuestions();
        setIsSplashScreen(false);
    }

    function updateAnswer(targetQuestion, answer) {
        setQuestionsArr(prevQuestionArr => {
            return prevQuestionArr.map(questionObj => {
                return questionObj.question === targetQuestion ?
                    { ...questionObj, selectedOption: answer } :
                    questionObj
            })
        })
    }

    function displayResult() {
        questionsArr.forEach(questionObj => {
            questionObj.answer === questionObj.selectedOption && setScoreCount(prevScore => prevScore + 1);
        })

        setshowResult(true);
    }

    function reset() {
        setIsSplashScreen(true);
        setshowResult(false);
        setResetQuiz(prevState => !prevState);
    }

    function setQueryString() {
        setQuizQueryString(() => {
            const categoryString = `&category=${queryParams.category}`;
            const difficultyString = `&difficulty=${queryParams.difficulty}`;

            if (queryParams.category && queryParams.difficulty) {
                return categoryString + difficultyString;
            } else if (queryParams.category && !queryParams.difficulty) {
                return categoryString;
            } else if (!queryParams.category && queryParams.difficulty) {
                return difficultyString
            } else {
                return '';
            }
        });
    }

    const questionsJsx = questionsArr.map((questionObj, index) => {
        const props = {
            question: questionObj.question,
            options: questionObj.options,
            correctAnswer: questionObj.answer,
            selectedOption: questionObj.selectedOption,
        }

        return <Question key={index} props={props} updateAnswer={updateAnswer} showResult={showResult} />
    });

    return (
        <div className='container'>
            {
                isSplashScreen ?

                    <SplashScreen
                        startQuiz={startQuiz} categories={categories} setQueryParams={setQueryParams}
                    /> :

                    <section className="questions">
                        <div>
                            <img src="/blobs1.png" className="blobs top" alt="" />

                            {questionsJsx}

                            <img src="/blobs2.png" className="blobs bottom" alt="" />
                        </div>

                        {
                            showResult ?
                                <div className='submit score-container'>
                                    <h4 className='score'>{`You scored ${scoreCount}/${questionsArr.length} correct answers`}</h4>
                                    <button onClick={reset}>Start again</button>
                                </div> :
                                <div className='submit'>
                                    <button onClick={displayResult}>Show result</button>
                                </div>
                        }
                    </section>
            }
        </div>
    )
}

export default App

// Categories: https://opentdb.com/api_category.php