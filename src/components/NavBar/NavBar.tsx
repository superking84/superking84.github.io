import './NavBar.css';
import { Link } from "react-router-dom";

function NavBar() {
    return <nav className="navbar">
        <ul className="navbar-list">
            <li className="navbar-item">
                <Link to="/">Home</Link>
            </li>
            <li className="navbar-item">
                <Link to="/about">About Me</Link>
            </li>
            <li className="navbar-item">
                <Link to="/wordle">Wordle</Link>
            </li>
        </ul>
    </nav>;
}

export default NavBar;