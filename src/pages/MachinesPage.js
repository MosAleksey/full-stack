import React, {useEffect, useState} from 'react';
import NavBar from "../components/NavBar";
import {machine__list__filterquery, machine__list__query} from "../components/queries/machine__list__query";
import MachineTable from "../components/machineTable";
import {Button, Col, Container, Row, Stack} from "react-bootstrap";
import TypeBar from "../components/TypeBar";
import BrandBar from "../components/BrandBar";

const MachinesPage = () => {

    // Отслеживание состояний массивов, полученных с бд
    const [machine, setMachine] = useState([])
    const [fmachine, set__fmachine] = useState([])

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

    // Разовый первый рендер (fmachine__query() для первичной отрисовки без запроса всего списка)
    useEffect(() => {
        machine__list__query().then(data => setMachine(data))
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
            </Container>
        </div>
    );
};

export default MachinesPage;