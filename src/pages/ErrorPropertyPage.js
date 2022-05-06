import React, {useEffect, useState} from 'react';
import NavBar from "../components/NavBar";
import {Button, Col, Container, Row, Table} from "react-bootstrap";
import {useParams} from "react-router-dom";
import {error__query__byid, error__query__update} from "../components/queries/error__query";
import ErrorTableBody from "../components/errorTableBody";

const ErrorPropertyPage = () => {

    useEffect(() => {
        custom__query(id)
    }, [])

    const {id} = useParams()

    const custom__query = (id) => {
        error__query__byid(`api/errors/${id}`).then(data => setError(data))
    }
    const [error, setError] = useState([])

    return (
        <div>
            <NavBar/>
            <Container>
                <Row>
                    <Col className='col-lg-12'>
                        <Table striped bordered hover style={{marginTop: '20px'}} className='errTable'>
                            <thead>
                            <tr>
                                <th style={{textAlign: 'center', verticalAlign: 'middle'}}>Номер заявки</th>
                                <th style={{textAlign: 'center', verticalAlign: 'middle'}}>Заголовок</th>
                                <th style={{textAlign: 'center', verticalAlign: 'middle'}}>Инвентарный номер</th>
                                <th style={{textAlign: 'center', verticalAlign: 'middle'}}>Оборудование</th>
                                <th style={{textAlign: 'center', verticalAlign: 'middle'}}>Цех №</th>
                                <th style={{textAlign: 'center', verticalAlign: 'middle'}}>Описание</th>
                                <th style={{textAlign: 'center', verticalAlign: 'middle'}}>Дата</th>
                                <th style={{textAlign: 'center', verticalAlign: 'middle'}}>Статус</th>
                            </tr>
                            </thead>
                            <tbody>
                            <ErrorTableBody fields={error} key={error.id}/>
                            </tbody>
                        </Table>
                    </Col>
                </Row>
                <Row>
                    <Col className='col-md-6 d-flex'>
                        <Button style={{marginRight: '5px'}} variant="warning" onClick={() => {
                            error__query__update(`api/errors/${id}`)
                        }}>Принять в работу</Button>
                        <Button style={{marginLeft: '5px'}} variant="success">Завершить</Button>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default ErrorPropertyPage;