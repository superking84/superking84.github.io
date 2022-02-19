import './GameContainer.css';
import GuessList from "../../components/GuessList/GuessList";
import Keyboard from "../../components/Keyboard/Keyboard";
import LetterGuessState from '../../types/LetterGuessState';

interface GameContainerProps {
    currentTurn: number;
    numberOfTurns: number;
    guessInput: string[];
    wordLength: number;
    wordsGuessed: string[];
    keyAction: (letter: string) => void;
    getLetterGuessStateForKey(letter: string): LetterGuessState | null;
    getLetterGuessStateForGuess(letter: string, index: number): LetterGuessState;
}

function GameContainer(props: GameContainerProps) {
    return (
        <div className="game-container">
            <GuessList guessInput={props.guessInput} wordLength={props.wordLength} numberOfTurns={props.numberOfTurns}
                currentTurn={props.currentTurn} wordsGuessed={props.wordsGuessed} getLetterGuessStateForGuess={props.getLetterGuessStateForGuess} />
            <Keyboard keyAction={props.keyAction} getLetterGuessStateForKey={props.getLetterGuessStateForKey} />
        </div>
    );
}

export default GameContainer;