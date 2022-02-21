import React from 'react';
import GameContainer from './components/GameContainer/GameContainer';
import MessageBox from './components/MessageBox/MessageBox';
import Game from './game';
import GameState from './types/GameState';
import WordGuessState from './types/WordGuessState';

type AppState = {
  guessInput: string[];
  message: string | null;
  messageTimeout: NodeJS.Timeout | null;
};

class App extends React.Component {
  constructor(props: any) {
    super(props);

    this.state = {
      guessInput: [],
      message: null,
      messageTimeout: null
    };
    this.game = new Game();
    this.game.startNew();

    this.handleKeyboardEvent = this.handleKeyboardEvent.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.processGameTurn = this.processGameTurn.bind(this);
  }

  state: AppState;
  game: Game;

  handleKeyboardEvent(ev: KeyboardEvent): void {
    if (this.game.gameState !== GameState.InProgress) {
      if (ev.key === "Enter") {
        this.startNewGame();
      }
    } else {

      if (this.state.message !== null) {
        this.clearMessageTimeout();
        this.setState({
          message: null,
          messageTimeout: null
        });
      }

      if (this.state.guessInput.length < this.game.word.length) {
        if (Game.VALID_LETTERS.includes(ev.key.toUpperCase())) {
          const updatedGuessInput: string[] = this.state.guessInput.concat(ev.key.toUpperCase());
          this.setState({
            guessInput: updatedGuessInput
          });
        }
      }

      if (ev.key === "Enter") {
        this.processGameTurn();
      }

      if (ev.key === "Backspace") {
        const updatedGuessInput: string[] = this.state.guessInput.slice(0, this.state.guessInput.length - 1);
        this.setState({
          guessInput: updatedGuessInput
        });
      }
    }
  }

  private processGameTurn(): void {
    const wordGuessState: WordGuessState = this.game.getWordGuessState(this.state.guessInput);

    if (wordGuessState === WordGuessState.Valid) {
      const guess: string = this.state.guessInput.join('');
      this.game.processGuess(guess);

      let message: string | null = null;
      switch (+this.game.gameState) {
        case GameState.Lost:
          message = `You lost. The word was ${this.game.word}. Press Enter to play again.`;
          break;
        case GameState.Won:
          message = "You win! Press Enter to play again.";
          break;
        default:
          break;
      }

      this.clearMessageTimeout();
      this.setState({
        guessInput: [],
        message: message,
        messageTimeout: null
      });

    } else {
      const message: string = wordGuessState === WordGuessState.InvalidLength ?
        "Invalid word length" : "Not in word list";
      const that = this;
      this.clearMessageTimeout();
      this.setState({
        message: message,
        messageTimeout: setTimeout(() => that.setState({ message: null, messageTimeout: null }), 2000)
      });
    }
  }

  private clearMessageTimeout(): void {
    if (this.state.messageTimeout !== null) {
      clearTimeout(this.state.messageTimeout as NodeJS.Timeout);
    }
  }

  handleButtonClick(key: string): void {
    if (this.game.gameState !== GameState.InProgress) {
      if (key === "Enter") {
        this.startNewGame();
      }
    } else {
      if (key === 'Enter') {
        this.processGameTurn();
      } else if (key === "Back") {
        const updatedGuessInput: string[] = this.state.guessInput.slice(0, this.state.guessInput.length - 1);
        this.setState({
          guessInput: updatedGuessInput
        });
      } else if (this.state.guessInput.length < this.game.word.length) {
        const updatedGuessInput: string[] = this.state.guessInput.concat(key.toUpperCase());
        this.setState({
          guessInput: updatedGuessInput
        });
      }
    }
  }

  private startNewGame(): void {
    this.game.startNew();
    this.setState({
      guessInput: [],
      message: null,
      messageTimeout: null
    });
  }

  componentDidMount(): void {
    window.addEventListener('keyup', this.handleKeyboardEvent);
  }

  componentWillUnmount(): void {
    window.removeEventListener('keyup', this.handleKeyboardEvent);
  }

  render(): React.ReactNode {
    const gameContainer = <GameContainer game={this.game} guessInput={this.state.guessInput}
      keyAction={this.handleButtonClick} />;

    if (this.state.message === null) {
      return gameContainer;
    } else {
      return <>
        {gameContainer}
        <MessageBox message={this.state.message}></MessageBox>
      </>;
    }
  }
}

export default App;
