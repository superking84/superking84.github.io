import "./GameOfLife.scss";
import { useCallback, useEffect, useRef, useState } from "react";
import GameOfLifeGame from "./game";
import useInterval from "../../../useInterval";

const game = new GameOfLifeGame(10, 10, 250);

function GameOfLife() {
    const [turn, setTurn] = useState(0);
    const [running, setRunning] = useState(false);
    const runningRef = useRef(running);
    runningRef.current = running;

    const [grid, setGrid] = useState<boolean[][]>(() => game.getNextCellState());
    
    const processTurn = useCallback(function (): void {
        if (runningRef.current) {
            setTurn(turn + 1);
            const cells = game.getNextCellState();
            setGrid(cells);
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

    useEffect(() => {
        window.addEventListener("keyup", handleKeyboardEvent);
        
        return () => {
            window.removeEventListener("keyup", handleKeyboardEvent);
        };
    }, [handleKeyboardEvent]);

    return <div className="gol-container">
        <h1>{running ? "Running" : "NOT Running"}</h1>
        <h2>{`Turn ${turn}`}</h2>
        {grid.map((row, rowI) =>
            <div key={`row-${rowI}`}>
                {row.map((alive, colI) =>
                    <div className="cell" key={`row-${rowI}-col-${colI}`}>
                        {alive ? "O" : "."}
                    </div>)}
            </div>)}
    </div>;
}

export default GameOfLife;