import React from 'react';
import GameContainer from './components/GameContainer/GameContainer';
import Game from './game';
import GameState from './types/GameState';

type AppState = {
  guessInput: string[];
};

class App extends React.Component {
  constructor(props: any) {
    super(props);

    this.state = {
      guessInput: []
    };
    this.game = new Game();
    this.game.startNew();

    this.handleKeyboardEvent = this.handleKeyboardEvent.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  state: AppState;
  game: Game;

  handleKeyboardEvent(ev: KeyboardEvent): void {
    if (this.game.gameState !== GameState.InProgress) {
      return;
    }

    if (this.state.guessInput.length < this.game.word.length) {
      if ('ABCDEFGHIJKLMNOPQRSTUVWXYZ'.includes(ev.key.toUpperCase())) {
        const updatedGuessInput: string[] = this.state.guessInput.concat(ev.key.toUpperCase());
        this.setState({
          guessInput: updatedGuessInput
        });
      }
    }

    if (ev.key === "Enter") {
      if (this.game.isGuessValid(this.state.guessInput)) {
        const guess: string = this.state.guessInput.join('');
        this.game.processGuess(guess);
        this.setState({
          guessInput: []
        });
      } else {
        console.log("invalid input");
      }
    }

    if (ev.key === "Backspace") {
      const updatedGuessInput: string[] = this.state.guessInput.slice(0, this.state.guessInput.length - 1);
      this.setState({
        guessInput: updatedGuessInput
      });
    }
  }

  handleButtonClick(key: string): void {
    if (this.game.gameState !== GameState.InProgress) {
      return;
    }

    if (key === 'Enter') {
      if (this.game.isGuessValid(this.state.guessInput)) {
        const guess: string = this.state.guessInput.join('');
        this.game.processGuess(guess);
        this.setState({
          guessInput: []
        });
      } else {
        console.log("invalid input");
      }
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

  componentDidMount(): void {
    window.addEventListener('keyup', this.handleKeyboardEvent);
  }

  componentWillUnmount(): void {
    window.removeEventListener('keyup', this.handleKeyboardEvent);
  }

  render(): React.ReactNode {
    return (
      <GameContainer guessInput={this.state.guessInput} wordLength={this.game.word.length}
        numberOfTurns={this.game.numberOfTurns} currentTurn={this.game.currentTurn} wordsGuessed={this.game.wordsGuessed}
        keyAction={this.handleButtonClick} getLetterGuessStateForKey={this.game.getLetterGuessStateForKey}
        getLetterGuessStateForGuess={this.game.getLetterGuessStateForGuess} />
    );
  }
}

export default App;
