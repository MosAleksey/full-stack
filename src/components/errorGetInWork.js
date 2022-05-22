import React, {useState} from 'react';
import {Button, Col, Form, ListGroup, Row, Table} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {useContext, useEffect} from "react";
import {Context} from "../index";
import {user_query} from "./queries/user_query";
import {store__query__bybrand} from "./queries/store_query";
import {error__inwork__query, error__inwork__query_create, error__query__update} from "./queries/error__query";
const ErrorGetInWork = observer(({fields, status}) => {
    const {__user} = useContext(Context)
    const {__error} = useContext(Context)
    const [storeByBrand, setStoreByBrand] = useState([])
    const [getInWork, setgetInWork] = useState({user_id:'', descript_works:'', req_repair_kit: null})
    const [checkUser, setCheckUser] = useState([])
    const [defaultValue, setDefaultValue] = useState({
        user_id: '',
        descript_works: '',
        req_repair_kit: null
    })

    const inwork_not_empty = () =>{
        if (__error.data_InWork_Error){
            setDefaultValue({
                ...defaultValue,
                user_id: __error.data_InWork_Error.user_id,
                descript_works: __error.data_InWork_Error.descript_works,
                req_repair_kit: __error.data_InWork_Error.req_repair_kit
            })
        }
    }


    const selectFile = e =>
    {
        setgetInWork({...getInWork, req_repair_kit: e.target.files[0]})
    }

    const addErrorGetInWork = () => {
        const formData = new FormData()
        formData.append('user_id', JSON.stringify(checkUser))
        formData.append('descript_works', `${getInWork.descript_works}`)
        formData.append('req_repair_kit', getInWork.req_repair_kit)
        error__inwork__query_create(fields.id, formData)
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

    const inWork_button_disabled = () => {
        if (fields.status === 1 || fields.status === 3 || fields.status === 4)
            return true
    }

    useEffect(() => {
        user_query().then(data => __user.setUser(data))
        store__query__bybrand(fields.b_name).then(data=> setStoreByBrand(data))
        error__inwork__query(fields.id).then(data => __error.setInWorkError(data)).finally(()=> inwork_not_empty())
    }, [])
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
                                    <tr key={element.id} style={{backgroundColor:`${table_color(element.id)}`}}>
                                        <td>{element.personal_number}</td>
                                        <td>{element.second_name} {element.first_name}</td>
                                        <td>{element.function_title}</td>
                                        <td><Form.Check
                                            type="checkbox"
                                            onChange={(e) => {
                                                setCheckUser([...checkUser, element.id])
                                            }}
                                        /></td>
                                    </tr>
                                )}
                                </tbody>
                            </Table>
                        </Col>
                        <Col className="col-lg-6">
                            <div className="mb-2">
                                <Form.Text>Опишите работы, которые необходимо выполнить</Form.Text>
                            </div>
                            <div>
                                <Form.Control as="textarea" placeholder="Описание"
                                              defaultValue={`${defaultValue.descript_works}`}
                                              onChange={(e) => setgetInWork({...getInWork, descript_works: e.target.value})}
                                />
                            </div>
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
                            <div className="mt-3">
                                <a href="#">Скачать образец заявки</a>
                            </div>
                            <div className="mt-3 mb-1">
                                <Form.Text>Прикрепить фаил</Form.Text>
                            </div>
                            <Form.Control type="file" onChange={selectFile} />
                        </Col>

                    </Row>
                    <hr/>
                    <Row>
                        <Col className="col-lg-6">
                            <Button variant="warning"
                                    disabled={inWork_button_disabled()}
                                    onClick={()=>{
                                        error__query__update(`api/errors/${fields.id}`, {status: '3'});
                                        status('3');
                                        addErrorGetInWork()
                                    }}>Принять в работу</Button>
                        </Col>
                    </Row>
                </Form.Group>
            </Form>
        </div>
    );
});

export default ErrorGetInWork;