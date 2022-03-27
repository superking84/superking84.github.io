import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Wordle from './Wordle';
import reportWebVitals from './reportWebVitals';
import Game from './game';
import wordList from './resources/wordList';
import App from './App';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const game = new Game(wordList);
const Home = () => <div><h2>Home</h2></div>;
const About = () => <div><h2>About Us</h2></div>;

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="wordle" element={<Wordle game={game} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
