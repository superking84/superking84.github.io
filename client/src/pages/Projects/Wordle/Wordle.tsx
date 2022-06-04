import "./Wordle.scss";
import { useCallback, useEffect, useState } from "react";
import GameContainer from "./components/GameContainer/GameContainer";
import GameState from "./types/GameState";
import MessageBox, { MessageType } from "../../../components/MessageBox/MessageBox";
import WordGuessState from "./types/WordGuessState";
import WordleGame from "./game";
import { getWordList } from "./services/service";

let game: WordleGame;

const MESSAGE_BOX_TIMEOUT_MS = 2000;

function Wordle() {
    const [guessInput, setGuessInput] = useState<string[]>([]);
    const [message, setMessage] = useState<string | null>(null);
    const [messageType, setMessageType] = useState<MessageType | null>(null);
    const [messageTimeout, setMessageTimeout] = useState<NodeJS.Timeout | null>(null);
    const [ready, setReady] = useState<boolean>(false);

    const clearMessageTimeout = useCallback(function (): void {
        if (messageTimeout !== null) {
            clearTimeout(messageTimeout as NodeJS.Timeout);
        }
    }, [messageTimeout]);

    const processGameTurn = useCallback(function (): void {
        const wordGuessState: WordGuessState = game.getWordGuessState(guessInput);

        if (wordGuessState === WordGuessState.Valid) {
            const guess: string = guessInput.join("");
            game.processGuess(guess);

            let messageText: string | null = null;
            let messageType: MessageType | null = null;
            switch (+game.gameState) {
                case GameState.Lost:
                    messageText = `You lost. The word was ${game.word}. Press Enter to play again.`;
                    messageType = MessageType.Loss;
                    break;
                case GameState.Won:
                    messageText = `${game.word} is a winner! Press Enter to play again.`;
                    messageType = MessageType.Win;
                    break;
                default:
                    break;
            }

            clearMessageTimeout();
            setGuessInput([]);
            setMessage(messageText);
            setMessageType(messageType);
            setMessageTimeout(null);

        } else {
            let messageText: string;
            switch (wordGuessState) {
                case WordGuessState.InvalidLength:
                    messageText = "Invalid word length";
                    break;
                case WordGuessState.AlreadyUsed:
                    messageText = "You've already used this word. Select another";
                    break;
                case WordGuessState.NotInWordList:
                    messageText = "Not in word list";
                    break;
                default: return;
            }
            
            clearMessageTimeout();
            setMessage(messageText);
            setMessageType(MessageType.Error);
            setMessageTimeout(setTimeout(() => {
                setMessage(null);
                setMessageTimeout(null);
            }, MESSAGE_BOX_TIMEOUT_MS));
        }
    }, [clearMessageTimeout, guessInput]);

    const startNewGame = useCallback(function (): void {
        game.startNew();
        setGuessInput([]);
        setMessage(null);
        setMessageType(null);
        setMessageTimeout(null);
    }, []);

    const handleKeyboardEvent = useCallback(function (ev: KeyboardEvent): void {
        if (game.gameState !== GameState.InProgress) {
            if (ev.key === "Enter") {
                startNewGame();
            }
        } else {
            if (message !== null) {
                clearMessageTimeout();
                setMessage(null);
                setMessageType(null);
                setMessageTimeout(null);
            }

            if (guessInput.length < game.word.length) {
                if (WordleGame.VALID_LETTERS.includes(ev.key.toUpperCase())) {
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
    }, [clearMessageTimeout, guessInput, message, processGameTurn, startNewGame]);

    useEffect(() => {
        window.addEventListener("keyup", handleKeyboardEvent);

        return () => {
            window.removeEventListener("keyup", handleKeyboardEvent);
        };
    }, [guessInput, handleKeyboardEvent]);

    useEffect(() => {
        let mounted = true;
        getWordList()
            .then(words => {
                if (mounted) {
                    game = new WordleGame(words);
                    setReady(true);
                }
            });
        
        return () => {
            mounted = false;
        }
    }, []);

    function handleButtonClick(key: string): void {
        if (game.gameState !== GameState.InProgress) {
            if (key === "Enter") {
                startNewGame();
            }
        } else {
            if (key === "Enter") {
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
    
    if (ready) {
        return <div className="wordle-container">
            <h2>Wordle</h2>
            {gameContainer}
            {message !== null ? <MessageBox message={message.toString()} messageType={messageType}></MessageBox> : null}
        </div>;
    } else {
        return <></>;
    }
}

export default Wordle;