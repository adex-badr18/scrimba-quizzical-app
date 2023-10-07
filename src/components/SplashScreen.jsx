export default function SplashScreen() {
    return (
        <section className="splash">
            <img src="/blobs1.png" className="blobs top" alt="" />
            <h1 className="splash--title">Quizzical</h1>
            <p className="splash--description">
                Your Ultimate Knowledge Challenge! 🧠 Test your wits, conquer quizzes, and become the champion of trivia!
            </p>
            <button className="start-btn">Start quiz</button>
            <img src="/blobs2.png" className="blobs bottom" alt="" />
        </section>
    )
}