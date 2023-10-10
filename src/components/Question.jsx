import { decode } from "html-entities";

export default function Question({ props, updateAnswer, showResult }) {
    const { 
        questionId, question, options, correctAnswer, selectedOption
     } = props;

    const optionsJsx = options.map((option, index) => (
        <li 
            className={
                `option ${!showResult && option === selectedOption ? 'selected' : ''}
                ${showResult && option === correctAnswer ? 'correct' : ''}
                ${showResult && option !== correctAnswer ? 'incorrect' : ''}
                `
            }
            disabled={showResult}
            key={index}
            onClick={() => updateAnswer(question, option)}
        >
            {decode(option)}
        </li>
    ));

    return (
        <div className="question-container">
            <h3 className="question">
                {decode(question)}
            </h3>

            <ul className="options">
                {optionsJsx}
            </ul>

            <hr />
        </div>
    )
}