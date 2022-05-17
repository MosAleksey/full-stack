import React, {useContext, useEffect} from 'react';
import {Button, Col, Form, Row, Table} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {user_query} from "./queries/user_query";

const ErrorGetFinish = observer(() => {
    const {__user} = useContext(Context)
    useEffect(()=>{
        user_query().then(data => __user.setUser(data))
    }, [])
    return (
        <div className="mt-2" style={{border: "2px solid black", borderRadius: "10px", padding: '20px'}}>
            <Form>
                <Form.Group>
                    <Row>
                        <Col className="col-lg-6">
                            <div>
                                <Form.Text>
                                    <h5>Комиссия к осмотру</h5><p>В комиссии к осмотру состоят только сотрудники
                                    имеющие специальность "Сервисный инженер" или "Механик"</p>
                                </Form.Text>
                            </div>
                        </Col>
                        <Col className="col-lg-6">
                            <Form.Text>
                                <h5>Выполненные работы</h5><p>Перечень только выполненых работ (может не совпадать с
                                выполняемыми)</p>
                            </Form.Text>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="col-lg-6">
                            <Table striped bordered size="sm">
                                <thead>
                                <tr>
                                    <th>Табельный номер</th>
                                    <th>ФИО</th>
                                    <th>Должность</th>
                                    <th>Выбрать</th>
                                </tr>
                                </thead>
                                <tbody>
                                {__user.data_User.map((element) => {
                                        if ((String(element.function_title) === "Сервисный инженер") || String(element.function_title) === "Механик")
                                            return <tr key={element.id}>
                                                <td>{element.personal_number}</td>
                                                <td>{element.second_name} {element.first_name}</td>
                                                <td>{element.function_title}</td>
                                                <td><Form.Check
                                                    type="checkbox"/></td>
                                            </tr>
                                    }
                                )}
                                </tbody>
                            </Table>
                        </Col>
                        <Col className="col-lg-6">
                            <div>
                                <div>
                                    <Form.Control as="textarea" placeholder="Описание"/>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="col-lg-6">
                            <div>
                                <Form.Text>
                                    <h5>Работники</h5><p>Список сотрудников выполнявших работы</p>
                                </Form.Text>
                            </div>
                            <Table striped bordered size="sm">
                                <thead>
                                <tr>
                                    <th>Табельный номер</th>
                                    <th>ФИО</th>
                                    <th>Должность</th>
                                    <th>Выбрать</th>
                                </tr>
                                </thead>
                                <tbody>

                                </tbody>
                            </Table>
                        </Col>
                        <Col className="col-lg-6">
                            <div>
                                <Form.Text>
                                    <h5>Используемые комплектующие</h5><p>Используемые комплектующие со склада</p>
                                </Form.Text>
                            </div>
                            <Table striped bordered size="sm">
                                <thead>
                                <tr>
                                    <th>Запчасти</th>
                                    <th>Запчасти</th>
                                    <th>Запчасти</th>
                                    <th>Запчасти</th>
                                </tr>
                                </thead>
                                <tbody>

                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                    <hr/>
                    <Row>
                        <Col className="col-lg-6">
                            <Button disabled variant="success">Завершить</Button>
                        </Col>
                    </Row>
                </Form.Group>
            </Form>

        </div>
    );
});

export default ErrorGetFinish;