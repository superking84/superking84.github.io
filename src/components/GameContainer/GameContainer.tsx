import './GameContainer.css';
import GuessList from "../../components/GuessList/GuessList";
// import Keyboard from "../../components/Keyboard/Keyboard";

interface GameContainerProps {
    guessInput: string[];
}
function GameContainer({ guessInput }: GameContainerProps) {
    return (
        <div className='container'>
            <GuessList guessInput={guessInput} />
            {/* <Keyboard addLetter={this.addLetter} /> */}
        </div>
    );
}

export default GameContainer;