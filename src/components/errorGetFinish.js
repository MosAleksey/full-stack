import React, {useContext, useEffect, useState} from 'react';
import {Button, Col, Form, Row, Table} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {user_query} from "./queries/user_query";
import {
    error__archive__byid, error__archive__create,
    error__inspect_query,
    error__inwork__query, error__query__update,
} from "./queries/error__query";
import {store__query__bybrand} from "./queries/store_query";
import ErrorGetFinishFooter from "./errorGetFinishFooter";

const ErrorGetFinish = observer(({fields, status}) => {
    const {__user} = useContext(Context)
    const {__error} = useContext(Context)
    const [userWorks, setUserWorks] = useState([])
    const [storeByBrand, setStoreByBrand] = useState([])
    const [userInspect, setUserInspect] = useState([])
    const [errorInspect, setErrorInspect] = useState([])
    const [checkUser, setCheckUser] = useState([])
    const [finishDate, setFinishDate] = useState('')
    const [repairKitId, setRepairKitId] = useState([])
    const [getFinish, setGetFinish] = useState({
        descript_finish_work:'',
        user_work_id:'',
        repair_kit_id:'',
        user_inspect_id:'',
        descript_inspect_error:'',
        finish_date:'',
        geometry_fail_akt:'',
        geometry_finish_akt: null
    })
    const [defaultValue, setDefaultValue] = useState({
        user_finish_id:'',
        descript_finish_work:'',
        user_work_id:'',
        user_inspect_id:'',
        descript_inspect_error:'',
        finish_date:'',
        geometry_fail_akt:'',
        geometry_finish_akt: ''
    })
    const Archive_not_empty = () => {
        if(__error.data_Archive_Error[0]){
            setDefaultValue({...defaultValue,
                user_finish_id: __error.data_Archive_Error[0].user_finish_id,
                descript_finish_work: __error.data_Archive_Error[0].descript_finish_work,
                user_work_id: __error.data_Archive_Error[0].user_work_id,
                user_inspect_id: __error.data_Archive_Error[0].user_inspect_id,
                descript_inspect_error: __error.data_Archive_Error[0].descript_inspect_error,
                finish_date: __error.data_Archive_Error[0].finish_date,
                geometry_fail_akt: __error.data_Archive_Error[0].geometry_fail_akt,
                geometry_finish_akt: __error.data_Archive_Error[0].geometry_finish_akt
            })
        }
    }
    const filter_userId = (user_id) => {
        if (user_id){
            let user = []
            JSON.parse(user_id).forEach(arr => {
                __user.data_User.forEach(element => {
                    if (String(arr) === String(element.id))
                        user.push(element)
                })
            })
            return (user)
        }
    }

    const fettle = (fettle) => {
        if (fettle === 1)
            return 'Новая'
        if (fettle === 2)
            return 'Б/У'
    }

    const table_color = (user_id) => {
        if (!(defaultValue.user_finish_id === '')){
            let color = ''
            JSON.parse(defaultValue.user_finish_id).forEach(element => {
                if (user_id === element)
                {
                    color = '#178f39'
                }
            })
            return color
        }

    }


    const getFinish_button_disabled = () => {
        if (fields.status === 1 || fields.status === 2 || fields.status === 4)
            return true
    }

    const footer_visible = (userInspect, errorArchive) => {
        if (fields.status === 4)
            return <ErrorGetFinishFooter userInspect={userInspect} errorArchive={errorArchive}/>

    }

    useEffect(()=>{
        error__inspect_query(fields.id).then(data => setErrorInspect(data))
        // error__inwork__query(fields.id).then(data => __error.setInWorkError(data)).finally(()=> setUserWorks(filter_userId(__error.data_InWork_Error.user_id)))
        // error__inwork__query(fields.id).then(data => setUserWorks(filter_userId(data.user_id))).finally(()=> console.log(userWorks))
        error__archive__byid(fields.id).then(data => __error.setArchiveError(data)).finally(()=> Archive_not_empty())
        user_query().then(data => __user.setUser(data)).finally(()=> error__inwork__query(fields.id).then(data => setUserWorks(filter_userId(data.user_id)))).finally(()=>setUserInspect(filter_userId(__error.data_Archive_Error[0].user_inspect_id)))
        store__query__bybrand(fields.b_name).then(data=> setStoreByBrand(data))
    }, [])

    const addFinishError = () => {
        const formData = new FormData()
        formData.append('user_finish_id', JSON.stringify(checkUser))
        formData.append('descript_finish_work', getFinish.descript_finish_work)
        formData.append('user_work_id', __error.data_InWork_Error.user_id)
        formData.append('repair_kit_id', JSON.stringify(repairKitId))
        formData.append('user_inspect_id', errorInspect[0].user_id)
        formData.append('descript_inspect_error', errorInspect[0].inspect_error)
        formData.append('finish_date', finishDate)
        formData.append('geometry_fail_akt', errorInspect[0].geometry_fail_akt)
        formData.append('geometry_finish_akt', getFinish.geometry_finish_akt)
        error__archive__create(fields.id, formData)
    }

    const selectFile = e =>
    {
        setGetFinish({...getFinish, geometry_finish_akt: e.target.files[0]})
    }

    return (
        <div className="mt-2" style={{border: "2px solid black", borderRadius: "10px", padding: '20px'}}>
            <Form>
                <Form.Group>
                    <Row>
                        <Col className="col-lg-6">
                            <div>
                                <Form.Text>
                                    <h5>Комиссия к осмотру (Сдача оборудования в работу)</h5><p>В комиссии к осмотру состоят только сотрудники
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
                                            return <tr key={element.id} style={{backgroundColor:`${table_color(element.id)}`}}>
                                                <td>{element.personal_number}</td>
                                                <td>{element.second_name} {element.first_name}</td>
                                                <td>{element.function_title}</td>
                                                <td><Form.Check
                                                    type="checkbox"
                                                    onChange={(e)=> setCheckUser([...checkUser, element.id])}
                                                /></td>
                                            </tr>
                                    }
                                )}
                                </tbody>
                            </Table>
                        </Col>
                        <Col className="col-lg-6">
                            <div>
                                <div>
                                    <Form.Control
                                        defaultValue={defaultValue.descript_finish_work}
                                        onChange={(e) => setGetFinish({...getFinish, descript_finish_work: e.target.value})}
                                        as="textarea"
                                        placeholder="Описание"/>
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
                                </tr>
                                </thead>
                                <tbody>
                                {userWorks.map(element =>
                                    <tr key={element.id}>
                                        <td>{element.personal_number}</td>
                                        <td>{element.second_name} {element.first_name}</td>
                                        <td>{element.function_title}</td>
                                    </tr>
                                )}
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
                                    <th>Оборудование</th>
                                    <th>Наименование</th>
                                    <th>Состояние</th>
                                    <th>Наличие</th>
                                    <th>Использовано</th>
                                </tr>
                                </thead>
                                <tbody>
                                    {storeByBrand.map(element=>
                                    <tr key={element.id}>
                                        <td>{element.m_title}</td>
                                        <td>{element.title}</td>
                                        <td>{fettle(element.fettle)}</td>
                                        <td>{element.availability}</td>
                                        <td><Form.Control defaultValue="0" onChange={(e) => {setRepairKitId([...repairKitId, element.id])}}/></td>
                                    </tr>
                                    )}
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="col-lg-6">
                            <Form.Text><h5>Геометрическая точность</h5></Form.Text>
                            <Form.Text><p>Загрузите заполненый акт после ремонта</p></Form.Text>
                            <Form.Control type="file" onChange={selectFile}/>
                        </Col>
                        <Col className="col-lg-6">
                            <div>
                                <Form.Text><h5>Дата окончания работ</h5></Form.Text>
                                <Form.Text><p> </p></Form.Text>
                            </div>
                            <Form.Control
                                defaultValue={defaultValue.finish_date.slice(0, -14)}
                                type="date"
                                placeholder="Дата"
                                onChange={(e)=> setFinishDate(e.target.value)}/>
                        </Col>
                    </Row>
                    {footer_visible(userInspect, defaultValue)}
                    <hr/>
                    <Row>
                        <Col className="col-lg-6">
                            <Button
                                disabled={getFinish_button_disabled()}
                                onClick={()=>{
                                    addFinishError();
                                    error__query__update(`api/errors/${fields.id}`, {status: '4'});
                                    status('4');
                                }}
                                variant="success">Завершить</Button>
                        </Col>
                    </Row>
                </Form.Group>
            </Form>

        </div>
    );
});

export default ErrorGetFinish;