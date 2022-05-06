import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import NavBar from "../components/NavBar";
import {machine__Info__query} from "../components/queries/machine__info_query";
import {Col, Container, Image, Row} from "react-bootstrap";
import StatisticTable from "../components/statistic_table";

const MachineInfoPage = () => {

    useEffect(() => {
        get_machine_info()
    }, [])

    const [inform, setInform] = useState([])
    const {inv_number} = useParams()

    const get_machine_info = () => {
        machine__Info__query(inv_number).then(data => setInform(data))
    }

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

    function get_link_list() {
        for (let i = 0; i < split_link().length; i++) {
            <li>{split_link()[i]}</li>
        }
    }

    const SERVER_URL = 'http://localhost:8080/'
    return (
        <div>
            <NavBar/>
            <Container className='mt-3'>
                <Row>
                    <Col className='col-md-4'>
                        <div>
                            <Image width={426} height={'auto'} src={SERVER_URL + isNull()}/>
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
                                        {split_link().map(link =>
                                            <li key={link.length}><a href={link}>{link}</a></li>
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
                    <Col className='col-md-12'>
                        <h3 className='mt-4'>История обслуживания и ремонтов</h3>
                        <StatisticTable/>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default MachineInfoPage;