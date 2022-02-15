import './Guess.css';
import LetterGuessState from "../../types/LetterGuessState";

interface GuessProps {
    rowIndex: number;
    wordLength: number;
    rowClasses: string;
    wordToDisplay: string[];
}

function Guess(props: GuessProps) {

    return <div key={'guess-' + props.rowIndex} className={props.rowClasses}>
        {[...Array(props.wordLength)].map((_, colIndex) => {
            const letter: string = props.wordToDisplay[colIndex] || " ";
            let classes: string = "letter-square";

            return <div key={'guess-' + props.rowIndex + '-letter-' + colIndex} className={classes}>{letter}</div>;
        })}
    </div>;
}

export default Guess;