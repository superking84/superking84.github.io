import LetterGuessState from '../../types/LetterGuessState';
import Guess from '../Guess/Guess';
import './GuessList.css';

interface GuessListProps {
    wordsGuessed: string[];
    currentTurn: number;
    guessInput: string[];
    wordLength: number;
    numberOfTurns: number;
}

function GuessList(props: GuessListProps) {
    const rows = [...Array(props.numberOfTurns)].map((_, rowIndex) => {
        const isCurrentRow = props.currentTurn === (rowIndex + 1);
        const rowClasses = `guess-row${(isCurrentRow ? " current-guess-row" : "")}`;

        const wordToDisplay = isCurrentRow ? props.guessInput : props.wordsGuessed[rowIndex]?.split('') || [];
        return <Guess key={`guess-row-${rowIndex}`} rowClasses={rowClasses} rowIndex={rowIndex} wordLength={props.wordLength} wordToDisplay={wordToDisplay} />;
    });

    return (
        <div className='container'>
            {rows}
        </div>
    );
}

export default GuessList;