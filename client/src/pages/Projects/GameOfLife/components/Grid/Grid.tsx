import "./Grid.scss";
import GridCell from "../GridCell/GridCell";

interface GridProps {
    values: boolean[][];
    toggleCell: (rowIndex: number, columnIndex: number, makeAlive?: boolean) => void;
}

function Grid({ values, toggleCell }: GridProps) {
    return <div className="grid">
        {values.map((row, rowIndex) =>
            <div className="row" key={`row-${rowIndex}`}>
                {row.map((isAlive, colIindex) =>
                    <GridCell
                        toggleCell={toggleCell}
                        key={`row-${rowIndex}-col-${colIindex}`}
                        isAlive={isAlive}
                        rowIndex={rowIndex}
                        columnIndex={colIindex}
                    />
                )}
            </div>
        )}
    </div>;
}

export default Grid;