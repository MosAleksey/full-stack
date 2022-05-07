import React from 'react';
import {Button, Container, Nav, Navbar} from "react-bootstrap";
import {Link} from "react-router-dom";

const NavBar = () => {
    return (
        <Navbar bg="primary" variant="dark">
            <Container>
                <Navbar.Brand href="/errors" style={{fontWeight:'600'}}>ADS Online<br/><span style={{fontSize: '14px', fontWeight:'400'}}>Система управления сервисного отдела</span></Navbar.Brand>
                <Nav className="ml-auto">
                    <Link to="/errors">
                        <Button style={{margin: '5px', fontWeight: '600', fontSize: '17px'}}>Заявки</Button>
                    </Link>
                    <Link to="/machines">
                        <Button style={{margin: '5px', fontWeight: '600', fontSize: '17px'}}>Оборудование</Button>
                    </Link>
                    <Link to="/users">
                        <Button style={{margin: '5px', fontWeight: '600', fontSize: '17px'}}>Сотрудники</Button>
                    </Link>
                    <Link to="/#">
                        <Button style={{margin: '5px', fontWeight: '600', fontSize: '17px'}}>О приложении</Button>
                    </Link>
                    <Link to="/#">
                        <Button style={{margin: '5px', fontWeight: '600', fontSize: '17px'}}>Авторизация</Button>
                    </Link>
                </Nav>
            </Container>
        </Navbar>
    );
};

export default NavBar;