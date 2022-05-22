import "bootstrap/dist/css/bootstrap.min.css";
import "./Home.scss";

/* eslint-disable react/no-unescaped-entities */
const Home = () => <div className="home-container">
    <h2>Welcome!</h2>
    <div className="panel panel-default my-panel">
        <div className="panel-body">
            <p>Welcome! I'm Frank, and I develop software for a living. </p>
            <p>
                This page is a portfolio of sorts, although it's more of a personal playground for me.  Here, I can work on small projects that allow me to 
                develop my skill in technologies that I might not get to in my daily working life. Source code for all of the projects available here can be
                found <a href="https://github.com/superking84/superking84.github.io">here on my GitHub page.</a>
            </p>
        </div>
    </div>

    <h2>Projects</h2>
    <div className="panel panel-default my-panel">
        <div className="panel-body">
            <p>
                My current focus is on React and Typescript, and so the projects I have available right now (not to mention this page itself) reflect
                that focus. Of these two projects, one is new to me and the other is a React version of something I've done before. With both, I've
                learned some very important lessons about developing in React, lessons which I hope will continue as I work on more projects in the future.
            </p>

            <ul>
                <li>
                    <h3>Wordle</h3>
                    <p>
                        A word game that you've <i>probably</i> heard of, Wordle is a guessing game in which you have six tries to guess a randomly-chosen
                        five-letter word. This shameless copy is in good working shape, although the biggest setback it has right now is a relatively limited
                        word list. The game is definitely playable, but you may find certain words surprisingly not available. My hope is to eventually expand
                        the list even further to improve playability.
                    </p>
                </li>
                <li>
                    <h3>Conway's Game of Life</h3>
                    <p>
                        <a href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life">Described here in more detail</a>, Conway's Game of Life is a
                        "zero-player game", which means that the way the game progresses is based on the initial state of the game with no extra input needed.
                        I've written a version of this before in vanilla JS some years ago, but since it's always been one of my favorite games, I thought
                        rewriting it would be a great way to improve my React/Typescript skills.
                    </p>
                </li>
            </ul>
        </div>
    </div>
</div>;

export default Home;