import "bootstrap/dist/css/bootstrap.min.css";
import "./index.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import About from "./pages/About/About";
import App from "./App";
import GameOfLife from "./pages/Projects/GameOfLife/GameOfLife";
import Home from "./pages/Home/Home";
import React from "react";
import ReactDOM from "react-dom";
import Wordle from "./pages/Projects/Wordle/Wordle";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="" element={<App />}>
                    <Route index element={<Home />} />
                    <Route path="about" element={<About />} />
                    <Route path="projects">
                        <Route path="wordle" element={<Wordle />} />
                        <Route path="gameoflife" element={<GameOfLife />} />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
