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

    const [grid, setGrid] = useState<boolean[][]>(() => game.getCurrentCellState());
    
    const processTurn = useCallback(function (): void {
        if (runningRef.current) {
            setTurn(turn + 1);
            game.incrementCellState();
            setGrid(game.getCurrentCellState());
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
        setGrid(game.getCurrentCellState());
        setTurn(0);
    }, [grid]);

    useEffect(() => {
        window.addEventListener("keyup", handleKeyboardEvent);

        return () => {
            window.removeEventListener("keyup", handleKeyboardEvent);
        };
    }, [handleKeyboardEvent]);

    return <div className="gol-container">
        <h2>{`Turn ${turn}`}</h2>
        
        <div>
            <button type="button" onClick={startGame}>Start</button>
            <button type="button" onClick={stopGame}>Stop</button>
            <button type="button" onClick={clearGrid}>Clear</button>
        </div>
        <Grid values={grid} />
    </div>;
}

export default GameOfLife;