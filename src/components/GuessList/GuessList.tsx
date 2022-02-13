import './GuessList.css';

interface GuessListProps {
    guessInput: string[];
}

function GuessList(props: GuessListProps) {
    // 6 is a placeholder for now
    const rows = [...Array(6)].map((_, rowIndex) => {
        const isCurrentRow = rowIndex === 0;//props.currentTurn === (i + 1);
        const rowClasses = `row${(isCurrentRow ? " current-row" : "")}`;

        return <div key={'guess-' + rowIndex} className={rowClasses}>
            {/* placeholder of 5 for now */}
            {[...Array(5)].map((_, colIndex) =>
                <div key={'guess-' + rowIndex + '-letter-' + colIndex} className="letter-square">{isCurrentRow ? props.guessInput[colIndex] || " " : " "}</div>)
            }
        </div>;
    });

    return (
        <div>
            {rows}
        </div>
    );
}

export default GuessList;