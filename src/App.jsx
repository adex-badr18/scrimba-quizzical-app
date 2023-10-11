import { useState, useEffect, useCallback } from 'react';
import './App.css';
import SplashScreen from './components/SplashScreen';
import Question from './components/Question';
import { nanoid } from 'nanoid';

function App() {
    const [isSplashScreen, setIsSplashScreen] = useState(true);

    const [queryParams, setQueryParams] = useState({ categoryId: '', categoryName: '', difficulty: '' });
    const [categories, setCategories] = useState([]);

    const [questionsArr, setQuestionsArr] = useState([]);
    const [showResult, setshowResult] = useState(false);
    const [scoreCount, setScoreCount] = useState(0);

    useEffect(() => {
        fetch('https://opentdb.com/api_category.php')
            .then(res => res.json())
            .then(data => setCategories(data.trivia_categories))
    }, []);

    const setQuestions = useCallback(() => {
        fetch(`https://opentdb.com/api.php?amount=5&type=multiple${setQueryString()}`)
            .then(res => res.json())
            .then(data => {
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
                setIsSplashScreen(false);
            })
    }, [queryParams]);

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

    function setQueryString() {
        const categoryString = queryParams.categoryId !== '' ? `&category=${queryParams.categoryId}` : '';
        const difficultyString = queryParams.difficulty !== '' ? `&difficulty=${queryParams.difficulty}` : '';

        return categoryString + difficultyString;
    }

    function resetQuiz() {
        setIsSplashScreen(true);
        setshowResult(false);
        setScoreCount(0);
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
                        categories={categories}
                        setQueryParams={setQueryParams}
                        queryParams={queryParams}
                        setQuestions={setQuestions}
                    /> :

                    <section className="questions">
                        <div>
                            <img src="/scrimba-quizzical-app/blobs1.png" className="blobs top" alt="" />

                            {
                                <div className="header">
                                    <h1>Quizzical</h1>

                                    <div className="quiz-info">
                                        <p><span>Category: </span>
                                            {
                                                queryParams.categoryName ? queryParams.categoryName : 'Random'
                                            }
                                        </p>
                                        <p><span>Difficulty: </span>{queryParams.difficulty ? queryParams.difficulty : 'Random'}</p>
                                    </div>
                                    <hr />
                                </div>
                            }

                            {questionsJsx}

                            <img src="/scrimba-quizzical-app/blobs2.png" className="blobs bottom" alt="" />
                        </div>

                        {
                            showResult ?
                                <div className='submit score-container'>
                                    <h4 className='score'>{`You scored ${scoreCount}/${questionsArr.length} correct answers`}</h4>
                                    <button onClick={resetQuiz}>Start again</button>
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