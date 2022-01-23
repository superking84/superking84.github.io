import './Key.css';

interface KeyProps {
    label: string;
}

function Key(props: KeyProps) {
    return (
        <button type='button' className="key">{props.label}</button>
    );
}

export default Key;