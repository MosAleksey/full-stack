import React, {useContext, useEffect, useState} from 'react';
import NavBar from "../components/NavBar";
import {Button, Col, Container, Dropdown, Form, Row} from "react-bootstrap";
import CreateErrorInvNumber from "../components/modals/create.error.inv_number";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import {shop_query} from "../components/queries/shop_query";
import {user_query} from "../components/queries/user_query";
import {error__query__create} from "../components/queries/error__query";
import {useNavigate} from "react-router-dom";
import {machine_status_byid} from "../components/queries/machine_status_query";

const ErrorCreatePage = observer(() => {
    const {__shop} = useContext(Context)
    const {__user} = useContext(Context)

    const navigate = useNavigate()
    useEffect(() => {
        shop_query().then(data => __shop.setShop(data))
        user_query().then(data => __user.setUser(data))
    }, [])

    const [invVisible, setInvVisible] = useState(false)

    const compare_shop_machine_id = (shop_name, machine_id) => {
        __shop.data_Shop.forEach(element => {
            if (element.name === shop_name) {
                setDataError({...dataError, machine_id: machine_id, shop_id: String(element.id)})
            }
            // console.log(element.name)
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
        compare_shop_machine_id(shop_name, String(machine_id))
        if (machineInfo) {
            setStateUser({...stateUser, disable: false})
        }
    }

    const [userOneinfo, setOneUserinfo] = useState({})
    const compare_one_user_id = (user_id) => {
        __user.data_User.map(element => {
            if (String(element.id) === user_id) {
                let user_obj = {
                    personal_number: element.personal_number,
                    first_name: element.first_name,
                    second_name: element.second_name
                }
                // console.log()
                setOneUserinfo(user_obj)
            }
        })

    }

    const [dataError, setDataError] = useState({
        machine_id: '',
        title: '',
        date: '',
        description: '',
        shop_id: '',
        operator_id: '',
        status: '1',
        explanatory: null
    })
    const add_error = () => {
        // console.log(dataError)
        const formData = new FormData()
        formData.append('machine_id', dataError.machine_id)
        formData.append('title', dataError.title)
        formData.append('date', dataError.date)
        formData.append('description', dataError.description)
        formData.append('shop_id', dataError.shop_id)
        formData.append('operator_id', dataError.operator_id)
        formData.append('status', dataError.status)
        formData.append('explanatory', dataError.explanatory)
        error__query__create(formData).then(() => navigate(`/errors`))
        // console.log(formData.get('explanatory'))
    }

    const selectFile = e => {
        setDataError({...dataError, explanatory: e.target.files[0]})
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
                            <Form.Control defaultValue={machineInfo.input_value}
                                          placeholder="Выбор оборудования || инвентарный номер"
                                          onClick={() => setInvVisible(true)}
                            />
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
                                    {String(machineInfo.users_work).split(',').map((element, index) =>
                                        <Dropdown.Item onClick={() => {
                                            setStateUser({...stateUser, element: element});
                                            setDataError({...dataError, operator_id: element});
                                            compare_one_user_id(element)
                                        }} key={index}>{__user.data_User.map(name => {
                                            if (String(name.id) === element) return `${name.personal_number} || ${name.second_name} ${name.first_name}`
                                        })}</Dropdown.Item>
                                    )}
                                </Dropdown.Menu>
                            </Dropdown>
                            <Form.Control style={{marginLeft: '10px'}} defaultValue={userOneinfo.second_name} disabled
                                          placeholder="Оператор"/>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="col-lg-12 mt-3">
                            <Form.Control type="text" placeholder="Заголовок"
                                          onChange={(e) => setDataError({...dataError, title: e.target.value})}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="col-lg-12 mt-3">
                            <Form.Control type="date" placeholder="Дата"
                                          onChange={(e) => setDataError({...dataError, date: e.target.value})}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="col-lg-12 mt-3">
                            <Form.Control style={{height: '6rem'}} type="text" placeholder="Описание"
                                          onChange={(e) => setDataError({...dataError, description: e.target.value})}/>
                        </Col>
                    </Row>
                </Form>
                <CreateErrorInvNumber getinv={get_machine_info} show={invVisible} onHide={() => {
                    setInvVisible(false)
                }}/>
                {/*<Button onClick={() => compare_shop_id()}>Check</Button>*/}
                <Row>
                    <Col className="col-lg-13 mt-3">
                        <h6>Прикрепить объяснительную записку</h6>
                    </Col>
                </Row>
                <Row>
                    <Col className="col-lg-3 mt-3">
                        <Form.Control type="file" onChange={selectFile}/>
                    </Col>
                    <Col className="col-lg-3 mt-4">
                        <p>* Необязательное услови</p>
                    </Col>
                </Row>
            </Container>
            <Container>
                <Row>
                    <Col className="col-lg-5 mt-4">
                        <Button variant="success" onClick={() => {add_error(); machine_status_byid(machineInfo.machine_id, {status: '2'})}}>Опубликовать заявку</Button>
                    </Col>

                </Row>
            </Container>
        </div>
    );
});

export default ErrorCreatePage;