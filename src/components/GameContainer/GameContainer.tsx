import './GameContainer.scss';
import GuessList from "../../components/GuessList/GuessList";
import Keyboard from "../../components/Keyboard/Keyboard";
import Game from '../../game';

interface GameContainerProps {
    game: Game;
    guessInput: string[];
    keyAction: (letter: string) => void;
}

function GameContainer(props: GameContainerProps) {
    const { guessInput, keyAction } = props;
    const { word, numberOfTurns, currentTurn, wordsGuessed, getLetterGuessStatesForGuess, getLetterGuessStateForKey } = props.game;

    return (
        <div className="game-container">
            <GuessList guessInput={guessInput} wordLength={word.length} numberOfTurns={numberOfTurns}
                currentTurn={currentTurn} wordsGuessed={wordsGuessed} getLetterGuessStatesForGuess={getLetterGuessStatesForGuess} />
            <Keyboard keyAction={keyAction} getLetterGuessStateForKey={getLetterGuessStateForKey} />
        </div>
    );
}

export default GameContainer;