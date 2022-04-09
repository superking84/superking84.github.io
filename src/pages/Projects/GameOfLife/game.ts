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

class GameOfLife {
    private wrapBoard = true;

    private rowCount: number;
    private columnCount: number;
    private millisecondsPerTurn: number;
    private turnInterval: NodeJS.Timer | null = null;
    private isRunning(): boolean {
        return this.turnInterval !== null;
    }

    private turn: number;
    private cells: Cell[][];

    constructor(rowCount: number, columnCount: number, millisecondsPerTurn: number) {
        
        this.rowCount = rowCount;    
        this.columnCount = columnCount;
        this.millisecondsPerTurn = millisecondsPerTurn;

        this.turn = 1;
        this.cells = this.initializeCells();
    }

    private startGame() {
        this.turnInterval = setInterval(() => this.processTurn(), this.millisecondsPerTurn);
    }
    private stopGame() {
        if (this.turnInterval !== null) {
            clearInterval(this.turnInterval as NodeJS.Timer);
            this.turnInterval = null;
        }
    }

    private processTurn(): void {
        // step 1: set future value
        this.cells.forEach(row => {
            row.forEach(cell => {
                const livingNeighborCount: number = this.getLivingNeighborCount(cell);
                cell.willBeAlive = livingNeighborCount === 2 || livingNeighborCount === 3;
            });
        });

        // step 2: update current value
        this.cells.forEach(row => {
            row.forEach(cell => {
                cell.isAlive = cell.willBeAlive;
            });
        });
        throw new Error("Method not implemented.");
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
                coordinates.push({ row: cell.row, column: leftColumn });
            }
            if (rightColumn >= this.columnCount) {
                rightColumn = 0;
                coordinates.push({ row: cell.row, column: rightColumn });
            }
            if (upperRow < 0) {
                upperRow = this.rowCount - 1;
                coordinates.push({ row: upperRow, column: cell.column });
            }
            if (lowerRow >= this.rowCount) {
                lowerRow = 0;
                coordinates.push({ row: lowerRow, column: cell.column });
            }
        } else {
            if (leftColumn >= 0) {
                coordinates.push({ row: cell.row, column: leftColumn });
            }
            if (rightColumn < this.columnCount) {
                coordinates.push({ row: cell.row, column: rightColumn });
            }
            if (upperRow >= 0) {
                coordinates.push({ row: upperRow, column: cell.column });
            }
            if (lowerRow < this.rowCount) {
                coordinates.push({ row: lowerRow, column: cell.column });
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
                cell.neighborCoordinates = this.getCellNeighborCoordinates(cell);
                row.push(cell);
            });

            output.push(row);
        });

        return output;
    }
}

export default GameOfLife;