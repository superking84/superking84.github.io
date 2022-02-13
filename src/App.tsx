import React from 'react';
import GameContainer from './components/GameContainer/GameContainer';
import Game from './game';

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
  }

  state: AppState;
  game: Game;

  handleKeyboardEvent(ev: KeyboardEvent): void {
    if (this.state.guessInput.length < this.game.word.length) {
      if ('ABCDEFGHIJKLMNOPQRSTUVWXYZ'.includes(ev.key.toUpperCase())) {
        const updatedGuessInput: string[] = this.state.guessInput.concat(ev.key.toUpperCase());
        this.setState({
          guessInput: updatedGuessInput
        });
      }
    }

    // assumes valid (enough characters) guess for now
    if (ev.key === "Enter") {
      const guess: string = this.state.guessInput.join('');
      this.game.processGuess(guess);
    }

    if (ev.key === "Backspace") {
      const updatedGuessInput: string[] = this.state.guessInput.slice(0, this.state.guessInput.length - 1);
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
      <GameContainer guessInput={this.state.guessInput} />
    );
  }
}

export default App;
