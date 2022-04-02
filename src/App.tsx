import { Outlet } from "react-router-dom";
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';

function App() {
    return <>
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="/">Go Home</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/about">About Me</Nav.Link>
                        <NavDropdown title="Projects" id="basic-nav-dropdown">
                            <NavDropdown.Item href="/wordle">Wordle</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>

        <Outlet />
    </>;
}

export default App;