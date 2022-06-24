import React, {lazy, useContext, useEffect, useState} from 'react';
import NavBar from "../components/NavBar";
import {Button, Col, Container, Row, Table} from "react-bootstrap";
import {useParams} from "react-router-dom";
import {error__query__byid} from "../components/queries/error__query";
import ErrorTableBody from "../components/errorTableBody";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDownload, faUpload} from "@fortawesome/free-solid-svg-icons";
import ErrorInspecttion from "../components/errorInspecttion";
import ErrorGetInWork from "../components/errorGetInWork";
import ErrorGetFinish from "../components/errorGetFinish";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import UpdateErrorExplan from "../components/modals/update.error.explan";

const ErrorPropertyPage = observer(() => {

    const  {__error} = useContext(Context)
    const {id} = useParams()
    const [error, setError] = useState([])
    const [status, setStatus] = useState([])
    const [statusExpl, setStatusExpl] = useState(false)

    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        error__query__byid(`api/errors/${id}`).then(data => setError(data)).finally(()=> check_statusExpl())
    }, [status, statusExpl])

    const req_status = (variant) => {
        let object = {
            status: `${variant}`
        }
        setStatus(object)
        return object
    }


    const status_disable = () => {
        let disable = false
        if (!error.explanatory)
            disable = true
        return disable
    }

    const check_statusExpl = (status) => {
        if (error.explanatory || status)
            setStatusExpl(true)
    }

    const variant_component = () => {
        if (error.status === 1)
        {
            return <div><ErrorInspecttion fields={error} status={req_status}/></div>
        } else
            if (error.status === 2)
            {
                return <div><ErrorInspecttion fields={error} status={req_status}/><ErrorGetInWork fields={error} status={req_status}/></div>
            }else
                if (error.status === 3)
                {
                    return <div><ErrorInspecttion fields={error} status={req_status}/><ErrorGetInWork fields={error} status={req_status}/><ErrorGetFinish fields={error} status={req_status}/></div>
                }else
                    if (error.status === 4)
                    {
                        return <div><ErrorGetFinish fields={error} status={req_status}/></div>
                    }

    }

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
                                <th style={{textAlign: 'center', verticalAlign: 'middle'}}>Объяснительная</th>
                            </tr>
                            </thead>
                            <tbody>
                            <ErrorTableBody fields={error} key={error.id}/>
                            </tbody>
                        </Table>
                    </Col>
                </Row>
                <Row>
                    <Col className="col-lg-12 d-flex justify-content-end">
                        <Button disabled={!status_disable()} style={{marginRight: '20px'}} onClick={handleShow}>
                            <FontAwesomeIcon icon={faUpload}/><span> Добавить документ</span>
                        </Button>
                        <UpdateErrorExplan show={show} onHide={handleClose} error_id={id} status={check_statusExpl}/>
                        <Button disabled={status_disable()} style={{marginRight: '20px'}} href={`http://localhost:8080/${error.explanatory}`}>
                            <FontAwesomeIcon icon={faDownload}/><span> Скачать</span>
                        </Button>
                    </Col>
                </Row>
                <hr/>
                <Row>
                    {variant_component()}
                </Row>
            </Container>
        </div>
    );
});

export default ErrorPropertyPage;