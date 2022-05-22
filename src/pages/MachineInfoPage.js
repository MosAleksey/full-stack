import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import NavBar from "../components/NavBar";
import {machine__Info__query, machine__Info__query__By_Id} from "../components/queries/machine__info_query";
import {Col, Container, Image, Row} from "react-bootstrap";
import StatisticTable from "../components/statistic_table";
import {error__query__byinv_number} from "../components/queries/error__query";
import StatisticBar from "../components/statistic_bar";

const MachineInfoPage = () => {

    const [inform, setInform] = useState([])
    const [errorStatistic, setErrorStatistic] = useState([])
    const {inv_number} = useParams()
    useEffect(() => {
        machine__Info__query__By_Id(inv_number).then(data => setInform(data))
        error__query__byinv_number(inv_number).then(data => setErrorStatistic(data))
    }, [])

    function isNull() {
        if (!inform.img) {
            inform.img = 'img_not_found.jpg'
        } else
            inform.img = inform.img
        return inform.img
    }

    function split_link() {
        let string = String(inform.dock_link)
        let array = string.split(",")
        return array
    }

    const SERVER_URL = 'http://localhost:8080/'
    return (
        <div>
            <NavBar/>
            <Container className='mt-3'>
                <Row>
                    <Col className='col-md-4'>
                        <div>
                            <Image width={300} height={'auto'} src={SERVER_URL + isNull()}/>
                        </div>
                    </Col>
                    <Col className='col-md-8 d-flex justify-content-center'>
                        <Container>
                            <Row>
                                <Col className='col-sm-12'>
                                    <h3>{inform.m_title} | Инвентарынй номер {inv_number}<br/>
                                        <span style={{fontSize: '15px'}}>{inform.description}</span></h3>
                                    <hr style={{color: 'black', width: '100%'}}/>
                                </Col>
                            </Row>
                            <Row>
                                <Col className='col-sm-12'>
                                    <h5>Ссылки на документацию</h5>
                                    <ul>
                                        {split_link().map(element =>
                                            <li key={element.length}><a href={element}>{element}</a></li>
                                        )}
                                    </ul>
                                    <hr style={{color: 'black', width: '100%'}}/>
                                </Col>
                            </Row>
                            <Row>
                                <Col className='col-sm-12'>
                                    <h5>Год ввода в эксплуатацию {(String(inform.start_year).slice(0, -14))}</h5>
                                    <hr style={{color: 'black', width: '100%'}}/>
                                </Col>
                            </Row>
                        </Container>
                    </Col>
                </Row>
                <Row>
                    <Col className="col-lg-12 mt-3">
                        <StatisticBar />
                    </Col>
                </Row>
                <Row>
                    <Col className='col-md-12'>
                        <h3 className='mt-4'>История обслуживания и ремонтов</h3>
                        <StatisticTable errors = {errorStatistic}/>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default MachineInfoPage;