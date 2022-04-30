/* eslint-disable react/no-unescaped-entities */
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
    }, [stopGame]);

    useEffect(() => {
        window.addEventListener("keyup", handleKeyboardEvent);

        return () => {
            window.removeEventListener("keyup", handleKeyboardEvent);
        };
    }, [handleKeyboardEvent]);

    const toggleCell = useCallback(function (rowIndex: number, columnIndex: number, makeAlive?: boolean): void {
        game.toggleCellState(rowIndex, columnIndex, makeAlive);
        setGrid(game.getCurrentGridState());
    }, []);

    return <div className="container gol-container">
        <div className="row">
            <div className="col-lg-4">
                <div className="panel panel-default my-panel">
                    <div className="panel-body">
                        <h3>Conway's Game of Life</h3>
                        <h4>How To Play</h4>
                        <ol>
                            <li>To activate a cell, simply click it, or or deactivate it, simply hold CTRL and click.</li>
                            <li>
                                You can also hold down your mouse button and drag to activate or deactivate multiple cells
                                quickly.
                            </li>
                            <li>
                                Press <StartButton disable={running} action={() => startGame()} /> to begin running the simulation,
                                or press <ProcessTurnButton disable={running} action={() => processTurn(true)} /> to advance the 
                                simulation by one turn.
                            </li>
                            <li>
                                Pressing <StopButton disable={!running} action={() => stopGame()} /> will pause the game in its current
                                state, while <ClearButton disable={false} action={() => clearGrid()} /> will stop the game and also
                                clear the grid entirely.
                            </li>
                        </ol>
                    </div>
                </div>
            </div>
            
            <div className="col-lg-8">
                <div>
                    <StartButton disable={running} action={() => startGame()} />
                    <StopButton disable={!running} action={() => stopGame()} />
                    <ClearButton disable={false} action={() => clearGrid()} />
                    <ProcessTurnButton disable={running} action={() => processTurn(true)} />
                </div>
                <Grid toggleCell={toggleCell} values={grid} />
            </div>
        </div>
    </div>;
}

interface ActionButtonProps {
    disable: boolean;
    action: () => void;
}
const StartButton = ({ disable, action }: ActionButtonProps) => <button type="button" className={disable ? "" : "btn-success"} disabled={disable} onClick={action}>Start</button>;
const StopButton = ({ disable, action }: ActionButtonProps) => <button type="button" className={disable ? "" : "btn-danger"} disabled={disable} onClick={action}>Stop</button>;
const ClearButton = ({ disable, action }: ActionButtonProps) => <button type="button" className={disable ? "" : "btn-danger"} disabled={disable} onClick={action}>Clear</button>;
const ProcessTurnButton = ({ disable, action }: ActionButtonProps) => <button type="button" className={disable ? "" : "btn-info"} disabled={disable} onClick={action}>+1 Turn</button>;

export default GameOfLife;