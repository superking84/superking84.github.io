import "./Keyboard.scss";
import Key from "../Key/Key";
import KeyPlacement from "../../types/KeyPlacement";
import LetterGuessState from "../../types/LetterGuessState";

interface KeyboardProps {
    keyAction: (letter: string) => void;
    getLetterGuessStateForKey(letter: string): LetterGuessState | null;
}

const keyPlacements: KeyPlacement[] = [
    { key: "Q", row: 1, column: 1 },
    { key: "W", row: 1, column: 2 },
    { key: "E", row: 1, column: 3 },
    { key: "R", row: 1, column: 4 },
    { key: "T", row: 1, column: 5 },
    { key: "Y", row: 1, column: 6 },
    { key: "U", row: 1, column: 7 },
    { key: "I", row: 1, column: 8 },
    { key: "O", row: 1, column: 9 },
    { key: "P", row: 1, column: 10 },
    { key: "A", row: 2, column: 1 },
    { key: "S", row: 2, column: 2 },
    { key: "D", row: 2, column: 3 },
    { key: "F", row: 2, column: 4 },
    { key: "G", row: 2, column: 5 },
    { key: "H", row: 2, column: 6 },
    { key: "J", row: 2, column: 7 },
    { key: "K", row: 2, column: 8 },
    { key: "L", row: 2, column: 9 },
    { key: "Enter", row: 3, column: 1 },
    { key: "Z", row: 3, column: 2 },
    { key: "X", row: 3, column: 3 },
    { key: "C", row: 3, column: 4 },
    { key: "V", row: 3, column: 5 },
    { key: "B", row: 3, column: 6 },
    { key: "N", row: 3, column: 7 },
    { key: "M", row: 3, column: 8 },
    { key: "Back", row: 3, column: 9 }
];

function Keyboard(props: KeyboardProps) {
    const numRows = Math.max(...keyPlacements.map(kp => kp.row));

    return (
        <div className="keyboard">
            {[...Array(numRows)].map((_, rowIndex) => {
                const thisRow: KeyPlacement[] = keyPlacements.filter(kp => kp.row === rowIndex + 1);
                return <div key={`row-${rowIndex}`} className='keyboard-row'>{
                    thisRow.map(kp => {
                        const letterGuessState = props.getLetterGuessStateForKey(kp.key);

                        return <Key letterGuessState={letterGuessState} label={kp.key} key={`key-${kp.key}`} keyAction={props.keyAction}></Key>;
                    })
                }</div>;
            })}
        </div>
    );
}

export default Keyboard;