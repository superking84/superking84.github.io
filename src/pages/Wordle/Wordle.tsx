import './Wordle.scss';
import { useCallback, useEffect, useState } from "react";
import GameContainer from "../../components/GameContainer/GameContainer";
import MessageBox from "../../components/MessageBox/MessageBox";
import Game from "../../game";
import GameState from "../../types/GameState";
import WordGuessState from "../../types/WordGuessState";

interface AppProps {
    game: Game;
}

function Wordle(props: AppProps) {
    const [guessInput, setGuessInput] = useState<string[]>([]);
    const [message, setMessage] = useState<string | null>(null);
    const [messageTimeout, setMessageTimeout] = useState<NodeJS.Timeout | null>(null);

    const game = props.game;

    const clearMessageTimeout = useCallback(function (): void {
        if (messageTimeout !== null) {
            clearTimeout(messageTimeout as NodeJS.Timeout);
        }
    }, [messageTimeout]);

    const processGameTurn = useCallback(function (): void {
        const wordGuessState: WordGuessState = game.getWordGuessState(guessInput);

        if (wordGuessState === WordGuessState.Valid) {
            const guess: string = guessInput.join('');
            game.processGuess(guess);

            let message: string | null = null;
            switch (+game.gameState) {
                case GameState.Lost:
                    message = `You lost. The word was ${game.word}. Press Enter to play again.`;
                    break;
                case GameState.Won:
                    message = "You win! Press Enter to play again.";
                    break;
                default:
                    break;
            }

            clearMessageTimeout();
            setGuessInput([]);
            setMessage(message);
            setMessageTimeout(null);

        } else {
            const message: string = wordGuessState === WordGuessState.InvalidLength ?
                "Invalid word length" : "Not in word list";

            clearMessageTimeout();
            setMessage(message);
            setMessageTimeout(setTimeout(() => {
                setMessage(null);
                setMessageTimeout(null);
            }, 2000));
        }
    }, [clearMessageTimeout, game, guessInput]);

    const startNewGame = useCallback(function (): void {
        game.startNew();
        setGuessInput([]);
        setMessage(null);
        setMessageTimeout(null);
    }, [game]);

    const handleKeyboardEvent = useCallback(function (ev: KeyboardEvent): void {
        if (game.gameState !== GameState.InProgress) {
            if (ev.key === "Enter") {
                startNewGame();
            }
        } else {

            if (message !== null) {
                clearMessageTimeout();
                setMessage(null);
                setMessageTimeout(null);
            }

            if (guessInput.length < game.word.length) {
                if (Game.VALID_LETTERS.includes(ev.key.toUpperCase())) {
                    const updatedGuessInput: string[] = guessInput.concat(ev.key.toUpperCase());
                    setGuessInput(updatedGuessInput);
                }
            }

            if (ev.key === "Enter") {
                processGameTurn();
            }

            if (ev.key === "Backspace") {
                const updatedGuessInput: string[] = guessInput.slice(0, guessInput.length - 1);
                setGuessInput(updatedGuessInput);
            }
        }
    }, [clearMessageTimeout, game.gameState, game.word.length, guessInput, message, processGameTurn, startNewGame]);

    useEffect(() => {
        window.addEventListener('keyup', handleKeyboardEvent);

        return () => {
            window.removeEventListener('keyup', handleKeyboardEvent);
        };
    }, [guessInput, handleKeyboardEvent]);


    // function handleKeyboardEvent(ev: KeyboardEvent): void {

    // }


    function handleButtonClick(key: string): void {
        if (game.gameState !== GameState.InProgress) {
            if (key === "Enter") {
                startNewGame();
            }
        } else {
            if (key === 'Enter') {
                processGameTurn();
            } else if (key === "Back") {
                const updatedGuessInput: string[] = guessInput.slice(0, guessInput.length - 1);
                setGuessInput(updatedGuessInput);
            } else if (guessInput.length < game.word.length) {
                const updatedGuessInput: string[] = guessInput.concat(key.toUpperCase());
                setGuessInput(updatedGuessInput);
            }
        }
    }

    const gameContainer = <GameContainer game={game} guessInput={guessInput}
        keyAction={handleButtonClick} />;
    if (message === null) {
        return gameContainer;
    } else {
        return <>
            {gameContainer}
            <MessageBox message={message}></MessageBox>
        </>;
    }
}

export default Wordle;