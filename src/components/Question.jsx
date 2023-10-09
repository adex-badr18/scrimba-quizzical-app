import { decode } from "html-entities";

export default function Question(props) {
    const { question, options, answer } = props.prop;
    const optionsJsx = options.map(option => <li className="option" key={option}>{decode(option)}</li>);

    return (
        <div className="question-container">
            <h3 className="question">
                {decode(question)}
            </h3>

            <ul className="options">
                {optionsJsx}
            </ul>
        </div>
    )
}