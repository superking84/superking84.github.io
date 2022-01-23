import Key from '../Key/Key';

import './Keyboard.css';

function Keyboard() {
    const keys: string[][] = [
        'QWERTYUIOP'.split(''),
        'ASDFGHJKL'.split(''),
        'ZXCVBNM'.split('')
    ];

    return (
        <div className='container'>
            {keys.map((row, rowIndex) =>
                <div key={"row" + rowIndex} className='row'>{
                    row.map(k => <Key label={k}></Key>)
                }</div>
            )}
        </div>
    );
}

export default Keyboard;