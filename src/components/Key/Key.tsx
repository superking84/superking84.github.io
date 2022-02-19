import LetterGuessState from '../../types/LetterGuessState';
import './Key.css';

interface KeyProps {
    label: string;
    keyAction: (key: string) => void;
    letterGuessState: LetterGuessState | null;
}

function Key(props: KeyProps) {
    let classes: string = "keyboard-key";
    switch (props.letterGuessState) {
        case LetterGuessState.Correct:
            classes += " correct-position";
            break;
        case LetterGuessState.InWrongPosition:
            classes += " in-wrong-position";
            break;
        case LetterGuessState.NotInWord:
            classes += " not-in-word";
            break;
        default:
            break;
    }

    return (
        <button type='button' className={classes}
            onMouseDown={(ev) => ev.preventDefault()}
            onClick={() => { props.keyAction(props.label); }}>{props.label}</button>
    );
}

export default Key;