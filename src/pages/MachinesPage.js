import React, {useEffect, useState} from 'react';
import NavBar from "../components/NavBar";
import {machine__list__filterquery, machine__list__query} from "../components/queries/machine__list__query";
import MachineTable from "../components/machineTable";
import {Button, Col, Container, Row, Stack} from "react-bootstrap";
import TypeBar from "../components/TypeBar";
import BrandBar from "../components/BrandBar";
import {machine_stoplist} from "../components/queries/machine_status_query";
import {error__query__notfinish} from "../components/queries/error__query";
import machine_reportPDF from "../components/report/clients/machine_reportPDF";
import {join, reduce} from "lodash";

const MachinesPage = () => {

    // Отслеживание состояний массивов, полученных с бд
    const [machine, setMachine] = useState([])
    const [fmachine, set__fmachine] = useState([])
    const [stopList, setStopList] = useState([])
    const [errorStopList, setErrorStopList] = useState(['1'])

    // Рендер отфильтрованных элементов
    const fmachine__query = (custom__query) => {
        if (!custom__query) {
            const fmachine__query = `api/machines`
            machine__list__filterquery(fmachine__query).then(data => set__fmachine(data))
        } else {
            const fmachine__query = `api/machines?type_id=${custom__query}`
            machine__list__filterquery(fmachine__query).then(data => set__fmachine(data))
        }
    }
    const query_stopList_errors = (machines) => {
        let array = []
        for (let i = 0; i < machines.length; i++){
            error__query__notfinish(machines[i].inv_number).then(element => array.push(element))
        }
        setErrorStopList(array)
    }
    const req_errorStopList = (machines, errors) => {
        let report_arr = []
        machines.map((data, index) => {
            let report_list = {inv_number:'', m_title: '', errors: []}
            report_list.inv_number = data.inv_number
            report_list.m_title = data.m_title
            errors[index].map(err => {
                report_list.errors.push(err.description)
            })
            report_arr.push(report_list)
        })
    return report_arr
    }

    // Разовый первый рендер (fmachine__query() для первичной отрисовки без запроса всего списка)
    useEffect(() => {
        machine__list__query().then(data => setMachine(data))
        machine_stoplist().then(data => {setStopList(data); query_stopList_errors(data)})
        fmachine__query()
    }, [])

    return (
        <div>
            <NavBar/>
            <Container>
                <Row>
                    <Stack gap={3} className="col-md-3">
                        <TypeBar filter={fmachine__query} props={machine}/>
                        <BrandBar props={machine}/>
                    </Stack>
                    <Col md={9}>
                        <MachineTable props={fmachine}/>
                    </Col>
                </Row>
                <hr/>
                <Row>
                    <Col className="col-lg-12 mt-2 d-flex justify-content-end">
                        <Button variant="success" onClick={()=> machine_reportPDF(req_errorStopList(stopList, errorStopList))}>Отчет о проставиваемом оборудовании</Button>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default MachinesPage;