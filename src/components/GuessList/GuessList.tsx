import LetterGuessState from '../../types/LetterGuessState';
import Guess from '../Guess/Guess';
import './GuessList.scss';

interface GuessListProps {
    wordsGuessed: string[];
    currentTurn: number;
    guessInput: string[];
    wordLength: number;
    numberOfTurns: number;
    getLetterGuessStatesForGuess(guess: string): LetterGuessState[];
}

function GuessList(props: GuessListProps) {
    const rows = [...Array(props.numberOfTurns)].map((_, rowIndex) => {
        const isCurrentRow = props.currentTurn === (rowIndex + 1);
        const rowClasses = `guess-row${(isCurrentRow ? " current-guess-row" : "")}`;

        const lettersToDisplay = isCurrentRow ? props.guessInput : props.wordsGuessed[rowIndex]?.split('') || [];
        const letterGuessStates = props.getLetterGuessStatesForGuess(lettersToDisplay.join(''));
        return <Guess key={`guess-row-${rowIndex}`} rowClasses={rowClasses} rowIndex={rowIndex} currentTurn={props.currentTurn}
            wordLength={props.wordLength} lettersToDisplay={lettersToDisplay} letterGuessStates={letterGuessStates} />;
    });

    return (
        <div className="guess-list">
            {rows}
        </div>
    );
}

export default GuessList;