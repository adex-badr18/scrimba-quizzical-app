export default function SplashScreen({ startQuiz, categories }) {
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

            <form action="" className="settings-form">
                <select name="category" className="category">
                    <option value="">Any Category</option>
                    {optionElements}
                </select>

                <select name="difficulty">
                    <option value="">Any Difficulty</option>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                </select>

                <button className="start-btn" onClick={startQuiz}>Start quiz</button>
            </form>

            <img src="/blobs2.png" className="blobs bottom" alt="" />
        </section>
    )
}