export default function SplashScreen({ startQuiz, categories, setQueryParams }) {
    const optionElements = categories.map(category => (
        <option key={category.id} value={category.id}>{category.name}</option>
    ));

    return (
        <section className="splash">
            <img src="/blobs1.png" className="blobs top" alt="" />
            <h1 className="splash--title">Quizzical</h1>
            <p className="splash--description">
                Your Ultimate Knowledge Challenge! 🧠 Test your wits, conquer quizzes, and become the champion of trivia!
            </p>

            <div className="settings-form">
                <select name="category" value='' onChange={e => setQueryParams(prev => ({...prev, category: e.target.value}))}>
                    <option value="">Any Category</option>
                    {optionElements}
                </select>

                <select name="difficulty" value='' onChange={e => setQueryParams(prev => ({...prev, difficulty: e.target.value}))}>
                    <option value="">Any Difficulty</option>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                </select>

                <button className="start-btn" onClick={startQuiz}>Start quiz</button>
            </div>

            <img src="/blobs2.png" className="blobs bottom" alt="" />
        </section>
    )
}