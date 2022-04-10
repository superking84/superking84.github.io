import "./GridCell.scss";

interface GridCellProps {
    isAlive: boolean;
}

function GridCell({ isAlive }: GridCellProps) {
    return <div className={`cell${isAlive ? " alive" : ""}`}>
    </div>;  
}

export default GridCell;