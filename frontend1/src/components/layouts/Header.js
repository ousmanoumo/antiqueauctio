import React, { useEffect } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { useHistory, Link } from 'react-router-dom';
export default function Header(props) {
    const history = useHistory();

    const logOut = () => {
        history.push("/dahsboard");
    }
    const login = () => {
        history.push("/login");
    }
    

    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="/dashboard">dashboard</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="/mybiddings">My bidded items</Nav.Link>
                    <Nav.Link href="/settings">Setting</Nav.Link>
                    <Nav.Link href="#">Log out</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    );
}