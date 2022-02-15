import LetterGuessState from '../../types/LetterGuessState';
import Key from '../Key/Key';

import './Keyboard.css';

interface KeyboardProps {
    addLetter: (letter: string) => void;
    getLetterGuessState(letter: string): LetterGuessState | null;
}

function Keyboard(props: KeyboardProps) {
    const keys: string[][] = [
        'QWERTYUIOP'.split(''),
        'ASDFGHJKL'.split(''),
        'ZXCVBNM'.split('')
    ];

    return (
        <div>
            {keys.map((row, rowIndex) => {
                return <div key={`row-${rowIndex}`} className='keyboard-row'>{
                    row.map(k => <Key letterGuessState={props.getLetterGuessState(k)} label={k} key={`key-${k}`} addLetter={props.addLetter}></Key>)
                }</div>;
            })}
        </div>
    );
}

export default Keyboard;