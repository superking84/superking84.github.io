import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";
import { Link, Outlet } from "react-router-dom";

function App() {
    return <>
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="/">Go Home</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        <Nav.Link as={Link} to="/about">About Me</Nav.Link>
                        <NavDropdown title="Projects" id="basic-nav-dropdown">
                            <NavDropdown.Item as={Link} to="/projects/wordle">Wordle</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>

        <Outlet />
    </>;
}

export default App;