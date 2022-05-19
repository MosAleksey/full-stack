import React from 'react';
import {Button, Col, Form, Row, Table} from "react-bootstrap";

const ErrorGetFinishFooter = ({userInspect, errorArchive}) => {
    return (
        <div>
            <hr/>
            <Row>
                <Col className="col-lg-6 mb-3">
                    <div>
                        <Form.Text><h5>Данные для формирования отчета</h5></Form.Text>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col className="col-lg-6">
                    <div>
                        <Form.Text><h5>Комиссия выполнявшая дефектовку</h5><p>* Нередактируемое поле</p></Form.Text>
                    </div>
                    <div>
                        <Table striped bordered size="sm">
                            <thead>
                            <tr>
                                <th>Табельный номер</th>
                                <th>ФИО</th>
                                <th>Должность</th>
                            </tr>
                            </thead>
                            <tbody>
                            {userInspect.map(element =>
                                <tr key={element.id}>
                                    <td>{element.personal_number}</td>
                                    <td>{element.second_name} {element.first_name}</td>
                                    <td>{element.function_title}</td>
                                </tr>
                            )}
                            </tbody>
                        </Table>
                    </div>
                </Col>
                <Col className="col-lg-6">
                    <div>
                        <Form.Text><h5>Выявленные комиссией неисправности</h5><p> </p></Form.Text>
                    </div>
                    <div>
                        <Form.Control defaultValue={errorArchive.descript_inspect_error} as="textarea" placeholder="Выявленные неисправности"/>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col className="col-lg-6">
                    <div className="mb-2 mt-2">
                        <Form.Text>Акт проверки оборудования на геометрическую точность до начала ремонта</Form.Text>
                    </div>
                    <a href={`http://localhost:8080/${errorArchive.geometry_fail_akt}`} target="_blank">Скачать акт</a>
                </Col>
            </Row>
        </div>
    );
};

export default ErrorGetFinishFooter;