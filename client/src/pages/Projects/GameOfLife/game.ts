import CellCoordinates from "./types/CellCoordinates";

class Cell {
    isAlive = false;
    willBeAlive = false;
    
    private _row: number;
    public get row(): number {
        return this._row;
    }
    private _column: number;
    public get column(): number {
        return this._column;
    }

    neighborCoordinates!: CellCoordinates[];

    constructor(row: number, column: number) {
        this._row = row;
        this._column = column;
    }
}

class GameOfLifeGame {
    private wrapBoard = true;
    
    private rowCount: number;
    private columnCount: number;
    private _millisecondsPerTurn: number;
    public get millisecondsPerTurn(): number {
        return this._millisecondsPerTurn;
    }
    
    private _turn: number;
    public get turn(): number {
        return this._turn;
    }
    
    private _cells: Cell[][];
    public get cells(): Cell[][] {
        return this._cells;
    }
    
    clearGrid(): void {
        this._cells.map(row =>
            row.forEach(cell => cell.isAlive = false)
        );
    }
    
    constructor(rowCount: number, columnCount: number, millisecondsPerTurn: number) {
        this.rowCount = rowCount;    
        this.columnCount = columnCount;
        this._millisecondsPerTurn = millisecondsPerTurn;

        this._turn = 0;
        this._cells = this.initializeCells();
    }
    
    getCurrentGridState(): boolean[][] {
        return this.cells.map(row => row.map(cell => cell.isAlive));
    }

    toggleCellState(rowIndex: number, columnIndex: number, makeAlive?: boolean): void {
        if (makeAlive === undefined) {
            this._cells[rowIndex][columnIndex].isAlive = !this._cells[rowIndex][columnIndex].isAlive;
        } else {
            this._cells[rowIndex][columnIndex].isAlive = makeAlive as boolean;        
        }
    }

    incrementCellState(): void {
        // step 1: set future value
        this.cells.forEach(row => {
            row.forEach(cell => {
                const livingNeighborCount: number = this.getLivingNeighborCount(cell);
                cell.willBeAlive = (cell.isAlive && livingNeighborCount === 2) || livingNeighborCount === 3;
            });
        });

        // step 2: update current value
        this.cells.forEach(row => {
            row.forEach(cell => {
                cell.isAlive = cell.willBeAlive;
            });
        });
    }

    private getLivingNeighborCount(cell: Cell): number {
        const neighbors: Cell[] = this.getCellNeighbors(cell);
        return neighbors.filter(n => n.isAlive).length;
    }

    private getCellNeighbors(cell: Cell): Cell[] {
        return cell.neighborCoordinates.map(c => this.cells[c.row][c.column]);
    }

    private getCellNeighborCoordinates(cell: Cell): CellCoordinates[] {
        const coordinates: CellCoordinates[] = [];

        let leftColumn = cell.column - 1;
        let rightColumn = cell.column + 1;
        let upperRow = cell.row - 1;
        let lowerRow = cell.row + 1;

        if (this.wrapBoard) {
            if (leftColumn < 0) {
                leftColumn = this.columnCount - 1;
            }
            
            if (rightColumn >= this.columnCount) {
                rightColumn = 0;
            }
            
            if (upperRow < 0) {
                upperRow = this.rowCount - 1;
            }
            
            if (lowerRow >= this.rowCount) {
                lowerRow = 0;
            }
            
            coordinates.push({ row: upperRow, column: leftColumn });
            coordinates.push({ row: upperRow, column: cell.column });
            coordinates.push({ row: upperRow, column: rightColumn });
            coordinates.push({ row: cell.row, column: leftColumn });
            coordinates.push({ row: cell.row, column: rightColumn });
            coordinates.push({ row: lowerRow, column: leftColumn });
            coordinates.push({ row: lowerRow, column: cell.column });
            coordinates.push({ row: lowerRow, column: rightColumn });
        } else {
            if (upperRow >= 0) {
                coordinates.push({ row: upperRow, column: cell.column });
                if (leftColumn >= 0) {
                    coordinates.push({ row: upperRow, column: leftColumn });
                }
                if (rightColumn < this.columnCount) {
                    coordinates.push({ row: upperRow, column: rightColumn });
                }
            }

            if (leftColumn >= 0) {
                coordinates.push({ row: cell.row, column: leftColumn });
            }
            if (rightColumn < this.columnCount) {
                coordinates.push({ row: cell.row, column: rightColumn });
            }
            
            if (lowerRow < this.rowCount) {
                coordinates.push({ row: lowerRow, column: cell.column });
                if (leftColumn >= 0) {
                    coordinates.push({ row: lowerRow, column: leftColumn });
                }
                if (rightColumn < this.columnCount) {
                    coordinates.push({ row: lowerRow, column: rightColumn });
                }
            }
        }

        return coordinates;
    }


    private initializeCells(): Cell[][] {
        const output: Cell[][] = [];

        Array.from({ length: this.rowCount }, (_, rowIndex) => {
            const row: Cell[] = [];

            Array.from({ length: this.columnCount }, (_, columnIndex) => {
                const cell = new Cell(rowIndex, columnIndex);
                //DEBUG ONLY, delete
                cell.isAlive = Math.random() <= 0.25;
                // end debug
                cell.neighborCoordinates = this.getCellNeighborCoordinates(cell);
                row.push(cell);

                return cell;
            });

            output.push(row);

            return row;
        });

        return output;
    }
}

export default GameOfLifeGame;