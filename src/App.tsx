import { Link, Outlet } from "react-router-dom";

function App() {
    return <>
        <div>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/about">About Me</Link>
                </li>
                <li>
                    <Link to="/wordle">Wordle</Link>
                </li>
            </ul>
        </div>

        <hr />

        <Outlet />
    </>;
}

export default App;