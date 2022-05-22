import "./Guess.scss";
import LetterGuessState from "../../types/LetterGuessState";

interface GuessProps {
    currentTurn: number;
    rowIndex: number;
    wordLength: number;
    rowClasses: string;
    lettersToDisplay: string[];
    letterGuessStates: LetterGuessState[];
}

function Guess(props: GuessProps) {
    const letters = [...Array(props.wordLength)].map((_, colIndex) => {
        const letter: string = props.lettersToDisplay[colIndex];
        let classes = "guess-square";
        if (letter && ((props.rowIndex + 1) < props.currentTurn)) {
            const letterGuessState: LetterGuessState = props.letterGuessStates[colIndex];
            switch (letterGuessState) {
                case LetterGuessState.Correct:
                    classes += " correct";
                    break;
                case LetterGuessState.InWrongPosition:
                    classes += " in-wrong-position";
                    break;
                default:
                    break;
            }
        }

        return <div key={"guess-" + props.rowIndex + "-letter-" + colIndex} className={classes}>{letter}</div>;
    });

    return <div key={"guess-" + props.rowIndex} className={props.rowClasses}>
        {letters}
    </div>;
}

export default Guess;