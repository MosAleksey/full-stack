import React, {useState} from 'react';
import {Button, Col, Form, ListGroup, Row, Table} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {useContext, useEffect} from "react";
import {Context} from "../index";
import {user_query} from "./queries/user_query";
import {store__query__bybrand} from "./queries/store_query";

const ErrorGetInWork = observer(({fields}) => {
    const {__user} = useContext(Context)
    const [storeByBrand, setStoreByBrand] = useState([])

    useEffect(() => {
        user_query().then(data => __user.setUser(data))
        store__query__bybrand(fields.b_name).then(data=> setStoreByBrand(data))
    }, [])
    const [repair, setRepair] = useState([])
    const addRepair = () => {
        setRepair([...repair, {description: '', number: Date.now()}])
    }
    const removeRepair = (number) => {
        setRepair(repair.filter(i => i.number !== number))
    }
    return (
        <div className="mt-2" style={{border: "2px solid black", borderRadius: "10px", padding: '20px'}}>
            <Form>
                <Form.Group>
                    <Row>
                        <Col className="col-lg-6">
                            <Form.Text><h5>Назначенные работники</h5><p>В работе могут учавствовать все сотрудники</p>
                            </Form.Text>
                        </Col>
                        <Col className="col-lg-6">
                            <Form.Text><h5>Перечень выполняемых работ</h5></Form.Text>
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
                                {__user.data_User.map(element =>
                                    <tr key={element.id}>
                                        <td>{element.personal_number}</td>
                                        <td>{element.second_name} {element.first_name}</td>
                                        <td>{element.function_title}</td>
                                        <td><Form.Check
                                            type="checkbox"
                                        /></td>
                                    </tr>
                                )}
                                </tbody>
                            </Table>
                        </Col>
                        <Col className="col-lg-6">
                            <div>
                                <Form.Control placeholder="Описание"/>
                                <p onClick={addRepair}
                                   style={{textDecoration: 'underline', color: '#0e91d2', cursor: 'pointer'}}>Добавить
                                    еще...</p>
                            </div>
                            {repair.map((element, index) =>
                                <div key={index}>
                                    <Form.Control placeholder="Описание"/>
                                    <div className="d-flex">
                                        <span onClick={addRepair}
                                              style={{
                                                  textDecoration: 'underline',
                                                  color: '#0e91d2',
                                                  cursor: 'pointer'
                                              }}>Добавить
                                            еще...</span>
                                    </div>
                                </div>
                            )}
                        </Col>
                    </Row>
                    <hr/>
                    <Row>
                        <Col className="col-lg-6">
                            <Form.Text>
                                <h5>Компоненты на складе</h5>
                            </Form.Text>
                            <div className="mb-2">
                                <Form.Text>
                                    * В список включены компоненты на аналогичное оборудование
                                </Form.Text>
                            </div>
                            <ListGroup>
                                {storeByBrand.map(element =>
                                    <ListGroup.Item key={element.id}>{element.m_title} || {element.title}</ListGroup.Item>
                                )}

                            </ListGroup>
                        </Col>
                        <Col className="col-lg-6">
                            <Form.Text><h5>Приклепленная разовая заявка на покупку комплектующих</h5></Form.Text>

                        </Col>

                    </Row>
                    <Button></Button>
                </Form.Group>
            </Form>
        </div>
    );
});

export default ErrorGetInWork;