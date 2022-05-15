import React from 'react';
import NavBarStore from "../components/NavBarStore";
import {Button, Col, Container, Row} from "react-bootstrap";
import StoreTable from "../components/storeTable";

const StorePage = () => {
    return (
        <div>
            <NavBarStore />
            <Container>
                <Row>
                    <Col className="col-lg-12">
                        <StoreTable />
                    </Col>
                </Row>
                <Row>
                    <Col className='col-lg-12 d-flex justify-content-end'>
                        <Button variant="warning" style={{marginRight:'10px'}}>Изменить выбраный</Button>
                        <Button variant="success" style={{marginRight:'30px'}}>Добавить</Button>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default StorePage;