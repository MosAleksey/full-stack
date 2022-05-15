import React from 'react';
import {Button, Container, Nav, Navbar} from "react-bootstrap";
import {Link} from "react-router-dom";

const NavBarStore = () => {
    return (
        <Navbar bg="primary" variant="dark">
            <Container>
                <Navbar.Brand href="/" style={{fontWeight:'600'}}>ADS Online<br/><span style={{fontSize: '14px', fontWeight:'400'}}>Система управления сервисного обслуживания</span></Navbar.Brand>
                <Nav className="ml-auto">
                    <Link to="/store">
                        <Button style={{margin: '5px', fontWeight: '600', fontSize: '17px'}}>Комплектующие</Button>
                    </Link>
                    <Link to="/machines">
                        <Button style={{margin: '5px', fontWeight: '600', fontSize: '17px'}}>Оборудование</Button>
                    </Link>
                    <Link to="/#">
                        <Button style={{margin: '5px', fontWeight: '600', fontSize: '17px'}}>Авторизация</Button>
                    </Link>
                </Nav>
            </Container>
        </Navbar>
    );
};

export default NavBarStore;