import './GameContainer.css';
import GuessList from "../../components/GuessList/GuessList";
import Keyboard from "../../components/Keyboard/Keyboard";
import Game from '../../game';

interface GameContainerProps {
    game: Game;
    guessInput: string[];
    keyAction: (letter: string) => void;
}

function GameContainer(props: GameContainerProps) {
    return (
        <div className="game-container">
            <GuessList guessInput={props.guessInput} wordLength={props.game.word.length} numberOfTurns={props.game.numberOfTurns}
                currentTurn={props.game.currentTurn} wordsGuessed={props.game.wordsGuessed} getLetterGuessStateForGuess={props.game.getLetterGuessStateForGuess} />
            <Keyboard keyAction={props.keyAction} getLetterGuessStateForKey={props.game.getLetterGuessStateForKey} />
        </div>
    );
}

export default GameContainer;