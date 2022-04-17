import "./GridCell.scss";

const MAIN_MOUSE_BUTTON_DOWN = 1;

interface GridCellProps {
    isAlive: boolean;
    rowIndex: number;
    columnIndex: number;
    toggleCell: (rowIndex: number, columnIndex: number, makeAlive?: boolean) => void;
}

function GridCell({ isAlive, toggleCell, rowIndex, columnIndex }: GridCellProps) {
    return <div
        onMouseMove={(e) => e.preventDefault()}
        onMouseEnter={(e) => {
            if (e.buttons === MAIN_MOUSE_BUTTON_DOWN) {
                const makeAlive = !e.ctrlKey;
                toggleCell(rowIndex, columnIndex, makeAlive);
            }
        }}
        onMouseDown={(e) => {
            const makeAlive = !e.ctrlKey;
            toggleCell(rowIndex, columnIndex, makeAlive);
        }} className={`cell${isAlive ? " alive" : ""}`}>
    </div>;  
}

export default GridCell;