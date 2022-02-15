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
    addLetter: (letter: string) => void;
    getLetterGuessState(letter: string): LetterGuessState | null;
}

function GameContainer(props: GameContainerProps) {
    return (
        <div>
            <GuessList guessInput={props.guessInput} wordLength={props.wordLength} numberOfTurns={props.numberOfTurns}
                currentTurn={props.currentTurn} wordsGuessed={props.wordsGuessed} />
            <Keyboard addLetter={props.addLetter} getLetterGuessState={props.getLetterGuessState} />
        </div>
    );
}

export default GameContainer;