import "./Grid.scss";
import GridCell from "../GridCell/GridCell";

interface GridProps {
    values: boolean[][]
}

function Grid({ values: grid }: GridProps) {
    return <div className="grid">
        {grid.map((row, rowI) =>
            <div className="row" key={`row-${rowI}`}>
                {row.map((isAlive, colI) =>
                    <GridCell key={`row-${rowI}-col-${colI}`} isAlive={isAlive} />
                )}
            </div>
        )}
    </div>;
}

export default Grid;