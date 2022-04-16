import "./GameOfLife.scss";
import { useCallback, useEffect, useRef, useState } from "react";
import GameOfLifeGame from "./game";
import Grid from "./components/Grid/Grid";
import useInterval from "../../../useInterval";

const game = new GameOfLifeGame(25, 25, 200);

function GameOfLife() {
    const [turn, setTurn] = useState(0);
    const [running, setRunning] = useState(false);
    const runningRef = useRef(running);
    runningRef.current = running;

    const [grid, setGrid] = useState<boolean[][]>(() => game.getCurrentGridState());
    
    const processTurn = useCallback(function (forceTurn = false): void {
        if (runningRef.current || forceTurn) {
            setTurn(turn + 1);
            game.incrementCellState();
            setGrid(game.getCurrentGridState());
        }
        
    }, [turn]);
    
    useInterval(processTurn, game.millisecondsPerTurn);

    const handleKeyboardEvent = useCallback(function (ev: KeyboardEvent): void {
        if (ev.key === "Enter") {
            setRunning(!running);
            if (!running) {
                runningRef.current = true;
            }
        }
    }, [running]);

    const startGame = useCallback(function (): void {
        if (!running) {
            setRunning(true);
            runningRef.current = true;
        }   
    }, [running]);

    const stopGame = useCallback(function (): void {
        if (running) {
            setRunning(false);
            runningRef.current = false;
        }    
    }, [running]);

    const clearGrid = useCallback(function (): void {
        stopGame();
        game.clearGrid();
        setGrid(game.getCurrentGridState());
        setTurn(0);
    }, [grid]);

    useEffect(() => {
        window.addEventListener("keyup", handleKeyboardEvent);

        return () => {
            window.removeEventListener("keyup", handleKeyboardEvent);
        };
    }, [handleKeyboardEvent]);

    const toggleCell = useCallback(function (rowIndex: number, columnIndex: number): void {
        game.toggleCellState(rowIndex, columnIndex);
        setGrid(game.getCurrentGridState());
    }, [grid]);

    return <div className="gol-container">
        <h2>{`Turn ${turn}`}</h2>
        
        <div>
            <button type="button" disabled={running} onClick={startGame}>Start</button>
            <button type="button" disabled={!running} onClick={stopGame}>Stop</button>
            <button type="button" onClick={clearGrid}>Clear</button>
            <button type="button" disabled={running} onClick={() => processTurn(true)}>+1 Turn</button>
        </div>
        <Grid toggleCell={toggleCell} values={grid} />
    </div>;
}

export default GameOfLife;