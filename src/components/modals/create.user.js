import React, {useState} from 'react';
import {observer} from "mobx-react-lite";
import {useContext, useEffect} from "react";
import {Context} from "../../index";
import {shop_query} from "../queries/shop_query";
import {create_user_query, user_functions_query, user_query} from "../queries/user_query";
import {Button, Col, Container, Dropdown, Form, Modal, Row} from "react-bootstrap";

const CreateUser = observer(({show, onHide}) => {
    const {__shop} = useContext(Context)
    const {__user} = useContext(Context)
    const [shopid, setShopid] = useState([])
    const [shopName, setShopName] = useState('')
    const [userFunc, setUserFunc] = useState('')
    const [addUser, setAddUser] = useState({personal_number:'', email:'', password:'', shop_id:'', role:'USER', first_name:'', second_name:'', func:'', in_work:'false'})

    useEffect(() => {
        shop_query().then(data => __shop.setShop(data))
        user_query().then(data => __user.setUser(data))
        user_functions_query().then(data => __user.setUserFunction(data))
    }, [])

    const create_User = () => {
        create_user_query(addUser)
    }
    return (
        <div>
            <Modal
                show={show}
                onHide={onHide}
                size="lg"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Добавить сотрудника
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Container>
                            <Row>
                                <Col className="col-sm-12 d-flex justify-content-center mt-2">
                                    <Form.Control onChange={e => setAddUser({...addUser, personal_number: e.target.value})} placeholder="Табельный номер"/>
                                </Col>
                            </Row>
                            <Row>
                                <Col className="col-sm-12 d-flex justify-content-center mt-2">
                                    <Form.Control onChange={e => setAddUser({...addUser, second_name: e.target.value})} placeholder="Фамилия"/>
                                </Col>
                            </Row>
                            <Row>
                                <Col className="col-sm-12 d-flex justify-content-center mt-2">
                                    <Form.Control onChange={e => setAddUser({...addUser, first_name: e.target.value})} placeholder="Имя"/>
                                </Col>
                            </Row>
                            <Row>
                                <Col className="col-sm-12 d-flex justify-content-center mt-2">
                                    <Form.Control onChange={e => setAddUser({...addUser, email: e.target.value})} placeholder="email"/>
                                </Col>
                            </Row>
                            <Row>
                                <Col className="col-sm-12 d-flex justify-content-center mt-2">
                                    <Form.Control onChange={e => setAddUser({...addUser, password: e.target.value})} placeholder="Пароль"/>
                                </Col>
                            </Row>
                            <Row>
                                <Col className="col-sm-12 d-flex justify-content-center mt-2">
                                    <Dropdown>
                                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                                            Выберите цех
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu>
                                            {__shop.data_Shop.map(element =>
                                                <Dropdown.Item onClick={() => {
                                                    setShopName(element.name);
                                                    setShopid(element.id)
                                                    setAddUser({...addUser, shop_id: String(element.id)})
                                                }} href="#" key={element.id}>{element.name}</Dropdown.Item>
                                            )}
                                        </Dropdown.Menu>
                                    </Dropdown>
                                    <Form.Control disabled style={{marginLeft: "10px"}} value={shopName}
                                                  placeholder="Номер цеха"/>
                                </Col>
                            </Row>
                            <Row>
                                <Col className="col-sm-12 d-flex justify-content-center mt-2">
                                    <Dropdown>
                                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                                            Выберите должность
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu>
                                            {__user.data_UserFunction.map(element =>
                                                <Dropdown.Item onClick={() => {
                                                    setUserFunc(element.function_title);
                                                    setAddUser({...addUser, func: String(element.id)})
                                                    // setShopid(element.id)
                                                }} href="#" key={element.id}>{element.function_title}</Dropdown.Item>
                                            )}
                                        </Dropdown.Menu>
                                    </Dropdown>
                                    <Form.Control disabled style={{marginLeft: "10px"}} value={userFunc}
                                                  placeholder="Должность"/>
                                </Col>
                            </Row>
                        </Container>
                        <Container className="mt-3">
                            <Button variant="success" onClick={create_User}>Добавить сотрудника</Button>
                        </Container>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={onHide}>Закрыть</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
});

export default CreateUser;