import React, {useContext, useEffect, useState} from 'react';
import NavBar from "../components/NavBar";
import {Button, Col, Container, Dropdown, Form, Row} from "react-bootstrap";
import CreateErrorInvNumber from "../components/modals/create.error.inv_number";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import {shop_query} from "../components/queries/shop_query";

const ErrorCreatePage = observer(() => {
    const {__shop} = useContext(Context)
    useEffect(() => {
        shop_query().then(data => __shop.setShop(data))
    }, [])

    const [invVisible, setInvVisible] = useState(false)

    const compare_shop_id = () => {
        __shop.data_Shop.forEach(element => {
            if (element.name === machineInfo.shop_name)
                console.log(element.id)
        })
    }

    const [stateUser, setStateUser] = useState({disable: true, element: ''})
    const [machineInfo, setMachineInfo] = useState({machine_id: '', shop_name: '', input_value: '', users_work: ''})
    const get_machine_info = (machine_id, input_value, shop_name, users) => {
        setMachineInfo({
            machine_id: String(machine_id),
            shop_name: String(shop_name),
            input_value: input_value,
            users_work: users
        })
        if (machineInfo) {
            setStateUser({...stateUser, disable: false})
        }
    }

    return (
        <div>
            <NavBar/>
            <Container style={{border: "2px solid black", borderRadius: "10px"}} className="mt-3 p-3">
                <Row>
                    <Col className="col-lg-10">
                        <h3>Создание заявки на обслуживание оборудования</h3>
                    </Col>
                </Row>
                <Form>
                    <Row>
                        <Col className="col-lg-12 mt-3">
                            <Form.Control defaultValue={machineInfo.input_value} placeholder="Инвентарный Номер"
                                          onClick={() => setInvVisible(true)}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="col-lg-12 mt-3">
                            <Form.Control disabled defaultValue={machineInfo.shop_name} placeholder="Цех №"/>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="col-lg-12 mt-3 d-flex">
                            <Dropdown>
                                <Dropdown.Toggle disabled={stateUser.disable} variant="success" id="dropdown-basic">
                                    Оператор
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    {new String(machineInfo.users_work).split(',').map((element, index) =>
                                        <Dropdown.Item onClick={() => setStateUser({...stateUser, element: element})} key={index}>{element}</Dropdown.Item>
                                    )}
                                </Dropdown.Menu>
                            </Dropdown>
                            <Form.Control style={{marginLeft:'10px'}} defaultValue={stateUser.element} disabled placeholder="Оператор"/>
                        </Col>
                    </Row>
                </Form>
                <CreateErrorInvNumber getinv={get_machine_info} show={invVisible} onHide={() => {
                    setInvVisible(false)
                }}/>
                <Button onClick={() => compare_shop_id()}>Check</Button>
            </Container>
        </div>
    );
});

export default ErrorCreatePage;