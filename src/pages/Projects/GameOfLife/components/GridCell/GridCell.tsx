import "./GridCell.scss";

interface GridCellProps {
    isAlive: boolean;
    rowIndex: number;
    columnIndex: number;
    toggleCell: (rowIndex: number, columnIndex: number) => void;
}

function GridCell({ isAlive, toggleCell, rowIndex, columnIndex }: GridCellProps) {
    return <div onClick={() => toggleCell(rowIndex, columnIndex)} className={`cell${isAlive ? " alive" : ""}`}>
    </div>;  
}

export default GridCell;