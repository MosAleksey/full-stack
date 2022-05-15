import React, {useContext, useEffect, useState} from 'react';
import {Button, Col, Form, Row, Spinner, Table} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {user_query} from "./queries/user_query";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faScrewdriverWrench} from "@fortawesome/free-solid-svg-icons";
import {error__inspect__query_create, error__inspect_query, error__query__update} from "./queries/error__query";

const ErrorInspecttion = observer(({fields, status}) => {
    const {__user} = useContext(Context)
    const {__error} = useContext(Context)
    const [checkUser, setCheckUser] = useState([])
    const [inspect, setInspect] = useState({user_id: '', inspect_error: '', repair_kit: '', geometry_fail_akt: null})
    const [defaultValue, setDefaultValue] = useState({
        user_id: '',
        inspect_error: '',
        repair_kit: '',
        geometry_fail_akt: null
    })

    const selectFile = e => {
        setInspect({...inspect, geometry_fail_akt: e.target.files[0]})
        // console.log(e.target.files[0])
    }

    const inspect_not_empty = () => {
        if (__error.data_Inspect_Error[0]) {
            setDefaultValue({
                ...defaultValue,
                user_id: __error.data_Inspect_Error[0].user_id,
                inspect_error: __error.data_Inspect_Error[0].inspect_error,
                repair_kit: __error.data_Inspect_Error[0].repair_kit,
                geometry_fail_akt: __error.data_Inspect_Error[0].geometry_fail_akt
            })
        }
    }

    const inspect_button_disabled = () => {
        if (fields.status === 2 || fields.status === 3 || fields.status === 4)
            return true
    }

    const table_color = (user_id) => {
        if (!(defaultValue.user_id === '')){
            let color = ''
            JSON.parse(defaultValue.user_id).forEach(element => {
                if (user_id === element)
                {
                    color = '#178f39'
                }
            })
            return color
        }

    }

    const addErrorInspect = () => {
        const formData = new FormData()
        formData.append('user_id', JSON.stringify(checkUser))
        formData.append('inspect_error', inspect.inspect_error)
        formData.append('repair_kit', inspect.repair_kit)
        formData.append('geometry_fail_akt', inspect.geometry_fail_akt)
        // console.log(formData.get('geometry_fail_akt'))
        error__inspect__query_create(fields.id, formData)
    }

    useEffect(() => {
        user_query().then(data => __user.setUser(data))
        error__inspect_query(fields.id).then(data => __error.setInspectError(data)).finally(() => inspect_not_empty())
        setInspect({...inspect, error_id: `${fields.id}`})

    }, [])

    return (
        <div style={{border: "2px solid black", borderRadius: "10px", padding: '20px'}}>

            <Form>
                <Form.Group>
                    <Row>
                        <Col className="col-lg-6">
                            <Form.Text><h5>Комиссия к осмотру</h5><p>В комиссии к осмотру состоят только сотрудники
                                имеющие специальность "Сервисный инженер"</p></Form.Text>
                        </Col>
                        <Col className="col-lg-6">
                            <Form.Text><h5>Выявленные неисправности</h5><p>Опишите выявленные неисправности при осмотре
                                оборудования</p></Form.Text>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="col-lg-6">
                            <Table striped bordered size="sm">
                                <thead>
                                <tr>
                                    <th>Табельный номер</th>
                                    <th>ФИО</th>
                                    <th>Выбрать</th>
                                </tr>
                                </thead>
                                <tbody>
                                {__user.data_User.map((element) => {
                                        if (String(element.function_title) === "Сервисный инженер")
                                            return <tr key={element.id} style={{backgroundColor:`${table_color(element.id)}`}}>
                                                <td>{element.personal_number}</td>
                                                <td>{element.second_name} {element.first_name}</td>
                                                <td><Form.Check
                                                    type="checkbox"
                                                    onChange={(e) => {
                                                        setCheckUser([...checkUser, element.id])
                                                    }
                                                }/></td>
                                            </tr>
                                    }
                                )}
                                </tbody>
                            </Table>
                        </Col>
                        <Col className="col-lg-6">
                            <Form.Control defaultValue={`${defaultValue.inspect_error}`} style={{height: '91%'}}
                                          placeholder=""
                                          onChange={(e) => setInspect({...inspect, inspect_error: e.target.value})}/>
                        </Col>
                    </Row>
                    <hr/>
                    <Row>
                        <Col className="col-lg-8">
                            <Form.Text>
                                <h5><FontAwesomeIcon icon={faScrewdriverWrench}/> Список необходимых запчастей</h5>
                            </Form.Text>
                            <Form.Control defaultValue={`${defaultValue.repair_kit}`} style={{height: '5rem'}}
                                          placeholder="Описание необходимых запчастей в наличии или под заказ"
                                          onChange={(e) => setInspect({...inspect, repair_kit: e.target.value})}/>
                        </Col>
                        <Col className="col-lg-4 d-flex justify-content-end align-items-center">
                            <a href="#" style={{marginRight: '20px'}}>Скачать partlist</a>
                        </Col>
                    </Row>
                    <hr/>
                    <Row>
                        <Col className="col-lg-6">
                            <Form.Text><h5>Геометрическая точность</h5></Form.Text>
                            <Form.Text><a href="#">Скачать акт ISO 13041-1 (Токарные обрабатывающие
                                центры)</a><br/></Form.Text>
                            <Form.Text><a href="#">Скачать акт ISO 10791-2 (Фрезерные обрабатывающие
                                центры)</a><br/></Form.Text>
                            <Form.Text><p>Загрузите заполненый акт после осмотра оборудования</p></Form.Text>
                            <Form.Control type="file" onChange={selectFile}/>
                        </Col>
                    </Row>
                    <hr/>
                    <Row>
                        <Col className="col-lg-6>">
                            <Button disabled={inspect_button_disabled()} style={{marginRight: '10px'}} variant="info"
                                    onClick={() => {
                                        error__query__update(`api/errors/${fields.id}`, {status: '2'});
                                        status('2');
                                        addErrorInspect()
                                    }}>Осмотрено</Button>
                        </Col>
                    </Row>
                </Form.Group>
            </Form>
        </div>
    );
});

export default ErrorInspecttion;